#!/usr/bin/env node
// Fails if two apps in this workspace declare the same Cloudflare Worker name.
//
// Why this exists: apps/poolrentalnearme and apps/founders-click were separate
// repositories that both declared `"name": "founders-click"`. While they lived
// apart that was merely confusing; in one repo it is dangerous, because two
// deploy jobs would publish over the same Worker and the last one to run would
// silently take the domain. This check is the tripwire. It does NOT rename
// anything -- which Worker owns which custom domain is a Cloudflare-side
// decision a human has to make.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const APPS_DIR = "apps";

// Minimal JSONC reader: wrangler.jsonc allows // comments and trailing commas.
function parseJsonc(text) {
  const stripped = text
    .replace(/"(?:[^"\\]|\\.)*"|\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (m) =>
      m.startsWith('"') ? m : " ",
    )
    .replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(stripped);
}

const seen = new Map();
let checked = 0;

for (const app of readdirSync(APPS_DIR, { withFileTypes: true })) {
  if (!app.isDirectory()) continue;
  const cfg = join(APPS_DIR, app.name, "wrangler.jsonc");
  if (!existsSync(cfg)) continue;

  let name;
  try {
    name = parseJsonc(readFileSync(cfg, "utf8")).name;
  } catch (err) {
    console.error(`✗ ${cfg}: could not parse (${err.message})`);
    process.exit(1);
  }
  if (!name) continue;

  checked++;
  if (!seen.has(name)) seen.set(name, []);
  seen.get(name).push(cfg);
}

const collisions = [...seen].filter(([, files]) => files.length > 1);

if (collisions.length > 0) {
  console.error("✗ Cloudflare Worker name collision\n");
  for (const [name, files] of collisions) {
    console.error(`  "${name}" is declared by ${files.length} apps:`);
    for (const f of files) console.error(`    - ${f}`);
  }
  console.error(
    "\nTwo apps deploying to one Worker name means whichever deploys last" +
      "\nowns the domain. Give each app its own name, and re-point the custom" +
      "\ndomain in the Cloudflare dashboard to match, before enabling deploys.",
  );
  process.exit(1);
}

console.log(`✓ ${checked} app(s) checked, no Worker name collisions.`);
