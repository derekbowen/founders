import { createFileRoute } from "@tanstack/react-router";
import { backfillContentPages } from "@/server/backfill-content-pages.functions";

/**
 * POST /api/public/admin/backfill-content-pages
 * Body: { adminToken, limit?, model?, dryRun? }
 * adminToken must equal BACKFILL_ADMIN_TOKEN (or SUPABASE_SERVICE_ROLE_KEY fallback).
 */
export const Route = createFileRoute("/api/public/backfill-content-pages")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: any;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        try {
          // Inject the server-side admin token so the route is callable from
          // trusted server contexts without exposing the secret to clients.
          const adminToken =
            body?.adminToken ||
            process.env.BACKFILL_ADMIN_TOKEN ||
            process.env.SUPABASE_SERVICE_ROLE_KEY;
          const result = await backfillContentPages({
            data: { ...body, adminToken },
          });
          return new Response(JSON.stringify(result, null, 2), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          return new Response(JSON.stringify({ error: msg }), {
            status: msg === "Unauthorized" ? 401 : 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
