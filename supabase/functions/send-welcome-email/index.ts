import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  nombre: string;
  email: string;
  empresa: string;
  plan: string;
  monto: number;
  calendlyUrl: string;
  contractUrl: string;
}

const getPlanDetails = (planId: string) => {
  const plans: Record<string, { name: string; price: string; features: string[] }> = {
    starter: {
      name: "Starter",
      price: "$99/mes",
      features: [
        "Landing + formulario de contacto",
        "CRM básico con estados",
        "3 plantillas WhatsApp",
        "Export CSV",
        "Soporte básico por email",
        "1 sesión de 30 min/mes"
      ]
    },
    pro: {
      name: "Pro",
      price: "$249/mes",
      features: [
        "Todo de Starter +",
        "Cotizador personalizado",
        "Cupones sobre cotizaciones",
        "Automatizaciones base (n8n)",
        "Campañas internas WhatsApp",
        "Reportes de conversión",
        "30 min quincenal de soporte"
      ]
    },
    elite: {
      name: "Elite",
      price: "$449/mes",
      features: [
        "Todo de Pro +",
        "Tracking post-venta completo",
        "Automatización avanzada",
        "Integración Calendly",
        "Multiusuario",
        "Soporte prioritario",
        "Onboarding: 30 min/semana x4"
      ]
    }
  };
  return plans[planId] || plans.starter;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(resendKey);
    const { nombre, email, empresa, plan, monto, calendlyUrl, contractUrl }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to ${email} for plan ${plan}`);

    const planDetails = getPlanDetails(plan);

    // Generate features HTML
    const featuresHtml = planDetails.features
      .map(f => `<li style="padding: 8px 0; color: #374151;">✓ ${f}</li>`)
      .join("");

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #ff6a00; font-size: 28px; margin: 0;">Viral Clicker</h1>
      <p style="color: #6b7280; margin-top: 8px;">Tu sistema de ventas por WhatsApp</p>
    </div>

    <!-- Main Card -->
    <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <!-- Welcome -->
      <h2 style="color: #111827; font-size: 24px; margin: 0 0 16px 0;">
        ¡Bienvenido/a, ${nombre}! 🎉
      </h2>
      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
        Tu pago ha sido procesado exitosamente. Estamos emocionados de tenerte como parte de la familia Viral Clicker.
      </p>

      <!-- Plan Summary -->
      <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h3 style="color: #c2410c; font-size: 14px; text-transform: uppercase; margin: 0 0 8px 0;">Tu plan</h3>
        <p style="color: #111827; font-size: 20px; font-weight: bold; margin: 0;">
          ${planDetails.name} - ${planDetails.price}
        </p>
        <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0 0;">
          Empresa: ${empresa} | Total pagado: $${monto}
        </p>
      </div>

      <!-- What's included -->
      <h3 style="color: #111827; font-size: 18px; margin: 0 0 12px 0;">Lo que incluye tu plan:</h3>
      <ul style="list-style: none; padding: 0; margin: 0 0 24px 0;">
        ${featuresHtml}
      </ul>

      <!-- Next Steps -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 24px;">
        <h3 style="color: #111827; font-size: 18px; margin: 0 0 16px 0;">📋 Próximos pasos</h3>
        
        <!-- Step 1: Onboarding -->
        <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <p style="color: #166534; font-weight: bold; margin: 0 0 8px 0;">1. Agenda tu onboarding</p>
          <p style="color: #4b5563; font-size: 14px; margin: 0 0 12px 0;">
            Reserva tu sesión 1:1 para configurar todo tu sistema.
          </p>
          <a href="${calendlyUrl}" style="display: inline-block; background: #ff6a00; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Agendar onboarding →
          </a>
        </div>

        <!-- Step 2: Contract -->
        <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <p style="color: #92400e; font-weight: bold; margin: 0 0 8px 0;">2. Revisa los términos del servicio</p>
          <p style="color: #4b5563; font-size: 14px; margin: 0 0 12px 0;">
            Lee y acepta los términos para comenzar.
          </p>
          <a href="${contractUrl}" style="display: inline-block; background: #374151; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Ver términos →
          </a>
        </div>

        <!-- Step 3: Prepare -->
        <div style="background: #eff6ff; border-radius: 8px; padding: 16px;">
          <p style="color: #1e40af; font-weight: bold; margin: 0 0 8px 0;">3. Prepara tu información</p>
          <p style="color: #4b5563; font-size: 14px; margin: 0;">
            Ten listos: tu logo, colores de marca, catálogo de productos/servicios y precios.
          </p>
        </div>
      </div>

      <!-- Important Notes -->
      <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; margin-top: 24px;">
        <h4 style="color: #374151; margin: 0 0 8px 0;">📌 Importante</h4>
        <ul style="color: #6b7280; font-size: 14px; margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 4px;">Tu recibo/factura fue enviado por Stripe automáticamente.</li>
          <li style="margin-bottom: 4px;">Los costos de Twilio/WhatsApp se pagan directamente a Twilio.</li>
          <li>El setup inicial incluye diseño, configuración y onboarding.</li>
        </ul>
      </div>
    </div>

    <!-- WhatsApp Support -->
    <div style="text-align: center; margin-top: 24px;">
      <p style="color: #6b7280; margin: 0 0 12px 0;">¿Tienes dudas? Escríbenos:</p>
      <a href="https://wa.me/13051234567?text=Hola,%20acabo%20de%20contratar%20el%20plan%20${plan}" style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
        💬 WhatsApp de soporte
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">© 2025 Viral Clicker by MORMOY</p>
      <p style="margin: 8px 0 0 0;">Este email fue enviado a ${email}</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Viral Clicker <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Bienvenido a Viral Clicker – Onboarding y acceso",
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
