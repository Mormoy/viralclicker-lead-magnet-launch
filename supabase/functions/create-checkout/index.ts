import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  planId: string;
  nombre: string;
  empresa: string;
  correo: string;
  whatsapp: string;
  ciudad?: string;
  successUrl: string;
  cancelUrl: string;
}

const plans: Record<string, { name: string; price: number; priceId?: string }> = {
  starter: { name: "Starter", price: 9900 }, // in cents
  pro: { name: "Pro", price: 24900 },
  elite: { name: "Elite", price: 44900 },
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: CheckoutRequest = await req.json();
    console.log("Checkout request:", { ...body, correo: body.correo?.substring(0, 3) + "***" });

    const { planId, nombre, empresa, correo, whatsapp, ciudad, successUrl, cancelUrl } = body;

    // Validate plan
    const plan = plans[planId];
    if (!plan) {
      return new Response(
        JSON.stringify({ error: "Invalid plan" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if customer exists
    let customerId: string | undefined;
    const existingCustomers = await stripe.customers.list({ email: correo, limit: 1 });
    
    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      // Create customer
      const customer = await stripe.customers.create({
        email: correo,
        name: nombre,
        metadata: {
          empresa,
          whatsapp,
          ciudad: ciudad || "",
        },
      });
      customerId = customer.id;
      console.log("Created new customer:", customerId);
    }

    // Create Stripe Checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `ClickCRM Plan ${plan.name}`,
              description: `Suscripción mensual al plan ${plan.name}`,
            },
            unit_amount: plan.price,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        planId,
        nombre,
        empresa,
        whatsapp,
        ciudad: ciudad || "",
      },
      subscription_data: {
        metadata: {
          planId,
          nombre,
          empresa,
        },
      },
    });

    console.log("Checkout session created:", session.id);

    // Save client to database with pending status
    const { error: dbError } = await supabase.from("clients").insert({
      nombre,
      empresa,
      correo,
      whatsapp,
      ciudad: ciudad || null,
      plan: planId,
      monto: plan.price / 100,
      estado: "pendiente",
      stripe_customer_id: customerId,
    });

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Don't fail the checkout, just log the error
    }

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
