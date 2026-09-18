/**
 * AI CREDIT PACKS ARE NOT FOR SALE. Run: bun tests/credit-pack-withdrawn.test.ts
 *
 * Credits were withdrawn as a customer-facing SKU, but only from the UI. The
 * checkout function kept `mode: "credits"` in its accepted set and would
 * provision a $10/1,000-credit Stripe price for anyone who POSTed it directly —
 * a product we do not sell, purchasable by API, indefinitely.
 *
 * Removing a button is not removing a product. These assertions are about the
 * ENDPOINT, because the endpoint is what a caller reaches.
 *
 * Asserted against source rather than over the wire: the live function needs
 * Stripe credentials and a real workspace, and a test that only runs when
 * someone remembers to deploy first is a test that never runs. The properties
 * here are exactly the ones that made the hole reachable.
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

let pass = 0,
  fail = 0;
const failed: string[] = [];
function t(name: string, cond: boolean, extra = "") {
  if (cond) {
    pass++;
    console.log(`  PASS  ${name}`);
  } else {
    fail++;
    failed.push(name);
    console.log(`  FAIL  ${name}  ${extra}`);
  }
}

const CHECKOUT = resolve(ROOT, "supabase/functions/create-checkout/index.ts");
const CATALOG = resolve(ROOT, "supabase/functions/_shared/stripe-catalog.ts");

console.log("\n=== the checkout endpoint refuses credit packs ===");

// A missing file must fail, never vacuously pass — the same fail-open shape
// that let an inert secrets preflight report success for a Worker missing
// every secret it was meant to check.
t("checkout function source is readable", existsSync(CHECKOUT), CHECKOUT);
if (!existsSync(CHECKOUT)) {
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(1);
}
const src = readFileSync(CHECKOUT, "utf8");

t(
  '"credits" is not an accepted mode',
  /const validModes\s*=\s*\[(?![^\]]*"credits")[^\]]*\]/.test(src),
  "validModes still lists credits",
);

t(
  "an explicit refusal exists for mode:credits",
  /mode\s*===\s*"credits"/.test(src) && src.includes("credits_unavailable"),
  "no distinguishable refusal — a caller cannot tell withdrawn from malformed",
);

t(
  "the refusal is 410 Gone, not a generic 400",
  /credits_unavailable[\s\S]{0,400}?status:\s*410/.test(src),
  "410 says the product existed and is gone; 400 says the caller typed it wrong",
);

t(
  "the refusal precedes generic mode validation",
  src.indexOf('mode === "credits"') > -1 &&
    src.indexOf('mode === "credits"') < src.indexOf('error: "invalid_mode"'),
  "generic validation would swallow it first and report invalid_mode",
);

t(
  "no reachable call to ensureCreditPackPrice remains",
  !/await\s+ensureCreditPackPrice\s*\(/.test(src),
  "a live code path can still provision the price",
);

t(
  "ensureCreditPackPrice is no longer imported by checkout",
  !/^\s*ensureCreditPackPrice,\s*$/m.test(src),
  "unused import keeps the path one edit from returning",
);

console.log("\n=== historical data and schema are preserved ===");

t("catalog source is readable", existsSync(CATALOG), CATALOG);
const catalog = existsSync(CATALOG) ? readFileSync(CATALOG, "utf8") : "";

t(
  "CREDIT_PACK definition is retained",
  catalog.includes("export const CREDIT_PACK"),
  "deleting it would make deliberate restoration a rewrite rather than a revert",
);

t(
  "ensureCreditPackPrice is retained in the catalog",
  catalog.includes("export async function ensureCreditPackPrice"),
  "same reason — dormant, not destroyed",
);

t(
  "internal credit metering is untouched",
  /consume_platform_ai_credit|credit_balances/.test(
    readFileSync(resolve(ROOT, "src/lib/ai-metering.server.ts"), "utf8"),
  ),
  "withdrawing the SKU must not disable internal generation metering",
);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log("Failed: " + failed.join(", "));
  process.exit(1);
}
