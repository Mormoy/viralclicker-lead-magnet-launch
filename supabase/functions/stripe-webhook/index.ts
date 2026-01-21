import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return new Response("Stripe not configured", { status: 500 });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    // For now, we'll process without signature verification
    // In production, add STRIPE_WEBHOOK_SECRET and verify
    const event = JSON.parse(body) as Stripe.Event;

    console.log("Webhook event received:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", session.id);

        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        const metadata = session.metadata || {};

        // Update client record
        const { error } = await supabase
          .from("clients")
          .update({
            estado: "pagado",
            stripe_subscription_id: subscriptionId,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        if (error) {
          console.error("Error updating client:", error);
        } else {
          console.log("Client updated to pagado status");
        }

        // Send webhook to n8n if configured
        try {
          const { data: settings } = await supabase
            .from("integrations_settings")
            .select("webhook_n8n_url")
            .limit(1)
            .single();

          if (settings?.webhook_n8n_url) {
            await fetch(settings.webhook_n8n_url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event: "payment_completed",
                data: {
                  customerId,
                  subscriptionId,
                  planId: metadata.planId,
                  nombre: metadata.nombre,
                  empresa: metadata.empresa,
                  amount: session.amount_total,
                  fecha: new Date().toISOString(),
                },
              }),
            });
            console.log("n8n webhook sent");
          }
        } catch (webhookError) {
          console.error("n8n webhook error:", webhookError);
        }

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment succeeded for invoice:", invoice.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        console.log("Payment failed for customer:", customerId);

        // Update client status
        await supabase
          .from("clients")
          .update({ estado: "pago_fallido", updated_at: new Date().toISOString() })
          .eq("stripe_customer_id", customerId);

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        console.log("Subscription cancelled for customer:", customerId);

        await supabase
          .from("clients")
          .update({ estado: "cancelado", updated_at: new Date().toISOString() })
          .eq("stripe_customer_id", customerId);

        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
