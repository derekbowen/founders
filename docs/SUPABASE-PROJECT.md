# Which Supabase project backs this app

**Answer: `xbxhzinnfhosoztqaaao`.** It is the only live project, and the only
one the migrations in `supabase/migrations/` have ever been applied to.

Resolved 2026-09-13. Before this, the repo named two different projects:

| Reference | Value (before) |
| --- | --- |
| `supabase/config.toml` → `project_id` | `ptfjspcphskifoseidut` |
| `.github/workflows/deploy.yml` → `VITE_SUPABASE_URL` / `VITE_SUPABASE_PROJECT_ID` | `xbxhzinnfhosoztqaaao` |

`supabase/config.toml` was the stale one and was corrected to
`xbxhzinnfhosoztqaaao`. The deploy workflow was already right and was left
alone.

## Why

1. **`ptfjspcphskifoseidut` no longer exists.** `ptfjspcphskifoseidut.supabase.co`
   does not resolve in DNS at all (`NXDOMAIN`). Supabase keeps DNS records for
   *paused* projects, so this is a deleted project, not a dormant one. Nothing
   can have been applied to it recently, and nothing can read or write it now.

2. **`xbxhzinnfhosoztqaaao` holds the full migration lineage.** Its REST API
   returns `200` for tables created by both the oldest and the newest
   migrations in this repo:
   - earliest (May 2 2026): `providers`, `cities`, `blog_posts`
   - newest, `20260510120000_saas_workspaces_and_billing.sql`: `workspaces`,
     `workspace_members`, `customer_subscriptions`

   `content_pages` returns `42501 permission denied` — the table exists, it is
   just not granted to `anon`. A genuinely absent table returns `404 PGRST205`
   (verified against a control name).

   So the migrations have been applied to `xbxhzinnfhosoztqaaao` and **only**
   to `xbxhzinnfhosoztqaaao`. This is the decisive signal.

3. **Production already calls it.** The live client bundle at
   `https://www.founders.click/assets/index-*.js` contains
   `https://xbxhzinnfhosoztqaaao.supabase.co`. The string
   `ptfjspcphskifoseidut` appears nowhere in the deployed bundle.

## What `project_id` affects

`supabase/config.toml` is not read by the app at runtime — the client resolves
its project from `VITE_SUPABASE_URL` (`src/integrations/supabase/client.ts`)
and the server client from `SUPABASE_URL` (`client.server.ts`), both supplied
by the environment. `project_id` is used by the **Supabase CLI**, for
`supabase link`, `db push`, and `functions deploy`. Pointing at a deleted
project meant those commands could not work; no runtime traffic was affected,
which is why the mismatch went unnoticed.

## Note on poolrentalnearme.com

This repo does **not** deploy poolrentalnearme.com. `wrangler.jsonc` deploys a
Cloudflare Worker named `founders-click` with `SITE_ROOT_DOMAIN=founders.click`,
and `founders.click` is served by Cloudflare. `poolrentalnearme.com` is served
by nginx and its pages reference no Supabase project at all — it is a separate,
older deployment.

`ptfjspcphskifoseidut` is residue from this repo's origin as the pool-rental
site, before it was rebranded in place into the founders.click SaaS.
