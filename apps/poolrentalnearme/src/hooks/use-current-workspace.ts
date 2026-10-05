import { useMatch } from "@tanstack/react-router";
import type { CurrentWorkspaceResult } from "@/server/workspace.functions";

/**
 * Reads the workspace+plan loader data attached to the /admin parent route.
 * Returns `{ workspace: null, needsOnboarding: true }` if called outside the
 * admin tree.
 */
export function useCurrentWorkspace(): CurrentWorkspaceResult {
  const match = useMatch({ from: "/admin", shouldThrow: false });
  return (
    (match?.loaderData as CurrentWorkspaceResult | undefined) ?? {
      workspace: null,
      needsOnboarding: true,
    }
  );
}
