/**
 * Captures the store's catalog thumbnails and checks the store previews render.
 *
 * Serves <kindred-ease-space>/public as the site root, so previews load from
 * /template-previews/<slug>/ exactly as founders.click serves them, then for
 * each template:
 *   - writes public/template-thumbnails/<slug>.jpg: the landing page in a
 *     960×720 viewport (the size the store's existing thumbnails use);
 *   - opens the landing, search and one listing page at 1280×800 and records
 *     broken same-origin images, failed requests, requests to the design tool's
 *     CDN and console errors in .store-src/checks.json.
 *
 * Needs Chromium: CHROMIUM_PATH, or a Playwright browsers folder.
 * Run: node tools/store-thumbnails.mjs <kindred-ease-space>/public [slug...]
 */
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [publicArg, ...only] = process.argv.slice(2);
if (!publicArg) {
  console.error("usage: node tools/store-thumbnails.mjs <kindred-ease-space>/public [slug...]");
  process.exit(2);
}
const PUBLIC = resolve(publicArg);
const { chromium } = createRequire(join(ROOT, "package.json"))("playwright-core");
const catalog = JSON.parse(readFileSync(join(ROOT, "catalog.json"), "utf8"));

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const dir = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (dir && existsSync(dir)) {
    for (const d of readdirSync(dir).filter((n) => n.startsWith("chromium")).sort().reverse()) {
      const bin = join(dir, d, "chrome-linux", "chrome");
      if (existsSync(bin)) return bin;
    }
  }
  throw new Error("No Chromium found: set CHROMIUM_PATH");
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".json": "application/json", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
  const file = join(PUBLIC, path);
  if (!file.startsWith(PUBLIC) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

function listingPrefix(routes) {
  const detail = (p) => /^\/[a-z-]+\/:[A-Za-z]+$/.test(p);
  const preferred = /^\/(l|listing|listings|product|products|item|items|space|spaces|experience|experiences|service|services|gig|gigs)\//;
  const skip = /^\/(u|inbox|account|profile|s|search|checkout|order|orders|bookings?|messages?|seller|host|dashboard|admin|category|categories|inquiry-sent)\//;
  const r = routes.find((p) => detail(p) && preferred.test(p)) ?? routes.find((p) => detail(p) && !skip.test(p));
  return r ? `#${r.replace(/:[A-Za-z]+$/, "")}` : null;
}
const searchRoute = (routes) =>
  routes.find((p) => p === "/s") ?? routes.find((p) => /^\/(search|browse|explore|shop|marketplace)$/.test(p)) ?? null;

async function settle(page) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 15000 });
  } catch {}
  await page.waitForTimeout(800);
}

const browser = await chromium.launch({
  executablePath: findChromium(),
  args: (process.env.CHROMIUM_ARGS ?? "").split(" ").filter(Boolean),
});
const thumbs = join(PUBLIC, "template-thumbnails");
mkdirSync(thumbs, { recursive: true });
const checks = [];
for (const t of catalog.templates) {
  if (only.length && !only.includes(t.slug)) continue;
  const entry = `${BASE}/template-previews/${t.slug}/index.html`;
  const result = { slug: t.slug, pages: {}, failed: [], designCdn: [], external: [], errors: [] };
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && result.errors.push(m.text().slice(0, 160)));
  page.on("pageerror", (e) => result.errors.push(`pageerror: ${String(e).slice(0, 160)}`));
  page.on("requestfailed", (r) => r.url().startsWith(BASE) && result.failed.push(r.url().replace(BASE, "")));
  page.on("response", (r) => {
    if (r.url().startsWith(BASE) && r.status() >= 400) result.failed.push(`${r.status()} ${r.url().replace(BASE, "")}`);
  });
  page.on("request", (r) => {
    const u = r.url();
    if (/magicpatterns\.(com|app)/.test(u)) result.designCdn.push(u);
    else if (!u.startsWith(BASE) && !u.startsWith("data:")) result.external.push(new URL(u).host);
  });
  const visit = async (name, hash) => {
    await page.goto(`${entry}${hash}`);
    await settle(page);
    result.pages[name] = await page.evaluate(() => {
      const imgs = [...document.images].filter((i) => i.src && i.src.startsWith(location.origin));
      return {
        images: imgs.length,
        broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")),
        chars: (document.body.innerText || "").length,
      };
    });
  };
  try {
    await visit("home", "#/");
    const s = searchRoute(t.routes);
    if (s) await visit("search", `#${s}`);
    const prefix = listingPrefix(t.routes);
    let href = null;
    if (prefix) {
      for (const hash of [s ? `#${s}` : null, "#/"].filter(Boolean)) {
        await page.goto(`${entry}${hash}`);
        await settle(page);
        href = await page.evaluate((p) => {
          const a = [...document.querySelectorAll("a[href]")].find((el) => {
            const h = el.getAttribute("href");
            return h.startsWith(p) && !/^(new|create|edit)\b/.test(h.slice(p.length)) && !/\/(edit|checkout)\b/.test(h);
          });
          return a ? a.getAttribute("href") : null;
        }, prefix);
        if (href) break;
      }
    }
    if (href) await visit("listing", href);
    result.listingHref = href;

    const thumbCtx = await browser.newContext({ viewport: { width: 960, height: 720 } });
    const tp = await thumbCtx.newPage();
    await tp.goto(`${entry}#/`);
    await settle(tp);
    await tp.screenshot({ path: join(thumbs, `${t.slug}.jpg`), type: "jpeg", quality: 80 });
    await thumbCtx.close();
  } catch (e) {
    result.error = String(e?.message ?? e).slice(0, 300);
  }
  result.failed = [...new Set(result.failed)];
  result.designCdn = [...new Set(result.designCdn)];
  result.external = [...new Set(result.external)].sort();
  result.errors = [...new Set(result.errors)].slice(0, 6);
  checks.push(result);
  const broken = Object.values(result.pages).reduce((n, p) => n + p.broken.length, 0);
  console.log(
    `${t.slug.padEnd(15)} pages ${Object.keys(result.pages).join("/")} | broken imgs ${broken} | failed ${result.failed.length} | design CDN ${result.designCdn.length} | errors ${result.errors.length}${result.error ? ` | ERROR ${result.error}` : ""}`,
  );
  await ctx.close();
}
await browser.close();
server.close();
mkdirSync(join(ROOT, ".store-src"), { recursive: true });
writeFileSync(join(ROOT, ".store-src", "checks.json"), JSON.stringify(checks, null, 2));
const bad = checks.filter(
  (c) => c.error || c.designCdn.length || c.failed.length || Object.values(c.pages).some((p) => p.broken.length),
);
console.log(`\n${checks.length - bad.length} clean, ${bad.length} with problems`);
process.exit(bad.length ? 1 : 0);
