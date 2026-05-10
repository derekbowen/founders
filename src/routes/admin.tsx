import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentWorkspace } from "@/server/workspace.functions";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/admin") {
      throw redirect({ to: "/admin/dashboard", replace: true });
    }
  },
  loader: async () => {
    // Fetch the user's workspace so the sidebar can show plan + lock badges.
    // Auth-failure path: fall back to "needs onboarding" rather than crashing
    // the whole admin shell. Each admin route still does its own auth check.
    let result;
    try {
      result = await getCurrentWorkspace();
    } catch {
      result = { workspace: null, needsOnboarding: true } as const;
    }
    // Authenticated user without a workspace can't usefully see /admin/*.
    // Send them through onboarding instead of letting routes throw "No workspace".
    if (result.needsOnboarding) {
      throw redirect({ to: "/onboarding", search: { plan: "growth" } as never });
    }
    return result;
  },
  component: () => <Outlet />,
});
