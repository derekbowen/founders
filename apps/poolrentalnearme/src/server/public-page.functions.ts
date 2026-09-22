import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { marked } from "marked";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ─────────────────────────────────────────────────────────────────────────────
// Public /p/$slug rendering.
//
// Resolves the requesting hostname to a workspace, then loads the matching
// content_pages row. Customers install a reverse-proxy on their Sharetribe
// marketplace ("their-domain.com/p/* -> founders.click/p/*"). The host header
// they forward is what tells us which workspace's content to serve.
//
// Resolution order:
//   1. X-Forwarded-Host (set by the customer's reverse-proxy edge)
//   2. Host
//   3. Fallback to the PRNM workspace (so founders.click's own /p/ pages keep
//      working when no proxy is in front of us)
// ─────────────────────────────────────────────────────────────────────────────

const PRNM_FALLBACK_DOMAIN = "poolrentalnearme.online";

function normalizeHost(raw: string | null | undefined): string | null {
  if (!raw) return null;
  // X-Forwarded-Host can contain a comma-separated chain; take the first.
  const first = raw.split(",")[0].trim();
  if (!first) return null;
  return first
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");
}

function readIncomingHost(): string | null {
  const xfh = normalizeHost(getRequestHeader("x-forwarded-host"));
  if (xfh) return xfh;
  return normalizeHost(getRequestHeader("host"));
}

export type PublicPage = {
  workspace: { id: string; slug: string; name: string };
  page: {
    title: string | null;
    seo_title: string | null;
    seo_description: string | null;
    hero_image_url: string | null;
    body_html: string;
    url_path: string;
    updated_at: string;
  };
};

const _PublicPageInput = z.object({ slug: z.string().min(1).max(200) });

export const getPublicPage = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => _PublicPageInput.parse(d))
  .handler(async ({ data }): Promise<PublicPage | null> => {
    const sb = supabaseAdmin as any;
    const host = readIncomingHost();

    // 1) Resolve workspace from host (verified domain match).
    let workspace: { id: string; slug: string; name: string } | null = null;
    if (host) {
      const { data: w } = await sb
        .from("workspaces")
        .select("id, slug, name")
        .eq("marketplace_domain", host)
        .maybeSingle();
      if (w) workspace = w;
    }

    // 2) Fall back to PRNM workspace (covers founders.click's own host and
    // any local/staging hostname that doesn't match a customer).
    if (!workspace) {
      const { data: w } = await sb
        .from("workspaces")
        .select("id, slug, name")
        .eq("marketplace_domain", PRNM_FALLBACK_DOMAIN)
        .maybeSingle();
      if (w) workspace = w;
    }

    if (!workspace) return null;

    const url_path = `/p/${data.slug}`;
    const { data: page } = await sb
      .from("content_pages")
      .select(
        "title, seo_title, seo_description, hero_image_url, body_markdown, url_path, updated_at, status",
      )
      .eq("workspace_id", workspace.id)
      .eq("url_path", url_path)
      .eq("status", "published")
      .maybeSingle();

    if (!page) return null;

    const body_html = page.body_markdown
      ? (marked.parse(page.body_markdown, { async: false, gfm: true, breaks: false }) as string)
      : "";

    return {
      workspace,
      page: {
        title: page.title,
        seo_title: page.seo_title,
        seo_description: page.seo_description,
        hero_image_url: page.hero_image_url,
        body_html,
        url_path: page.url_path,
        updated_at: page.updated_at,
      },
    };
  });
