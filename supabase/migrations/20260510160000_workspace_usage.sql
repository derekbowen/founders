-- Per-workspace monthly usage counters. One row per (workspace, year_month).
-- Counts are incremented atomically via the increment_workspace_usage RPC so
-- concurrent generations don't race each other.

CREATE TABLE IF NOT EXISTS public.workspace_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  year_month text NOT NULL,
  page_generations integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, year_month)
);

CREATE INDEX IF NOT EXISTS idx_workspace_usage_ws ON public.workspace_usage(workspace_id, year_month);

ALTER TABLE public.workspace_usage ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.workspace_usage FROM anon, authenticated;

-- Atomic upsert + increment. Returns the new count.
CREATE OR REPLACE FUNCTION public.increment_workspace_usage(
  p_workspace_id uuid,
  p_year_month text,
  p_delta integer DEFAULT 1
) RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  INSERT INTO public.workspace_usage (workspace_id, year_month, page_generations)
  VALUES (p_workspace_id, p_year_month, p_delta)
  ON CONFLICT (workspace_id, year_month) DO UPDATE
    SET page_generations = public.workspace_usage.page_generations + p_delta,
        updated_at = now()
  RETURNING page_generations INTO new_count;
  RETURN new_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.increment_workspace_usage(uuid, text, integer) FROM anon, authenticated;
