import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireFeatureAccess } from "@/server/workspace.functions";

// ─────────────────────────────────────────────────────────────────────────────
// Per-workspace BYOK (Bring Your Own Key) for AI / scraping integrations.
//
// Resolution order when a tool needs a key:
//   1. Workspace-stored key (from workspace_api_keys table)
//   2. Server env var (PRNM's own key — used by the internal workspace and as
//      a last-resort fallback for workspaces that haven't configured their key)
//
// Customers on Growth+ plans should configure their own keys so their usage
// doesn't count against founders.click's shared API quotas.
// ─────────────────────────────────────────────────────────────────────────────

export type ApiKeyProvider = "openrouter" | "firecrawl";

const PROVIDER_ENV: Record<ApiKeyProvider, string> = {
  openrouter: "OPENROUTER_API_KEY",
  firecrawl: "FIRECRAWL_API_KEY",
};

const PROVIDER_LABELS: Record<ApiKeyProvider, { name: string; hint: string }> = {
  openrouter: {
    name: "OpenRouter",
    hint: "Used for AI content generation (Quick page builder, Generate content, Page auditor).",
  },
  firecrawl: {
    name: "Firecrawl",
    hint: "Used for web scraping (Scrape import, Competitor tracker, SERP checks).",
  },
};

/**
 * Resolves the API key for a given provider + workspace.
 * Server-only; never call this client-side.
 */
export async function resolveWorkspaceApiKey(
  workspaceId: string,
  provider: ApiKeyProvider,
): Promise<string | null> {
  const sb = supabaseAdmin as any;
  const { data } = await sb
    .from("workspace_api_keys")
    .select("api_key")
    .eq("workspace_id", workspaceId)
    .eq("provider", provider)
    .maybeSingle();
  if (data?.api_key) return data.api_key as string;
  return process.env[PROVIDER_ENV[provider]] ?? null;
}

// ─── Public server functions ─────────────────────────────────────────────────

export type ApiKeyStatus = {
  provider: ApiKeyProvider;
  name: string;
  hint: string;
  configured: boolean;
  masked: string | null;
};

export const listWorkspaceApiKeys = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ keys: ApiKeyStatus[] }> => {
    const { workspaceId } = await requireFeatureAccess(
      (context as any).userId,
      "content.quick_page",
    );
    const sb = supabaseAdmin as any;
    const { data } = await sb
      .from("workspace_api_keys")
      .select("provider, api_key")
      .eq("workspace_id", workspaceId);
    const stored = new Map<string, string>(
      ((data ?? []) as { provider: string; api_key: string }[]).map((r) => [
        r.provider,
        r.api_key,
      ]),
    );
    const keys: ApiKeyStatus[] = (["openrouter", "firecrawl"] as ApiKeyProvider[]).map(
      (p) => {
        const key = stored.get(p) ?? null;
        return {
          provider: p,
          name: PROVIDER_LABELS[p].name,
          hint: PROVIDER_LABELS[p].hint,
          configured: !!key,
          masked: key ? `${key.slice(0, 8)}${"•".repeat(20)}` : null,
        };
      },
    );
    return { keys };
  });

const _SaveInput = z.object({
  provider: z.enum(["openrouter", "firecrawl"]),
  api_key: z.string().min(8).max(512),
});

export const saveWorkspaceApiKey = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => _SaveInput.parse(d))
  .handler(async ({ data, context }) => {
    const { workspaceId } = await requireFeatureAccess(
      (context as any).userId,
      "content.quick_page",
    );
    const sb = supabaseAdmin as any;
    const { error } = await sb.from("workspace_api_keys").upsert(
      {
        workspace_id: workspaceId,
        provider: data.provider,
        api_key: data.api_key.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "workspace_id,provider" },
    );
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  });

const _DeleteInput = z.object({
  provider: z.enum(["openrouter", "firecrawl"]),
});

export const deleteWorkspaceApiKey = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => _DeleteInput.parse(d))
  .handler(async ({ data, context }) => {
    const { workspaceId } = await requireFeatureAccess(
      (context as any).userId,
      "content.quick_page",
    );
    const sb = supabaseAdmin as any;
    const { error } = await sb
      .from("workspace_api_keys")
      .delete()
      .eq("workspace_id", workspaceId)
      .eq("provider", data.provider);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  });
