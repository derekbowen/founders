## Goal

Replace the current Sharetribe Integration API Client ID with a new one and confirm city pages (e.g. `/pool-rental/los-angeles-ca`) actually render live pool listings instead of an empty grid.

## Background

- `src/server/sharetribe.server.ts` already targets the Integration API (`flex-integ-api.sharetribe.com`, `client_credentials` + `scope=integ`) using `SHARETRIBE_CLIENT_ID` and `SHARETRIBE_CLIENT_SECRET`.
- The currently published worker is running an older build that references `getAnonymousToken` / `marketplaceGet` and is failing — that's why the city grid is empty in production. A fresh deploy with the updated secret will replace it with the Integration API code.
- All listing surfaces (home, `/category/$slug`, `/pool-rental/$city`, `/l/$slug/$id`) already flow through `searchListings` / `fetchListing` in this file, so no other code paths need changes.

## Steps

1. **Prompt for the new Client ID**
   - Use `add_secret` for `SHARETRIBE_CLIENT_ID` so you can paste the new Integration API client_id securely.
   - Leave `SHARETRIBE_CLIENT_SECRET` and `SHARETRIBE_MARKETPLACE_URL` as-is (you didn't indicate they changed). If the new app is a different Integration app, we'll re-prompt for the secret in step 4 if auth fails.

2. **Sanity-check `sharetribe.server.ts`**
   - No code change expected. Just confirm `getClientId` / `getClientSecret` read from `process.env` inside the handler path (they do), so the new value is picked up without a code edit.

3. **Verify Integration API auth and listings**
   - Add a temporary internal-only diagnostic server route at `src/routes/api/_sharetribe-check.ts` that:
     - Calls `searchListings({ perPage: 3 })`.
     - Returns `{ ok, total, sample: listings.map(l => ({ id, title, city, state })) }` as JSON.
     - Guarded by a header check (`x-debug-token` matching a constant we set, or simply gated to non-published `import.meta.env.DEV`-style check via `process.env.NODE_ENV !== "production"` is unreliable in Workers — we'll use a header token).
   - Invoke it via `stack_modern--invoke-server-function` with the header. Inspect:
     - Token request returns 200 (no `Sharetribe auth failed [401]`).
     - `total` > 0 and at least one `title` comes back.

4. **If auth fails (401/403)**
   - Most likely cause: the new Client ID belongs to an Integration app whose secret is different. Re-prompt with `add_secret` for `SHARETRIBE_CLIENT_SECRET`.
   - Re-run the diagnostic route until it returns listings.

5. **Verify city grid end-to-end**
   - Invoke `/pool-rental/los-angeles-ca` (and one more city) via `stack_modern--invoke-server-function`.
   - Confirm the returned HTML contains listing card markup (titles / prices), not just the empty-state message.
   - Tail `stack_modern--server-function-logs` filtering by `sharetribe` to confirm no errors.

6. **Clean up**
   - Delete `src/routes/api/_sharetribe-check.ts` once verified so the diagnostic isn't shipped.

## Deliverable

- New `SHARETRIBE_CLIENT_ID` saved in Cloud secrets.
- Confirmation message stating that auth succeeded, how many listings the Integration API returned, and that the city page now renders pool cards. No lingering diagnostic routes in the repo.
