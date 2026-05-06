# Competitor Radar — Quality fix + Conversion engine

You're right. Right now the matcher is regex-grepping any 10-digit string and shipping it as a "phone." Before we spend another dollar on PDL or BatchData, we plug the leak. Then we layer on the conversion machinery.

I'm proposing this in phases so you can ship #1 today and approve the rest piece by piece.

## Phase 1 — Stop the garbage (ship today)

Goal: every card on the matches tab is either a real lead or it's gone.

**1a. Phone validation in `host-matcher.server.ts`**
- Replace the raw `PHONE_RE` capture with a validator that:
  - normalizes to 10 digits (strip +1, parens, spaces, dashes)
  - rejects if the 10-digit string appears inside a URL path, query string, or product SKU context (look at the surrounding 40 chars in source markdown — if it's wrapped in `/`, `?`, `=`, `sku`, `id=`, `product`, kill it)
  - rejects if area code is not in the NANP valid-area-code list (we ship a small static set)
  - rejects if the central office code starts with 0 or 1
  - rejects obvious sequential/repeated patterns (1234567890, 5555555555)
- Same hardening for emails: reject anything matching `noreply|no-reply|support@|info@|hello@|contact@` unless first-name match is strong, and reject any email whose domain is on a stoplist of marketplaces, CDNs, analytics vendors.

**1b. Confidence floor + review queue**
- DB: add a `review` status to `competitor_host_matches` (already free-text — just use it).
- Anything < 85 confidence is inserted as `status = 'review'`, not `'new'`.
- Matches tab gets a 5th filter chip: `review`. Default tab stays `new` so you only see the high-quality ones. Review queue is for when you want to spot-check.
- Bump the matcher's Gemini prompt to require BOTH a name match AND a city match for ≥85, OR a verified email/phone overlap.

**1c. Domain stoplist for candidate websites**
- Reject candidate URLs from: jansport.com, coupang.com, ebay, amazon, alibaba, etsy, pinterest, reddit (unless it's a profile), any `*.shop`, any URL with `/product/`, `/dp/`, `/itm/`, `/sku/`. These keep showing up because Gemini sees a number match and rolls with it.

**1d. Block enrichment on garbage**
- `enrichHostMatch` already gates on confidence ≥ 85 for Tier 2. Add the same gate for Tier 1, plus a hard refusal if the candidate has zero validated emails, zero validated phones, AND no first-name match. No more burning $0.10 on a JanSport result.

## Phase 2 — Conversion machine (ship this week)

Goal: "contacted" actually does something. Brandon doesn't think; the system tells him who to call.

**2a. Personalized landing pages**
- New route: `src/routes/migrate-from-$source.$firstname.tsx` (e.g. `/migrate-from-swimply/sarah-h7k2`).
- Slug is `firstname + 4-char hash of match_id` so it's unguessable but shareable.
- Server function pulls the match row + scraped listing markdown + photos and renders:
  - "Hey {first name} — we'll rebuild your {city} listing in 10 minutes"
  - Photo strip from their actual scraped listing
  - Side-by-side fee comparison (10% vs Swimply 15%)
  - Single CTA → `/l/draft/.../new/details`
- Each match row gets a `landing_slug` column. Generated lazily on first "contacted" action.
- The matches card grows a "Copy landing URL" button.

**2b. Brandon view**
- New tab on the radar page: "Today's call list."
- Server-side ranks `new` + enriched matches by:
  - revenue_signal_score (already computed)
  - × city demand multiplier (count of `pool_waitlist` rows in that city in last 30 days)
  - × recency boost (newer first_seen = hotter)
- Top 10. Shown as a numbered list with phone, email, landing URL, evidence, "mark contacted" button.
- One screen, no thinking.

**2c. Status → action wiring**
- "Mark contacted" fires a server function that:
  - generates the personalized landing URL (if not already)
  - logs the contact to a new `host_outreach_log` table (timestamp, channel, slug, user_id who clicked the button)
  - sets `status = contacted`
- We DO NOT auto-send SMS/email yet. See legal below. The button just preps everything Brandon then sends manually from his own inbox/phone — that's the safe path for now.

## Phase 3 — Signal upgrades (next sprint)

**3a. Price-drop tracker**
- New table `competitor_price_history` (competitor_url_id, price, captured_at).
- Daily scan re-scrapes any URL we've matched, extracts price (already parsing in `scoreRevenueSignal`), inserts a row.
- If price drops twice in 30 days → flag match with `🔥 ripe to switch` badge + bump it to top of Brandon view.

**3b. Giggster + Peerspace data extraction**
- Sitemaps already tracked. Add their detail-page extractors to the matcher. Same flow.

**3c. "What's new" pSEO loop**
- New route: `/p/whats-new/$city.tsx`.
- Server function aggregates competitor_urls discovered in the last 7 days for that city.
- "23 new pool listings added this week in Phoenix — here's what hosts are charging."
- Sitemap entry auto-published. Self-feeding pSEO.

**3d. Public "Swimply Refugee" counter**
- Tiny widget on homepage: "X hosts switched this month." Pulls `count(*) where status='converted' and updated_at > now() - 30d`.
- Wrapped in error boundary; falls back to nothing if query fails.

## Phase 4 — Legal cover (before any outbound automation)

I'm not building auto-SMS or auto-email until this is settled. The TCPA exposure is real ($1,500/text), and after the C&D you've already gotten, Swimply's lawyers will pattern-match anything that looks like systematic poaching.

What I recommend BEFORE phase 2c becomes "auto-send":
- Run the outreach copy + flow past an actual IP/employment attorney (1-hour consult, ~$300).
- Outreach must be educational ("hosts in your area pay 10% vs 15%"), CAN-SPAM compliant footer, single-click unsubscribe, no SMS without express written consent.
- Only contact emails the host published themselves on the listing. Skip-traced contacts get a redder line — those go to Brandon's manual queue, not any automation.

## Technical details

Files I'll touch in phase 1:
- `src/server/host-matcher.server.ts` — add `validateUSPhone`, `validateEmail`, surrounding-context check, reject noisy candidates before insert
- `src/server/contact-enricher.server.ts` — gate Tier 1 on validated contacts, not just address presence
- `src/routes/admin.competitor-radar.tsx` — add `review` status chip, default to `new` only
- `src/server/admin-weapons.functions.ts` — add `review` to the status type union
- One small migration: nothing schema-wise needed for phase 1 (status column is text); we'll add `landing_slug` and `host_outreach_log` in phase 2

Phase 1 ships in one pass. Phase 2 needs a migration + new route. Phase 3 is its own batch.

## What I need from you

Pick one:
1. **Just ship phase 1** (quality fix) and we re-evaluate after you see clean cards.
2. **Phase 1 + 2** (quality + landing pages + Brandon view, no auto-send).
3. **All of it including phase 4** (you've already got the attorney lined up).

My recommendation: option 2. Phase 1 unblocks you immediately, phase 2 makes Brandon dangerous, phase 3 and the auto-send wait until you've validated the manual flow converts.
