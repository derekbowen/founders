import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

/**
 * Production hosts — only these hostnames serve an indexable robots.txt.
 * Any other host (preview, *.lovable.app, EC2 IP, staging, raw workers.dev)
 * gets a hard Disallow: / so we don't fragment SEO across duplicate origins.
 *
 * Keep in sync with PRODUCTION_HOSTS in src/start.ts.
 */
const PROD_HOSTS = new Set([
  "founders.click",
  "www.founders.click",
  "poolrentalnearme.com",
  "www.poolrentalnearme.com",
]);

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Forwarded host wins (set by EC2 nginx reverse proxy); fall back to
        // the direct request URL. This is what isProd is gated on.
        const forwardedHost = request.headers.get("x-forwarded-host");
        const host = (forwardedHost ?? (() => {
          try {
            return new URL(request.url).hostname;
          } catch {
            return "";
          }
        })()).split(":")[0]!.toLowerCase();

        const isProd = PROD_HOSTS.has(host);

        const body = isProd
          ? `User-agent: *
Allow: /

# Auth-required marketplace flows (Sharetribe-handled, not for indexing)
Disallow: /admin/
Disallow: /account/
Disallow: /auth/
Disallow: /inbox/
Disallow: /listings
Disallow: /profile-settings
Disallow: /verify/

# Internal API endpoints
Disallow: /api/sharetribe/
Disallow: /api/public/track-city-click

# Don't index search query strings, but allow the search hub
Allow: /s
Disallow: /s?

Sitemap: ${SITE_URL}/sitemap.xml
`
          : `# Non-production host (${host || "unknown"}): block all crawling.
User-agent: *
Disallow: /
`;

        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "X-Robots-Tag": isProd ? "all" : "noindex, nofollow",
          },
        });
      },
    },
  },
});
