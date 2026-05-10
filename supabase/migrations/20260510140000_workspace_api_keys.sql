-- Per-workspace BYOK (Bring Your Own Key) for external AI / scrape integrations.
--
-- Customers on Growth+ plans can store their own OpenRouter and Firecrawl keys
-- so their AI calls don't run on founders.click's shared API quotas. The PRNM
-- internal workspace falls back to env vars and never needs a stored key.
--
-- Security model: RLS blocks anon + authenticated entirely; access is
-- exclusively via supabaseAdmin (service-role key), server-side only.

CREATE TABLE IF NOT EXISTS public.workspace_api_keys (
  id          uuid      PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid     NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  provider    text      NOT NULL CHECK (provider IN ('openrouter', 'firecrawl', 'openai')),
  api_key     text      NOT NULL,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now(),
  UNIQUE (workspace_id, provider)
);

ALTER TABLE public.workspace_api_keys ENABLE ROW LEVEL SECURITY;
-- Deny direct client access; all reads/writes go through supabaseAdmin.
REVOKE ALL ON public.workspace_api_keys FROM anon, authenticated;
