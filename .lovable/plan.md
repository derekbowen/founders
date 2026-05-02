## Goal

Make the "nearby cities" section on `/pool-rental/$city` always render with real, geographically-nearest internal links — even for single-city states like AK, HI, DC, ME, ND, NH, RI, SD, VT, WV, WY — and ensure those links navigate correctly.

## Why the current behavior breaks

`getNearbyCities` (`src/server/content.functions.ts`) filters by `state_code` only. In states with one published city, the result is an empty array, so the entire `{nearby.length > 0 && ...}` block in `src/routes/pool-rental.$city.tsx` is hidden. The links themselves are correct (`<Link to="/pool-rental/$city" params={{ city: n.slug }}>`), but the section never renders for those cities.

## Approach

Switch nearby cities from "same-state only" to "nearest by great-circle distance," with state as a tie-breaker / preferred bucket. 355 of 358 published cities have lat/lng, so distance ranking is reliable.

### Steps

1. **Database: add a SQL helper for nearest cities.**
   - Create migration `nearby_cities_by_distance(_slug text, _limit int)` — a SECURITY DEFINER function on `public` schema returning `slug, name, state, state_code, distance_km`.
   - Implementation: use the haversine formula in pure SQL against `public.cities` filtered by `is_published = true` and `slug <> _slug`, ordered by distance ascending, limited to `_limit`. Cities without coordinates fall back to `state_code` match with distance set to a large sentinel so they appear last.
   - Grant `EXECUTE` to `anon` and `authenticated` so the server can call it via the admin client without issue. No RLS implications (read-only function over already-public data).

2. **Server: rewrite `getNearbyCities`.**
   - In `src/server/content.functions.ts`, change the handler to:
     - Look up the source city's lat/lng/state_code from `cities`.
     - If lat/lng exist, call the new RPC `nearby_cities_by_distance` with `_slug = data.slug`, `_limit = data.limit ?? 12`.
     - If lat/lng missing, fall back to current same-state query.
     - Return `{ cities: [...] }` with the same shape (`slug, name, state_code`) plus an additional `state` field so the UI can show full state name when useful.
   - Update the Zod input schema (no change needed; `state_code` becomes optional/ignored).

3. **Route: guarantee the section always renders.**
   - In `src/routes/pool-rental.$city.tsx`:
     - Remove the `{nearby.length > 0 && ...}` guard so the section renders unconditionally; render an empty-state line ("More cities coming soon") only if the array is somehow still empty.
     - Update the heading from "Other pool rentals in {state}" to "Nearby pool rentals" since results are no longer state-scoped.
     - Keep the existing `<Link to="/pool-rental/$city" params={{ city: n.slug }}>` usage — it's already type-safe and correct.
     - Group the list into two visual subsections when the data has both same-state and out-of-state matches: "More in {city.state}" first, then "Nearby cities" — partition the array client-side by `n.state_code === city.state_code`.

4. **SEO bonus: add reciprocal link to listings.**
   - No change required, but verify `Breadcrumbs` and the `LocalBusiness` JSON-LD still build correctly after the new data shape. (`state` is already on city; we're only adding `state` to nearby items.)

5. **Verification.**
   - Hit `/pool-rental/<one-city-state-slug>` (e.g. an AK or DC city) via `stack_modern--invoke-server-function` and confirm the rendered HTML contains nearby city anchors with `/pool-rental/...` hrefs.
   - Hit `/pool-rental/los-angeles-ca` and confirm the list is populated with CA cities first (nearest by distance), no duplicates, no self-link.
   - Click a couple of nearby links in the preview to confirm they navigate without 404.
   - Check `stack_modern--server-function-logs` filtered by `getNearbyCities` for any RPC errors.

## Files touched

- New migration: `nearby_cities_by_distance(_slug, _limit)` SQL function.
- `src/server/content.functions.ts` — rewrite `getNearbyCities` handler + extend return shape with `state`.
- `src/routes/pool-rental.$city.tsx` — drop empty-array guard, retitle, optional grouping by state.

No changes to `Link` components are needed — the navigation contract is already correct; this fix is about (a) data availability and (b) unconditional rendering.

## Out of scope

- Changing how listings are fetched.
- Adding nearby-city sections to other surfaces (home, category, listing detail) — can be a follow-up if you want it.
