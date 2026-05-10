-- ─────────────────────────────────────────────────────────────────────────────
-- SaaS phase 1: workspaces + per-customer subscriptions
--
-- Background: founders.click is being packaged for sale to Sharetribe
-- marketplace operators. Each customer = one Sharetribe marketplace, served
-- via reverse-proxy: their-domain.com/p/* -> founders.click/p/*. founders.click
-- looks at the incoming Host header, resolves it to a workspace, and serves
-- THAT workspace's content_pages.
--
-- Today there's exactly one tenant: "Pool Rental Near Me" (PRNM). All
-- existing content_pages / cities / categories / providers / blog_posts rows
-- belong to it. This migration:
--   1. creates workspaces / workspace_members / customer_subscriptions
--   2. seeds the PRNM workspace + makes every existing user_roles.admin a
--      member of it (so the founders.click team keeps its current access)
--   3. backfills workspace_id on content_pages
--
-- Other content tables (cities/categories/providers/blog_posts) are NOT
-- backfilled in this migration — they're rendered on founders.click itself
-- (the marketing+directory site), not via the /p/ proxy. Multi-tenancy for
-- those tables is a later phase.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TYPE public.app_plan AS ENUM ('starter', 'growth', 'scale', 'enterprise');

CREATE TYPE public.subscription_status AS ENUM (
  'trialing',
  'active',
  'past_due',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'unpaid',
  'paused'
);

CREATE TYPE public.workspace_role AS ENUM ('owner', 'editor');

-- ─── workspaces ─────────────────────────────────────────────────────────────
CREATE TABLE public.workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  -- Customer's Sharetribe marketplace domain (apex). Used to resolve incoming
  -- /p/* reverse-proxy traffic back to the right workspace.
  marketplace_domain text UNIQUE,
  domain_verified_at timestamptz,
  -- Owner is the user who created the workspace; convenience pointer in
  -- addition to workspace_members.
  owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  plan public.app_plan NOT NULL DEFAULT 'starter',
  -- Mirror of customer_subscriptions.status for cheap reads on the hot path.
  subscription_status public.subscription_status NOT NULL DEFAULT 'trialing',
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  -- "Internal" workspaces are seeded ones (e.g. PRNM, founders.click itself).
  -- Used to bypass plan gating for the founders.click team.
  is_internal boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_workspaces_owner ON public.workspaces(owner_user_id);
CREATE INDEX idx_workspaces_domain ON public.workspaces(marketplace_domain);
CREATE INDEX idx_workspaces_stripe_customer ON public.workspaces(stripe_customer_id);

ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- ─── workspace_members ──────────────────────────────────────────────────────
CREATE TABLE public.workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.workspace_role NOT NULL DEFAULT 'editor',
  invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, user_id)
);

CREATE INDEX idx_wm_user ON public.workspace_members(user_id);
CREATE INDEX idx_wm_workspace ON public.workspace_members(workspace_id);

ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- ─── customer_subscriptions ─────────────────────────────────────────────────
-- Source-of-truth for billing state, written by the Stripe webhook. The
-- workspace row mirrors plan/status/trial_ends_at for fast reads.
CREATE TABLE public.customer_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL UNIQUE REFERENCES public.workspaces(id) ON DELETE CASCADE,
  stripe_customer_id text NOT NULL,
  stripe_subscription_id text UNIQUE,
  stripe_price_id text,
  plan public.app_plan NOT NULL,
  status public.subscription_status NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_ends_at timestamptz,
  canceled_at timestamptz,
  -- Last Stripe event we processed; lets the webhook be idempotent.
  last_event_id text,
  last_event_at timestamptz,
  raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_cs_stripe_customer ON public.customer_subscriptions(stripe_customer_id);
CREATE INDEX idx_cs_status ON public.customer_subscriptions(status);

ALTER TABLE public.customer_subscriptions ENABLE ROW LEVEL SECURITY;

-- ─── helper functions ───────────────────────────────────────────────────────

-- Is this user a member of this workspace (any role)?
CREATE OR REPLACE FUNCTION public.is_workspace_member(_workspace_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_id = _workspace_id AND user_id = _user_id
  );
$$;

-- Owner check.
CREATE OR REPLACE FUNCTION public.is_workspace_owner(_workspace_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_id = _workspace_id AND user_id = _user_id AND role = 'owner'
  );
$$;

-- Resolve a request hostname to a workspace_id. Strips port + leading "www.".
-- Returns NULL if no match.
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
  SELECT id FROM public.workspaces, normalized
  WHERE marketplace_domain = normalized.h
  LIMIT 1;
$$;

-- ─── RLS policies ───────────────────────────────────────────────────────────

-- workspaces: members read; owners update; super-admins full access.
CREATE POLICY "Members can read their workspaces"
  ON public.workspaces FOR SELECT
  TO authenticated
  USING (public.is_workspace_member(id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Owners can update their workspace"
  ON public.workspaces FOR UPDATE
  TO authenticated
  USING (public.is_workspace_owner(id, auth.uid()))
  WITH CHECK (public.is_workspace_owner(id, auth.uid()));

CREATE POLICY "Admins manage workspaces"
  ON public.workspaces FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- workspace_members: a user can read their own membership rows; owners
-- and super-admins can manage.
CREATE POLICY "Users can read their memberships"
  ON public.workspace_members FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_workspace_member(workspace_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Owners manage members"
  ON public.workspace_members FOR ALL
  TO authenticated
  USING (public.is_workspace_owner(workspace_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.is_workspace_owner(workspace_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));

-- customer_subscriptions: members read; only service role / super-admin write
-- (the Stripe webhook bypasses RLS via service role).
CREATE POLICY "Members can read their subscription"
  ON public.customer_subscriptions FOR SELECT
  TO authenticated
  USING (public.is_workspace_member(workspace_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage subscriptions"
  ON public.customer_subscriptions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at triggers
CREATE TRIGGER trg_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_customer_subscriptions_updated_at
  BEFORE UPDATE ON public.customer_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ─── seed: PRNM workspace + founders.click team membership ──────────────────

INSERT INTO public.workspaces (slug, name, marketplace_domain, plan, subscription_status, is_internal)
VALUES (
  'pool-rental-near-me',
  'Pool Rental Near Me',
  'poolrentalnearme.online',
  'enterprise',
  'active',
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Every current super-admin (user_roles.role = 'admin') becomes an OWNER of
-- the PRNM workspace. This keeps the founders.click team's existing access to
-- the live admin tooling while phase 1 lands.
INSERT INTO public.workspace_members (workspace_id, user_id, role)
SELECT w.id, ur.user_id, 'owner'
FROM public.workspaces w
CROSS JOIN public.user_roles ur
WHERE w.slug = 'pool-rental-near-me'
  AND ur.role = 'admin'
ON CONFLICT (workspace_id, user_id) DO NOTHING;

-- ─── content_pages: add workspace_id, default to PRNM, then NOT NULL ────────

ALTER TABLE public.content_pages
  ADD COLUMN IF NOT EXISTS workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE;

UPDATE public.content_pages cp
   SET workspace_id = w.id
  FROM public.workspaces w
 WHERE w.slug = 'pool-rental-near-me'
   AND cp.workspace_id IS NULL;

ALTER TABLE public.content_pages
  ALTER COLUMN workspace_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_content_pages_workspace ON public.content_pages(workspace_id);
-- url_path is unique within a workspace, not globally — different customers
-- will have their own /p/hosting page.
CREATE UNIQUE INDEX IF NOT EXISTS uq_content_pages_workspace_url
  ON public.content_pages(workspace_id, url_path);

-- Public can read PUBLISHED rows of any workspace — they're served via the
-- reverse-proxy. The /p/$slug route additionally filters by workspace_id
-- resolved from the incoming host header.
DROP POLICY IF EXISTS "Public can read published content pages" ON public.content_pages;
CREATE POLICY "Public can read published content pages"
  ON public.content_pages FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Workspace members can read all rows in their workspace (drafts included).
CREATE POLICY "Members can read their workspace content pages"
  ON public.content_pages FOR SELECT
  TO authenticated
  USING (public.is_workspace_member(workspace_id, auth.uid()));

-- (The original "Admins manage content pages" policy from
-- 20260503050446 stays in place — super-admins keep full access.)
