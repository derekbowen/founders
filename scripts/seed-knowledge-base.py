"""
Seed the founders.click help_categories + help_articles tables with a real
knowledge base. Idempotent — uses ON CONFLICT (slug) to upsert, so it's
safe to re-run when copy changes.

Run with the Supabase access token already in env, OR pass --token=...
"""
import json
import os
import sys
import urllib.request
import urllib.error

PROJECT_REF = os.environ.get("SUPABASE_PROJECT_REF", "xbxhzinnfhosoztqaaao")
TOKEN = os.environ.get("SUPABASE_ACCESS_TOKEN")
if not TOKEN:
    sys.stderr.write(
        "ERROR: SUPABASE_ACCESS_TOKEN env var is required.\n"
        "Get a Personal Access Token at https://supabase.com/dashboard/account/tokens\n"
    )
    sys.exit(1)


def run_sql(sql: str) -> str:
    body = json.dumps({"query": sql}).encode()
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query",
        data=body,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "curl/8.0.0",
        },
    )
    try:
        return urllib.request.urlopen(req).read().decode()
    except urllib.error.HTTPError as e:
        return f"HTTPError {e.code}: {e.read().decode()[:500]}"


# ─── Categories ─────────────────────────────────────────────────────────────
CATEGORIES = [
    {
        "slug": "getting-started",
        "name": "Getting Started",
        "description": "Set up founders.click and ship your first 100 pages in under an hour.",
        "icon": "Rocket",
        "sort_order": 1,
    },
    {
        "slug": "dashboard",
        "name": "Dashboard",
        "description": "Read the morning command center and act on AI-ranked priorities.",
        "icon": "LayoutDashboard",
        "sort_order": 2,
    },
    {
        "slug": "content-tools",
        "name": "Content Tools",
        "description": "Generate, edit, and bulk-import marketplace pages.",
        "icon": "Wand2",
        "sort_order": 3,
    },
    {
        "slug": "seo-tools",
        "name": "SEO Tools",
        "description": "Rank tracker, competitor radar, link audits, AI page auditor.",
        "icon": "TrendingUp",
        "sort_order": 4,
    },
    {
        "slug": "users-ops",
        "name": "Users & Ops",
        "description": "Lead inbox, directory moderation, email verification, social lead hunting.",
        "icon": "Users",
        "sort_order": 5,
    },
    {
        "slug": "billing",
        "name": "Account & Billing",
        "description": "Plans, invoices, team seats, upgrades, cancellation.",
        "icon": "CreditCard",
        "sort_order": 6,
    },
    {
        "slug": "email",
        "name": "Email & Notifications",
        "description": "Branded transactional email, deliverability, suppression handling.",
        "icon": "Mail",
        "sort_order": 7,
    },
    {
        "slug": "troubleshooting",
        "name": "Troubleshooting",
        "description": "Common issues, error messages, and how to reach support.",
        "icon": "HelpCircle",
        "sort_order": 8,
    },
]

# ─── Articles ───────────────────────────────────────────────────────────────
# Format: (category_slug, slug, title, excerpt, content, is_popular)
ARTICLES = [
    # ── Getting Started ────────────────────────────────────────────────────
    (
        "getting-started",
        "welcome-first-15-minutes",
        "Welcome to founders.click — your first 15 minutes",
        "A guided checklist to get from signed-up to first AI-generated page live on your marketplace.",
        """\
# Welcome to founders.click

You signed up. Here's how to get from a blank dashboard to your first AI-generated page live on your marketplace in 15 minutes.

## Step 1 — Connect your Sharetribe marketplace (3 min)
Open **Settings → Integrations → Sharetribe** and paste your marketplace API client ID + secret. We use these to read your listings, categories, and sitemap. We never write to your marketplace without your explicit confirmation in the dashboard.

## Step 2 — Set up the `/p/*` reverse proxy (5 min)
This is the magic that makes pages render at `yourdomain.com/p/{slug}` instead of a separate subdomain. Sharetribe owns `/l/*` for listings; founders.click takes `/p/*` for content. Best for SEO, no subdomain split.

If your marketplace is on Cloudflare, we provide a one-line Worker route to add. If it's on Vercel/Netlify, we provide a `_redirects` snippet. See **Setting up the `/p/*` reverse proxy** for the exact steps for your stack.

## Step 3 — Connect Google Search Console (2 min)
Optional but powerful. With GSC connected, the Keyword Opportunities tool can find pages ranking 5-20 and rewrite them with AI to push into the top 3.

## Step 4 — Generate your first page (3 min)
Open **Content → Quick Page Builder**. Type a title (e.g. "Hosting a pool party in Austin"), a one-line description, pick the AI model (we recommend `google/gemini-2.5-flash` for first runs at $0.012/page), and click Publish. Page goes live at `/p/{slug}` instantly.

## Step 5 — Start the Content Factory (2 min)
**Content → Content Factory Engine**. Pick a template (city pSEO, comparison, resource, etc.), set a row count, click Run. We auto-loop up to 100 pages per run.

That's it. You're shipping. Open the **Dashboard** any time to see what to do next.
""",
        True,
    ),
    (
        "getting-started",
        "connect-sharetribe",
        "Connecting your Sharetribe marketplace",
        "How to find your Sharetribe API credentials and link them to founders.click.",
        """\
# Connecting your Sharetribe marketplace

founders.click reads from your Sharetribe marketplace via the Marketplace API. Setup takes ~3 minutes.

## 1. Create an Integration API client in Sharetribe Console
1. Log in to your Sharetribe Console
2. Go to **Build → Applications → Add new**
3. Application type: **Integration API**
4. Name it "founders.click"
5. Save and copy the **Client ID** and **Client secret**

## 2. Paste credentials into founders.click
1. In your founders.click dashboard go to **Settings → Integrations → Sharetribe**
2. Paste Client ID + Client secret
3. Click **Test connection** — should turn green within 5 seconds
4. Click **Save**

## What we read
- Listings (for sitemap building, hosts directory, listing claims)
- Users (for lead enrichment, never their personal data we don't already have access to)
- Marketplace metadata (timezone, currency, language)

## What we never do
- Create, edit, or delete listings on your marketplace
- Send emails on your behalf through Sharetribe
- Modify user records

## If credentials get rotated
Re-paste in **Settings → Integrations** and click Save. No restart needed.
""",
        True,
    ),
    (
        "getting-started",
        "reverse-proxy-setup",
        "Setting up the /p/* reverse proxy",
        "The one snippet that makes founders.click pages render at yourdomain.com/p/{slug} natively.",
        """\
# Setting up the `/p/*` reverse proxy

This is the SEO superpower. Pages render at **your marketplace's domain**, not on a subdomain — so backlinks, brand authority, and search rankings all consolidate.

## Why a proxy?

Sharetribe owns `/l/*` (listings) and `/u/*` (users). It can't host arbitrary content pages. So we serve content from founders.click but route the request through a **proxy on your domain**, so Google sees `yourdomain.com/p/become-a-pool-host` instead of `app.founders.click/...`.

## Cloudflare (most marketplaces)

Add a Cloudflare Worker route on your zone:

```
Pattern: yourdomain.com/p/*
Worker:  founders-click-proxy (we publish this; one-click install from dashboard)
```

Done. Cache hits the founders.click edge, your domain stays canonical.

## Vercel

Add to `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/p/:path*",
      "destination": "https://app.founders.click/p/:path*"
    }
  ]
}
```

## Netlify

Add to `_redirects`:

```
/p/*  https://app.founders.click/p/:splat  200!
```

The trailing `!` and `200` keep it a rewrite (not a redirect) so the URL stays on your domain.

## Custom (nginx, Caddy, AWS, etc.)
We have snippets in the dashboard for nginx, Caddy, AWS CloudFront, and Fastly. **Settings → Reverse Proxy** has copy-paste blocks for all of them.

## Testing it works
After applying, visit `https://yourdomain.com/p/test-page` (any slug — even one that doesn't exist yet). You should see the founders.click "page not found" page (NOT your marketplace's 404). That confirms the proxy is reaching us.
""",
        True,
    ),
    (
        "getting-started",
        "first-100-pages",
        "Generating your first 100 pages",
        "From zero to 100 indexed pages in your first hour.",
        """\
# Your first 100 pages

The Content Factory Engine generates up to 100 pages per run at ~$0.012 each. Here's how to plan a productive first batch.

## 1. Pick a template

In **Content → Content Factory** you'll see template families:

- **City pSEO** — `Become a [profession] in [city], [state]` style. Best for local-marketplace SEO.
- **Comparison** — `[Your marketplace] vs [competitor] in [city]`. Great for capturing competitive search intent.
- **Resource articles** — long-form how-to guides on topics adjacent to your marketplace.
- **Event guides** — `Best [event type] venues in [city]` lists.
- **Spanish (or other locale)** — full hreflang-aware translation pipeline.

Pick the one most aligned with your acquisition strategy.

## 2. Define your row set
For city pSEO, that's a list of (city, state) pairs. We can auto-populate this from your existing listings (via Sharetribe), from a CSV upload, or from a list you paste in.

## 3. Pick the AI model
- `google/gemini-2.5-flash` — fastest, ~$0.005/page. Best first-run choice.
- `openai/gpt-5` — highest quality, ~$0.04/page. Best for hero pages.
- `anthropic/claude-sonnet-4.5` — best at structured comparisons. ~$0.025/page.

## 4. Dry run first
Toggle **Dry run** before kicking off a real batch. We generate the first 3 pages without saving them and show you the output. If quality looks right, run for real.

## 5. Hit Run
Up to 100 pages per batch. We loop, retry on transient failures, log rejections, and report results. Pages publish to `/p/{slug}` immediately as they finish.

## Rate limiting
Default OpenRouter limit is 60 requests/minute. We respect it. A 100-page batch takes ~3-5 minutes total.
""",
        True,
    ),
    (
        "getting-started",
        "invite-team",
        "Inviting your team",
        "Add admins, content editors, and SEO analysts to your workspace.",
        """\
# Inviting your team

founders.click supports multiple roles per workspace. Add teammates from **Settings → Team**.

## Roles

- **Admin** — full access including billing, integrations, team management
- **Editor** — content tools (Quick Page Builder, Content Factory, Bulk Editor, Blog) but no billing or integrations
- **Analyst** — read-only on SEO tools (Rank Tracker, Competitor Radar, Page Auditor, etc.)

## How to invite

1. **Settings → Team → Invite**
2. Enter email + pick role
3. They get a magic-link email — clicking it joins them to your workspace
4. Until they accept, they show as "Invited" with a Resend button

## Seat counts by plan
- Starter: 1 admin seat
- Growth: 3 seats
- Scale: 10 seats
- Enterprise: unlimited

Need more seats on Starter or Growth? Upgrade plan or contact us — we can add seats à la carte.
""",
        False,
    ),

    # ── Dashboard ──────────────────────────────────────────────────────────
    (
        "dashboard",
        "morning-command-center",
        "Reading the morning command center",
        "How the dashboard's 6 tabs surface what needs your attention each morning.",
        """\
# The morning command center

The Dashboard auto-refreshes every 30 seconds and is organized into 6 tabs. Open it first thing in the morning — most operators spend 5 minutes here, leave with a clear action list, and don't re-open until tomorrow.

## The 6 tabs

### Today
The default. Shows **Today's Top 3 Actions** (CRITICAL / IMPORTANT / OPPORTUNITY) ranked by AI based on your marketplace state, plus a 24-hour activity summary.

### Revenue
Live numbers: Host signups, new listings, booking requests (7d), GMV (7d), Lead Inbox volume, and Visitor → Host conversion rate. Color-coded vs. trailing 7-day average.

### SEO
Google Search Console summary: indexed pages, clicks, impressions, average position, top winners, top decliners. Click any row to drill into Keyword Opportunities for that page.

### Factory
Content Factory queue status. How many pages generated today, in the last 7 days, and any failed runs that need retry.

### Humans
Lead inbox triage state, directory moderation queue, listing claim requests, plan upgrade requests. Things that need a human decision.

### Tools
Quick links to every tool with a "last used" timestamp and a one-line description.

## Auto-refresh
The whole dashboard refreshes every 30 seconds in the background. You don't need to F5.

## SEO Coach AI
Bottom-right corner has a chat input. Ask "What's my biggest SEO problem right now?" or "I have 30 minutes — what should I do?" and get a step-by-step answer using your live data.
""",
        True,
    ),
    (
        "dashboard",
        "top-3-actions",
        "Today's Top 3 Actions explained",
        "How the dashboard ranks what to do first.",
        """\
# Today's Top 3 Actions

Every morning the dashboard surfaces three actions, color-coded:

- 🔴 **CRITICAL** — Something that's actively losing you money or breaking SEO. Fix today.
- 🟡 **IMPORTANT** — A meaningful improvement that compounds over weeks. This week.
- 🟢 **OPPORTUNITY** — Net-new growth lever. When you have time.

## How it ranks

The ranker considers (roughly in this order):
1. **Active customer-facing issues** — broken pages, 404s on indexed URLs, expired domain DKIM, etc.
2. **High-leverage content gaps** — pages ranking 4-12 that one rewrite could push to top 3
3. **Competitor advances** — a competitor just published a city page you don't have
4. **Operational backlog** — provider moderations waiting >48h, leads not contacted, etc.

The model considers your plan tier, time-of-week, and recent action history (so it doesn't recommend the same fix twice).

## What clicking does
Each action has a **Resolve** button. It either drops you into the right tool with the row pre-selected, or — for one-click actions like "fix 1,523 internal links" — does it for you with a confirmation prompt.
""",
        True,
    ),
    (
        "dashboard",
        "seo-coach-ai",
        "Using SEO Coach AI",
        "Ask 'what should I do?' and get a step-by-step plan using your live marketplace data.",
        """\
# SEO Coach AI

The chat input at the bottom-right of every dashboard tab. Ask anything; it has access to:

- Your live Google Search Console data (last 90 days)
- Your sitemap and indexed pages
- Your listings (counts, categories, locations)
- Your competitor radar feed (Swimply, Peerspace, Giggster, plus any custom you added)
- Your content production stats (pages/day, avg quality score, bounce rate)

## Useful prompts

- **"What's my biggest SEO problem right now?"** — single-step diagnosis with evidence
- **"I have 30 minutes — what should I do?"** — prioritized action list scaled to time
- **"Why are we ranked #14 for `pool rental austin`?"** — page-level audit with specifics
- **"What's my best play to compete with Swimply this month?"** — strategic recommendation
- **"Show me which cities I should target next"** — gap analysis of (city × demand × competitor coverage)

## What it won't do
- Make changes for you without confirmation (it can suggest "Click here to publish" but won't auto-publish)
- Spend money — AI page generation requires you to confirm in the relevant tool
- Send emails or contact leads on your behalf
""",
        False,
    ),
    (
        "dashboard",
        "auto-refresh-tabs",
        "Auto-refresh and the 6 organized tabs",
        "How the 30-second refresh interacts with each tab and when to disable it.",
        """\
# Auto-refresh & tabs

## 30-second refresh
The dashboard pulls fresh numbers every 30 seconds without a page reload. Tab state, scroll position, and any open dropdowns persist.

## When to disable
- Heavy background AI batches running — the dashboard's GSC fetch can compete for bandwidth. Toggle off via the gear icon.
- Demoing to a stakeholder — you don't want numbers shifting mid-screenshare.

## Tab persistence
We remember your last tab per session. If you usually live on the SEO tab, you'll land there next morning.

## Notification badges
Each tab shows a count if there's something new since you last visited it (e.g., "Humans (3)" means 3 new lead-inbox items, etc.). Counts clear when you visit the tab.
""",
        False,
    ),

    # ── Content Tools ──────────────────────────────────────────────────────
    (
        "content-tools",
        "quick-page-builder",
        "Quick Page Builder: from idea to published in 60 seconds",
        "The fastest path from 'I should write about X' to a live page on /p/{slug}.",
        """\
# Quick Page Builder

When you want to write **one page** about a specific topic. Faster than the full Content Factory.

## How to use

1. Open **Content → Quick Page Builder**
2. Type a **title** (e.g. "Renting a backyard pool for a birthday party")
3. Add a **one-line description** of what the page should cover
4. Pick an **AI model** — `gemini-2.5-flash` for fast/cheap, `gpt-5` for hero pages
5. Optionally set a custom **slug** (we auto-generate one from the title otherwise)
6. Click **Publish**

Page goes live at `/p/{slug}` immediately. We generate:
- Hero image (selected from a stock library or AI-generated based on the topic)
- SEO title (≤60 chars) and meta description (≤155 chars)
- Markdown body with `##` and `###` heading structure
- Auto-linked references to other published pages on your marketplace

## When NOT to use Quick Page Builder
- For 10+ similar pages (use Content Factory)
- For pages you want to deeply customize before publishing (use Bulk Editor instead — generate then edit)
- For comparison pages where structure matters (use the dedicated Comparison template)
""",
        True,
    ),
    (
        "content-tools",
        "content-factory-engine",
        "Content Factory Engine: bulk page generation explained",
        "Loop through 100 pages per run with priority tiers, dry-run mode, and live rejection logs.",
        """\
# Content Factory Engine

Generates **up to 100 pages per run**. Use this for systematic city pSEO, comparison pages, resource libraries.

## Setup

1. **Pick a template** (City pSEO, Comparison, Resource, Event Guide, Spanish, etc.)
2. **Define rows** — the set of (city, state, profession, etc.) tuples. Source from your listings, CSV, or paste.
3. **Set priority tier** — T1, T2, or T3
   - **T1** — top markets, hero quality, often `gpt-5`. Cost ~$0.04/page
   - **T2** — secondary markets, `gemini-2.5-flash` or similar. ~$0.012/page
   - **T3** — long-tail, fast model, lower quality threshold. ~$0.005/page
4. **Dry run** — generate first 3 rows without saving. Review.
5. **Run for real** — up to 100 rows per batch.

## During a run
You see live updates: which row is processing, accept/reject decisions from our quality gate, retries on transient failures.

## After a run
- Every page goes to `/p/{slug}` immediately
- Sitemap auto-updates
- A run summary lands in your Dashboard's Factory tab: count, cost, avg quality, rejected reasons
""",
        True,
    ),
    (
        "content-tools",
        "bulk-page-editor",
        "Bulk Page Editor for managing existing pages",
        "Table view of every page on your marketplace. Filter, edit, regenerate, unpublish.",
        """\
# Bulk Page Editor

The spreadsheet view of every `/p/*` page. Use it when you want to **operate on many pages at once**.

## Filters
- Status: Published / Pending / Draft / Skipped / Redirect
- Category: any taxonomy you've defined
- Locale: en / es / etc.
- Last modified: today / this week / older
- Quality score: green (90+) / yellow (70-89) / red (<70)

## Actions per row
- **Edit** — opens markdown editor with full metadata sidebar
- **Regenerate** — replace content with a fresh AI generation (keeps URL/slug)
- **Unpublish** — keeps the row but removes from sitemap and serves 404
- **Delete** — removes permanently

## Bulk actions
Select multiple rows (Shift+click for range, Cmd/Ctrl+click for multi-select) then:
- **Bulk regenerate** — uses the model you pick
- **Bulk unpublish** — useful for content audits
- **Bulk export** — CSV download of selected rows
""",
        False,
    ),
    (
        "content-tools",
        "data-import",
        "Importing content via CSV",
        "Upload up to 100MB of pre-existing content rows in one go.",
        """\
# Data Import

When you have content already (from another CMS, a content brief sheet, scraped data, etc.) and want to bulk-import.

## Required columns

At minimum, your CSV needs:
- `slug` — URL slug. We'll dedupe; existing slugs get replaced.
- `title` — H1 of the page

## Optional columns

- `category` — taxonomy bucket
- `template_type` — template to render with (`host_acq_city`, `event_guide`, `resource`, etc.)
- `body_markdown` — full content (skip AI generation)
- `seo_title`, `seo_description` — meta tags
- `hero_image_url` — direct URL to hero image
- `locale` — `en`, `es`, `fr`, etc. for i18n
- `priority` — integer; we generate higher-priority rows first
- `status` — `pending` / `published` / `draft`

## Upload flow

1. **Content → Content Migration**
2. Click **Upload CSV** (max 100MB; we ship in 200-row chunks for reliability)
3. Map columns if the headers don't auto-match
4. Review the preview (first 5 rows)
5. Click **Import**

If body_markdown is empty, the row joins the Content Factory queue for AI generation. If body_markdown is filled, it gets published immediately.
""",
        False,
    ),
    (
        "content-tools",
        "blog-automation",
        "Blog automation",
        "Auto-generate blog drafts grouped by category and review them in one place.",
        """\
# Blog Admin

Separate from `/p/*` programmatic pages. The blog is for editorial content — opinion pieces, deep dives, news.

## How auto-drafting works

1. **Settings → Blog → Categories** — define your blog categories (e.g. "Hosting tips", "Industry news", "Customer stories")
2. **Settings → Blog → Cadence** — pick how often to auto-draft (daily / weekly / off)
3. We seed the queue with topic ideas based on:
   - Trending searches in your industry (via SERP API)
   - Your competitors' recent blog posts
   - Questions people ask the SEO Coach AI

## Reviewing drafts

**Content → Blog admin** shows a queue. Each draft has:
- Title + excerpt
- Generated body (markdown)
- Suggested hero image
- Buttons: **Publish**, **Edit**, **Skip**, **Regenerate**

Nothing publishes automatically — every blog post requires a human click.
""",
        False,
    ),

    # ── SEO Tools ──────────────────────────────────────────────────────────
    (
        "seo-tools",
        "rank-tracker",
        "Rank Tracker: tracking your priority keywords",
        "Daily SERP position checks for the keywords that matter to your marketplace.",
        """\
# Rank Tracker

Daily SERP position for every keyword you care about. Open **SEO → Rank Tracker**.

## Adding keywords

- **Manual** — paste a list, one per line
- **From GSC** — pull all keywords ranking in positions 1-50, sort by impressions, pick the top N
- **From competitors** — Competitor Radar feeds suggested keywords your competitors rank for that you don't

## How tracking works

We check Google SERPs once daily for each tracked keyword. We record:
- Current position (1-100; "not in top 100" if outside)
- Previous position (yesterday)
- 7-day delta and 30-day delta
- Win/loss indicator (🟢 if better, 🔴 if worse)
- The actual URL ranking for that keyword on your site (might be different from what you expected)

## Tracking budget by plan
- Starter: 50 keywords
- Growth: 500 keywords
- Scale: 5,000 keywords
- Enterprise: unlimited

Need more on a lower plan? Each plan has a +keywords add-on at $0.05/keyword/month.
""",
        True,
    ),
    (
        "seo-tools",
        "competitor-radar",
        "Competitor Radar: monitoring Swimply, Peerspace, Giggster",
        "Daily scans of competitor sitemaps. New pages, city gaps, strategic intel.",
        """\
# Competitor Radar

Tracks competitor marketplaces' page inventories daily. By default we monitor:
- Swimply
- Peerspace
- Giggster

You can add custom competitors in **SEO → Competitor Radar → Settings**.

## What it surfaces

- **New pages** competitors published in the last 24h (with URL and our auto-generated assessment of why they did it)
- **City gaps** — cities competitors cover that you don't. Ranked by estimated search volume.
- **Strategic intel digest** — daily email summarizing patterns: which competitors are scaling content production, which are dormant, which moved into a new vertical

## How we scan

Daily crawl of public sitemaps, capped at 10,000 URLs per competitor. We diff against yesterday's snapshot and surface deltas.

## Acting on intel

Each "city gap" row has a **Generate page** button that drops you straight into the Content Factory with that (city, state) pre-filled.
""",
        True,
    ),
    (
        "seo-tools",
        "ai-page-auditor",
        "AI Page Auditor: scoring any URL 0-100",
        "Paste any URL, get a benchmarked score and exact recommendations.",
        """\
# AI Page Auditor

Paste any URL (yours or a competitor's), get back:

- **Overall score** 0-100 vs. an industry benchmark
- **Sub-scores** — content quality, technical SEO, internal linking, schema markup, page speed (via PageSpeed Insights), mobile-friendliness
- **Actionable recommendations** — exact text edits, link additions, schema additions, with copy-paste-ready code

## Where to use it

- **Auditing your own pages** before promoting them in newsletters
- **Spying on competitors** to see what's working for their high-rankers
- **Pre-launch QA** on Content Factory output

## What we benchmark against

A rolling dataset of the top 10 URLs ranking for each of your tracked keywords. Scores are relative to that competitive set, not absolute.

## Cost

~$0.10 per URL audited. Counts against your AI credits.
""",
        True,
    ),
    (
        "seo-tools",
        "link-checker",
        "Link Checker: finding and fixing broken internal links",
        "Scan all your /p/* pages for 4xx, 5xx, and 3xx links. Bulk-fix or per-path.",
        """\
# Link Checker

We scan every `/p/*` page on your marketplace daily and flag broken internal links.

## What we check

- **4xx** — link points to a page that 404s
- **5xx** — link target server-errored at scan time (transient — we retry)
- **3xx** — link redirects (slows page load and weakens link equity)
- **Mixed content** — `http://` link on an `https://` page

## Per-path fix

Click the **Fix** button next to a row. Options:
- Update to the redirect target
- Replace with a similar page (we suggest 3 alternatives)
- Remove the link entirely (keep the surrounding text)

## Bulk fix

**SEO → Link Checker → Bulk fix** — runs all suggested fixes in one click after you review the proposed changes. Common operation: fix 300+ links in 30 seconds.

## Schedule
- Starter: weekly scan
- Growth and above: daily scan
""",
        False,
    ),
    (
        "seo-tools",
        "keyword-opportunities",
        "Keyword Opportunities: rewriting pages stuck on positions 5-20",
        "GSC import + AI rewrite to push pages from page 2 of Google to top 3.",
        """\
# Keyword Opportunities

The single highest-leverage SEO tool. Most marketplaces have **dozens** of pages ranking on positions 5-20 — close enough to traffic that a rewrite usually moves them into the top 3.

## How it works

1. **Connect GSC** if you haven't (Settings → Integrations → Google Search Console)
2. We surface pages ranking positions 5-20 in **SEO → Keyword Opportunities**
3. Each row shows: URL, primary keyword, current position, monthly impressions, estimated traffic gain if you reach #3
4. Click **AI rewrite** — we open the Bulk Page Editor with the page pre-loaded and a rewrite plan based on what's working for the current top 3 results

## The rewrite plan

We compare your page to the top 3 ranking pages for that keyword and identify:
- Gaps in headings/topics they cover and you don't
- Internal-linking opportunities (we count their internal link velocity)
- Schema/structured-data they have and you don't
- Word count differential

The rewrite preserves your URL, slug, hero image, and any custom metadata.

## Cost
Same as a regular page generation, ~$0.012-$0.04 depending on model.
""",
        True,
    ),
    (
        "seo-tools",
        "internal-link-recommender",
        "Internal Link Recommender: 300 suggestions, one click",
        "Analyze 500 pages for topic overlap and apply all recommended internal links in one click.",
        """\
# Internal Link Recommender

Internal links are SEO's most-underused lever. The Recommender analyzes up to 500 of your pages, finds topic overlaps, and suggests `[anchor text](target URL)` insertions.

## Output format

A list of suggestions, each:
- **From page** — where the link goes IN
- **To page** — where the link goes OUT
- **Anchor text** — the suggested text
- **Surrounding context** — the sentence we want to insert it into
- **Confidence** — low / med / high based on topic similarity score

## Apply

- **Per row** — ✓ approve or ✗ reject one at a time
- **Apply all 300** — bulk-apply every "high confidence" suggestion. Requires one confirmation prompt.

We never insert a link that would change the meaning of a sentence or break grammar.

## Re-run cadence

Run after every Content Factory batch — new pages create new linking opportunities, and the Recommender will surface them.
""",
        False,
    ),
    (
        "seo-tools",
        "gsc-import",
        "Importing Google Search Console data",
        "Connect GSC for keyword opportunities, dashboard SEO tab, and rank tracker keyword discovery.",
        """\
# Importing Google Search Console data

GSC unlocks three tools: **Keyword Opportunities**, the **Dashboard SEO tab**, and **Rank Tracker keyword discovery**.

## Setup

1. **Settings → Integrations → Google Search Console**
2. Click **Connect Google account** (OAuth — we ask for read-only Search Console scope)
3. Pick the property to connect (use the verified domain or URL property — both work)
4. Click **Save**

Within ~5 minutes, GSC data starts populating:
- The Dashboard SEO tab shows clicks, impressions, position
- Keyword Opportunities surfaces pages on positions 5-20
- Rank Tracker can suggest "your top opportunity keywords" pulled from GSC

## What we read

Read-only access to:
- Search analytics (clicks, impressions, CTR, position by query and page)
- Coverage report (indexed/excluded pages)
- Sitemap submissions

## What we never write

- We never submit URLs for indexing on your behalf without your explicit click in the dashboard
- We never modify properties or settings
""",
        False,
    ),

    # ── Users & Ops ────────────────────────────────────────────────────────
    (
        "users-ops",
        "lead-inbox",
        "Lead Inbox: triaging new provider/host signups",
        "How to handle inbound leads efficiently with status tracking.",
        """\
# Lead Inbox

Every prospect who signs up but hasn't completed a listing yet lands here. Open **Users & Ops → Lead Inbox**.

## Statuses

- **New** — just signed up; never contacted
- **Contacted** — you sent them an outbound (email, call, SMS); awaiting response
- **Closed** — they completed onboarding (became a host) OR you marked them dead

## Per-row actions

- **Contact** — opens an outbound email composer (with templates)
- **Mark Closed** — moves out of inbox
- **Add note** — internal-only note that travels with the lead

## Bulk actions

Select multiple rows then:
- **Send sequence** — kick off a 3-email cadence to all selected
- **Export to CSV** — for handoff to a sales tool
- **Mark Closed (lost)** — bulk-archive
""",
        True,
    ),
    (
        "users-ops",
        "email-verify",
        "Email Verify: validating leads in batch",
        "Use the API verify pool to clean lead emails before sending.",
        """\
# Email Verify

Bounces hurt your deliverability. Verify lead emails BEFORE sending.

## How it works

We have 100,000+ verification credits in the system, refilled monthly per plan. Each verification:
- DNS lookup (does the domain accept email?)
- SMTP probe (does the mailbox exist? — handshake only, no email sent)
- Disposable / role / typo flagging

## Batch verify

**Users & Ops → Email Verify**:
1. Paste up to 100 emails per batch (or upload CSV up to 10,000)
2. Click **Verify**
3. Each gets one of: **Valid**, **Invalid**, **Risky**, **Disposable**, **Unknown**

We auto-exclude **Invalid** and **Disposable** from your sendable list. **Risky** ones you decide.

## Credit budget by plan
- Starter: 1,000/month
- Growth: 10,000/month
- Scale: 100,000/month
- Enterprise: unlimited
""",
        False,
    ),
    (
        "users-ops",
        "social-lead-hunter",
        "Social Lead Hunter: scraping IG, FB, TikTok for prospects",
        "Daily scrape of social profiles matching your marketplace's niche.",
        """\
# Social Lead Hunter

Daily-scheduled scrape across Instagram, Facebook, TikTok, and Craigslist for profiles that match your marketplace niche.

## Setup

1. **Users & Ops → Social Lead Hunter → Settings**
2. Define keywords (e.g. for a pool-rental marketplace: "backyard pool", "pool host", "rent my pool")
3. Pick geographies (states, cities, or worldwide)
4. Save

## What you get

A daily feed of profiles matching your keywords + geography:
- Username, display name, bio, follower count, recent post sample
- Inferred email (when posted publicly)
- Confidence score that they're a legitimate prospect (vs. a brand account, fan, etc.)

## Outreach workflow

Each row has a **Send DM template** button. Pick from your saved templates, customize, send. We log the outreach and track responses (when feasible).

## Compliance

We only scrape **public** profiles. We never log into platforms on your behalf. We honor robots.txt and platform ToS.
""",
        False,
    ),
    (
        "users-ops",
        "directory-moderation",
        "Directory Moderation by plan tier",
        "Approve, reject, or AI-augment provider/host submissions.",
        """\
# Directory Moderation

Provider/host submissions to your marketplace's `/providers/` directory route here for human review. Open **Users & Ops → Directory Moderation**.

## Per-submission actions

- **Approve** — publishes to the public directory
- **Reject** — sends a rejection email (template configurable in Settings → Email Branding)
- **AI content gen** — our AI fills in their profile copy based on what they've submitted (useful when submissions are sparse)

## Filtering

Filter the queue by submission age, plan tier (if your marketplace has tiered listings), or category.

## Batch approve

If you trust submissions from a specific source (e.g. invited beta testers), select multiple rows and **Bulk approve**.
""",
        False,
    ),

    # ── Account & Billing ──────────────────────────────────────────────────
    (
        "billing",
        "plans",
        "Plan tiers: Starter / Growth / Scale / Enterprise",
        "What's in each plan and which one is right for your stage.",
        """\
# Plan tiers

| Tier | Price | Best for |
|---|---|---|
| Starter | $109/mo | Solo founders, first marketplace |
| Growth | $390/mo | Active SEO + content goals (most popular) |
| Scale | $899/mo | Established platforms, content velocity |
| Enterprise | Custom | Multi-team, custom integrations |

## What's in each

**Starter** — Quick Page Builder, 50 AI pages/mo, Bulk Editor, basic Rank Tracker (50 keywords), Lead Inbox, 1 admin seat.

**Growth** — Everything in Starter plus 500 AI pages/mo, Content Factory Engine, Competitor Radar, AI Page Auditor, Link Auditor, Keyword Opportunities, Internal Link Recommender, Social Lead Hunter, Directory Moderation, 3 seats.

**Scale** — Everything in Growth plus 5,000 AI pages/mo, SEO Coach AI, Custom AI model selection, Email Branding, Listing Claims & Plans, 10 seats, Sitemap & 404 Management, 100MB+ Data Import, Slack notifications.

**Enterprise** — Unlimited AI generation, custom AI model fine-tuning, white-label dashboard, custom integrations, dedicated success engineer, SOC 2 Type II, DPA + custom MSA, 99.9% SLA.

## Page generation overage
Run out of pages mid-month? Buy more at $0.012-$0.04/page (model-dependent). Charged on next invoice; never charged upfront.
""",
        True,
    ),
    (
        "billing",
        "upgrade-downgrade",
        "Upgrading or downgrading your plan",
        "How to change plans and what happens to your data.",
        """\
# Upgrading or downgrading

## Upgrade

**Settings → Billing → Change plan → pick new tier → confirm.**

Changes apply immediately. New limits unlock right away. Your card is charged a prorated amount for the rest of the current billing period.

## Downgrade

Same flow. Changes apply at **end of current billing period** (so you keep paid features until the next renewal date).

When you downgrade:
- Your data is **never** deleted
- If your current usage exceeds the new tier's limits (e.g. 800 keywords tracked but downgrading to Growth's 500), the OLDEST 300 keywords are paused (not deleted) until you upgrade back

## Trial-to-paid

You're on a 14-day free trial. To activate paid: **Settings → Billing → Add card**. We don't charge until day 15.
""",
        True,
    ),
    (
        "billing",
        "invoices-receipts",
        "Invoices and receipts",
        "Where to find and download every charge.",
        """\
# Invoices & receipts

**Settings → Billing → Invoices** — every charge with date, amount, plan tier, and a PDF download.

## What's on each invoice

- Base subscription
- Page generation overage (if any)
- Keyword tracking add-on (if any)
- Email verification overage (if any)
- Tax (where applicable)

## Custom billing details

For business accounts, add VAT/tax ID, billing address, and PO number in **Settings → Billing → Company info**. These auto-populate on every invoice.

## Email delivery

Invoices auto-email to the billing contact within 1 hour of charge. Add additional CC recipients in Settings.
""",
        False,
    ),
    (
        "billing",
        "cancel",
        "Cancelling your subscription",
        "How to cancel, what data you keep, and how to come back.",
        """\
# Cancelling

**Settings → Billing → Cancel subscription.**

## What happens

- Your access continues until the end of the current billing period
- After that, your account moves to "read-only" — you can log in, view existing data, export everything, but can't run new AI generations or track new keywords
- Data is **retained for 90 days** in read-only mode
- After 90 days, data is permanently deleted

## Coming back

Within 90 days: log in, click **Reactivate** in the dashboard, pick a plan, your data picks up where it left off.

After 90 days: you'll have to re-onboard from scratch.

## Refunds

We don't auto-prorate refunds for partial months. If you have a special situation, email support@founders.click and we'll work with you.

## Reasons we love hearing
- "I got acquired" — congrats, we'll help with data export
- "It worked too well; I built my own" — fair
- "I don't run a marketplace anymore" — totally fine
- "Your tool is missing X" — please tell us before you cancel; we'll often build X within a week
""",
        False,
    ),

    # ── Email & Notifications ──────────────────────────────────────────────
    (
        "email",
        "branding",
        "Customizing your email branding",
        "Logo, brand colors, sender name, and footer for every transactional email.",
        """\
# Email branding

Every transactional email (signup confirmation, password reset, invite, magic link, etc.) renders with your brand. Set it up in **Settings → Email Branding**.

## Fields

- **Site name** — appears in `<title>`, the email heading, and the From: name
- **Sender name** — what shows up as the sender (e.g. "Acme Marketplace" instead of "Acme Marketplace Auth")
- **Logo URL** — direct URL to a 200×80 PNG with transparent background
- **Primary color** — your brand color (used for buttons, links)
- **Primary text color** — text on top of primary color buttons (usually white)
- **Footer text** — small print at the bottom (legal, mailing address, etc.)

## Preview

Each template has a **Send test** button. We send a sample email to your admin email so you can see exactly what users will receive.

## Changes are live immediately

Branding changes apply to the very next email sent — no deployment needed.
""",
        False,
    ),
    (
        "email",
        "sending-domain",
        "Setting up your sending domain",
        "DNS records to verify and the difference between root and subdomain sends.",
        """\
# Sending domain

Emails go out from `noreply@<your-domain>` via Emailit (our deliverability provider). To use your own domain you have to verify it.

## DNS records to add

In Settings → Email → Domain you'll see 4-5 records to add at your DNS provider:
- **TXT** for SPF
- **CNAME** records for DKIM (we publish 2-3 CNAME selectors)
- **TXT** for DMARC (recommended but not required)
- **MX** for return-path / bounce handling (so we can deliver bounces back to suppression list)

## Subdomain vs apex

- **Apex** (`yourdomain.com`) — sends look like `support@yourdomain.com`. Best for brand consistency.
- **Subdomain** (`mail.yourdomain.com`) — sends look like `support@mail.yourdomain.com`. Best if you want to isolate transactional sending from your main domain's reputation.

We support both; pick whichever in setup.

## Verification timing

DNS records propagate in 5 min - 24h. We check every minute and flip the domain to ✅ Verified when all records resolve.

## Until verified
We send via founders.click's default sending domain (clearly attributed). Once your domain verifies, sends auto-cut over.
""",
        False,
    ),
    (
        "email",
        "bounce-suppression",
        "Understanding bounce and suppression handling",
        "How we keep your sender reputation high by suppressing problem addresses.",
        """\
# Bounce & suppression

Sender reputation is fragile. To protect it, we suppress problem addresses automatically.

## What gets suppressed

- **Hard bounces** — address doesn't exist or refuses mail permanently
- **Spam complaints** — recipient marked your email as spam
- **Manual unsubscribes** — recipient clicked the unsubscribe link

Once suppressed, we **never send again** to that address — even if you try to email manually.

## Where to see suppressions

**Settings → Email → Suppressions** — table of every suppressed address with:
- Reason (bounce / complaint / unsubscribe)
- Date
- Last 5 attempted sends (template, recipient masked)

## Removing a suppression

If you have legitimate consent to email someone again (e.g. they re-subscribed), click **Restore** on their row. They re-enter the sendable pool. Use sparingly — restoring an address that bounces again will hurt reputation faster than the original suppression did.
""",
        False,
    ),
    (
        "email",
        "rate-limits",
        "Email rate limits and how to raise them",
        "Default rate limits for trial and how to lift them as your sending volume grows.",
        """\
# Email rate limits

Default trial limits are conservative to protect deliverability:
- 2 emails/sec
- 5,000 emails/day

These cover **all** sending — auth emails, broadcast campaigns, transactional notifications.

## Why limits exist

Brand new sending domains have no reputation. Spammers signal themselves by trying to send a lot fast. Mailbox providers (Gmail, Outlook, Yahoo) auto-tank delivery for new senders that burst.

Slow ramp-up wins. We start low and raise based on:
- Days you've been sending (warm-up period)
- Your bounce rate (under 2% is good)
- Your complaint rate (under 0.1% is good)
- Your engagement (open rate > 20% on transactional)

## Raising limits

Auto-raised every 7 days for accounts in good standing.

If you need a manual raise (e.g. preparing for a launch announcement), email **support@founders.click** with:
- Sending volume needed
- What you're sending (announcement, transactional spike, etc.)
- Date range

We'll usually raise within 1 business day for legitimate use cases.
""",
        False,
    ),

    # ── Troubleshooting ────────────────────────────────────────────────────
    (
        "troubleshooting",
        "no-confirmation-email",
        "I didn't receive a confirmation email",
        "Steps to debug missing signup confirmation emails.",
        """\
# Missing confirmation email

The most common signup issue. Here's how to figure out what's wrong.

## 1. Check spam / junk

Most common cause. Search for "founders.click" in your spam folder.

## 2. Check the email matched

Typo'd email? Check **Settings → Account** to see what email is on the account.

## 3. Wait 5 minutes

We process the auth email queue every 60 seconds, but downstream delivery (Gmail, Outlook) can add another few minutes.

## 4. Check the resend button

On the auth page, click **Resend confirmation**. We rate-limit resends to 1 per 60 seconds; wait if you hit the limit.

## 5. Check that your email isn't suppressed

If you previously bounced/complained on a founders.click email, you're in the suppression list. Email **support@founders.click** with proof of email ownership and we can remove the suppression.

## 6. Still nothing?

Email **support@founders.click** with:
- The email address you signed up with
- Approximate signup time
- Whether you've signed up before

We'll find your account and confirm it manually.
""",
        True,
    ),
    (
        "troubleshooting",
        "ai-credits-exhausted",
        "AI generation fails with 'credits exhausted'",
        "What it means and how to top up.",
        """\
# AI credits exhausted

You hit your plan's monthly AI page generation limit. Three options:

## 1. Upgrade your plan
**Settings → Billing → Change plan**. Higher tiers have higher monthly limits. Pro-rated immediately.

## 2. Buy overage credits
**Settings → Billing → Add credits**. $5 = ~400 pages on `gemini-2.5-flash`. Credits never expire.

## 3. Wait for monthly reset
Limits reset on the 1st of every calendar month at 00:00 UTC. If today is the 28th, you might just want to wait.

## How to check current usage

**Settings → Billing → Usage** — shows AI pages used vs. limit, with a daily breakdown so you can see if a single Content Factory run blew through your budget.

## Common patterns

- **Most operators on Growth ($390)** never hit the 500-page limit because they spread generation across the month
- **Spike usage** comes from City pSEO batches — 100 cities × 4 templates = 400 pages in one afternoon
- If you regularly run big batches, Scale tier ($899, 5,000 pages) is more economical than buying overages
""",
        True,
    ),
    (
        "troubleshooting",
        "p-page-not-rendering",
        "My pages aren't showing on /p/{slug}",
        "Debug checklist for when content exists but doesn't render on your domain.",
        """\
# `/p/{slug}` not rendering

Content exists in your dashboard but `https://yourdomain.com/p/whatever` shows your marketplace's 404.

## 1. Reverse proxy not set up

Most likely cause. The `/p/*` reverse proxy from your domain to founders.click hasn't been configured.

Check: visit `https://yourdomain.com/p/test-page-that-definitely-doesnt-exist`. If you see your **marketplace's** 404 page, the proxy is missing. If you see **founders.click's** 404 page, the proxy works (just no content for that slug).

If proxy is missing, see [Setting up the /p/* reverse proxy](/help-center/getting-started/reverse-proxy-setup).

## 2. Page is in draft

Open the page in **Bulk Page Editor**. Check the status column — must be **Published**.

## 3. Slug mismatch

Path in browser: `/p/become-a-pool-host`. Slug in dashboard: `become-pool-host` (note: missing "a"). They have to match exactly.

## 4. Cloudflare cache

If you're using Cloudflare on your domain, the proxy response may be cached. Force a refresh: `Ctrl+F5` or **Cloudflare dashboard → Caching → Purge Everything**.

## 5. Recently published

Pages publish to your sitemap immediately, but Google may take 1-7 days to index. The page itself works at the URL, just won't show up in search yet.
""",
        False,
    ),
    (
        "troubleshooting",
        "rank-tracker-stale",
        "Rank Tracker shows old data",
        "Why position checks haven't updated and how to force a refresh.",
        """\
# Rank Tracker shows old data

Position checks happen daily. If you're seeing data older than 24h, here's what's likely going on.

## 1. Daily check window

We run rank checks between 02:00–08:00 UTC each day. If you check at 09:00 UTC, data is fresh. If you check at 01:00 UTC, you're seeing yesterday's run.

## 2. Keyword paused

If your tracked-keyword count exceeds your plan's limit (e.g., you downgraded), the oldest keywords go to "paused" status. Paused keywords don't get checked. Upgrade or remove keywords to resume.

## 3. Network failure

Daily checks can fail on flaky network days. We retry up to 3 times with exponential backoff. After that, the row stays at yesterday's data.

Force a manual recheck: select rows → **Re-run check**. Counts against your daily check budget (10x your tracked keyword count).

## 4. SERP fluctuation

Sometimes rank drops are real. Don't panic on a single day's movement — check the 7-day trend.
""",
        False,
    ),
    (
        "troubleshooting",
        "contact-support",
        "Contact support",
        "How to reach a human and what to include in your message.",
        """\
# Contact support

**support@founders.click**

## What to include

- Your account email
- Description of the issue (one paragraph is fine)
- Steps you've already tried
- Screenshots or screen recordings if relevant
- Approximate time the issue happened (so we can correlate logs)

## SLA by plan

- Starter: best-effort, usually <24h
- Growth: 24h SLA business days
- Scale: 4h SLA business days
- Enterprise: dedicated success engineer + Slack channel

## Urgent (production-down) issues

For paid plans, prefix the subject with `[URGENT]` and we page on-call. Typical response: under 1 hour.

## Feature requests

Same email; we triage feature requests weekly. The pattern: if you ask for a thing and 2 other customers ask for the same thing within a quarter, we usually build it.

## Status page

For known issues affecting all customers, **status.founders.click** has live updates. Bookmark it.
""",
        True,
    ),
]


# ─── Build the SQL ──────────────────────────────────────────────────────────
def main() -> None:
    print("=== Seeding categories ===")
    cat_values = []
    for c in CATEGORIES:
        cat_values.append(
            f"($cat${c['slug']}$cat$, $cat${c['name']}$cat$, $cat${c['description']}$cat$, $cat${c['icon']}$cat$, {c['sort_order']}, true)"
        )
    cat_sql = (
        "INSERT INTO public.help_categories (slug, name, description, icon, sort_order, is_published) VALUES "
        + ", ".join(cat_values)
        + " ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published, updated_at = now() RETURNING slug;"
    )
    print(run_sql(cat_sql))

    print("\n=== Seeding articles (one at a time for cleaner errors) ===")
    sort = 1
    last_cat = None
    inserted = 0
    for cat_slug, slug, title, excerpt, content, is_popular in ARTICLES:
        if cat_slug != last_cat:
            sort = 1
            last_cat = cat_slug
        sql = f"""INSERT INTO public.help_articles
            (category_slug, slug, title, excerpt, content, is_published, is_popular, sort_order, view_count, seo_title, seo_description)
            VALUES (
                $art${cat_slug}$art$,
                $art${slug}$art$,
                $art${title}$art$,
                $art${excerpt}$art$,
                $art${content}$art$,
                true,
                {str(is_popular).lower()},
                {sort},
                0,
                $art${title}$art$,
                $art${excerpt}$art$
            )
            ON CONFLICT (slug) DO UPDATE SET
                category_slug = EXCLUDED.category_slug,
                title = EXCLUDED.title,
                excerpt = EXCLUDED.excerpt,
                content = EXCLUDED.content,
                is_popular = EXCLUDED.is_popular,
                sort_order = EXCLUDED.sort_order,
                seo_title = EXCLUDED.seo_title,
                seo_description = EXCLUDED.seo_description,
                updated_at = now()
            RETURNING slug;
        """
        result = run_sql(sql)
        if "HTTPError" in result or '"message"' in result:
            print(f"  FAIL {cat_slug}/{slug}: {result[:200]}")
        else:
            inserted += 1
            print(f"  OK   {cat_slug}/{slug}")
        sort += 1

    print(f"\n=== Done. {inserted} articles upserted. ===")


if __name__ == "__main__":
    main()
