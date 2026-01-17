-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create clients table for paid customers with onboarding workflow
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  empresa TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  correo TEXT NOT NULL,
  ciudad TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'pro', 'elite')),
  monto DECIMAL(10,2) NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_payment_intent_id TEXT,
  estado TEXT NOT NULL DEFAULT 'pagado' CHECK (estado IN ('pagado', 'contrato_enviado', 'contrato_firmado', 'onboarding_pendiente', 'onboarding_agendado', 'onboarded')),
  contrato_aceptado BOOLEAN DEFAULT false,
  contrato_timestamp TIMESTAMPTZ,
  calendly_event_url TEXT,
  calendly_event_date TIMESTAMPTZ,
  webhook_n8n_url TEXT,
  notas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy for public read (admin access controlled by password in frontend)
CREATE POLICY "Allow public read for admin panel" 
ON public.clients 
FOR SELECT 
USING (true);

-- Create policy for public insert (from checkout)
CREATE POLICY "Allow public insert from checkout" 
ON public.clients 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public update (admin updates)
CREATE POLICY "Allow public update for admin" 
ON public.clients 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create integrations settings table for n8n webhook
CREATE TABLE public.integrations_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webhook_n8n_url TEXT,
  calendly_url TEXT DEFAULT 'https://calendly.com/tu-empresa/onboarding',
  contract_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.integrations_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for integrations_settings
CREATE POLICY "Allow public read for integrations" 
ON public.integrations_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert for integrations" 
ON public.integrations_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update for integrations" 
ON public.integrations_settings 
FOR UPDATE 
USING (true);

-- Create trigger for integrations_settings
CREATE TRIGGER update_integrations_settings_updated_at
BEFORE UPDATE ON public.integrations_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.integrations_settings (calendly_url)
VALUES ('https://calendly.com/tu-empresa/onboarding');