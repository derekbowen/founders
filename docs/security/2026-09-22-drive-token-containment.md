# 2026-09-22 — drive-content-generation caller token: exposure and containment

## What was exposed
`apps/poolrentalnearme/supabase/functions/drive-content-generation/index.ts`
compared its caller token against a literal committed in this repository
(commit 4015cb3, 2026-05-04). This repository is public, so the value was
readable from that date. The literal remains in git history; it is now
worthless (see below) and must never be reused.

## What the token authorized
The function was deployed only in Supabase project `xbxhzinnfhosoztqaaao`
(founders-click). It has `verify_jwt=false`; the token was its only gate.
A caller with it could, up to 200 batches of up to 10 rows per call:
release stuck `content_plan` rows, and invoke `generate-content-batch` with
the service-role key, which generates pages through the project's
OpenRouter key and upserts `content_pages` rows as `published` at
`/p/{slug}` and marks `content_plan` rows generated. It could choose the
model (cost amplification). It could not read customer data or write
anything but queued plan rows. No other deployed function accepts it:
`generate-content-batch` requires the service-role key or an admin JWT;
`seed-blog-posts` requires an admin JWT; the eight founders.click
functions reject it (401/400). The project named in this app's
`supabase/config.toml` (`ptfjspcphskifoseidut`) no longer resolves in DNS;
`Prnm-content-production` (`qbzpjsiahqgyoazjurqy`) has no functions.

## Containment (all done 2026-09-22, ~18:15–18:25 UTC)
1. Migration `drive_token_vault_containment` created a replacement token
   inside the database (`gen_random_bytes(32)` → 64 hex chars) in Vault as
   `DRIVE_TOKEN`, plus `public._drive_token()`, a SECURITY DEFINER accessor
   executable only by `service_role`. The value never left the database.
2. `drive-content-generation` redeployed as version 23 from commit c38d74b:
   reads `DRIVE_TOKEN` from its environment, else from Vault through the
   accessor; 503 when neither exists; constant-time comparison.
3. Verified: the exposed value → 401 in header, query string and POST; no
   token → 401; random token → 401; exposed value against every other
   deployed function → 401/400. Replacement value (sent from inside the
   database via pg_net, never printed) → 200 on the driver with zero
   batches, 401 on `generate-content-batch` and `seed-blog-posts`.

## Log review
Function edge logs are retained from about 2026-06-23. Every 24-hour
window from then to 2026-09-22 18:40 UTC was queried for this function:
zero invocations apart from the verification calls above (Anthropic egress
IPs, curl, 401) and one pg_net call (200). Database evidence: `content_plan`
and `content_pages` hold zero rows, so even a call would have found an
empty queue and done nothing.

## Can unauthorized use be ruled out?
Not for 2026-05-04 → 2026-06-22: no logs exist for that period. Nothing in
the database suggests the driver ever produced anything, but absence of
rows is not proof of absence of calls. From 2026-06-23 onward it is ruled
out by the logs.

## Operator notes
The current token is in Supabase → Vault (`DRIVE_TOKEN`). Prefer the
`x-driver-token` header; query strings are recorded in edge logs.
