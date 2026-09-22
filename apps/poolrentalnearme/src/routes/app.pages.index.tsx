import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-layout";
import {
  listCustomerPages,
  deleteCustomerPage,
  type CustomerPageRow,
} from "@/server/customer-content.functions";
import { Sparkles, ExternalLink, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/pages/")({
  head: () => ({
    meta: [
      { title: "Pages — founders.click" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PagesIndex,
});

function PagesIndex() {
  const [rows, setRows] = React.useState<CustomerPageRow[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const { rows } = await listCustomerPages({ data: { limit: 200 } });
      setRows(rows);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load pages.");
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  const handleDelete = async (row: CustomerPageRow) => {
    if (!confirm(`Delete "${row.title}"? This removes ${row.url_path} permanently.`)) return;
    setDeletingId(row.id);
    try {
      await deleteCustomerPage({ data: { id: row.id } });
      toast.success("Page deleted");
      await load();
    } catch (e: any) {
      toast.error(e?.message ?? "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Pages</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pages you&apos;ve published in this workspace.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/app/dashboard"
              className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm font-medium hover:bg-muted"
            >
              ← Workspace
            </Link>
            <Link
              to="/app/pages/new"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              New page
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <section className="mt-6">
          {rows === null ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : rows.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
              <p className="text-sm font-medium">No pages yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Click "New page" above to publish your first /p/ page.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border bg-card">
              {rows.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {p.url_path}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-background px-2 py-0.5 text-xs">
                    {p.status}
                  </span>
                  <div className="flex shrink-0 items-center gap-1">
                    <a
                      href={p.url_path}
                      target="_blank"
                      rel="noreferrer"
                      title="View live"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link
                      to="/app/pages/$id/edit"
                      params={{ id: p.id }}
                      title="Edit"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p)}
                      disabled={deletingId === p.id}
                      title="Delete"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
