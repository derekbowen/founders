import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireFeatureAccess } from "@/server/workspace.functions";
import { resolveWorkspaceApiKey } from "@/server/workspace-api-keys.functions";

/** Distinct template_types present in the workspace's content_pages table. */
export const listTemplateTypes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { workspaceId } = await requireFeatureAccess(context.userId, "content.migration");
    const { data, error } = await (supabaseAdmin as any)
      .from("content_pages")
      .select("template_type")
      .eq("workspace_id", workspaceId)
      .not("template_type", "is", null);
    if (error) throw new Error(error.message);
    const types: string[] = [...new Set<string>((data ?? []).map((r: any) => r.template_type as string))].sort();
    return { types };
  });

/**
 * Scrape a single content_pages row via Firecrawl and store raw_html +
 * body_markdown for human review. Idempotent — overwrites prior scrape data
 * but keeps status="pending" so a second admin step promotes it to "drafted".
 *
 * Auth: feature-gated (seo.scrape_import). All queries scoped to the caller's
 * workspace so customers can only touch their own pages.
 */

const FIRECRAWL_URL = "https://api.firecrawl.dev/v2/scrape";

async function firecrawlScrape(url: string, apiKey: string) {
  if (!apiKey) throw new Error("Firecrawl API key is not configured");

  const res = await fetch(FIRECRAWL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["markdown", "html"],
      onlyMainContent: true,
    }),
  });

  const json = (await res.json().catch(() => null)) as any;
  if (!res.ok) {
    throw new Error(
      `Firecrawl scrape failed [${res.status}]: ${JSON.stringify(json)}`,
    );
  }
  // SDK/REST shape: data may be at top level or under data
  const doc = json?.data ?? json;
  return {
    markdown: (doc?.markdown ?? null) as string | null,
    html: (doc?.html ?? doc?.rawHtml ?? null) as string | null,
    metadata: doc?.metadata ?? null,
  };
}

/**
 * Scrape one row by id. Returns the updated row so the admin UI can preview.
 */
export const scrapeContentPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { workspaceId } = await requireFeatureAccess(context.userId, "seo.scrape_import");
    const apiKey = await resolveWorkspaceApiKey(workspaceId, "firecrawl");
    if (!apiKey) throw new Error("Firecrawl API key is not configured");

    const { data: row, error: fetchErr } = await (supabaseAdmin as any)
      .from("content_pages")
      .select("id, source_url, title, status")
      .eq("id", data.id)
      .eq("workspace_id", workspaceId)
      .maybeSingle();
    if (fetchErr) throw new Error(fetchErr.message);
    if (!row) throw new Error("content_pages row not found");

    const { markdown, html, metadata } = await firecrawlScrape(
      (row as any).source_url,
      apiKey,
    );

    const meta = (metadata ?? {}) as { title?: string; description?: string };
    const update = {
      raw_html: html,
      body_markdown: markdown,
      scraped_at: new Date().toISOString(),
      status: "scraped",
      ...(!(row as any).title && meta.title ? { title: meta.title } : {}),
      ...(meta.description ? { seo_description: meta.description } : {}),
    };

    const { data: updated, error: upErr } = await (supabaseAdmin as any)
      .from("content_pages")
      .update(update)
      .eq("id", data.id)
      .eq("workspace_id", workspaceId)
      .select("*")
      .single();
    if (upErr) throw new Error(upErr.message);

    return { page: updated };
  });

/**
 * Pick the next pending host_acq_city row (or any template_type if specified)
 * for one-at-a-time review. Lower priority value = processed first.
 */
export const nextPendingPage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        template_type: z.string().default("host_acq_city"),
      })
      .parse(data ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { workspaceId } = await requireFeatureAccess(context.userId, "seo.scrape_import");

    const { data: row, error } = await (supabaseAdmin as any)
      .from("content_pages")
      .select("id, url_path, slug, source_url, title, status, template_type")
      .eq("workspace_id", workspaceId)
      .eq("template_type", data.template_type)
      .eq("status", "pending")
      .order("priority", { ascending: true })
      .order("url_path", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);

    return { page: row };
  });

/**
 * Counts of pending vs scraped rows for a given template_type so the admin
 * UI can show a live progress bar during a scrape run.
 */
export const scrapeProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({ template_type: z.string().default("host_acq_city") })
      .parse(data ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { workspaceId } = await requireFeatureAccess(context.userId, "seo.scrape_import");
    const sb = supabaseAdmin as any;

    const [pendingRes, scrapedRes, totalRes] = await Promise.all([
      sb.from("content_pages").select("id", { count: "exact", head: true })
        .eq("workspace_id", workspaceId).eq("template_type", data.template_type).eq("status", "pending"),
      sb.from("content_pages").select("id", { count: "exact", head: true })
        .eq("workspace_id", workspaceId).eq("template_type", data.template_type).eq("status", "scraped"),
      sb.from("content_pages").select("id", { count: "exact", head: true })
        .eq("workspace_id", workspaceId).eq("template_type", data.template_type),
    ]);

    if (pendingRes.error) throw new Error(pendingRes.error.message);
    if (scrapedRes.error) throw new Error(scrapedRes.error.message);
    if (totalRes.error) throw new Error(totalRes.error.message);

    return {
      pending: pendingRes.count ?? 0,
      scraped: scrapedRes.count ?? 0,
      total: totalRes.count ?? 0,
    };
  });
