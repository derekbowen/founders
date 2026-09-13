import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { checkAdminRole } from "@/server/admin-auth.functions";
import { getCurrentWorkspace } from "@/server/workspace.functions";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/admin") {
      throw redirect({ to: "/admin/dashboard", replace: true });
    }
    // Skip auth on SSR — checks happen client-side after hydration.
    if (typeof window === "undefined") return;
    // /admin/no-access renders its own messaging for signed-in non-admins;
    // gating it here would cause a redirect loop.
    if (path === "/admin/no-access") return;

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/auth",
        search: { redirect: location.pathname, mode: "signin" },
      });
    }
    const { isAdmin } = await checkAdminRole();
    if (!isAdmin) {
      throw redirect({ to: "/admin/no-access", replace: true });
    }
  },
  loader: async () => {
    // Fetch the user's workspace so the sidebar can show plan + lock badges.
    // Auth-failure path: fall back to "needs onboarding" rather than crashing
    // the whole admin shell. Each admin route still does its own auth check.
    try {
      return await getCurrentWorkspace();
    } catch {
      return { workspace: null, needsOnboarding: true } as const;
    }
  },
  component: () => <Outlet />,
});
