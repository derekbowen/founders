import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-layout";
import {
  getCustomerPage,
  updateCustomerPage,
  type CustomerPageDetail,
} from "@/server/customer-content.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/app/pages/$id/edit")({
  head: ({ params }) => ({
    meta: [
      { title: `Edit page ${params.id} — founders.click` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: EditPageRoute,
});

function EditPageRoute() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [page, setPage] = React.useState<CustomerPageDetail | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState("");
  const [seoTitle, setSeoTitle] = React.useState("");
  const [seoDescription, setSeoDescription] = React.useState("");
  const [body, setBody] = React.useState("");
  const [status, setStatus] = React.useState<"published" | "draft">("published");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    void (async () => {
      try {
        const { page: p } = await getCustomerPage({ data: { id } });
        if (!p) {
          setLoadError("Page not found.");
          return;
        }
        setPage(p);
        setTitle(p.title || "");
        setSeoTitle(p.seo_title || "");
        setSeoDescription(p.seo_description || "");
        setBody(p.body_markdown || "");
        setStatus((p.status as "published" | "draft") || "published");
      } catch (e: any) {
        setLoadError(e?.message ?? "Failed to load page.");
      }
    })();
  }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCustomerPage({
        data: {
          id,
          title: title.trim(),
          seo_title: seoTitle.trim(),
          seo_description: seoDescription.trim(),
          body_markdown: body,
          status,
        },
      });
      toast.success("Saved");
      await navigate({ to: "/app/pages" });
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold">Edit page</h1>
            {page?.url_path && (
              <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                {page.url_path}
              </p>
            )}
          </div>
          <Link
            to="/app/pages"
            className="shrink-0 text-sm text-muted-foreground hover:underline"
          >
            ← Pages
          </Link>
        </div>

        {loadError && (
          <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {loadError}
          </div>
        )}

        {page && (
          <form
            onSubmit={onSave}
            className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <label className="block text-sm font-medium">Title (H1)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">SEO title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                maxLength={70}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {seoTitle.length}/70 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">SEO description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                maxLength={200}
                rows={2}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {seoDescription.length}/200 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">Body (Markdown)</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={24}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {body.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                className="mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="published">Published</option>
                <option value="draft">Draft (not visible publicly)</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
              <Link
                to="/app/pages"
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
