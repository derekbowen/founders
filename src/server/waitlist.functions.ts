import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const schema = z.object({
  email: z.string().trim().email().max(255),
  nearestMiles: z.number().nullable().optional(),
});

export const joinPoolWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    let city: string | null = null;
    let region: string | null = null;
    let latitude: number | null = null;
    let longitude: number | null = null;
    let userAgent: string | null = null;
    try {
      const req = getRequest() as Request & {
        cf?: { city?: string; region?: string; latitude?: string; longitude?: string };
      };
      const cf = req.cf ?? {};
      city = cf.city ?? null;
      region = cf.region ?? null;
      latitude = cf.latitude ? Number(cf.latitude) : null;
      longitude = cf.longitude ? Number(cf.longitude) : null;
      userAgent = getRequestHeader("user-agent") ?? null;
    } catch {
      // best-effort context capture
    }

    const { error } = await (supabaseAdmin as any).from("pool_waitlist").insert({
      email: data.email.toLowerCase(),
      city,
      region,
      latitude,
      longitude,
      nearest_miles: data.nearestMiles ?? null,
      user_agent: userAgent,
    });
    if (error) {
      console.error("joinPoolWaitlist insert failed:", error);
      throw new Error("Could not save your email. Please try again.");
    }
    return { ok: true };
  });
