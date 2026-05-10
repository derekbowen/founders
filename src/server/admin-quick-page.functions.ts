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

/**
 * Admin "quick page" creator. The user types a title, optional short
 * description, and a "what should this page be about" prompt. We send that
 * to the Lovable AI gateway, get back a fully-formed markdown page, and
 * insert it into content_pages as a published /p/{slug}.
 *
 * Writes scope to the caller's active workspace, so each customer's pages
 * land in their own /p/* namespace (resolved at render time by host header).
 */

const InputSchema = z.object({
  title: z.string().trim().min(3).max(140),
  description: z.string().trim().max(500).optional().default(""),
  topic: z.string().trim().min(10).max(2000),
  model: z.string().default("openai/gpt-5"),
  slug: z.string().trim().max(120).optional(),
});

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// PRNM has a hand-crafted brand voice + internal-link map. New customer
// workspaces get a generic-but-useful prompt until per-workspace prompt
// settings ship.
const PRNM_SYSTEM = `
You write SEO + brand content for Pool Rental Near Me (PRNM), a marketplace where homeowners rent out private pools by the hour.
Differentiators (mention naturally where it fits): 10% flat host fee (vs Swimply's 15%+), $2M liability insurance included, AI-built features same day on request.
Voice: confident, friendly, host-first, never spammy. Short paragraphs. Real, useful copy — no filler, no "in this article we will".
Format: Markdown only. Use ## and ### headings. Include 3-5 internal links naturally where relevant from this set:
  /s, /p/hosting, /p/all-locations, /p/earnings-calculator, /p/how-it-works, /p/sign-a-waiver, /p/hoa-pool-rental-defense-kit
List Your Pool CTA URL: /l/draft/00000000-0000-0000-0000-000000000000/new/details
Always end with a short CTA paragraph linking to the List Your Pool URL OR /s, whichever fits.
Return your answer ONLY by calling the write_page tool.
`.trim();

function genericSystemPrompt(workspaceName: string): string {
  return `
You write SEO + brand content for ${workspaceName}, a Sharetribe marketplace.
Voice: confident, friendly, customer-first, never spammy. Short paragraphs. Real, useful copy — no filler, no "in this article we will".
Format: Markdown only. Use ## and ### headings. Aim for 600-1200 words.
End with a short CTA paragraph that drives a relevant action on the marketplace.
Return your answer ONLY by calling the write_page tool.
`.trim();
}

const TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "write_page",
    description: "Return the generated page content.",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string" },
        seo_title: { type: "string", description: "≤60 chars" },
        seo_description: { type: "string", description: "≤155 chars" },
        body_markdown: { type: "string", description: "Full markdown body, 600-1200 words, no frontmatter" },
      },
      required: ["title", "seo_title", "seo_description", "body_markdown"],
      additionalProperties: false,
    },
  },
};

export const createQuickPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { workspaceId, plan, isInternal } = await requireFeatureAccess(
      context.userId,
      "content.quick_page",
    );

    await assertWithinPageGenerationQuota(workspaceId, plan, isInternal);

    const apiKey = await resolveWorkspaceApiKey(workspaceId, "openrouter");
    if (!apiKey) throw new Error("OpenRouter API key not configured — add it in Workspace Settings or contact support.");

    const sb = supabaseAdmin as any;
    const { data: ws } = await sb
      .from("workspaces")
      .select("name, slug")
      .eq("id", workspaceId)
      .single();
    const isPrnm = ws?.slug === "pool-rental-near-me";
    const SYSTEM = isPrnm ? PRNM_SYSTEM : genericSystemPrompt(ws?.name ?? "your marketplace");

    const baseSlug = slugify(data.slug || data.title);
    if (!baseSlug) throw new Error("Could not derive slug from title");

    // Slug uniqueness is per-workspace — different customers can each have
    // /p/hosting, /p/about, etc. without collision.
    let slug = baseSlug;
    let suffix = 1;
    while (true) {
      const { data: existing } = await sb
        .from("content_pages")
        .select("id")
        .eq("workspace_id", workspaceId)
        .eq("url_path", `/p/${slug}`)
        .maybeSingle();
      if (!existing) break;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
      if (suffix > 50) throw new Error("Could not find a unique slug");
    }

    const subjectLabel = isPrnm ? "PRNM" : ws?.name ?? "your marketplace";
    const userPrompt = `Write a brand page for ${subjectLabel}.

Title (H1): "${data.title}"
${data.description ? `One-line summary the admin gave: "${data.description}"` : ""}

What this page should be about (interpret literally and build the article around this):
${data.topic}

Length: 600-1200 words.
Use ## for the main sections and ### for sub-points. Lead with a strong opening that gets right into the value — no fluff.
seo_title (≤60 chars) and seo_description (≤155 chars) optimized for the topic.`;

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: data.model,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userPrompt },
        ],
        tools: [TOOL_SCHEMA],
        tool_choice: { type: "function", function: { name: "write_page" } },
      }),
    });

    if (resp.status === 402) {
      throw new Error("AI credits exhausted. Add funds in Workspace → Usage.");
    }
    if (!resp.ok) {
      const t = await resp.text();
      throw new Error(`AI gateway ${resp.status}: ${t.slice(0, 300)}`);
    }
    const json = await resp.json();
    const tc = json?.choices?.[0]?.message?.tool_calls?.[0];
    if (!tc?.function?.arguments) throw new Error("AI response missing tool call");
    const gen = JSON.parse(tc.function.arguments) as {
      title: string;
      seo_title: string;
      seo_description: string;
      body_markdown: string;
    };
    if (!gen.body_markdown || gen.body_markdown.length < 300) {
      throw new Error(`Generated body too short (${gen.body_markdown?.length ?? 0} chars)`);
    }

    const url_path = `/p/${slug}`;
    const { data: inserted, error: insErr } = await sb
      .from("content_pages")
      .insert({
        workspace_id: workspaceId,
        slug,
        url_path,
        // source_url is required (NOT NULL UNIQUE) — synthesize one for
        // newly authored pages. Includes workspace_id so different
        // customers can each create /p/<same-slug>.
        source_url: `quickpage://${workspaceId}${url_path}`,
        title: gen.title || data.title,
        seo_title: (gen.seo_title || data.title).slice(0, 70),
        seo_description: (gen.seo_description || data.description || "").slice(0, 160),
        body_markdown: gen.body_markdown,
        category: "Resource/Article Page",
        template_type: "resource",
        status: "published",
        in_sitemap: true,
        locale: "en",
        priority: 0,
      })
      .select("id, url_path, title, slug")
      .single();
    if (insErr) throw new Error(insErr.message);

    if (!isInternal) {
      await recordPageGeneration(workspaceId).catch(() => {});
    }

    return {
      ok: true,
      page: inserted,
      words: gen.body_markdown.split(/\s+/).length,
    };
  });
