## Goal

Make the SSR footer in `SiteLayout` visually and structurally match the live `poolrentalnearme.com` footer, so every route renders the same footer the user sees in production.

## What's already correct

The current `SiteFooter` in `src/components/site-layout.tsx` already has the right **content**:

- 4 columns with matching titles ("Explore", "Become a Host", "Company", "Popular Markets") and identical link labels in the same order.
- Same Popular Markets list (LA, San Diego, Riverside, Sacramento, Tampa, Scottsdale, Nashville, Katy) plus "All Locations".
- Same 7 social icons (Facebook, X, YouTube, LinkedIn, Instagram, TikTok, Pinterest).
- Same phone (888-940-4247), hours (10am - 5pm PST), email (support@poolrentalnearme.com), copyright (PRNM CORP, Riverside, CA 92509).
- Footer is already imported by `__root.tsx` via `SiteLayout`, so every route that uses `<SiteLayout>` gets it under SSR. Verified all 11 route files use it.

## What needs to change

Pure visual/markup adjustments to match the live layout (verified via headless screenshot):

### 1. Brand block (left column)

- Replace circular SVG icon + "Pool Rental Near Me" text with **just the logo image** (`src/assets/logo.png`, already in the project from the earlier logo task) — the live site shows logo only, no wordmark next to it.
- Sizing: `h-14 w-auto`.

### 2. Contact line formatting

- Render call info on **one line** as it appears live: `Call us 888-940-4247 10am - 5pm PST` (phone is the link, hours follow inline in muted color).
- Email stays on its own line below.
- Drop the `block` on hours; use inline `<span className="text-muted-foreground">`.

### 3. Copyright line

- Live: `© 2026 PRNM CORP Riverside, Ca 92509` (space-separated, "Ca" not "CA", no `·`).
- Update string to: `© {year} PRNM CORP Riverside, Ca 92509`.
- Remove the `border-t` divider above it (live site has no divider — just spacing).

### 4. Column proportions

- Live layout gives the brand block more horizontal room and the link columns are tighter. Switch grid to `lg:grid-cols-12` with `lg:col-span-3` for brand and `lg:col-span-2` (already used) for each of the 4 link columns plus a small gap. This is already the structure — only ensure the brand column doesn't grow on the wordmark removal (remove the `inline-flex items-center gap-2` wrapper since there's no longer a side-by-side icon+text).

### 5. Link column titles

- Live uses bolder, slightly larger column headings. Change `text-sm font-semibold` → `text-base font-semibold` in `FooterColumn` and the inline Popular Markets heading.

### 6. SSR/no behavior changes

- All hrefs stay as-is (legacy backend handles `/p/*`, `/s`, `/signup`; TanStack handles `/blog`, `/academy`, `/pool-rental/$city`, `/category/$slug`).
- Footer remains a server-rendered React component inside `__root.tsx`'s shell — no client-only conditionals, no `useEffect` — so it appears identically on every SSR page.

## Files to edit

- `src/components/site-layout.tsx` — `SiteFooter` brand block, contact lines, copyright, and `FooterColumn` heading size.

## Out of scope

- Header (separate concern; logo there was already updated).
- Adding new links or columns (live and current already align).
- Restyling link hover colors or fonts beyond the heading size bump.

Approve to implement.