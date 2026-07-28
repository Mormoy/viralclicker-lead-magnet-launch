-- Atribución de campañas: de qué anuncio viene cada registro.
-- Lo usa el formulario de la landing del nicho (/restauracion), que captura
-- los utm_* de la URL del anuncio de Meta y los guarda junto al lead.
-- Sin estas columnas el lead igual se guarda (el front cae a un fallback que
-- deja la campaña en `mensaje`), pero no se puede reportar por campaña.

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS utm_source   text,
  ADD COLUMN IF NOT EXISTS utm_medium   text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_term     text,
  ADD COLUMN IF NOT EXISTS utm_content  text,
  ADD COLUMN IF NOT EXISTS landing_page text;

COMMENT ON COLUMN public.leads.utm_campaign IS 'Campaña de Meta que trajo el lead (capturada en la URL de la landing)';
COMMENT ON COLUMN public.leads.landing_page IS 'Landing donde se registró (ej: /restauracion)';

-- Reportes por campaña: "qué anuncio trajo clientes este mes".
CREATE INDEX IF NOT EXISTS leads_utm_campaign_idx
  ON public.leads (utm_campaign)
  WHERE utm_campaign IS NOT NULL;
