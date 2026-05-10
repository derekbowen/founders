import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { getCurrentWorkspace } from "@/server/workspace.functions";
import {
  listWorkspaceApiKeys,
  saveWorkspaceApiKey,
  deleteWorkspaceApiKey,
  type ApiKeyStatus,
} from "@/server/workspace-api-keys.functions";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/account/settings" as never)({
  head: () =>
    buildMeta({ title: "Workspace settings — founders.click", description: "Manage your workspace API keys and settings.", path: "/account/settings" }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/auth", search: { mode: "signin", redirect: "/account/settings" } as never });
    }
  },
  loader: async () => {
    try {
      const [wsResult, keysResult] = await Promise.all([
        getCurrentWorkspace(),
        listWorkspaceApiKeys(),
      ]);
      return { ...wsResult, keys: keysResult.keys };
    } catch {
      return { workspace: null as any, needsOnboarding: false, keys: [] as ApiKeyStatus[] };
    }
  },
  component: AccountSettings,
});

function AccountSettings() {
  const loaderData = Route.useLoaderData() as any;
  const workspace = loaderData?.workspace ?? null;
  const keys: ApiKeyStatus[] = loaderData?.keys ?? [];

  if (!workspace) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <p className="text-muted-foreground">No workspace found. Complete onboarding first.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Workspace settings</h1>
        <p className="text-sm text-muted-foreground mb-8">{workspace.name}</p>

        <ApiKeysSection keys={keys} />
      </main>
      <SiteFooter />
    </div>
  );
}

function ApiKeysSection({ keys }: { keys: ApiKeyStatus[] }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">API keys (optional)</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          By default your workspace uses the founders.click shared API quota. Enter your own
          keys to use your own accounts for AI generation and web scraping.
        </p>
      </div>
      <div className="space-y-3">
        {keys.map((k) => (
          <ApiKeyCard key={k.provider} status={k} />
        ))}
      </div>
    </section>
  );
}

function ApiKeyCard({ status }: { status: ApiKeyStatus }) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [localStatus, setLocalStatus] = React.useState(status);

  const handleSave = async () => {
    if (!value.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await saveWorkspaceApiKey({
        data: { provider: localStatus.provider, api_key: value.trim() },
      });
      if (!res.ok) throw new Error((res as any).error ?? "Save failed");
      setLocalStatus({
        ...localStatus,
        configured: true,
        masked: `${value.trim().slice(0, 8)}${"•".repeat(20)}`,
      });
      setValue("");
      setEditing(false);
    } catch (e: any) {
      setError(e?.message ?? "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await deleteWorkspaceApiKey({ data: { provider: localStatus.provider } });
      if (!res.ok) throw new Error((res as any).error ?? "Delete failed");
      setLocalStatus({ ...localStatus, configured: false, masked: null });
      setEditing(false);
    } catch (e: any) {
      setError(e?.message ?? "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{localStatus.name}</span>
            {localStatus.configured ? (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Custom key
              </span>
            ) : (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                Shared
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{localStatus.hint}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {localStatus.configured && !editing && (
            <button
              onClick={handleDelete}
              disabled={busy}
              className="text-xs text-destructive hover:underline disabled:opacity-50"
            >
              Remove
            </button>
          )}
          <button
            onClick={() => setEditing((e) => !e)}
            className="text-xs font-medium rounded-md border border-border px-2.5 py-1.5 hover:bg-muted disabled:opacity-50"
            disabled={busy}
          >
            {editing ? "Cancel" : localStatus.configured ? "Replace" : "Add key"}
          </button>
        </div>
      </div>

      {localStatus.configured && !editing && (
        <p className="font-mono text-xs text-muted-foreground">{localStatus.masked}</p>
      )}

      {editing && (
        <div className="flex gap-2 pt-1">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Paste your ${localStatus.name} key…`}
            className="flex-1 min-w-0 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <button
            onClick={handleSave}
            disabled={busy || !value.trim()}
            className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
