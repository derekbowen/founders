-- Domain verification for customer workspaces.
--
-- Customers point yourdomain.com/p/* at founders.click via reverse-proxy.
-- Before we serve content for that domain, the customer has to prove they
-- own it by setting a TXT record at _founders-verify.<domain> matching the
-- token we issue. workspace_for_host() (used by /p/$slug) only matches
-- verified domains in production.
ALTER TABLE public.workspaces
  ADD COLUMN IF NOT EXISTS domain_verification_token text;

-- Tighten host resolution: only verified domains (or internal workspaces)
-- match. Internal workspaces (PRNM, etc.) skip verification because they're
-- founders.click's own data.
CREATE OR REPLACE FUNCTION public.workspace_for_host(_host text)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH normalized AS (
    SELECT lower(regexp_replace(regexp_replace(_host, ':\d+$', ''), '^www\.', '')) AS h
  )
  SELECT id
    FROM public.workspaces, normalized
   WHERE marketplace_domain = normalized.h
     AND (is_internal OR domain_verified_at IS NOT NULL)
   LIMIT 1;
$$;
