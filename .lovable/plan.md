
# SEO Page System for poolrentalnearme.com

Build a server-rendered page-template system that pulls live data from your Sharetribe Flex marketplace, mirrors the current URL structure (so your reverse proxy can swap in cleanly), and gives every page proper SEO foundations — unique titles, descriptions, OG tags, JSON-LD schema, clean internal linking, and fast page loads.

## What we're building

A flexible template framework that can grow from ~1,800 pages today to 20k–30k as you add providers, builders, locations, and content. **Phase 1** ships the template system and one reference page per type. **Phase 2+** populates them and tackles your GSC issues.

### Page types (templates)

```text
/                           Home
/l/:slug/:id                Pool listing (live from Sharetribe)
/pool-rental/:city-state    Location page (e.g. /pool-rental/austin-tx)
/category/:slug             Category/feature (heated, hot-tub, pet-friendly…)
/providers/:slug            Service providers / pool builders
/blog/:slug                 Long-form content
/sitemap.xml                Auto-generated from all data sources
/robots.txt                 With sitemap reference
```

All page routes are real TanStack Start routes (not hash anchors) — each gets its own SSR HTML, unique `<title>`, meta description, OG tags, and canonical URL. That alone fixes a big class of GSC issues.

## How data flows

```text
Sharetribe Flex API (live)
        ↓
  Server function (cached 5–15 min in-memory + edge cache headers)
        ↓
  Route loader (SSR) → fully-rendered HTML to Google
        ↓
  Reverse proxy on poolrentalnearme.com → this app
```

- Listings, search, and location aggregations are fetched live from Sharetribe via server functions.
- Static-ish content (city descriptions, category copy, blog posts, provider profiles) lives in our own database so we can edit it directly without touching markdown files.

## SEO foundations on every page

- Unique `<title>` and meta description templated from the page's data
- OG image, OG title, OG description, Twitter card
- Canonical URL
- JSON-LD structured data: `LocalBusiness` for listings, `Place` for cities, `Article` for blog, `BreadcrumbList` everywhere
- Working internal links between related pages (listing → city → category → provider)
- Clean breadcrumbs
- Auto-generated XML sitemap, split into chunks (Google's 50k URL limit)
- Image `alt` text, lazy loading, proper heading hierarchy (one H1 per page)
- No broken links — internal link checker built into the build

## Design

Match the current poolrentalnearme.com look: white background, blue primary (the teal/blue accent from your existing site), big hero imagery, friendly sans-serif. Goal is the proxy swap is invisible — users shouldn't notice.

## Phase 1 — Foundation (this build)

1. Connect Sharetribe Flex API (you'll provide Client ID + Secret as secrets).
2. Build the data layer: typed server functions for `getListing`, `searchListings`, `listingsByCity`, `listingsByCategory`.
3. Set up Lovable Cloud with tables for: `cities`, `categories`, `providers`, `blog_posts`, `seo_overrides` (for hand-tuned title/description per URL).
4. Build the 5 route templates with full SEO meta + JSON-LD + breadcrumbs.
5. Build one fully-populated reference page per template so you can see and approve the look.
6. Sitemap + robots.txt generation.
7. Shared header/footer matching the current site.

## Phase 2+ (future turns, after you approve Phase 1)

- Paste your GSC issue export → I fix them systematically.
- Bulk-populate city pages (top US metros first).
- Bulk-populate category pages.
- Add provider/builder profile pages.
- Blog editor for ongoing content.
- Tell me the proxy URL pattern when you're ready and we'll do a final URL audit.

## What I need from you

1. **Sharetribe Flex Client ID + Client Secret** — I'll request these as secrets after you approve the plan. Get them from Sharetribe Console → Build → Applications.
2. **Logo file** for the header (you can upload it after approval).
3. **Confirmation on the brand color** — the bright blue from the current site, or do you want to refresh it?

After Phase 1 is live, paste your GSC issues whenever you're ready and we'll knock them out one by one.

## Technical notes

- TanStack Start with SSR (every page is server-rendered HTML — critical for SEO).
- Sharetribe Flex SDK calls happen in `createServerFn` handlers; results cached with `Cache-Control` headers so the edge can serve repeat hits without re-hitting Sharetribe.
- Lovable Cloud (Postgres) for our own content (cities, categories, providers, blog, SEO overrides).
- Sitemap is generated on-demand from a server route, paginated into 50k-URL chunks.
- All routes typed end-to-end; no hash-anchor "single-page" anti-patterns.
