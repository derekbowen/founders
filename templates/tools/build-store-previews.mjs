/**
 * Builds templates as self-contained previews for the founders.click template
 * store, which serves them from public/template-previews/<slug>/ in the
 * kindred-ease-space app.
 *
 * Like build-gallery.mjs it works on a copy (.store-src/<slug>), never on the
 * committed source, switches BrowserRouter to HashRouter and builds with
 * base "./". On top of that it follows the store's preview conventions
 * (tests/template-store.test.ts there checks them):
 *   - every photo is self-hosted under images/ and referenced as
 *     /template-previews/<slug>/images/<file>;
 *   - photos the export left out — Magic Patterns "generated images", which the
 *     designs load from /generated-images/… or cdn.magicpatterns.com — are
 *     downloaded once (cached in .image-cache/) and shipped with the preview,
 *     so a preview never depends on the design tool's CDN;
 *   - photos are resized to at most 1600px wide and recompressed;
 *   - CARTO basemap tiles now come back as "API key required" images, so maps
 *     use OpenStreetMap's standard tiles instead (light use; the attribution
 *     credits OpenStreetMap contributors already);
 *   - an icon link to a file the export does not have (Vite's /vite.svg) is
 *     dropped rather than left to 404 on the store's domain.
 *
 * Run: node tools/build-store-previews.mjs <kindred-ease-space>/public/template-previews [slug...]
 */
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [outArg, ...only] = process.argv.slice(2);
if (!outArg) {
  console.error("usage: node tools/build-store-previews.mjs <out-dir> [slug...]");
  process.exit(2);
}
const OUT_ROOT = resolve(outArg);
const URL_PREFIX = "/template-previews"; // where the store serves OUT_ROOT
const CDN = "https://cdn.magicpatterns.com/patterns/generated-images";
const CACHE = join(ROOT, ".image-cache");
const WORK = join(ROOT, ".store-src");
const MAX_WIDTH = 1600;
const CARTO_TILES = /https:\/\/\{s\}\.basemaps\.cartocdn\.com\/[A-Za-z_/]+\/\{z\}\/\{x\}\/\{y\}(?:\{r\})?\.png/g;
const OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const require = createRequire(join(ROOT, "package.json"));
const sharp = require("sharp");
const { build } = await import(join(ROOT, "node_modules", "vite", "dist", "node", "index.js"));
const catalog = JSON.parse(readFileSync(join(ROOT, "catalog.json"), "utf8"));

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

/** Fetches a generated image into the cache; returns its path, or null if the CDN has none. */
function fetchGenerated(file) {
  mkdirSync(CACHE, { recursive: true });
  const cached = join(CACHE, file);
  if (existsSync(cached)) return cached;
  try {
    // curl, not fetch: it honours the HTTPS proxy settings this tooling may run behind.
    execFileSync("curl", ["-sSf", "--max-time", "60", "-o", `${cached}.part`, `${CDN}/${file}`], {
      stdio: "pipe",
    });
    renameSync(`${cached}.part`, cached);
    return cached;
  } catch {
    rmSync(`${cached}.part`, { force: true });
    return null;
  }
}

async function compress(file) {
  const before = statSync(file).size;
  if (before < 120 * 1024) return 0;
  const img = sharp(file).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const ext = file.toLowerCase().split(".").pop();
  const buf =
    ext === "png"
      ? await img.png({ compressionLevel: 9, palette: true, quality: 85 }).toBuffer()
      : ext === "webp"
        ? await img.webp({ quality: 78 }).toBuffer()
        : await img.jpeg({ quality: 78, progressive: true, mozjpeg: true }).toBuffer();
  if (buf.length >= before) return 0;
  writeFileSync(file, buf);
  return before - buf.length;
}

/** The copy-only changes. Returns counts for the report. */
async function adapt(dir, slug) {
  const base = `${URL_PREFIX}/${slug}/images`;
  const publicDir = join(dir, "public");
  const imagesDir = join(publicDir, "images");
  mkdirSync(imagesDir, { recursive: true });
  const counts = { router: 0, paths: 0, tiles: 0, moved: 0, downloaded: 0, missing: [], savedKB: 0 };

  // 1. Photos at the root of public/ move under images/.
  const rootImages = readdirSync(publicDir).filter(
    (n) => /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(n) && statSync(join(publicDir, n)).isFile(),
  );
  for (const name of rootImages) {
    renameSync(join(publicDir, name), join(imagesDir, name));
    counts.moved++;
  }

  const sources = walk(join(dir, "src"))
    .filter((f) => /\.(tsx?|jsx?|css)$/.test(f))
    .concat(existsSync(join(dir, "index.html")) ? [join(dir, "index.html")] : []);
  const allText = sources.map((f) => readFileSync(f, "utf8")).join("\n");

  // 2. Photos the export references but did not include: fetch them from the
  //    design tool's CDN. Bare ids count only where the design builds
  //    generated-image URLs from ids (`${CDN}/${id}.jpg`).
  const usesGenerated = /generated-images/.test(allText);
  const wanted = new Set();
  for (const m of allText.matchAll(new RegExp(`(${UUID})(\\.(?:jpe?g|png|webp))?`, "gi"))) {
    if (m[2]) wanted.add(`${m[1]}${m[2]}`);
    else if (usesGenerated) wanted.add(`${m[1]}.jpg`);
  }
  for (const file of wanted) {
    if (existsSync(join(imagesDir, file))) continue;
    const got = fetchGenerated(file);
    if (got) {
      copyFileSync(got, join(imagesDir, file));
      counts.downloaded++;
    } else if (/\.(jpe?g|png|webp)$/.test(file) && new RegExp(`${escapeRe(file)}`).test(allText)) {
      // An id with an explicit extension that neither the export nor the CDN has.
      counts.missing.push(file);
    }
  }

  // 3. Rewrite references to the store's image path.
  for (const file of sources) {
    let src = readFileSync(file, "utf8");
    const before = src;
    if (file.endsWith(".html")) {
      src = src.replace(/<link\b[^>]*\brel=["'](?:shortcut )?icon["'][^>]*>\s*/gi, (tag) => {
        const href = /\bhref=["']\/([^"'?#]+)/.exec(tag)?.[1];
        const present = href && (rootImages.includes(href) || existsSync(join(publicDir, href)));
        return href && !present ? "" : tag;
      });
    } else {
      src = src.replace(/\bBrowserRouter\b/g, () => (counts.router++, "HashRouter"));
      src = src.replace(CARTO_TILES, () => (counts.tiles++, OSM_TILES));
    }
    src = src.replace(new RegExp(escapeRe(CDN), "g"), () => (counts.paths++, base));
    src = src.replace(/(['"`(])\/generated-images(?=[/'"`)])/g, (_m, q) => (counts.paths++, `${q}${base}`));
    for (const name of rootImages) {
      const re = new RegExp(`(['"\`(])/${escapeRe(name)}(?=['"\`)?#])`, "g");
      src = src.replace(re, (_m, q) => (counts.paths++, `${q}${base}/${name}`));
    }
    // Image-base constants that point at the site root: const IMG = "/".
    src = src.replace(
      /((?:const|let)\s+\w*(?:IMG|Img|img|IMAGE|Image|image|CDN|cdn|BASE|Base|base|ASSET|Asset|asset|MEDIA|Media|media)\w*\s*=\s*)(['"`])\/\2/g,
      (_m, head, q) => (counts.paths++, `${head}${q}${base}/${q}`),
    );
    if (src !== before) writeFileSync(file, src);
  }

  // 4. Lighter photos.
  for (const f of walk(imagesDir)) counts.savedKB += Math.round((await compress(f)) / 1024);
  return counts;
}

mkdirSync(OUT_ROOT, { recursive: true });
const report = [];
for (const t of catalog.templates) {
  if (only.length && !only.includes(t.slug)) continue;
  const dir = join(WORK, t.slug);
  rmSync(dir, { recursive: true, force: true });
  const shots = join(ROOT, t.slug, "preview"); // the library's screenshots, not part of the app
  cpSync(join(ROOT, t.slug), dir, {
    recursive: true,
    filter: (p) => !/[\\/](node_modules|dist)([\\/]|$)/.test(p) && p !== shots && !p.startsWith(shots + sep),
  });
  mkdirSync(join(dir, "public"), { recursive: true });
  const counts = await adapt(dir, t.slug);
  const outDir = join(OUT_ROOT, t.slug);
  process.chdir(dir); // Tailwind resolves its content globs from the working directory.
  try {
    await build({
      root: dir,
      base: "./",
      configFile: join(dir, "vite.config.ts"),
      logLevel: "error",
      build: { outDir, emptyOutDir: true, chunkSizeWarningLimit: 4000 },
    });
    const html = readFileSync(join(outDir, "index.html"), "utf8");
    const text = walk(outDir)
      .filter((f) => /\.(html|js|css)$/.test(f))
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
    const problems = [];
    if (!/src="\.\/assets\//.test(html)) problems.push("assets are not relative");
    if (/cdn\.magicpatterns\.com|magicpatterns\.app/.test(text)) problems.push("design-tool CDN reference left");
    if (!walk(outDir).some((f) => /[\\/]images[\\/][^\\/]+\.jpe?g$/.test(f))) problems.push("no images/*.jpg");
    if (counts.missing.length) problems.push(`${counts.missing.length} photos missing everywhere`);
    report.push({ slug: t.slug, ok: problems.length === 0, problems, ...counts });
    console.log(
      `${problems.length ? "WARN" : "ok  "} ${t.slug}: ${counts.moved} moved, ${counts.downloaded} downloaded, ` +
        `${counts.paths} paths, ${counts.savedKB} KB saved${problems.length ? ` — ${problems.join("; ")}` : ""}`,
    );
  } catch (e) {
    report.push({ slug: t.slug, ok: false, problems: [String(e?.message ?? e).slice(0, 400)], ...counts });
    console.error(`FAILED ${t.slug}: ${String(e?.message ?? e).slice(0, 400)}`);
  } finally {
    process.chdir(ROOT);
  }
}
writeFileSync(join(ROOT, ".store-src", "report.json"), JSON.stringify(report, null, 2));
const bad = report.filter((r) => !r.ok);
console.log(`\n${report.length - bad.length} clean, ${bad.length} with problems`);
process.exit(bad.length ? 1 : 0);
