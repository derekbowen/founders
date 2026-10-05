import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { type Feature, type Plan, featureUnlocked, PLAN_FEATURES } from "@/lib/plans";

// ─────────────────────────────────────────────────────────────────────────────
// Workspace + plan helpers.
//
// Phase 1 model: each user has at most one workspace they actively use. We
// pick it by:
//   1. Most recently joined workspace they're a member of, OR
//   2. null if they're authenticated but haven't onboarded yet (Stripe
//      checkout creates the workspace).
//
// Super-admins (user_roles.role = 'admin') get the PRNM workspace by default
// so the founders.click team's existing /admin/* access keeps working.
// ─────────────────────────────────────────────────────────────────────────────

export type CurrentWorkspace = {
  id: string;
  slug: string;
  name: string;
  marketplace_domain: string | null;
  plan: Plan;
  subscription_status: string;
  trial_ends_at: string | null;
  current_period_end: string | null;
  is_internal: boolean;
  role: "owner" | "editor";
  is_super_admin: boolean;
};

export type CurrentWorkspaceResult = {
  workspace: CurrentWorkspace | null;
  needsOnboarding: boolean;
};

export const getCurrentWorkspace = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CurrentWorkspaceResult> => {
    const { userId } = context as { userId: string };
    const sb = supabaseAdmin as any;

    const { data: roleRow } = await sb
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    const isSuperAdmin = !!roleRow;

    // Find the user's most recent membership.
    const { data: memberships } = await sb
      .from("workspace_members")
      .select(
        "role, created_at, workspaces!inner(id, slug, name, marketplace_domain, plan, subscription_status, trial_ends_at, current_period_end, is_internal)",
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    let row = memberships?.[0];

    // Super-admins without explicit membership: surface PRNM (already seeded
    // in the migration with owner-membership for every existing super-admin,
    // but this covers admins added after the seed ran).
    if (!row && isSuperAdmin) {
      const { data: prnm } = await sb
        .from("workspaces")
        .select(
          "id, slug, name, marketplace_domain, plan, subscription_status, trial_ends_at, current_period_end, is_internal",
        )
        .eq("slug", "pool-rental-near-me")
        .maybeSingle();
      if (prnm) row = { role: "owner", workspaces: prnm } as any;
    }

    if (!row) return { workspace: null, needsOnboarding: true };

    const w = row.workspaces;
    return {
      workspace: {
        id: w.id,
        slug: w.slug,
        name: w.name,
        marketplace_domain: w.marketplace_domain ?? null,
        plan: w.plan as Plan,
        subscription_status: w.subscription_status,
        trial_ends_at: w.trial_ends_at,
        current_period_end: w.current_period_end,
        is_internal: w.is_internal,
        role: row.role,
        is_super_admin: isSuperAdmin,
      },
      needsOnboarding: false,
    };
  });

/**
 * Server-side gate. Throws if the user can't access `feature` in their current
 * workspace. Internal workspaces (founders.click team) bypass plan gating.
 *
 * Super-admins also bypass — they're operators, not customers.
 */
export async function requireFeatureAccess(
  userId: string,
  feature: Feature,
): Promise<{ workspaceId: string; plan: Plan }> {
  const sb = supabaseAdmin as any;

  const { data: roleRow } = await sb
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (roleRow) {
    // Super-admin: resolve to PRNM workspace for any volume metering.
    const { data: prnm } = await sb
      .from("workspaces")
      .select("id, plan")
      .eq("slug", "pool-rental-near-me")
      .maybeSingle();
    return { workspaceId: prnm?.id ?? "", plan: (prnm?.plan as Plan) ?? "enterprise" };
  }

  const { data: memberships } = await sb
    .from("workspace_members")
    .select("workspaces!inner(id, plan, is_internal, subscription_status)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  const w = memberships?.[0]?.workspaces;
  if (!w) {
    throw new Error("No workspace — finish onboarding first.");
  }
  if (w.is_internal) {
    return { workspaceId: w.id, plan: w.plan as Plan };
  }
  // Block past_due / canceled / unpaid / paused / incomplete customers from
  // gated server fns until they renew. UI elsewhere (account/billing) can
  // show the renew flow without going through this gate.
  const ACTIVE_STATUSES = new Set(["trialing", "active"]);
  if (!ACTIVE_STATUSES.has(w.subscription_status as string)) {
    throw new Error(
      `Subscription is ${w.subscription_status}. Renew billing to continue using this feature.`,
    );
  }
  if (!featureUnlocked(w.plan as Plan, feature)) {
    const planName = PLAN_FEATURES[w.plan as Plan].name;
    throw new Error(
      `Feature "${feature}" not available on the ${planName} plan. Upgrade to unlock.`,
    );
  }
  return { workspaceId: w.id, plan: w.plan as Plan };
}

const _SwitchInput = z.object({ workspaceId: z.string().uuid() });

export const switchWorkspace = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => _SwitchInput.parse(d))
  .handler(async ({ context, data }) => {
    // Phase-1 stub: real "active workspace" switching for users with multiple
    // memberships ships in phase 2. For now we just validate the user is a
    // member.
    const { userId } = context as { userId: string };
    const sb = supabaseAdmin as any;
    const { data: row } = await sb
      .from("workspace_members")
      .select("workspace_id")
      .eq("user_id", userId)
      .eq("workspace_id", data.workspaceId)
      .maybeSingle();
    if (!row) throw new Error("Not a member of that workspace.");
    return { ok: true };
  });
