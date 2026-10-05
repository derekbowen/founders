/**
 * Captures previews of every built template (run after build-gallery.mjs):
 * home, search and the first listing at desktop width, plus home at phone
 * width. Writes them to templates/<slug>/preview/ (committed) and to
 * dist/gallery/t/<slug>/_preview/ (the gallery), and records what it saw in
 * dist/gallery/checks.json: broken images, console errors, and whether each
 * page rendered a real route rather than the template's 404.
 *
 * Needs a Chromium binary: CHROMIUM_PATH, or a Playwright browsers folder
 * (PLAYWRIGHT_BROWSERS_PATH, default ~/.cache/ms-playwright).
 */
import { createServer } from "node:http";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GALLERY = join(ROOT, "dist", "gallery");
const catalog = JSON.parse(readFileSync(join(ROOT, "catalog.json"), "utf8"));
const only = process.argv.slice(2);
const { chromium } = await import("playwright-core");

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || join(homedir(), ".cache", "ms-playwright");
  if (existsSync(base)) {
    for (const d of readdirSync(base).filter((d) => d.startsWith("chromium-")).sort().reverse()) {
      for (const rel of ["chrome-linux/chrome", "chrome-linux64/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium"]) {
        const p = join(base, d, rel);
        if (existsSync(p)) return p;
      }
    }
  }
  throw new Error("No Chromium found: set CHROMIUM_PATH");
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".json": "application/json", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
  const file = join(GALLERY, path);
  if (!file.startsWith(GALLERY) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

/** The template's listing route ("/l/:id", "/listing/:slug"...) as a hash prefix. */
function listingPrefix(routes) {
  const detail = (p) => /^\/[a-z-]+\/:[A-Za-z]+$/.test(p);
  const preferred = /^\/(l|listing|listings|product|products|item|items|space|spaces|experience|experiences|service|services|gig|gigs)\//;
  const skip = /^\/(u|inbox|account|profile|s|search|checkout|order|orders|bookings?|messages?|seller|host|dashboard|admin|category|categories|inquiry-sent)\//;
  const r = routes.find((p) => detail(p) && preferred.test(p)) ?? routes.find((p) => detail(p) && !skip.test(p));
  return r ? `#${r.replace(/:[A-Za-z]+$/, "")}` : null;
}
const searchRoute = (routes) => routes.find((p) => p === "/s") ?? routes.find((p) => /^\/(search|browse|explore|shop|marketplace)$/.test(p)) ?? null;

async function settle(page) {
  try { await page.waitForLoadState("networkidle", { timeout: 15000 }); } catch {}
  await page.waitForTimeout(700);
}

async function inspect(page) {
  return page.evaluate(() => {
    const imgs = [...document.images].filter((i) => i.src && i.src.startsWith(location.origin));
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src"));
    const text = document.body.innerText || "";
    const notFound = /page not found|404|doesn['’]t exist|could not be found|can['’]t find that page/i.test(text.slice(0, 600)) && text.length < 2500;
    return { images: imgs.length, broken, chars: text.length, notFound, title: document.title };
  });
}

// Extra flags for unusual networks (e.g. a pinned proxy CA), space-separated.
const browser = await chromium.launch({
  executablePath: findChromium(),
  args: (process.env.CHROMIUM_ARGS ?? "").split(" ").filter(Boolean),
});
const checks = [];
for (const t of catalog.templates) {
  if (only.length && !only.includes(t.slug)) continue;
  const entry = `${BASE}/t/${t.slug}/index.html`;
  if (!existsSync(join(GALLERY, "t", t.slug, "index.html"))) {
    checks.push({ slug: t.slug, built: false });
    console.log(`skip ${t.slug}: not built`);
    continue;
  }
  const outRepo = join(ROOT, t.slug, "preview");
  const outGallery = join(GALLERY, "t", t.slug, "_preview");
  mkdirSync(outRepo, { recursive: true });
  mkdirSync(outGallery, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errors = [];
  const failed = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
  page.on("pageerror", (e) => errors.push(`pageerror: ${String(e).slice(0, 200)}`));
  page.on("requestfailed", (r) => { if (r.url().startsWith(BASE)) failed.push(r.url().replace(BASE, "")); });
  const result = { slug: t.slug, built: true, pages: {} };
  const shot = async (name, hash) => {
    await page.goto(`${entry}${hash}`);
    await settle(page);
    result.pages[name] = { hash, ...(await inspect(page)) };
    const file = join(outRepo, `${name}.jpg`);
    await page.screenshot({ path: file, type: "jpeg", quality: 72 });
    copyFileSync(file, join(outGallery, `${name}.jpg`));
  };
  try {
    await shot("home", "#/");
    const s = searchRoute(t.routes);
    if (s) await shot("search", `#${s}`);
    const prefix = listingPrefix(t.routes);
    let href = null;
    if (prefix) {
      for (const hash of [s ? `#${s}` : null, "#/"].filter(Boolean)) {
        await page.goto(`${entry}${hash}`);
        await settle(page);
        href = await page.evaluate((p) => {
          // A real listing, not "/l/new" (create) or an edit/checkout step.
          const a = [...document.querySelectorAll("a[href]")].find((el) => {
            const h = el.getAttribute("href");
            return h.startsWith(p) && !/^(new|create|edit)\b/.test(h.slice(p.length)) && !/\/(edit|checkout)\b/.test(h);
          });
          return a ? a.getAttribute("href") : null;
        }, prefix);
        if (href) break;
      }
    }
    if (href) await shot("listing", href);
    result.listingHref = href;
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    const m = await mobile.newPage();
    await m.goto(`${entry}#/`);
    await settle(m);
    result.mobileOverflow = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const mfile = join(outRepo, "home-mobile.jpg");
    await m.screenshot({ path: mfile, type: "jpeg", quality: 72 });
    copyFileSync(mfile, join(outGallery, "home-mobile.jpg"));
    await mobile.close();
  } catch (e) {
    result.error = String(e?.message ?? e).slice(0, 300);
  }
  result.consoleErrors = [...new Set(errors)].slice(0, 8);
  result.failedRequests = [...new Set(failed)].slice(0, 8);
  checks.push(result);
  const p = result.pages;
  console.log(
    `${t.slug.padEnd(15)} home ${p.home ? (p.home.notFound ? "404?" : "ok") : "-"} | search ${p.search ? (p.search.notFound ? "404?" : "ok") : "-"} | listing ${p.listing ? (p.listing.notFound ? "404?" : "ok") : "none"} | broken imgs ${Object.values(p).reduce((n, x) => n + x.broken.length, 0)} | errors ${result.consoleErrors.length}${result.error ? " | ERROR " + result.error : ""}`,
  );
  await ctx.close();
}
await browser.close();
server.close();
// A partial run (slugs on the command line) updates only those entries.
const file = join(GALLERY, "checks.json");
const previous = only.length && existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
const merged = [...previous.filter((p) => !checks.some((c) => c.slug === p.slug)), ...checks]
  .sort((a, b) => a.slug.localeCompare(b.slug));
writeFileSync(file, JSON.stringify(merged, null, 2));
