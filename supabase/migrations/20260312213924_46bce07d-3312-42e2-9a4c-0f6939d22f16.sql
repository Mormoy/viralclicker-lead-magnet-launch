
ALTER TABLE public.quote_services
ADD COLUMN IF NOT EXISTS installation_formula text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS min_width numeric DEFAULT NULL,
ADD COLUMN IF NOT EXISTS min_height numeric DEFAULT NULL;
