## Goal

Add a prominent "pardon our dust" notice to the homepage so the wave of incoming traffic understands we're rebuilding the front-end (replacing the old Sharetribe template) and isn't confused by anything that looks half-finished.

## What you'll see

A new banner section pinned to the very top of the homepage (above the hero), with:

- Small eyebrow label: **Heads up**
- Headline: **Pardon our dust — we're rebuilding the whole experience**
- 2–3 sentences in your voice explaining what's happening, e.g.:
  > We're ripping out the old booking front-end and replacing it with something built specifically for pool hosts and the people who actually book them. New search, new host tools, new everything. If a page looks rough or a link goes somewhere weird over the next few weeks, that's why.
  >
  > The 5,100+ city pages, the host playbooks, and the booking flow all still work — we're just upgrading the chassis underneath them.
- Two CTAs side by side:
  - **Browse pools** → `/s` (relative, hits Sharetribe through the proxy)
  - **List your pool** → `/l/draft/00000000-0000-0000-0000-000000000000/new/details`
- Subtle dismiss "×" that hides the banner for that visitor (localStorage key `prnm_dust_banner_dismissed_v1`), so repeat traffic isn't nagged.

Style: warm sand/amber background (`bg-amber-50`, `border-b border-amber-200`, dark amber text) so it reads as a friendly notice, not an error. Sentence case, no em dashes, no banned words. Mobile: stacks vertically, CTAs full-width.

## Where it lives

- New component: `src/components/dust-banner.tsx` — self-contained, client-only dismiss logic via `useEffect` + `useState` so it doesn't hydration-mismatch (renders visible on SSR, hides after mount if dismissed).
- Mounted at the very top of `HomePageInner` in `src/components/home-page.tsx`, above the hero block.
- Wrapped in `<ErrorBoundary silent>` so a banner crash can never take the homepage down (defensive rendering rule).

Only the homepage gets it for now. The `/p/*` content pages stay clean since most of that traffic lands from Google on a specific topic and the banner would be noise.

## Copy — please confirm or tweak

Default headline + body above is my best guess at your voice. If you want it sharper (e.g. lean harder into "Swimply is scared, here's what we're building") say the word and I'll adjust before shipping. Otherwise I'll go with the version above.

## Out of scope

- No changes to the hero, listings grid, FAQs, or any `/p/*` page.
- No backend, DB, or sitemap changes.
- Not touching `vite.config.ts`, asset paths, or routing.