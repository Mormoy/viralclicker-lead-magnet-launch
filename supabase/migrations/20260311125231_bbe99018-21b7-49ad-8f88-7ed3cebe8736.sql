
-- Deal activity log
CREATE TABLE public.deal_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID NOT NULL REFERENCES public.pipeline_deals(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'note',
  description TEXT NOT NULL,
  old_stage_id UUID REFERENCES public.pipeline_stages(id),
  new_stage_id UUID REFERENCES public.pipeline_stages(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.deal_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own deal activity"
  ON public.deal_activity FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own deal activity"
  ON public.deal_activity FOR INSERT TO authenticated
  WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

-- WhatsApp templates (tenant-scoped)
CREATE TABLE public.whatsapp_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}'::TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own templates"
  ON public.whatsapp_templates FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own templates"
  ON public.whatsapp_templates FOR INSERT TO authenticated
  WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can update own templates"
  ON public.whatsapp_templates FOR UPDATE TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can delete own templates"
  ON public.whatsapp_templates FOR DELETE TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

-- WhatsApp automations
CREATE TABLE public.whatsapp_automations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  trigger_event TEXT NOT NULL,
  delay_hours INTEGER NOT NULL DEFAULT 0,
  template_id UUID NOT NULL REFERENCES public.whatsapp_templates(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.whatsapp_automations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own automations"
  ON public.whatsapp_automations FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own automations"
  ON public.whatsapp_automations FOR INSERT TO authenticated
  WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can update own automations"
  ON public.whatsapp_automations FOR UPDATE TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can delete own automations"
  ON public.whatsapp_automations FOR DELETE TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

-- Automation queue
CREATE TABLE public.automation_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.pipeline_deals(id) ON DELETE SET NULL,
  automation_id UUID NOT NULL REFERENCES public.whatsapp_automations(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.automation_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own queue"
  ON public.automation_queue FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own queue"
  ON public.automation_queue FOR INSERT TO authenticated
  WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

-- Onboarding progress
CREATE TABLE public.onboarding_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE UNIQUE,
  step_company BOOLEAN NOT NULL DEFAULT false,
  step_quote_page BOOLEAN NOT NULL DEFAULT false,
  step_templates BOOLEAN NOT NULL DEFAULT false,
  step_first_lead BOOLEAN NOT NULL DEFAULT false,
  step_integrations BOOLEAN NOT NULL DEFAULT false,
  dismissed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own onboarding"
  ON public.onboarding_progress FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own onboarding"
  ON public.onboarding_progress FOR INSERT TO authenticated
  WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can update own onboarding"
  ON public.onboarding_progress FOR UPDATE TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));
