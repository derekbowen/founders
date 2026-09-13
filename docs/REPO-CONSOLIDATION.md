# Repository consolidation

Four repositories share this product's lineage. This records what was found,
what was merged, and what is deliberately left alone.

## The repositories

| Repository | HEAD | Date | Files | Status |
| --- | --- | --- | --- | --- |
| `derekbowen/founders` | `4564353` | 2026-05-11 | 337 | this repo — serves poolrentalnearme.com |
| `derekbowen/kindred-ease-space-3c1375cd` | `d235db3` | 2026-08-25 | 535 | retired — strict ancestor of the two below |
| `derekbowen/kindred-ease-space-f87fd8a0` | `0289d32` | 2026-08-30 | 578 | **stale sibling** — not deployed |
| `derekbowen/kindred-ease-space` | `baf9985` | 2026-09-02 | 605 | **live** — serves founders.click |

## Which code is actually live

Determined by asking each site, not by inspecting the repos.

`https://founders.click/api/public/edge-health` returns its own build identity:

```json
{"sha":"baf9985e1ada8500bc5bd414f967824b6b13772d","builtAt":"2026-09-02T03:46:32.825Z"}
```

`baf9985` is the HEAD of `kindred-ease-space`. founders.click runs that repo
commit-for-commit.

poolrentalnearme.com answers 200 on `/account/learning`, `/referral` and
`/sitemap-index.xml` — routes that exist only in this repository — while
founders.click 404s all three. So this repo serves poolrentalnearme.com.

**Two live products**, not an old app and its replacement.

## The fork

`kindred-ease-space` and `kindred-ease-space-f87fd8a0` are siblings, not
ancestor and descendant. Both forked from `3c1375cd` at `d235db3`:

```
d235db3  3c1375cd HEAD (2026-08-25)
   ├─→ 0289d32  f87fd8a0            (2026-08-30)  40 commits   stale
   └─→ baf9985  kindred-ease-space  (2026-09-02)  50 commits   LIVE
```

`kindred-ease-space` replays f87fd8a0's work under new SHAs — identical commit
subjects (`Derive marketplace URLs at render`, `Boundary contract: fail-open
edge…`, `Add permanent regression test…`) — then carries a further week of work
on top: the deploy pipelines, production monitoring, public-surface hardening
(security headers, rate limits, JSON-LD escaping, safe redirects), the SEO page
contract, twelve test files, and the fix for the signup outage
(`Signup is down: implement the Supabase send-email hook the cutover orphaned`).

32 files exist in `kindred-ease-space` and not in `f87fd8a0`. Five go the other
way, four of them the `github-sync` admin panel — tooling built to check whether
GitHub had caught up with Lovable, which this consolidation makes obsolete.
`apps/founders-click` therefore tracks `kindred-ease-space`, and those five
files are intentionally not carried over.

`3c1375cd` is retired because it is a strict ancestor of both siblings:
`git merge-base --is-ancestor` is true and `git rev-list` finds 0 commits it
does not already contain.

## How the merge was done

- `apps/poolrentalnearme/` — this repo's app, relocated with `git mv`. Git
  records all 335 files as `R100`, pure renames.
- `apps/founders-click/` — `kindred-ease-space` via `git subtree add`, so its
  history stays reachable. The imported tree is byte-for-byte identical to
  `baf9985`, and that commit is reachable from `HEAD`.

## Deploys are deliberately unchanged

founders.click still deploys from `kindred-ease-space`. Its four workflows
(`deploy-app.yml`, `deploy-edge-worker.yml`, `production-monitor.yml`,
`smoke.yml`) came across nested at `apps/founders-click/.github/workflows/`,
where GitHub ignores them. That is intentional: hoisting them would mean two
repositories deploying the same Cloudflare Worker and two copies of the
half-hourly production monitor.

Cutting founders.click's deploy over to this repository is a separate,
deliberate change — re-anchor those workflows to `apps/founders-click`, disable
the ones in `kindred-ease-space`, then verify — not a side effect of a merge.

Only `apps/poolrentalnearme` deploys from here, via the root `deploy.yml`,
path-filtered to that app.

## The Worker name collision

Both apps declared `"name": "founders-click"`.

Separately that was confusing; in one repository it is dangerous, because two
deploy jobs would publish over the same Worker and the last to run would take
the domain.

It was already a live hazard. This repo auto-deploys on push to `main` under the
name `founders-click`. That Worker serves the founders.click SaaS, which took
the name around 2026-08-30 — after this repo's last push on 2026-05-11. The next
push to `main` would have published the pool rental marketplace over the live
SaaS.

Fixed by renaming this app's Worker to `poolrentalnearme`, and by
`scripts/check-worker-names.mjs`, which CI runs before any deploy.

Renaming changes only which Worker future deploys publish to. It does not move a
custom domain — see the [README](../README.md) open items.
