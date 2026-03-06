-- Allow anonymous insert into pipeline_deals from quote pages
CREATE POLICY "Anyone can insert pipeline deals from quotes"
ON public.pipeline_deals
FOR INSERT
TO anon, authenticated
WITH CHECK (true);