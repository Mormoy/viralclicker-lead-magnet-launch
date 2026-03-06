
-- Create enum for tenant pipeline stages
CREATE TYPE public.pipeline_stage AS ENUM (
  'lead',
  'demo_scheduled',
  'proposal_sent',
  'contract_sent',
  'contract_signed',
  'payment_received',
  'onboarding',
  'active_customer'
);

-- Create pipeline_deals table for tenant CRM
CREATE TABLE public.pipeline_deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  stage pipeline_stage NOT NULL DEFAULT 'lead',
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  city TEXT,
  source TEXT DEFAULT 'manual',
  value NUMERIC DEFAULT 0,
  priority TEXT DEFAULT 'medium',
  notes TEXT,
  next_followup TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pipeline_deals ENABLE ROW LEVEL SECURITY;

-- RLS: users can only see their tenant's deals
CREATE POLICY "Tenant members can view own deals"
  ON public.pipeline_deals FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own deals"
  ON public.pipeline_deals FOR INSERT TO authenticated
  WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can update own deals"
  ON public.pipeline_deals FOR UPDATE TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can delete own deals"
  ON public.pipeline_deals FOR DELETE TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));
