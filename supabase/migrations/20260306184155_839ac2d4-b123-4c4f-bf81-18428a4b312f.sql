
-- Quote status enum
CREATE TYPE public.quote_status AS ENUM (
  'draft', 'sent', 'viewed', 'accepted', 'expired', 'converted', 'rejected'
);

-- Quote pricing model enum
CREATE TYPE public.pricing_model AS ENUM (
  'fixed', 'variable', 'per_quantity', 'formula'
);

-- Quote pages per tenant
CREATE TABLE public.quote_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  thank_you_message TEXT DEFAULT 'Gracias por solicitar tu cotización. Te contactaremos pronto.',
  whatsapp_cta_text TEXT DEFAULT 'Continuar por WhatsApp',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- Service categories
CREATE TABLE public.quote_service_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  quote_page_id UUID REFERENCES public.quote_pages(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Services / products
CREATE TABLE public.quote_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.quote_service_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  pricing_model pricing_model NOT NULL DEFAULT 'fixed',
  base_price NUMERIC NOT NULL DEFAULT 0,
  price_formula TEXT, -- e.g. "width * height * rate"
  min_price NUMERIC DEFAULT 0,
  max_price NUMERIC,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Variables per service (size, color, material, etc.)
CREATE TABLE public.quote_service_variables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.quote_services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'select', -- select, number, text
  options JSONB DEFAULT '[]'::jsonb, -- [{value, label, price_modifier}]
  is_required BOOLEAN NOT NULL DEFAULT false,
  affects_price BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Optional extras per service
CREATE TABLE public.quote_service_extras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.quote_services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  is_percentage BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Discount rules per tenant
CREATE TABLE public.quote_discount_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'percentage', -- percentage, fixed
  value NUMERIC NOT NULL DEFAULT 0,
  min_total NUMERIC DEFAULT 0,
  min_items INT DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Generated quotes
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  quote_page_id UUID REFERENCES public.quote_pages(id) ON DELETE SET NULL,
  short_code TEXT NOT NULL UNIQUE,
  status quote_status NOT NULL DEFAULT 'draft',
  -- Contact info
  customer_name TEXT NOT NULL,
  customer_company TEXT,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_city TEXT,
  customer_notes TEXT,
  -- Totals
  subtotal NUMERIC NOT NULL DEFAULT 0,
  extras_total NUMERIC NOT NULL DEFAULT 0,
  discount_amount NUMERIC NOT NULL DEFAULT 0,
  discount_label TEXT,
  delivery_fee NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  -- Tracking
  viewed_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  expired_at TIMESTAMPTZ,
  lead_id UUID,
  pipeline_deal_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Quote line items
CREATE TABLE public.quote_line_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.quote_services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  description TEXT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  variables JSONB DEFAULT '{}'::jsonb,
  extras JSONB DEFAULT '[]'::jsonb,
  extras_total NUMERIC NOT NULL DEFAULT 0,
  line_total NUMERIC NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Quote activity log
CREATE TABLE public.quote_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  old_status quote_status,
  new_status quote_status,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.quote_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_service_variables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_service_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_discount_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_activity ENABLE ROW LEVEL SECURITY;

-- RLS for tenant-scoped tables
-- quote_pages
CREATE POLICY "Tenant members can view own quote pages" ON public.quote_pages FOR SELECT TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can insert own quote pages" ON public.quote_pages FOR INSERT TO authenticated WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can update own quote pages" ON public.quote_pages FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can delete own quote pages" ON public.quote_pages FOR DELETE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));

-- quote_service_categories
CREATE POLICY "Tenant members can view own categories" ON public.quote_service_categories FOR SELECT TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can insert own categories" ON public.quote_service_categories FOR INSERT TO authenticated WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can update own categories" ON public.quote_service_categories FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can delete own categories" ON public.quote_service_categories FOR DELETE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));

-- quote_services
CREATE POLICY "Tenant members can view own services" ON public.quote_services FOR SELECT TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can insert own services" ON public.quote_services FOR INSERT TO authenticated WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can update own services" ON public.quote_services FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can delete own services" ON public.quote_services FOR DELETE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));

-- quote_service_variables (via service join)
CREATE POLICY "Tenant members can view own variables" ON public.quote_service_variables FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));
CREATE POLICY "Tenant members can insert own variables" ON public.quote_service_variables FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));
CREATE POLICY "Tenant members can update own variables" ON public.quote_service_variables FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));
CREATE POLICY "Tenant members can delete own variables" ON public.quote_service_variables FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));

-- quote_service_extras (via service join)
CREATE POLICY "Tenant members can view own extras" ON public.quote_service_extras FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));
CREATE POLICY "Tenant members can insert own extras" ON public.quote_service_extras FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));
CREATE POLICY "Tenant members can update own extras" ON public.quote_service_extras FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));
CREATE POLICY "Tenant members can delete own extras" ON public.quote_service_extras FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM public.quote_services s WHERE s.id = service_id AND s.tenant_id = get_user_tenant_id(auth.uid())));

-- quote_discount_rules
CREATE POLICY "Tenant members can view own discount rules" ON public.quote_discount_rules FOR SELECT TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can insert own discount rules" ON public.quote_discount_rules FOR INSERT TO authenticated WITH CHECK (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can update own discount rules" ON public.quote_discount_rules FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Tenant members can delete own discount rules" ON public.quote_discount_rules FOR DELETE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));

-- quotes - tenant access + public access for viewing by short_code
CREATE POLICY "Tenant members can view own quotes" ON public.quotes FOR SELECT TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Anyone can view quotes by short_code" ON public.quotes FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can insert quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Tenant members can update own quotes" ON public.quotes FOR UPDATE TO authenticated USING (tenant_id = get_user_tenant_id(auth.uid()));
CREATE POLICY "Anyone can update quote status" ON public.quotes FOR UPDATE TO anon USING (true);

-- quote_line_items - public access for quote viewing
CREATE POLICY "Anyone can view quote line items" ON public.quote_line_items FOR SELECT USING (true);
CREATE POLICY "Anyone can insert quote line items" ON public.quote_line_items FOR INSERT WITH CHECK (true);

-- quote_activity
CREATE POLICY "Tenant members can view own quote activity" ON public.quote_activity FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.quotes q WHERE q.id = quote_id AND q.tenant_id = get_user_tenant_id(auth.uid())));
CREATE POLICY "Anyone can insert quote activity" ON public.quote_activity FOR INSERT WITH CHECK (true);

-- Public access for quote pages (customers need to see them)
CREATE POLICY "Anyone can view active quote pages" ON public.quote_pages FOR SELECT TO anon USING (is_active = true);

-- Public access for services on active pages
CREATE POLICY "Anyone can view active services" ON public.quote_services FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Anyone can view service variables" ON public.quote_service_variables FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can view active extras" ON public.quote_service_extras FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Anyone can view active categories" ON public.quote_service_categories FOR SELECT TO anon USING (is_active = true);

-- Function to generate short codes
CREATE OR REPLACE FUNCTION public.generate_quote_short_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INT;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$;
