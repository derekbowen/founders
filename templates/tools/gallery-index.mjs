/**
 * Writes the gallery page for the template library (run after build-gallery
 * and screenshots): dist/gallery/index.html (a complete document for any
 * static host) and dist/gallery/artifact.html (the same page without the
 * document wrapper, for hosts that add their own).
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GALLERY = join(ROOT, "dist", "gallery");
const catalog = JSON.parse(readFileSync(join(ROOT, "catalog.json"), "utf8"));
const checks = existsSync(join(GALLERY, "checks.json"))
  ? JSON.parse(readFileSync(join(GALLERY, "checks.json"), "utf8"))
  : [];

function usesMap(slug) {
  const stack = [join(ROOT, slug, "src")];
  while (stack.length) {
    const d = stack.pop();
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) stack.push(p);
      else if (/\.(tsx?|jsx?)$/.test(n) && readFileSync(p, "utf8").includes("react-leaflet")) return true;
    }
  }
  return false;
}

const items = catalog.templates
  .filter((t) => existsSync(join(GALLERY, "t", t.slug, "index.html")))
  .map((t) => {
    const c = checks.find((x) => x.slug === t.slug) ?? {};
    const shots = ["home", "search", "listing", "home-mobile"].filter((n) =>
      existsSync(join(GALLERY, "t", t.slug, "_preview", `${n}.jpg`)),
    );
    return {
      slug: t.slug, name: t.name, vertical: t.vertical, model: t.model, tagline: t.tagline,
      routes: t.routes, shots, map: usesMap(t.slug), listing: c.listingHref ?? null,
    };
  });

// A way back from a live preview. Added to the built copies only (after the
// screenshots, so previews stay clean); idempotent.
const BACK =
  '<a data-tpl-back href="../../index.html" style="position:fixed;left:12px;bottom:12px;z-index:2147483647;' +
  "font:600 13px/1 system-ui,sans-serif;padding:10px 14px;border-radius:999px;background:#161a22;color:#fff;" +
  'text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.28)">&larr; All templates</a>';
for (const t of items) {
  const f = join(GALLERY, "t", t.slug, "index.html");
  const html = readFileSync(f, "utf8");
  if (!html.includes("data-tpl-back")) writeFileSync(f, html.replace("</body>", `${BACK}\n</body>`));
}

const counts = items.reduce((m, t) => ((m[t.model] = (m[t.model] ?? 0) + 1), m), {});
const data = JSON.stringify(items).replace(/</g, "\\u003c");

const page = `<title>Marketplace Template Library</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
/* Layout: a catalog header (counts + model filter + search), then a card grid of
   home-page previews; details open in a dialog with all previews and the page map. */
:root {
  --bg: #f2f4f7; --surface: #ffffff; --ink: #161a22; --muted: #5a6271; --line: #dce0e7;
  --accent: #2b59c3; --accent-ink: #ffffff;
  --booking: #0f766e; --service: #a1530a; --product: #6d28d9;
  --shadow: 0 1px 2px rgb(22 26 34 / .06), 0 8px 24px rgb(22 26 34 / .06);
  --display: "Bricolage Grotesque", "Avenir Next", "Segoe UI", system-ui, sans-serif;
  --body: "Instrument Sans", "Helvetica Neue", "Segoe UI", system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #0e1116; --surface: #161a22; --ink: #e8ebf1; --muted: #9aa3b2; --line: #2a303b;
  --accent: #8aa8ff; --accent-ink: #0e1116;
  --booking: #2dd4bf; --service: #fbbf24; --product: #b79cff;
  --shadow: 0 1px 2px rgb(0 0 0 / .4), 0 8px 24px rgb(0 0 0 / .35); color-scheme: dark; } }
:root[data-theme="dark"] {
  --bg: #0e1116; --surface: #161a22; --ink: #e8ebf1; --muted: #9aa3b2; --line: #2a303b;
  --accent: #8aa8ff; --accent-ink: #0e1116;
  --booking: #2dd4bf; --service: #fbbf24; --product: #b79cff;
  --shadow: 0 1px 2px rgb(0 0 0 / .4), 0 8px 24px rgb(0 0 0 / .35); color-scheme: dark; }
* { box-sizing: border-box; }
body { background: var(--bg); color: var(--ink); font: 15px/1.55 var(--body); margin: 0; }
.wrap { max-width: 1240px; margin: 0 auto; padding-inline: 20px; padding-block: 28px 56px; }
header.top { display: grid; gap: 14px; margin-block-end: 22px; }
.eyebrow { font: 500 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
h1 { font: 700 clamp(28px, 4.2vw, 44px)/1.05 var(--display); letter-spacing: -.02em; margin: 0; text-wrap: balance; }
.lede { color: var(--muted); max-width: 68ch; margin: 0; }
.stats { display: flex; flex-wrap: wrap; gap: 8px 18px; font: 500 13px/1.4 var(--mono); color: var(--muted); font-variant-numeric: tabular-nums; }
.stats b { color: var(--ink); font-weight: 600; }
.bar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-block: 6px 20px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font: 500 13px/1 var(--body); padding: 8px 12px; border-radius: 999px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); cursor: pointer; }
.chip[aria-pressed="true"] { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.chip .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-inline-end: 6px; vertical-align: 1px; }
input[type="search"] { flex: 1 1 220px; min-width: 0; max-width: 360px; font: 14px/1.2 var(--body); padding: 9px 12px; border-radius: 10px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr)); gap: 20px; }
.card { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; min-width: 0; }
.shot { display: block; aspect-ratio: 16 / 10; width: 100%; height: auto; max-width: 100%; object-fit: cover; object-position: top; background: var(--line); border-bottom: 1px solid var(--line); }
.body { display: grid; gap: 6px; padding: 14px 16px 16px; flex: 1; }
.row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
h2 { font: 700 20px/1.15 var(--display); letter-spacing: -.01em; margin: 0; }
.model { font: 500 11px/1 var(--mono); letter-spacing: .06em; text-transform: uppercase; padding: 5px 7px; border-radius: 6px; border: 1px solid currentColor; white-space: nowrap; }
.model.booking { color: var(--booking); } .model.service { color: var(--service); } .model.product { color: var(--product); }
.dot.booking { background: var(--booking); } .dot.service { background: var(--service); } .dot.product { background: var(--product); }
.vertical { color: var(--muted); font-size: 13px; margin: 0; }
.tag { margin: 2px 0 0; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 10px; }
.btn { font: 600 13px/1 var(--body); padding: 9px 12px; border-radius: 9px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); text-decoration: none; cursor: pointer; }
.btn.primary { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.empty { color: var(--muted); padding: 40px 0; text-align: center; }
dialog { width: min(1100px, calc(100vw - 32px)); max-height: calc(100vh - 32px); padding: 0; border: 1px solid var(--line); border-radius: 16px; background: var(--surface); color: var(--ink); box-shadow: var(--shadow); }
dialog::backdrop { background: rgb(10 12 16 / .55); }
.dlg { display: grid; gap: 16px; padding: 20px; }
.dlg-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; align-items: start; }
.dlg-head h3 { font: 700 26px/1.1 var(--display); margin: 0 0 4px; }
.shots { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); gap: 12px; }
figure { margin: 0; display: grid; gap: 6px; min-width: 0; }
figure img { width: 100%; border: 1px solid var(--line); border-radius: 10px; background: var(--line); }
figure.phone img { max-width: 230px; }
figcaption { font: 500 12px/1 var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
.meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px; }
.meta h4 { font: 600 13px/1 var(--body); margin: 0 0 8px; color: var(--muted); }
.routes { display: flex; flex-wrap: wrap; gap: 6px; }
.routes code, pre { font: 12.5px/1.5 var(--mono); }
.routes code { padding: 3px 6px; border-radius: 6px; background: var(--bg); border: 1px solid var(--line); }
pre { margin: 0; padding: 10px 12px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); overflow-x: auto; }
.note { font-size: 13px; color: var(--muted); margin: 0; }
@media (prefers-reduced-motion: no-preference) { .card { transition: transform .15s ease, box-shadow .15s ease; } .card:hover { transform: translateY(-2px); box-shadow: var(--shadow); } }
</style>
<div class="wrap">
  <header class="top">
    <span class="eyebrow">founders · templates/</span>
    <h1>Marketplace Template Library</h1>
    <p class="lede">Marketplace front ends for ${items.length} verticals, each following the Sharetribe page map: search at <code>/s</code>, listings at <code>/l/:id</code>, profiles, inbox and payouts. They run on sample data and have no backend. Open any one to click through it live.</p>
    <div class="stats"><span><b>${items.length}</b> templates</span><span><b>${counts.booking ?? 0}</b> booking</span><span><b>${counts.service ?? 0}</b> service</span><span><b>${counts.product ?? 0}</b> product</span></div>
  </header>
  <div class="bar">
    <div class="chips" role="group" aria-label="Filter by transaction model">
      <button class="chip" id="f-all" data-model="" aria-pressed="true">All</button>
      <button class="chip" id="f-booking" data-model="booking" aria-pressed="false"><span class="dot booking"></span>Booking</button>
      <button class="chip" id="f-service" data-model="service" aria-pressed="false"><span class="dot service"></span>Service</button>
      <button class="chip" id="f-product" data-model="product" aria-pressed="false"><span class="dot product"></span>Product</button>
    </div>
    <input type="search" id="q" placeholder="Search by name or vertical" aria-label="Search templates">
  </div>
  <main class="grid" id="grid" aria-live="polite"></main>
  <p class="empty" id="empty" hidden>No template matches. Clear the search or pick another model.</p>
</div>
<dialog id="dlg" aria-labelledby="dlg-title"><div class="dlg" id="dlg-body"></div></dialog>
<script>
const T = ${data};
const MODEL = { booking: "Booking", service: "Service", product: "Product" };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const live = (t) => "t/" + t.slug + "/index.html";
let model = "", q = "";
function render() {
  const n = q.trim().toLowerCase();
  const list = T.filter((t) => (!model || t.model === model) && (!n || (t.name + " " + t.vertical + " " + t.tagline).toLowerCase().includes(n)));
  document.getElementById("grid").innerHTML = list.map((t) => \`
    <article class="card">
      <img class="shot" src="t/\${t.slug}/_preview/home.jpg" alt="\${esc(t.name)} home page" loading="lazy" width="1280" height="800">
      <div class="body">
        <div class="row"><h2>\${esc(t.name)}</h2><span class="model \${t.model}">\${MODEL[t.model]}</span></div>
        <p class="vertical">\${esc(t.vertical)}</p>
        <p class="tag">\${esc(t.tagline)}</p>
        <div class="actions">
          <a class="btn primary" href="\${live(t)}">Open live preview</a>
          <button class="btn" type="button" data-slug="\${t.slug}">Pages &amp; details</button>
        </div>
      </div>
    </article>\`).join("");
  document.getElementById("empty").hidden = list.length > 0;
}
function details(slug) {
  const t = T.find((x) => x.slug === slug);
  if (!t) return;
  const cap = { home: "Home", search: "Search", listing: "Listing", "home-mobile": "Home · phone" };
  document.getElementById("dlg-body").innerHTML = \`
    <div class="dlg-head">
      <div><h3 id="dlg-title">\${esc(t.name)}</h3><p class="vertical">\${esc(t.vertical)} · <span class="model \${t.model}">\${MODEL[t.model]}</span></p></div>
      <div class="actions"><a class="btn primary" href="\${live(t)}">Open live preview</a><button class="btn" type="button" id="dlg-close">Close</button></div>
    </div>
    <div class="shots">\${t.shots.map((s) => \`<figure class="\${s === "home-mobile" ? "phone" : ""}"><img src="t/\${t.slug}/_preview/\${s}.jpg" alt="\${esc(t.name)} \${cap[s]}" loading="lazy"><figcaption>\${cap[s]}</figcaption></figure>\`).join("")}</div>
    <div class="meta">
      <div><h4>Pages (\${t.routes.length})</h4><div class="routes">\${t.routes.map((r) => \`<code>\${esc(r)}</code>\`).join("")}</div></div>
      <div><h4>Run it locally</h4><pre>cd templates/\${t.slug}\\nnpm install\\nnpm run dev</pre>
      \${t.map ? '<p class="note">Its map loads tiles from OpenStreetMap, which some viewers block; the rest of the page works without them.</p>' : ""}</div>
    </div>\`;
  const d = document.getElementById("dlg");
  d.showModal();
  document.getElementById("dlg-close").addEventListener("click", () => d.close());
}
document.querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => {
  model = b.dataset.model;
  document.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  render();
}));
document.getElementById("q").addEventListener("input", (e) => { q = e.target.value; render(); });
document.getElementById("grid").addEventListener("click", (e) => { const b = e.target.closest("button[data-slug]"); if (b) details(b.dataset.slug); });
document.getElementById("dlg").addEventListener("click", (e) => { if (e.target.id === "dlg") e.target.close(); });
render();
</script>
`;

writeFileSync(join(GALLERY, "artifact.html"), page);
writeFileSync(
  join(GALLERY, "index.html"),
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n${page.slice(0, page.indexOf("<div class=\"wrap\">"))}</head>\n<body>\n${page.slice(page.indexOf("<div class=\"wrap\">"))}</body>\n</html>\n`,
);
console.log(`gallery: ${items.length} templates → dist/gallery/index.html and artifact.html`);
