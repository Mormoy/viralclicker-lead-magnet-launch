-- Create enum for pipeline states
CREATE TYPE public.cotizacion_estado AS ENUM (
  'nuevo',
  'contactado',
  'cotizacion_enviada',
  'en_decision',
  'visita_agendada',
  'visita_realizada',
  'propuesta_final_enviada',
  'anticipo_pagado',
  'en_fabricacion',
  'listo_instalar',
  'instalado_entregado',
  'cerrado_ganado',
  'perdido'
);

-- Create enum for lead source
CREATE TYPE public.cotizacion_fuente AS ENUM (
  'ads',
  'web',
  'organico',
  'referido',
  'manual'
);

-- Create enum for priority
CREATE TYPE public.cotizacion_prioridad AS ENUM (
  'alta',
  'media',
  'baja'
);

-- Create enum for loss reason
CREATE TYPE public.motivo_perdida AS ENUM (
  'precio',
  'sin_medidas',
  'comparando',
  'no_respondio',
  'fuera_zona',
  'plazo_disponibilidad',
  'otro'
);

-- Create the cotizaciones table
CREATE TABLE public.cotizaciones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tenant_id UUID REFERENCES public.tenants(id),
  
  -- Contact info
  nombre TEXT NOT NULL,
  empresa TEXT,
  whatsapp TEXT NOT NULL,
  correo TEXT,
  ciudad TEXT,
  direccion TEXT,
  
  -- Pipeline state
  estado cotizacion_estado NOT NULL DEFAULT 'nuevo',
  estado_anterior cotizacion_estado,
  fecha_cambio_estado TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Source & tracking
  fuente cotizacion_fuente NOT NULL DEFAULT 'manual',
  campana TEXT,
  adset TEXT,
  tags TEXT[] DEFAULT '{}',
  
  -- Priority & values
  prioridad cotizacion_prioridad NOT NULL DEFAULT 'media',
  valor_estimado NUMERIC DEFAULT 0,
  valor_final NUMERIC DEFAULT 0,
  
  -- Key dates
  fecha_primer_contacto TIMESTAMP WITH TIME ZONE,
  fecha_envio_cotizacion TIMESTAMP WITH TIME ZONE,
  proximo_seguimiento TIMESTAMP WITH TIME ZONE,
  ultima_interaccion TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Visit info
  fecha_visita TIMESTAMP WITH TIME ZONE,
  direccion_visita TEXT,
  resultado_visita TEXT,
  ajuste_necesario BOOLEAN,
  
  -- Payment info
  metodo_pago TEXT,
  monto_anticipo NUMERIC,
  comprobante_pago TEXT,
  
  -- Fabrication info
  fecha_inicio_fabricacion TIMESTAMP WITH TIME ZONE,
  fecha_estimada_entrega TIMESTAMP WITH TIME ZONE,
  
  -- Installation info
  fecha_instalacion TIMESTAMP WITH TIME ZONE,
  fotos_entrega TEXT[],
  satisfaccion INTEGER CHECK (satisfaccion >= 1 AND satisfaccion <= 5),
  
  -- Loss reason
  motivo_perdida motivo_perdida,
  motivo_perdida_texto TEXT,
  
  -- Notes
  notas_internas TEXT,
  accion_recomendada TEXT,
  
  -- Link to original lead if converted
  lead_id UUID REFERENCES public.leads(id)
);

-- Create WhatsApp templates table
CREATE TABLE public.plantillas_whatsapp (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tenant_id UUID REFERENCES public.tenants(id),
  nombre TEXT NOT NULL,
  estado_aplicable cotizacion_estado NOT NULL,
  contenido TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  activa BOOLEAN DEFAULT true
);

-- Create activity log for cotizaciones
CREATE TABLE public.cotizaciones_actividad (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  cotizacion_id UUID NOT NULL REFERENCES public.cotizaciones(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  estado_anterior cotizacion_estado,
  estado_nuevo cotizacion_estado,
  usuario TEXT
);

-- Enable RLS
ALTER TABLE public.cotizaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plantillas_whatsapp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cotizaciones_actividad ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cotizaciones
CREATE POLICY "Anyone can view cotizaciones" ON public.cotizaciones FOR SELECT USING (true);
CREATE POLICY "Anyone can insert cotizaciones" ON public.cotizaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update cotizaciones" ON public.cotizaciones FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete cotizaciones" ON public.cotizaciones FOR DELETE USING (true);

-- RLS Policies for plantillas_whatsapp
CREATE POLICY "Anyone can view plantillas" ON public.plantillas_whatsapp FOR SELECT USING (true);
CREATE POLICY "Anyone can insert plantillas" ON public.plantillas_whatsapp FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update plantillas" ON public.plantillas_whatsapp FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete plantillas" ON public.plantillas_whatsapp FOR DELETE USING (true);

-- RLS Policies for cotizaciones_actividad
CREATE POLICY "Anyone can view actividad" ON public.cotizaciones_actividad FOR SELECT USING (true);
CREATE POLICY "Anyone can insert actividad" ON public.cotizaciones_actividad FOR INSERT WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_cotizaciones_updated_at
  BEFORE UPDATE ON public.cotizaciones
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plantillas_updated_at
  BEFORE UPDATE ON public.plantillas_whatsapp
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_cotizaciones_estado ON public.cotizaciones(estado);
CREATE INDEX idx_cotizaciones_proximo_seguimiento ON public.cotizaciones(proximo_seguimiento);
CREATE INDEX idx_cotizaciones_fecha_cambio_estado ON public.cotizaciones(fecha_cambio_estado);
CREATE INDEX idx_cotizaciones_fuente ON public.cotizaciones(fuente);
CREATE INDEX idx_cotizaciones_prioridad ON public.cotizaciones(prioridad);
CREATE INDEX idx_cotizaciones_tenant ON public.cotizaciones(tenant_id);
CREATE INDEX idx_actividad_cotizacion ON public.cotizaciones_actividad(cotizacion_id);