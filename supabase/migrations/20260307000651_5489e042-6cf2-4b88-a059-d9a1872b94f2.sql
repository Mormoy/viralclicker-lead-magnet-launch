
-- Custom pipeline stages per tenant
CREATE TABLE public.pipeline_stages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#3b82f6',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add stage_id to pipeline_deals (nullable for backward compat)
ALTER TABLE public.pipeline_deals ADD COLUMN stage_id UUID REFERENCES public.pipeline_stages(id) ON DELETE SET NULL;

-- RLS
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own stages"
ON public.pipeline_stages FOR SELECT TO authenticated
USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own stages"
ON public.pipeline_stages FOR INSERT TO authenticated
WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can update own stages"
ON public.pipeline_stages FOR UPDATE TO authenticated
USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can delete own stages"
ON public.pipeline_stages FOR DELETE TO authenticated
USING (tenant_id = get_user_tenant_id(auth.uid()));

-- Public read for anonymous quote submissions
CREATE POLICY "Anyone can view stages for public pages"
ON public.pipeline_stages FOR SELECT TO anon
USING (true);

-- Function to seed default stages for a tenant
CREATE OR REPLACE FUNCTION public.seed_default_pipeline_stages(_tenant_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.pipeline_stages (tenant_id, name, slug, color, sort_order, is_default) VALUES
    (_tenant_id, 'Lead', 'lead', '#3b82f6', 0, true),
    (_tenant_id, 'Demo Agendada', 'demo_scheduled', '#06b6d4', 1, false),
    (_tenant_id, 'Propuesta Enviada', 'proposal_sent', '#eab308', 2, false),
    (_tenant_id, 'Contrato Enviado', 'contract_sent', '#f97316', 3, false),
    (_tenant_id, 'Contrato Firmado', 'contract_signed', '#a855f7', 4, false),
    (_tenant_id, 'Pago Recibido', 'payment_received', '#10b981', 5, false),
    (_tenant_id, 'Onboarding', 'onboarding', '#6366f1', 6, false),
    (_tenant_id, 'Cliente Activo', 'active_customer', '#22c55e', 7, false);
END;
$$;
