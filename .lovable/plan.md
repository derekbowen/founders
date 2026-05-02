## Revised plan — use the directory as source of truth

The new page `poolrentalnearme.com/p/all-locations` lists **every city** with its **exact source URL**, eliminating all slug-guessing. It has two URL templates side-by-side:

- `/p/become-a-swimming-pool-host-{city}-{state-code}` (most cities)
- `/p/become-a-pool-host-{city}-{state-name}` (a small set of "premium" cities)

This is much better than what we had — but with two caveats discovered during verification:

1. **A few listed URLs 404** on the live site (e.g. Tucson). The job must record misses, not crash on them.
2. **Hero quality is mixed** on these "become-a-host" pages. Some are city-distinctive (Phoenix → saguaro/desert), others are a generic teal underwater shot reused across many cities (Birmingham, likely most smaller markets).

The previously scraped 5 cities (LA, San Diego, Miami, Austin, KC) used a **different** URL template — `/p/{cityslug}` — which delivered higher-quality, clearly city-specific heroes. Those URLs are NOT on the directory page. The directory only has the host-recruitment pages.

## Recommendation

Use the directory as the **slug-coverage backbone**, and accept mixed hero quality for the long tail. For the ~30 large markets the user cares about most, prefer the rental-page URL when one exists.

### Steps

1. **Harvest the directory once** into a static map.
   - Add a server function `src/server/cities-hero-backfill.functions.ts` → `harvestSourceUrls()` that fetches `/p/all-locations` (plain HTTP, no Firecrawl needed — it's static markdown), extracts every `/p/become-a-(swimming-)?pool-host-...` link, and returns `{ citySlugCandidate → sourceUrl }`.
   - City-name normalization for matching against our DB: strip the trailing `-{state}` suffix from the source URL, lowercase, hyphenate. Match against `cities.slug`.

2. **Manual override map** for the ~30 large markets that have a richer rental-page hero.
   - Hardcoded in the function: `{ 'los-angeles': '/p/losangeles', 'san-diego': '/p/sandiego', 'miami': '/p/miami', 'austin': '/p/austin', 'kansas-city-mo': '/p/kansascity', ... }`.
   - Override always wins over the directory URL.

3. **Backfill function** `backfillCityHeroes({ limit, offset, force })`:
   - Loads cities with `hero_image_url IS NULL` (or all if `force`).
   - For each, resolves source URL: override → directory → null (skip, log).
   - Calls Firecrawl `scrape` with `formats: ['html']`, parses the first `background-image: url(...)` in the hero `<section>`, persists to `cities.hero_image_url`.
   - On 404 / no image: leaves NULL and logs to a `cities_hero_backfill_log` table (slug, source_url, status, error, ran_at) so we can audit and retry.
   - Returns `{ processed, succeeded, skipped, failed }`.

4. **Admin page** `src/routes/admin.cities-heroes.tsx` (already planned):
   - "Run batch of N" button (default 50) → calls the function, shows results table.
   - Lists log rows so the user can see which cities failed and why.
   - Gated by the existing admin role check.

5. **Render-time fallback** in `src/routes/pool-rental.$city.tsx` (already implemented in the prior step): unchanged. Cities that never get a usable scraped hero keep the deterministic Unsplash rotation, which is acceptable for the long tail.

### Technical notes

- The directory page is plain server-rendered markdown — `fetch_website` worked, so the harvest step does NOT need Firecrawl. Saves credits.
- The individual city pages ARE Sharetribe SPAs — those still need Firecrawl with `waitFor: 1500` and HTML format.
- New table `cities_hero_backfill_log` with RLS: only `has_role(auth.uid(), 'admin')` can read; insert is via a security-definer function called from the server function.
- No changes to `pool-rental.$city.tsx` — the previous render-time fallback already handles the "still NULL" case cleanly.

### Out of scope

- Improving image quality for cities where the source page itself uses a generic image. Detecting and rejecting the generic teal-underwater shot would require a perceptual hash check; not worth it for v1.
- Re-scraping cities that already have a hero, unless the user clicks "Force refresh".

### Deliverable

After approval I'll build everything and run the backfill in batches from the admin page (no exec timeout). I'll report final coverage: cities with unique scraped heroes vs. cities falling back to the deterministic rotation.
