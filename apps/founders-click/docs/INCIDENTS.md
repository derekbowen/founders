# Incidents

Real production incidents, recorded so their lessons outlive the sessions that
fixed them. Newest first.

---

## 2026-09-14 — Three preflight checks passed without checking anything

**Impact.** No customer-facing outage. The cost was direction: 22 scheduled
re-checks spent waiting for a DNS record that was never required, while the
actual cause of non-delivery went unexamined. Two other gates were silently
inert — one of them the gate that is supposed to prove the Worker has an
EmailIt API key before a deploy ships.

**The false blocker.** `checkSendingDomain()` read SPF at the sending domain
only. founders.click publishes no apex SPF and does not need to: SPF
authenticates the **envelope** sender (MAIL FROM / Return-Path), not the From
header, and EmailIt delegates the envelope to `emailit.founders.click`, which
carries both the bounce MX (`feedback-smtp.ffdc-1.emailit.com`) and
`v=spf1 include:_spf.emailit.com ~all`. DKIM signs with `d=founders.click` and
DMARC (`p=none`, relaxed by default) aligns on that leg — and on the SPF leg
too, since the return path is inside the organisational domain. Mail from this
domain authenticated the whole time the check called it a hard failure.

**Two more of the same shape, both caused by the monorepo move.** Both read a
path that was correct while the app sat at the repo root and wrong afterwards,
and both reported success rather than failing:

| Check | Read | Should read | Result |
| --- | --- | --- | --- |
| `scripts/audit-canonical-urls.ts` | `$PWD/src`, `$PWD/scripts` | its own tree | walked 0 files, printed "0 violations", exit 0 |
| `deploy-founders-click.yml` secrets preflight | `$GITHUB_WORKSPACE/scripts/required-secrets.txt` | `.../apps/founders-click/scripts/...` | awk could not open it, name loops ran 0 times, printed "all required secrets present" |

The second one matters most: it is the check that would fail a deploy whose
Worker has no `EMAILIT_API_KEY`. It has been passing vacuously, so there is no
CI evidence that the running Worker can reach EmailIt at all.

**Resolution.**
1. SPF is now read at the return path when the apex has none — named by
   `EMAILIT_RETURN_PATH_DOMAIN`, or discovered. A guessed candidate must
   prove itself with **both** an MX and an SPF record. Alignment is reported
   separately, because SPF passing is not SPF aligning.
2. The canonical audit resolves from its own location, refuses to report clean
   after scanning zero files, and prints the file count alongside the verdict.
3. The secrets preflight reads the right manifest, fails if it is unreadable
   or parses to zero required names, and no longer exits 0 when
   `wrangler secret list` fails for any reason other than "script not found".
4. The production monitor now asserts deliverability on every run, using the
   app's own checker rather than a second inline copy.

**Lesson.** A check that cannot read its input must fail, never pass. Every
one of these three reported success from a state that carried no information:
an unopenable file, an empty directory walk, a lookup at a name nothing sends
from. "0 violations" is only meaningful next to the number of things examined,
which is why the audit now prints it.

**Where the email diagnosis actually stands** (verified 2026-09-14, live):

| Link in the chain | State | How it was established |
| --- | --- | --- |
| SPF / DKIM / DMARC | correct and complete | authoritative query against the Cloudflare nameservers |
| Hook route deployed | yes | unsigned POST returns 401 `invalid signature`, not 404 |
| `SEND_EMAIL_HOOK_SECRET` on the Worker | present | that 401 is `invalid signature`, not `hook not configured` |
| Signup requires the email | yes | GoTrue `/auth/v1/settings`: `mailer_autoconfirm: false` |
| Signup is open | yes | `disable_signup: false` |
| Google OAuth | live and configured | `/auth/v1/authorize?provider=google` 302s to Google with a real client id |
| Supabase hook URI points here | **unverified** | needs the dashboard, or a real signup |
| `EMAILIT_API_KEY` on the Worker | **unverified** | the CI gate that proves this was inert (above) |
| What EmailIt answers | **unverified** | the hook returns 200 and logs it; nothing else records it |

The last three are what `POST /api/public/ops/email-probe` (with `?send=1`)
answers in one call. It is written and tested but not deployed — the live
Worker is still build `baf9985` (2026-09-02) from the pre-consolidation trunk.

Note that a customer can sign up **today** with Google and never touch the
email path.

---
## 2026-09-01 — Signup down platform-wide (~65 minutes)

**Impact.** Every signup failed with a 500 from Supabase Auth between roughly
06:26 and 07:31 UTC. No existing session, page, or customer-facing surface was
affected — only the creation of new accounts. Zero paying customers existed,
so no revenue impact; had launch already happened this would have been a
customer-facing outage.

**Detection.** The golden-path E2E smoke, run against production for the first
time about an hour after the break. Nothing else noticed: the homepage was
200, the deploy was green, the build-identity check matched, and the
production monitor passed — signup was not on any check.

**Root cause.** The Supabase Auth *send-email hook* pointed at
`https://founders-click.derekbowencorp.workers.dev/lovab…` — a route served
only by the May 2026 build of the Worker, from an app generation whose code
never existed in this repository. That stale Worker had been quietly doubling
as auth-email infrastructure for four months. The first CI deploy
(2026-09-01 06:26 UTC) replaced the script; the route became a 404; GoTrue
treats a failed hook as a failed signup:

```
{"code":"unexpected_failure","message":"Unexpected status code returned from hook: 404"}
```

The only artefact hinting at any of this was a `SEND_EMAIL_HOOK_SECRET` env
entry on the Worker, which — having zero references in the codebase — had been
catalogued as dead configuration.

**Resolution.**
1. Implemented the hook in-repo: `/api/public/hooks/auth-send-email`
   (standard-webhooks signature verification, EmailIt delivery, branded copy
   for all seven GoTrue action types; `src/lib/auth-email-hook.ts` +
   24 unit assertions on the signature boundary).
2. Deployed through the normal pipeline (`1d02524`).
3. Repointed the hook's Endpoint in the Supabase dashboard to the new URL.
   The Worker's existing May-era secret still matched the dashboard's, so no
   secret rotation was needed.
4. Verified by re-running the E2E: signup reaches the confirmation screen.

**Lessons, encoded rather than remembered.**
- *Out-of-repo infrastructure is severed by the first honest deploy.* The fix
  is not more care during deploys; it is that load-bearing endpoints live in
  version control. The hook target now does.
- *"Dead" configuration is a claim, not an observation.* The env entry with
  zero code references was the one thread that led anywhere. Before deleting
  an unreferenced secret, find what consumes it server-side (here: a Supabase
  dashboard setting no grep could see).
- *A monitor only guards what it probes.* Homepage + build identity said
  everything was fine while signup was down. The production monitor now
  probes the hook unauthenticated every 30 minutes: `401 invalid signature`
  is healthy; `404` or `401 hook not configured` alarms as SIGNUP DOWN.
- *The E2E paid for itself in its first hour.* It exists because "deployment
  works" was explicitly not accepted as "product works".

**Residue.**
- The workers.dev URL is no longer load-bearing (hook now targets `www`), so
  disabling that second public endpoint is unblocked — backlog.
- Email *delivery* through EmailIt was not directly proven (the hook returns
  200 on delivery failure by design); a real-inbox signup confirms it.
