import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email template for welcome
const generateWelcomeEmail = (
  nombre: string, 
  email: string, 
  empresa: string, 
  planId: string, 
  monto: number,
  calendlyUrl: string,
  termsUrl: string
) => {
  const plans: Record<string, { name: string; price: string }> = {
    starter: { name: "Starter", price: "$99/mes" },
    pro: { name: "Pro", price: "$249/mes" },
    elite: { name: "Elite", price: "$449/mes" }
  };
  const plan = plans[planId] || plans.starter;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #ff6a00; font-size: 28px; margin: 0;">Viral Clicker</h1>
    </div>
    <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #111827; font-size: 24px; margin: 0 0 16px 0;">¡Bienvenido/a, ${nombre}! 🎉</h2>
      <p style="color: #4b5563; line-height: 1.6;">Tu pago ha sido procesado exitosamente.</p>
      
      <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #c2410c; font-size: 14px; text-transform: uppercase; margin: 0 0 8px 0;">Tu plan</h3>
        <p style="color: #111827; font-size: 20px; font-weight: bold; margin: 0;">${plan.name} - ${plan.price}</p>
        <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0 0;">Empresa: ${empresa} | Total: $${monto}</p>
      </div>

      <h3 style="color: #111827; font-size: 18px; margin: 24px 0 16px 0;">📋 Próximos pasos:</h3>
      
      <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <p style="color: #166534; font-weight: bold; margin: 0 0 8px 0;">1. Agenda tu onboarding</p>
        <a href="${calendlyUrl}" style="display: inline-block; background: #ff6a00; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">Agendar ahora →</a>
      </div>

      <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <p style="color: #92400e; font-weight: bold; margin: 0 0 8px 0;">2. Revisa los términos</p>
        <a href="${termsUrl}" style="display: inline-block; background: #374151; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">Ver términos →</a>
      </div>

      <div style="background: #eff6ff; border-radius: 8px; padding: 16px;">
        <p style="color: #1e40af; font-weight: bold; margin: 0 0 8px 0;">3. Prepara tu información</p>
        <p style="color: #4b5563; font-size: 14px; margin: 0;">Ten listos: logo, colores, catálogo y precios.</p>
      </div>

      <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; margin-top: 24px;">
        <p style="color: #374151; font-weight: bold; margin: 0 0 8px 0;">📌 Importante</p>
        <ul style="color: #6b7280; font-size: 14px; margin: 0; padding-left: 20px;">
          <li>Tu factura fue enviada por Stripe.</li>
          <li>Los costos de Twilio/WhatsApp se pagan directo a Twilio.</li>
        </ul>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 24px;">
      <a href="https://wa.me/56912345678?text=Hola,%20acabo%20de%20contratar%20${planId}" style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">💬 WhatsApp de soporte</a>
    </div>
    
    <div style="text-align: center; margin-top: 32px; color: #9ca3af; font-size: 12px;">
      <p>© 2025 Viral Clicker by MORMOY</p>
    </div>
  </div>
</body>
</html>`;
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

    // Initialize Resend if available
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const resend = resendKey ? new Resend(resendKey) : null;

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

        // Get client data for email
        const { data: clientData } = await supabase
          .from("clients")
          .select("*")
          .eq("stripe_customer_id", customerId)
          .single();

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

        // Get integration settings for URLs
        const { data: settings } = await supabase
          .from("integrations_settings")
          .select("calendly_url, contract_url, webhook_n8n_url")
          .limit(1)
          .single();

        // Send welcome email if Resend is configured
        if (resend && clientData) {
          try {
            const calendlyUrl = settings?.calendly_url || "https://calendly.com/atacamacortinas/onbording-viralclicker";
            // Use production URL for terms
            const termsUrl = "https://viralclicker-lead-magnet-launch.lovable.app/terminos";

            const emailHtml = generateWelcomeEmail(
              clientData.nombre,
              clientData.correo,
              clientData.empresa,
              clientData.plan,
              clientData.monto,
              calendlyUrl,
              termsUrl
            );

            const emailResult = await resend.emails.send({
              from: "Viral Clicker <onboarding@resend.dev>",
              to: [clientData.correo],
              subject: "🎉 Bienvenido a Viral Clicker – Onboarding y acceso",
              html: emailHtml,
            });

            console.log("Welcome email sent:", emailResult);
          } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            // Don't fail the webhook if email fails
          }
        } else {
          console.log("Resend not configured or client data missing, skipping email");
        }

        // Send webhook to n8n if configured
        if (settings?.webhook_n8n_url) {
          try {
            await fetch(settings.webhook_n8n_url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event: "payment_completed",
                data: {
                  customerId,
                  subscriptionId,
                  planId: metadata.planId,
                  nombre: clientData?.nombre || metadata.nombre,
                  empresa: clientData?.empresa || metadata.empresa,
                  correo: clientData?.correo,
                  whatsapp: clientData?.whatsapp,
                  amount: session.amount_total,
                  fecha: new Date().toISOString(),
                },
              }),
            });
            console.log("n8n webhook sent");
          } catch (webhookError) {
            console.error("n8n webhook error:", webhookError);
          }
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
