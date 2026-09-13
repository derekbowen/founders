# founders monorepo

Two live applications that grew from the same Lovable TanStack Start template.

| Path | Serves | Tracks | Supabase | Package manager |
| --- | --- | --- | --- | --- |
| `apps/founders-click` | founders.click — multi-tenant SEO SaaS for Sharetribe marketplaces | `derekbowen/kindred-ease-space` | `xbxhzinnfhosoztqaaao` | bun |
| `apps/poolrentalnearme` | poolrentalnearme.com — single-tenant pool rental marketplace | this repo | `ptfjspcphskifoseidut` (see open items) | npm |

Neither is a staging copy of the other. See
[docs/REPO-CONSOLIDATION.md](docs/REPO-CONSOLIDATION.md) for the lineage and the
evidence for which code is live where.

## Layout

Each app is self-contained: its own `package.json`, lockfile, `vite.config.ts`,
`wrangler.jsonc` and `supabase/` directory. There is deliberately **no**
`workspaces` field in the root `package.json` — the apps use different package
managers (npm with `package-lock.json`, bun with `bun.lock`), and letting npm
hoist both would invalidate `bun.lock` and change what ships. Install inside the
app you are working on.

```bash
npm run dev:prnm     # poolrentalnearme  (npm, apps/poolrentalnearme)
npm run dev:fc       # founders.click    (bun, apps/founders-click)
```

## Deploys

Only **poolrentalnearme** deploys from this repository, via
`.github/workflows/deploy.yml`, path-filtered to `apps/poolrentalnearme/**`.

**founders.click still deploys from `derekbowen/kindred-ease-space`.** Its
workflows came across nested at `apps/founders-click/.github/workflows/`, where
GitHub ignores them, so this merge changes nothing about how it ships. Hoisting
them before disabling the originals would put two repositories on the same
Cloudflare Worker and run the half-hourly production monitor twice.

Before any deploy, CI runs `scripts/check-worker-names.mjs`, which fails if two
apps declare the same Worker name. Both previously declared `founders-click`.

## Open items

Each changes runtime behaviour and needs a decision:

1. **Cut founders.click's deploy over to this repo** — re-anchor the four
   nested workflows to `apps/founders-click`, disable them in
   `kindred-ease-space`, verify, then retire that repo. Until this happens,
   `kindred-ease-space` remains the source of truth for founders.click and work
   done here will not reach production.
2. **Confirm the Cloudflare domain mapping.** `apps/poolrentalnearme`'s Worker
   was renamed `founders-click` → `poolrentalnearme`. Verify poolrentalnearme.com
   is attached to the Worker this app now publishes.
3. **`apps/poolrentalnearme` names two different Supabase projects.** Its
   `supabase/config.toml` says `ptfjspcphskifoseidut`; its deploy workflow builds
   against `xbxhzinnfhosoztqaaao`. One is wrong.
4. **Stale rebrand values.** That app still sets `SITE_ROOT_DOMAIN` and
   `EMAILIT_SENDER_DOMAIN` to `founders.click` while serving poolrentalnearme.com.
5. **Re-point the Supabase GitHub integration.** It watches the repo-root
   `supabase/` directory, which no longer exists — migrations now live at
   `apps/*/supabase/`. On PR #3 the bot reported "no changes detected in
   `supabase` directory" even though the PR moves every migration, so the
   integration is already blind. Set the directory per app in
   [Project Integrations Settings](https://supabase.com/dashboard/project/xbxhzinnfhosoztqaaao/settings/integrations),
   or migrations will silently stop being picked up.

   Note the integration is connected to `xbxhzinnfhosoztqaaao` — the
   founders.click project — on a repository whose app declares
   `ptfjspcphskifoseidut`. That is the same contradiction as open item 3.
