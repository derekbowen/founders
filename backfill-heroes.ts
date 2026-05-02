#!/usr/bin/env bun
import Firecrawl from "@mendable/firecrawl-js";
import { createClient } from "@supabase/supabase-js";

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY!;
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const client = new Firecrawl({ apiKey: FIRECRAWL_API_KEY });
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SOURCE_KEY_OVERRIDES: Record<string, string> = {
  "kansas-city-mo": "kansascity",
  "kansas-city-ks": "kansascityks",
  "saint-petersburg-fl": "stpetersburg",
  "saint-paul-mn": "stpaul",
  "saint-louis-mo": "stlouis",
  "saint-augustine-fl": "staugustine",
  "fort-lauderdale-fl": "fortlauderdale",
  "fort-worth-tx": "fortworth",
  "fort-myers-fl": "fortmyers",
  "fort-collins-co": "fortcollins",
  "las-vegas-nv": "lasvegas",
  "los-angeles-ca": "losangeles",
  "san-diego-ca": "sandiego",
  "san-francisco-ca": "sanfrancisco",
  "san-jose-ca": "sanjose",
  "san-antonio-tx": "sanantonio",
  "new-york-ny": "newyork",
  "new-orleans-la": "neworleans",
};

function deriveSourceKey(slug: string, name: string) {
  return SOURCE_KEY_OVERRIDES[slug] ?? name.toLowerCase().replace(/[^a-z]/g, "");
}

function extractHeroUrl(html: string): string | null {
  if (!html) return null;
  const re =
    /https:\/\/sharetribe-assets\.imgix\.net\/[A-Za-z0-9._\/-]+\?[^"'\s)]+/g;
  const candidates: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    candidates.push(m[0].replace(/&amp;/g, "&").replace(/\\u0026/g, "&"));
  }
  if (!candidates.length) return null;
  const isLarge = (u: string) => {
    const w = Number(u.match(/[?&]w=(\d+)/)?.[1] ?? 0);
    const h = Number(u.match(/[?&]h=(\d+)/)?.[1] ?? 0);
    return w >= 800 || h >= 500;
  };
  return candidates.find(isLarge) ?? candidates[0];
}

function normalize(url: string) {
  try {
    const u = new URL(url);
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    u.searchParams.set("w", "1600");
    u.searchParams.set("h", "900");
    return u.toString();
  } catch {
    return url;
  }
}

async function scrape(slug: string, name: string) {
  const key = deriveSourceKey(slug, name);
  const sourceUrl = `https://www.poolrentalnearme.com/p/${key}`;
  try {
    const res: any = await client.scrape(sourceUrl, {
      formats: ["html"],
      onlyMainContent: false,
      waitFor: 3000,
    });
    const html: string = res.html ?? res.data?.html ?? "";
    const heroRaw = extractHeroUrl(html);
    if (!heroRaw) return { slug, name, sourceUrl, status: "miss" as const };
    const hero = normalize(heroRaw);
    return { slug, name, sourceUrl, status: "ok" as const, hero };
  } catch (e) {
    return {
      slug,
      name,
      sourceUrl,
      status: "error" as const,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : undefined;
  const slugsArg = args.find((a) => a.startsWith("--slugs="));
  const onlySlugs = slugsArg ? slugsArg.split("=")[1].split(",") : undefined;
  const force = args.includes("--force");

  let q = sb
    .from("cities")
    .select("slug,name")
    .eq("is_published", true)
    .order("name");
  if (!force) q = q.is("hero_image_url", null);
  if (onlySlugs?.length) q = q.in("slug", onlySlugs);
  if (limit) q = q.limit(limit);

  const { data: cities, error } = await q;
  if (error) throw error;
  if (!cities?.length) {
    console.log("No cities to process");
    return;
  }
  console.log(`Processing ${cities.length} cities (dryRun=${dryRun})…`);

  const concurrency = 4;
  const results: any[] = [];
  let cursor = 0;
  let done = 0;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (cursor < cities.length) {
        const c = cities[cursor++];
        const r = await scrape(c.slug, c.name);
        if (r.status === "ok" && !dryRun) {
          const { error: updErr } = await sb
            .from("cities")
            .update({ hero_image_url: r.hero })
            .eq("slug", r.slug);
          if (updErr) {
            (r as any).status = "error";
            (r as any).error = updErr.message;
          }
        }
        results.push(r);
        done++;
        const tag =
          r.status === "ok"
            ? "✓"
            : r.status === "miss"
              ? "·"
              : "✗";
        console.log(`${tag} [${done}/${cities.length}] ${r.slug}  ${r.status}${(r as any).error ? `  ${(r as any).error}` : ""}`);
        await new Promise((res) => setTimeout(res, 100));
      }
    }),
  );

  const summary = results.reduce<Record<string, number>>(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    {},
  );
  console.log("\nSummary:", summary);

  const misses = results.filter((r) => r.status !== "ok");
  if (misses.length) {
    const csv =
      "slug,name,status,source_url,error\n" +
      misses
        .map((r) =>
          [
            r.slug,
            JSON.stringify(r.name),
            r.status,
            r.sourceUrl,
            JSON.stringify(r.error ?? ""),
          ].join(","),
        )
        .join("\n");
    require("fs").writeFileSync("/mnt/documents/city-hero-misses.csv", csv);
    console.log("Wrote /mnt/documents/city-hero-misses.csv");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
