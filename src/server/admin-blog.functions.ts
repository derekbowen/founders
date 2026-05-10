import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireFeatureAccess } from "@/server/workspace.functions";
import { resolveWorkspaceApiKey } from "@/server/workspace-api-keys.functions";
import {
  assertWithinPageGenerationQuota,
  recordPageGeneration,
} from "@/server/workspace-usage.functions";

export type AdminBlogRow = {
  slug: string;
  title: string;
  topic: string | null;
  is_published: boolean;
  word_count: number;
  updated_at: string;
};

export const adminListBlogPosts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ rows: AdminBlogRow[] }> => {
    const { workspaceId } = await requireFeatureAccess(context.userId, "content.blog");

    const { data, error } = await (supabaseAdmin as any)
      .from("blog_posts")
      .select("slug, title, topic, is_published, content, updated_at")
      .eq("workspace_id", workspaceId)
      .order("topic", { ascending: true })
      .order("title", { ascending: true })
      .limit(500);
    if (error) throw new Error(error.message);

    const rows: AdminBlogRow[] = (data ?? []).map((r: any) => ({
      slug: r.slug,
      title: r.title,
      topic: r.topic,
      is_published: r.is_published,
      word_count: (r.content ?? "").split(/\s+/).filter(Boolean).length,
      updated_at: r.updated_at,
    }));
    return { rows };
  });

const expandSchema = z.object({
  slug: z.string().min(1).max(160),
  model: z.string().optional(),
});

export const adminExpandBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => expandSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { workspaceId, plan, isInternal } = await requireFeatureAccess(context.userId, "content.blog");
    await assertWithinPageGenerationQuota(workspaceId, plan, isInternal);

    const sb = supabaseAdmin as any;

    const { data: ws } = await sb
      .from("workspaces")
      .select("name, site_url")
      .eq("id", workspaceId)
      .maybeSingle();
    const siteName: string = ws?.name ?? "our marketplace";
    const siteUrl: string = ws?.site_url ?? "";

    const { data: post, error } = await sb
      .from("blog_posts")
      .select("slug, title, topic")
      .eq("slug", data.slug)
      .eq("workspace_id", workspaceId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!post) throw new Error("Post not found");

    const apiKey = await resolveWorkspaceApiKey(workspaceId, "openrouter");
    if (!apiKey) throw new Error("OpenRouter API key not configured — add it in Workspace Settings.");

    const model = data.model || "google/gemini-3-flash-preview";
    const system =
      `You are an expert SEO content writer for a marketplace called "${siteName}"${siteUrl ? ` (${siteUrl})` : ""}. Write authoritative, useful, original articles in clear American English. Avoid fluff. Prefer concrete numbers, steps, and lists.`;
    const userPrompt = `Write a comprehensive 800-1000 word SEO blog post.
Title: ${post.title}
Category: ${post.topic ?? "General"}
Audience: potential customers of ${siteName}.
Structure: H1 matching the title, 4-6 H2 sections, end with an FAQ (3-5 Q/A) and a short call-to-action mentioning ${siteName}.
No external links.

Return ONLY valid JSON with this exact shape:
{"seo_title": string (<=60 chars), "seo_description": string (<=160 chars), "excerpt": string (<=200 chars), "content_markdown": string}`;

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (resp.status === 429) throw new Error("Rate limited by AI gateway. Try again in a minute.");
    if (resp.status === 402) throw new Error("AI credits exhausted. Add funds in Workspace > Usage.");
    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      throw new Error(`AI gateway error ${resp.status}: ${t.slice(0, 200)}`);
    }
    const json = await resp.json();
    const text: string = json?.choices?.[0]?.message?.content ?? "";
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { content_markdown: text };
    }

    const update: {
      updated_at: string;
      content?: string;
      excerpt?: string;
      seo_title?: string;
      seo_description?: string;
    } = { updated_at: new Date().toISOString() };
    if (parsed.content_markdown) update.content = String(parsed.content_markdown);
    if (parsed.excerpt) update.excerpt = String(parsed.excerpt).slice(0, 280);
    if (parsed.seo_title) update.seo_title = String(parsed.seo_title).slice(0, 60);
    if (parsed.seo_description) update.seo_description = String(parsed.seo_description).slice(0, 160);

    const { error: upErr } = await sb
      .from("blog_posts")
      .update(update)
      .eq("slug", data.slug)
      .eq("workspace_id", workspaceId);
    if (upErr) throw new Error(upErr.message);

    if (!isInternal) {
      await recordPageGeneration(workspaceId).catch(() => {});
    }

    const wc = String(update.content ?? "").split(/\s+/).filter(Boolean).length;
    return { ok: true, word_count: wc };
  });
