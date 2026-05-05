import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SITE_URL } from "@/lib/seo";
import { buildUrlsetXml, sitemapResponse, type SitemapUrl } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-directory.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: SitemapUrl[] = [{ loc: `${SITE_URL}/directory` }];

        const { data: cats } = await supabaseAdmin
          .from("service_categories")
          .select("slug, updated_at")
          .eq("is_published", true);
        for (const c of cats ?? []) {
          urls.push({ loc: `${SITE_URL}/directory/${c.slug}`, lastmod: c.updated_at });
        }

        const { data: provs } = await supabaseAdmin
          .from("providers")
          .select("slug, updated_at, hero_image_url, logo_url, name")
          .eq("is_published", true)
          .limit(5000);
        for (const p of provs ?? []) {
          const img = p.hero_image_url || p.logo_url;
          urls.push({
            loc: `${SITE_URL}/providers/${p.slug}`,
            lastmod: p.updated_at,
            images: img ? [{ loc: img, title: p.name }] : undefined,
          });
        }

        return sitemapResponse(buildUrlsetXml(urls));
      },
    },
  },
});
