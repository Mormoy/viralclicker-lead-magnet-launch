import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  planId: string;
  setupType: string;
  nombre: string;
  empresa: string;
  correo: string;
  whatsapp: string;
  ciudad?: string;
  successUrl: string;
  cancelUrl: string;
}

const plans: Record<string, { name: string; price: number }> = {
  starter: { name: "Starter", price: 9900 }, // $99 in cents
  pro: { name: "Pro", price: 24900 }, // $249 in cents
  elite: { name: "Elite", price: 44900 }, // $449 in cents
};

const setupPrices: Record<string, { name: string; price: number; landings: number }> = {
  simple: { name: "Simple", price: 50000, landings: 1 }, // $500 in cents
  standard: { name: "Estándar", price: 100000, landings: 3 }, // $1,000 in cents
  complex: { name: "Complejo", price: 160000, landings: 5 }, // $1,600 in cents
};

serve(async (req) => {
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

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: CheckoutRequest = await req.json();
    console.log("Checkout request:", { planId: body.planId, setupType: body.setupType });

    const { planId, setupType, nombre, empresa, correo, whatsapp, ciudad, successUrl, cancelUrl } = body;

    // Validate plan
    const plan = plans[planId];
    if (!plan) {
      console.error("Invalid plan:", planId);
      return new Response(
        JSON.stringify({ error: "Invalid plan" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate setup type (default to simple if not provided)
    const setup = setupPrices[setupType] || setupPrices.simple;
    console.log("Selected setup:", setup.name, "Price:", setup.price / 100);

    // Check if customer exists
    let customerId: string | undefined;
    const existingCustomers = await stripe.customers.list({ email: correo, limit: 1 });
    
    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      const customer = await stripe.customers.create({
        email: correo,
        name: nombre,
        metadata: { empresa, whatsapp, ciudad: ciudad || "" },
      });
      customerId = customer.id;
      console.log("Created new customer:", customerId);
    }

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `ViralClicker Plan ${plan.name}`,
            description: `Suscripción mensual al plan ${plan.name}`,
          },
          unit_amount: plan.price,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `ViralClicker Setup ${setup.name}`,
            description: `Configuración inicial ${setup.name} - ${setup.landings} landing${setup.landings > 1 ? 's' : ''} incluida${setup.landings > 1 ? 's' : ''} (pago único)`,
          },
          unit_amount: setup.price,
        },
        quantity: 1,
      },
    ];

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        planId,
        setupType,
        setupName: setup.name,
        setupPrice: (setup.price / 100).toString(),
        nombre,
        empresa,
        whatsapp,
        ciudad: ciudad || "",
      },
      subscription_data: {
        metadata: { planId, nombre, empresa, setupType },
      },
    });

    console.log("Checkout session created:", session.id);

    // Calculate total amount
    const totalMonto = (plan.price / 100) + (setup.price / 100);

    // Save client to database with valid estado
    const { error: dbError } = await supabase.from("clients").insert({
      nombre,
      empresa,
      correo,
      whatsapp,
      ciudad: ciudad || null,
      plan: planId,
      monto: totalMonto,
      estado: "onboarding_pendiente",
      stripe_customer_id: customerId,
      notas: `Setup ${setup.name} ($${setup.price / 100}) - ${setup.landings} landing${setup.landings > 1 ? 's' : ''}`,
    });

    if (dbError) {
      console.error("Database insert error:", dbError);
    } else {
      console.log("Client saved to database with total:", totalMonto);
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
