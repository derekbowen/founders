import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const slugSchema = z.object({ slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/) });

export const getCity = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    const { data: city, error } = await supabaseAdmin
      .from("cities")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) console.error("getCity:", error);
    return { city: city ?? null };
  });

export const getCategory = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    const { data: category, error } = await supabaseAdmin
      .from("categories")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) console.error("getCategory:", error);
    return { category: category ?? null };
  });

export const getProvider = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    const { data: provider, error } = await supabaseAdmin
      .from("providers")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) console.error("getProvider:", error);
    return { provider: provider ?? null };
  });

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) console.error("getBlogPost:", error);
    return { post: post ?? null };
  });

export const listAllSitemapEntries = createServerFn({ method: "GET" }).handler(
  async () => {
    const [cities, categories, providers, posts] = await Promise.all([
      supabaseAdmin
        .from("cities")
        .select("slug, updated_at")
        .eq("is_published", true),
      supabaseAdmin
        .from("categories")
        .select("slug, updated_at")
        .eq("is_published", true),
      supabaseAdmin
        .from("providers")
        .select("slug, updated_at")
        .eq("is_published", true),
      supabaseAdmin
        .from("blog_posts")
        .select("slug, updated_at")
        .eq("is_published", true),
    ]);
    return {
      cities: cities.data ?? [],
      categories: categories.data ?? [],
      providers: providers.data ?? [],
      posts: posts.data ?? [],
    };
  },
);

const nearbyInputSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  state_code: z.string().length(2).optional(),
  limit: z.number().int().min(1).max(24).optional(),
});

/** Get other published cities in the same state (excluding the current one). */
export const getNearbyCities = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => nearbyInputSchema.parse(d))
  .handler(async ({ data }) => {
    let q = supabaseAdmin
      .from("cities")
      .select("slug, name, state_code")
      .eq("is_published", true)
      .neq("slug", data.slug)
      .limit(data.limit ?? 12);
    if (data.state_code) q = q.eq("state_code", data.state_code);
    const { data: rows, error } = await q;
    if (error) console.error("getNearbyCities:", error);
    return { cities: rows ?? [] };
  });

/** All published categories (slug, name, icon). */
export const listCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select("slug, name, icon")
      .eq("is_published", true)
      .order("name");
    if (error) console.error("listCategories:", error);
    return { categories: data ?? [] };
  },
);
