
-- =============================================
-- 1. Activity Log table (multi-tenant)
-- =============================================
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT,
  old_value TEXT,
  new_value TEXT,
  created_by TEXT,
  template_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own activity_log" ON public.activity_log
  FOR SELECT TO authenticated
  USING (tenant_id = get_user_tenant_id(auth.uid()));

CREATE POLICY "Tenant members can insert own activity_log" ON public.activity_log
  FOR INSERT TO authenticated
  WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));

-- =============================================
-- 2. Work Orders table (generic operations)
-- =============================================
CREATE TABLE IF NOT EXISTS public.work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.pipeline_deals(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL DEFAULT 'OT-' || substr(gen_random_uuid()::text, 1, 8),
  status TEXT NOT NULL DEFAULT 'pending',
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  estimated_days INTEGER DEFAULT 7,
  start_date TIMESTAMPTZ,
  estimated_delivery_date TIMESTAMPTZ,
  actual_delivery_date TIMESTAMPTZ,
  supplier_cost NUMERIC DEFAULT 0,
  production_notes TEXT,
  internal_notes TEXT,
  priority TEXT DEFAULT 'media',
  assigned_to TEXT,
  initial_payment_confirmed BOOLEAN DEFAULT false,
  initial_payment_amount NUMERIC DEFAULT 0,
  initial_payment_date TIMESTAMPTZ,
  final_payment_confirmed BOOLEAN DEFAULT false,
  final_payment_amount NUMERIC DEFAULT 0,
  final_payment_date TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own work_orders" ON public.work_orders
  FOR SELECT TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can insert own work_orders" ON public.work_orders
  FOR INSERT TO authenticated WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can update own work_orders" ON public.work_orders
  FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can delete own work_orders" ON public.work_orders
  FOR DELETE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));

-- =============================================
-- 3. Customer Payments table
-- =============================================
CREATE TABLE IF NOT EXISTS public.customer_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.pipeline_deals(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  work_order_id UUID REFERENCES public.work_orders(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'transferencia',
  payment_date TIMESTAMPTZ DEFAULT now(),
  payment_number INTEGER DEFAULT 1,
  receipt_number TEXT,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.customer_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view own payments" ON public.customer_payments
  FOR SELECT TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can insert own payments" ON public.customer_payments
  FOR INSERT TO authenticated WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can update own payments" ON public.customer_payments
  FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can delete own payments" ON public.customer_payments
  FOR DELETE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));

-- =============================================
-- 4. Enhance automation_queue with missing fields
-- =============================================
ALTER TABLE public.automation_queue 
  ADD COLUMN IF NOT EXISTS entity_type TEXT DEFAULT 'deal',
  ADD COLUMN IF NOT EXISTS trigger_event TEXT DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS recipient_phone TEXT,
  ADD COLUMN IF NOT EXISTS message_template TEXT,
  ADD COLUMN IF NOT EXISTS error_message TEXT,
  ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ;

-- Add update policy to automation_queue (currently missing)
CREATE POLICY "Tenant members can update own queue" ON public.automation_queue
  FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));

-- =============================================
-- 5. Add missing fields to pipeline_deals for enhanced pipeline
-- =============================================
ALTER TABLE public.pipeline_deals
  ADD COLUMN IF NOT EXISTS assigned_to UUID,
  ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS loss_reason TEXT,
  ADD COLUMN IF NOT EXISTS loss_reason_detail TEXT,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS next_action TEXT,
  ADD COLUMN IF NOT EXISTS next_action_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS first_contact_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_interaction_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS visit_scheduled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS visit_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS visit_address TEXT,
  ADD COLUMN IF NOT EXISTS visit_notes TEXT,
  ADD COLUMN IF NOT EXISTS final_value NUMERIC;

-- Enable realtime for activity_log
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_log;
