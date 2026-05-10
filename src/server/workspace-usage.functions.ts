import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getCurrentWorkspace } from "@/server/workspace.functions";
import { PLAN_FEATURES, type Plan } from "@/lib/plans";

function currentYearMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * Read the current month's page-generation count for a workspace.
 * Returns 0 when no row exists yet (first generation of the month).
 */
export async function getMonthlyPageGenerations(workspaceId: string): Promise<number> {
  const sb = supabaseAdmin as any;
  const { data, error } = await sb
    .from("workspace_usage")
    .select("page_generations")
    .eq("workspace_id", workspaceId)
    .eq("year_month", currentYearMonth())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data?.page_generations as number) ?? 0;
}

/**
 * Throws if the workspace is at/over its monthly page-generation quota.
 * Internal workspaces (PRNM team) and Enterprise (Infinity) are not gated.
 * Call this BEFORE doing the expensive AI work, not after.
 */
export async function assertWithinPageGenerationQuota(
  workspaceId: string,
  plan: Plan,
  isInternal: boolean,
): Promise<void> {
  if (isInternal) return;
  const limit = PLAN_FEATURES[plan].quotas.pageGenerationsPerMonth;
  if (!Number.isFinite(limit)) return;
  const used = await getMonthlyPageGenerations(workspaceId);
  if (used >= limit) {
    throw new Error(
      `Monthly page-generation quota reached (${used}/${limit}). Upgrade your plan in Account → Billing for a higher limit.`,
    );
  }
}

/** Atomic increment — call AFTER a successful generation. */
export async function recordPageGeneration(workspaceId: string): Promise<number> {
  const sb = supabaseAdmin as any;
  const { data, error } = await sb.rpc("increment_workspace_usage", {
    p_workspace_id: workspaceId,
    p_year_month: currentYearMonth(),
    p_delta: 1,
  });
  if (error) throw new Error(error.message);
  return (data as number) ?? 0;
}

/** Customer-facing: returns this month's usage + the current plan's limit. */
export const getMyUsage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { workspace } = await getCurrentWorkspace();
    if (!workspace) {
      return { used: 0, limit: 0, plan: "starter" as Plan, isInternal: false };
    }
    const used = await getMonthlyPageGenerations(workspace.id);
    const plan = (workspace.plan ?? "starter") as Plan;
    const limit = PLAN_FEATURES[plan].quotas.pageGenerationsPerMonth;
    return {
      used,
      limit: Number.isFinite(limit) ? limit : null,
      plan,
      isInternal: workspace.is_internal || workspace.is_super_admin,
    };
  });
