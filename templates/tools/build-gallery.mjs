/**
 * Builds every template in catalog.json into dist/gallery/t/<slug>/, ready to
 * be browsed from a sub-folder (a static host or a gallery page).
 *
 * The committed source is never changed. Each template is copied to
 * .gallery-src/<slug> (inside templates/, so packages resolve from the shared
 * templates/node_modules) and two mechanical changes are made to the copy,
 * because the exports assume they own the site root:
 *   - BrowserRouter → HashRouter: routes live after "#", so a page served as
 *     t/<slug>/index.html still matches "/", "/s", "/l/:id"...
 *   - absolute paths to files in public/ ("/x.jpg", "/generated-images/…")
 *     become relative ("./x.jpg"), so images load from the template's folder.
 * Vite builds with base "./" for the same reason.
 *
 * Run: npm --prefix templates install && npm --prefix templates run build
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(ROOT, "catalog.json"), "utf8"));
const only = process.argv.slice(2);
const work = join(ROOT, ".gallery-src");
const out = join(ROOT, "dist", "gallery", "t");
const { build } = await import(join(ROOT, "node_modules", "vite", "dist", "node", "index.js"));

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The two copy-only changes; returns how many replacements each made. */
function adaptForSubfolder(dir) {
  const publicDir = join(dir, "public");
  const entries = existsSync(publicDir) ? readdirSync(publicDir) : [];
  const counts = { router: 0, paths: 0 };
  for (const file of walk(join(dir, "src"))) {
    if (!/\.(tsx?|jsx?|css)$/.test(file)) continue;
    let src = readFileSync(file, "utf8");
    const before = src;
    src = src.replace(/\bBrowserRouter\b/g, () => (counts.router++, "HashRouter"));
    for (const entry of entries) {
      // Only names that exist in public/, preceded by a quote, backtick or
      // "(" — route strings like "/s" are never touched.
      const re = new RegExp(`(['"\`(])/${escapeRe(entry)}(?=[/'"\`)?#])`, "g");
      src = src.replace(re, (_m, q) => (counts.paths++, `${q}./${entry}`));
    }
    // Image-base constants ("const IMG = '/'", "const cdn = '/generated-images'")
    // point at the site root too; only names that read as an image or asset base.
    src = src.replace(
      /((?:const|let)\s+\w*(?:IMG|Img|img|IMAGE|Image|image|CDN|cdn|base|BASE|ASSET|Asset|asset|MEDIA|media)\w*\s*=\s*(['"`]))\/(?=[^'"`]*\2)/g,
      (_m, head) => (counts.paths++, `${head}./`),
    );
    if (src !== before) writeFileSync(file, src);
  }
  return counts;
}

mkdirSync(out, { recursive: true });
const report = [];
for (const t of catalog.templates) {
  if (only.length && !only.includes(t.slug)) continue;
  const from = join(ROOT, t.slug);
  const dir = join(work, t.slug);
  rmSync(dir, { recursive: true, force: true });
  cpSync(from, dir, {
    recursive: true,
    filter: (p) => !/[\\/](node_modules|dist)([\\/]|$)/.test(p),
  });
  const counts = adaptForSubfolder(dir);
  const outDir = join(out, t.slug);
  const started = Date.now();
  // Tailwind resolves its content globs from the working directory.
  process.chdir(dir);
  try {
    await build({
      root: dir,
      base: "./",
      configFile: join(dir, "vite.config.ts"),
      logLevel: "warn",
      build: { outDir, emptyOutDir: true, chunkSizeWarningLimit: 4000 },
    });
    report.push({ slug: t.slug, ok: true, ms: Date.now() - started, ...counts });
    console.log(`built ${t.slug} (${counts.router} router, ${counts.paths} asset-path rewrites)`);
  } catch (e) {
    report.push({ slug: t.slug, ok: false, error: String(e?.message ?? e).slice(0, 400), ...counts });
    console.error(`FAILED ${t.slug}: ${String(e?.message ?? e).slice(0, 400)}`);
  } finally {
    process.chdir(ROOT);
  }
}
writeFileSync(join(ROOT, "dist", "gallery", "build-report.json"), JSON.stringify(report, null, 2));
const failed = report.filter((r) => !r.ok);
console.log(`\n${report.length - failed.length} built, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
