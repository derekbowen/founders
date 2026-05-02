## Goal

Make every footer/header link resolve correctly on the deployed `www.poolrentalnearme.com` domain by:
1. Routing internal TanStack pages through `<Link>` so they SSR + prefetch.
2. Converting absolute `https://www.poolrentalnearme.com/...` legacy links to root-relative paths so they work on production AND preview without hardcoding the apex/www host.

## Confirmed setup

User confirmed: TanStack Start owns `/`, `/blog`, `/blog/$slug`, `/providers`, `/providers/$slug`, `/academy`, `/academy/$slug`, `/pool-rental/$city`, `/category/$slug`, `/l/$slug/$id`. The legacy backend handles everything else (`/signup`, `/s`, `/p/*`, `/terms-of-service`, `/privacy-policy`) on the same www domain.

## Audit + remediation

### `src/components/site-layout.tsx` (header + footer)

- Drop the `const SITE = "https://www.poolrentalnearme.com"` constant.
- Replace every `${SITE}/path` with the bare path `/path` so the link stays on whatever host is serving the page (works on `id-preview-*.lovable.app`, `*.lovable.app`, custom domain, www).
- Replace `<a href="${SITE}/signup">` (CTA button in header) with `<a href="/signup">`.
- Footer columns:
  - **Explore**: keep all as `<a href="/...">` (legacy app paths).
  - **Become a Host**: keep all as `<a href="/...">` (legacy app paths).
  - **Company**: `Blog` already uses `<Link to="/blog">` — leave; the rest become `<a href="/...">`.
  - **Popular Markets**: already uses `<Link to="/pool-rental/$city">` — no change.
  - "All Locations" → `<a href="/s">`.
- Brand logo link in header/footer already uses `<Link to="/">` — no change.

### `src/routes/index.tsx`

- Hero CTA "Find a pool near you" currently hits `https://www.poolrentalnearme.com` (the home of the app itself). Repoint to legacy search: `<a href="/s">Find a pool near you</a>`.
- "List your pool" CTA: `<a href="/signup">`.
- "View all →" link: `<a href="/s">`.
- `sameAs` in JSON-LD organization (line 46): leave as absolute SITE_URL — that's correct for structured data.

### `src/routes/l.$slug.$id.tsx`

- `externalUrl` is the canonical URL emitted in `Product` JSON-LD; leave as `${SITE_URL}/l/...` (absolute is required for schema.org `url` fields). No change.

### `src/routes/pool-rental.$city.tsx`

- The `const SITE` constant is used for what? Let me note: any `${SITE}/...` usages there should follow the same rule — convert to relative for legacy paths, leave absolute only inside JSON-LD `url` fields. Will inspect and fix in implementation.

## Out of scope

- The TanStack-owned `<Link to="/...">` paths (blog, providers, academy, popular markets) already work; not touching them.
- Absolute URLs inside JSON-LD payloads stay absolute (required by spec).
- No new routes, no DB changes.

## Files to touch

- `src/components/site-layout.tsx`
- `src/routes/index.tsx`
- `src/routes/pool-rental.$city.tsx` (only if `${SITE}/...` is used in user-facing links)