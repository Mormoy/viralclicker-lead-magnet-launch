import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { quote_id, short_code, customer_name, customer_email, customer_phone, total, tenant_id, line_items, payment_type, success_url, cancel_url } = body;

    console.log("Quote checkout request:", { quote_id, short_code, total, payment_type });

    if (!quote_id || !total || !tenant_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get tenant info for product naming
    const { data: tenant } = await supabase.from("tenants").select("name").eq("id", tenant_id).single();
    const tenantName = tenant?.name || "Business";

    // Determine amount (full or deposit)
    const isDeposit = payment_type === "deposit";
    const paymentAmount = isDeposit ? Math.round(total * 0.5) : total; // 50% deposit
    const amountInCents = Math.round(paymentAmount * 100);

    // Check if customer exists in Stripe
    let customerId: string | undefined;
    if (customer_email) {
      const existing = await stripe.customers.list({ email: customer_email, limit: 1 });
      if (existing.data.length > 0) {
        customerId = existing.data[0].id;
      }
    }

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: customer_email || undefined,
        name: customer_name,
        phone: customer_phone || undefined,
        metadata: { tenant_id, quote_id },
      });
      customerId = customer.id;
    }

    // Build description from line items
    const description = (line_items || [])
      .map((item: any) => `${item.name} x${item.qty}`)
      .join(", ") || `Cotización #${short_code}`;

    // Create checkout session (one-time payment)
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: isDeposit
                ? `Anticipo 50% - Cotización #${short_code}`
                : `Cotización #${short_code}`,
              description: `${tenantName} — ${description}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: success_url || `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '.lovable.app')}/q/view/${short_code}?paid=true`,
      cancel_url: cancel_url || `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '.lovable.app')}/q/view/${short_code}?paid=false`,
      metadata: {
        quote_id,
        short_code,
        tenant_id,
        payment_type: isDeposit ? "deposit" : "full",
        original_total: total.toString(),
      },
    });

    // Update quote status to reflect payment intent
    await supabase.from("quotes").update({
      status: "sent",
    }).eq("id", quote_id);

    // Log activity
    await supabase.from("quote_activity").insert({
      quote_id,
      type: "payment_initiated",
      description: isDeposit
        ? `Cliente inició pago de anticipo (50%): $${paymentAmount.toLocaleString()}`
        : `Cliente inició pago completo: $${paymentAmount.toLocaleString()}`,
      new_status: "sent",
    });

    console.log("Quote checkout session created:", session.id, "Amount:", paymentAmount);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Quote checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
