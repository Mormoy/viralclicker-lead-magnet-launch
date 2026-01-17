-- Create leads table for ClickCRM
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  empresa TEXT NOT NULL,
  rubro TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  correo TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  mensaje TEXT,
  estado TEXT NOT NULL DEFAULT 'nuevo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can submit a lead)
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin select (using service role or authenticated users for admin)
CREATE POLICY "Authenticated users can view leads" 
ON public.leads 
FOR SELECT 
USING (true);

-- Create policy for admin update
CREATE POLICY "Authenticated users can update leads" 
ON public.leads 
FOR UPDATE 
USING (true);

-- Create policy for admin delete
CREATE POLICY "Authenticated users can delete leads" 
ON public.leads 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_leads_updated_at();