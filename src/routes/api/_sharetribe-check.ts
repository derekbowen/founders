import { createFileRoute } from "@tanstack/react-router";
import { searchListings } from "@/server/sharetribe.server";

const DEBUG_TOKEN = "lovable-st-check-2026";

export const Route = createFileRoute("/api/_sharetribe-check")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (request.headers.get("x-debug-token") !== DEBUG_TOKEN) {
          return new Response("forbidden", { status: 403 });
        }
        try {
          const result = await searchListings({ perPage: 3 });
          return Response.json({
            ok: true,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            sample: result.listings.map((l) => ({
              id: l.id,
              title: l.title,
              city: l.city,
              state: l.state,
              hasImage: !!l.imageUrl,
            })),
          });
        } catch (err) {
          return Response.json(
            { ok: false, error: err instanceof Error ? err.message : String(err) },
            { status: 500 },
          );
        }
      },
    },
  },
});
