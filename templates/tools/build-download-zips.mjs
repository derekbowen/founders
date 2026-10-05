/**
 * Builds the zip a buyer downloads from the founders.click template store, one
 * per template: templates/dist/downloads/<slug>.zip, uploaded as <slug>.zip to
 * the store's private `template-downloads` bucket.
 *
 * Each zip is a standalone Vite + React + Tailwind project (`npm install`,
 * `npm run dev`). It is made from a copy of the template, never the committed
 * source, with the changes a paid download needs:
 *   - photos the export left out are restored: designs that load them from
 *     /generated-images/… (or straight from cdn.magicpatterns.com, now pointed
 *     at /generated-images/ too) get them in public/generated-images/, and
 *     photos missing from public/ are added there. They come from the Magic
 *     Patterns CDN once and are cached in .image-cache/;
 *   - CARTO map tiles, which now need an API key, become OpenStreetMap's;
 *   - package.json pins the versions every library build is verified with
 *     (no "latest"), and the Magic Patterns project metadata (src/package.json)
 *     and the library's screenshots are left out;
 *   - a buyer-facing README and a .gitignore.
 *
 * Run: node tools/build-download-zips.mjs [slug...]
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
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const only = process.argv.slice(2);
const catalog = JSON.parse(readFileSync(join(ROOT, "catalog.json"), "utf8"));
const shared = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const sharedVersions = { ...shared.dependencies, ...shared.devDependencies };
const CDN = "https://cdn.magicpatterns.com/patterns/generated-images";
const CACHE = join(ROOT, ".image-cache");
const WORK = join(ROOT, ".zip-src");
const OUT = join(ROOT, "dist", "downloads");
const CARTO_TILES = /https:\/\/\{s\}\.basemaps\.cartocdn\.com\/[A-Za-z_/]+\/\{z\}\/\{x\}\/\{y\}(?:\{r\})?\.png/g;
const OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

/** The packages the code imports, at the versions the library builds with. */
const RUNTIME = [
  "react",
  "react-dom",
  "react-router-dom",
  "lucide-react",
  "framer-motion",
  "date-fns",
  "tailwind-merge",
  "sonner",
  "leaflet",
  "react-leaflet",
  "@emotion/react",
];
const DEV = [
  "@types/leaflet",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "@vitejs/plugin-react",
  "autoprefixer",
  "postcss",
  "tailwindcss",
  "typescript",
  "vite",
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

function fetchGenerated(file) {
  mkdirSync(CACHE, { recursive: true });
  const cached = join(CACHE, file);
  if (existsSync(cached)) return cached;
  try {
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

function packageJson(slug, usedPackages) {
  const pick = (names) =>
    Object.fromEntries(
      names
        .filter((n) => usedPackages.has(n) || DEV.includes(n))
        .map((n) => {
          if (!sharedVersions[n]) throw new Error(`${slug}: no verified version for ${n}`);
          return [n, sharedVersions[n]];
        }),
    );
  return {
    name: `${slug}-marketplace-template`,
    version: "1.0.0",
    private: true,
    type: "module",
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: pick(RUNTIME),
    devDependencies: pick(DEV),
  };
}

function readme(t, pages) {
  return `# ${t.name}

${t.tagline}. A ${t.vertical.toLowerCase()} marketplace front end built on the
Sharetribe Web Template's page structure and transaction flow.

## Run it

Needs Node.js 18 or newer.

\`\`\`sh
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
\`\`\`

The app runs on built-in sample data (\`src/data/\`), so every page works without a backend.

## Make it yours

- **Brand:** name, colours and logo live in \`src/data/brand.ts\`.
- **Sample data:** listings, users and reviews are in \`src/data/\`.
- **Photos:** \`public/\`${pages.generated ? " and `public/generated-images/`" : ""}.
- **Maps:** the map pages use OpenStreetMap's standard tiles, which suit development and light use. For production, point the tile URL at a provider you have an account with.

## Pages

| Route | Page |
|---|---|
${t.routes
  .filter((r) => r !== "*")
  .map((r) => `| \`${r}\` | ${describe(r)} |`)
  .join("\n")}

Each page maps to a page of the Sharetribe Web Template (SearchPage, ListingPage,
CheckoutPage, InboxPage / TransactionPage, ProfilePage, EditListingPage,
AuthenticationPage, account settings), so you can port them into your
Sharetribe Web Template fork one at a time.
`;
}

function describe(route) {
  const r = route.toLowerCase();
  if (r === "/") return "Landing page";
  const rules = [
    [/^\/(s|search|browse|explore|shop)\b/, "Search"],
    [/checkout/, "Checkout"],
    [/^\/(inbox|messages|order|orders|bookings?|trips?|inquiry)/, "Inbox and transactions"],
    [/(new|create|edit|post-|host\/new|wizard|list-your)/, "Create or edit a listing"],
    [/^\/(login|signup|sign-up|signin|auth|register)/, "Sign up / log in"],
    [/^\/(account|settings|payouts|profile-settings)/, "Account settings"],
    [/^\/(about|terms|privacy|faq|how-it-works|help|contact|trust)/, "Content page"],
    [/^\/(u|profile|users?|hosts?|sellers?|brands?|shop|farms?|makers?|vendors?|tutors?|sitters?|pros?)\//, "Profile"],
  ];
  for (const [re, label] of rules) if (re.test(r)) return label;
  if (/:[a-z]+$/i.test(r)) return "Detail page";
  return "Page";
}

mkdirSync(OUT, { recursive: true });
mkdirSync(WORK, { recursive: true });
const report = [];
for (const t of catalog.templates) {
  if (only.length && !only.includes(t.slug)) continue;
  const from = join(ROOT, t.slug);
  const dir = join(WORK, `${t.slug}-marketplace-template`);
  rmSync(WORK + sep + `${t.slug}-marketplace-template`, { recursive: true, force: true });
  const skip = [join(from, "preview"), join(from, "src", "package.json")];
  cpSync(from, dir, {
    recursive: true,
    filter: (p) =>
      !/[\\/](node_modules|dist)([\\/]|$)/.test(p) && !skip.some((s) => p === s || p.startsWith(s + sep)),
  });
  const publicDir = join(dir, "public");
  mkdirSync(publicDir, { recursive: true });
  const sources = walk(join(dir, "src"))
    .filter((f) => /\.(tsx?|jsx?|css)$/.test(f))
    .concat([join(dir, "index.html")]);
  const counts = { cdn: 0, tiles: 0, restored: 0, missing: [] };

  // Sources: CDN-hosted photos load from /generated-images/; maps use OSM.
  for (const f of sources) {
    let src = readFileSync(f, "utf8");
    const before = src;
    src = src.replace(new RegExp(CDN.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&"), "g"), () => (counts.cdn++, "/generated-images"));
    src = src.replace(CARTO_TILES, () => (counts.tiles++, OSM_TILES));
    if (f.endsWith(".html")) {
      src = src.replace(/<link\b[^>]*\brel=["'](?:shortcut )?icon["'][^>]*>\s*/gi, (tag) => {
        const href = /\bhref=["']\/([^"'?#]+)/.exec(tag)?.[1];
        return href && !existsSync(join(publicDir, href)) ? "" : tag;
      });
    }
    if (src !== before) writeFileSync(f, src);
  }

  // Photos the export left out.
  const text = sources.map((f) => readFileSync(f, "utf8")).join("\n");
  const generated = /["'`(]\/generated-images/.test(text);
  const wanted = new Set();
  for (const m of text.matchAll(new RegExp(`(${UUID})(\\.(?:jpe?g|png|webp))?`, "gi"))) {
    if (m[2]) wanted.add(`${m[1]}${m[2]}`);
    else if (generated) wanted.add(`${m[1]}.jpg`);
  }
  const target = generated ? join(publicDir, "generated-images") : publicDir;
  for (const file of wanted) {
    if (existsSync(join(publicDir, file)) || existsSync(join(publicDir, "generated-images", file))) continue;
    const got = fetchGenerated(file);
    if (got) {
      mkdirSync(target, { recursive: true });
      copyFileSync(got, join(target, file));
      counts.restored++;
    } else if (/\.(jpe?g|png|webp)$/.test(file) && text.includes(file)) {
      counts.missing.push(file);
    }
  }

  // package.json, README, .gitignore.
  const used = new Set();
  // import x from "pkg", import "pkg/style.css", import("pkg")
  for (const m of text.matchAll(/(?:^|\n)\s*import\s*(?:[^'"]*?\sfrom\s*|\(\s*)?['"]([^'".][^'"]*)['"]/g)) {
    const p = m[1];
    used.add(p.startsWith("@") ? p.split("/").slice(0, 2).join("/") : p.split("/")[0]);
  }
  const unknown = [...used].filter((u) => !RUNTIME.includes(u));
  if (unknown.length) throw new Error(`${t.slug}: imports packages outside the verified set: ${unknown.join(", ")}`);
  writeFileSync(join(dir, "package.json"), JSON.stringify(packageJson(t.slug, used), null, 2) + "\n");
  writeFileSync(join(dir, "README.md"), readme(t, { generated }));
  writeFileSync(join(dir, ".gitignore"), "node_modules/\ndist/\n.DS_Store\n");

  const zip = join(OUT, `${t.slug}.zip`);
  rmSync(zip, { force: true });
  execFileSync("zip", ["-qr", "-X", zip, `${t.slug}-marketplace-template`], { cwd: WORK });
  const mb = statSync(zip).size / 1024 / 1024;
  report.push({ slug: t.slug, mb: Number(mb.toFixed(1)), ...counts });
  console.log(
    `${counts.missing.length ? "WARN" : "ok  "} ${t.slug}: ${mb.toFixed(1)} MB, ${counts.restored} photos restored, ` +
      `${counts.cdn} CDN refs, ${counts.tiles} tile URLs${counts.missing.length ? `, MISSING ${counts.missing.length}` : ""}`,
  );
}
writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2));
const bad = report.filter((r) => r.missing.length);
console.log(`\n${report.length} zips in ${OUT}${bad.length ? `; ${bad.length} with missing photos` : ""}`);
process.exit(bad.length ? 1 : 0);
