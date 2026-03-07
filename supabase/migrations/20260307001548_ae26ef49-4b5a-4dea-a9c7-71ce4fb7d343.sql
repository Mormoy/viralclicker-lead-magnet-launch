
-- Add logo_url to tenants table
ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS logo_url TEXT;
