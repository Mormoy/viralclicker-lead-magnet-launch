ALTER TABLE public.pipeline_stages ADD COLUMN stage_type text NOT NULL DEFAULT 'normal';
COMMENT ON COLUMN public.pipeline_stages.stage_type IS 'Type of stage: normal, won, or lost';