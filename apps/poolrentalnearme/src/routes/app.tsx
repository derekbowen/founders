import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentWorkspace } from "@/server/workspace.functions";

// Parent route for customer-facing tooling. Independent of /admin/* which is
// PRNM-staff-only. Auth + workspace required, subscription must be active.
export const Route = createFileRoute("/app")({
  beforeLoad: async ({ location }) => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/app") {
      throw redirect({ to: "/app/dashboard", replace: true });
    }
    if (typeof window === "undefined") return;

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/auth",
        search: { redirect: location.pathname, mode: "signin" },
      });
    }
    const result = await getCurrentWorkspace();
    if (result.needsOnboarding || !result.workspace) {
      throw redirect({ to: "/onboarding", search: { plan: "growth" } });
    }
    // Customers with a paused/canceled/past_due/incomplete sub get bounced to
    // billing to renew. Super-admins on the PRNM workspace pass through (PRNM
    // is seeded with subscription_status='active').
    const ACTIVE = new Set(["trialing", "active"]);
    if (!ACTIVE.has(result.workspace.subscription_status)) {
      throw redirect({ to: "/account/billing" });
    }
  },
  loader: async () => await getCurrentWorkspace(),
  component: () => <Outlet />,
});
