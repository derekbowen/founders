/**
 * Centralized slug rules for /blog/<slug> URLs.
 *
 * - normalizeSlug(): canonicalizes a raw URL slug (lowercase, strip trailing slashes,
 *   collapse separators, drop common URL noise like .html / .php / "blog-" prefix).
 * - SLUG_ALIASES: explicit redirects from legacy/variant slugs to the live canonical slug.
 * - resolveSlug(): combines both — returns { canonical, redirect } where `redirect`
 *   is true when the requested slug differs from the canonical one (caller should 301).
 */

/** Legacy/variant -> canonical slug mappings. */
export const SLUG_ALIASES: Record<string, string> = {
  // Mixed-case variants of pH posts (DB stores them case-mixed; we serve lowercase)
  "high-ph-pool-problems-and-fixes": "high-pH-pool-problems-and-fixes",
  "low-ph-pool-problems-and-fixes": "low-pH-pool-problems-and-fixes",

  // Common topic shorthand → canonical post
  "green-pool": "green-pool-water-causes-and-fast-fixes",
  "green-pool-water": "green-pool-water-causes-and-fast-fixes",
  "green-water": "green-pool-water-causes-and-fast-fixes",
  "cloudy-pool": "cloudy-pool-water-troubleshooting-guide",
  "cloudy-pool-water": "cloudy-pool-water-troubleshooting-guide",
  "cloudy-water": "cloudy-pool-water-troubleshooting-guide",
  "foamy-pool": "foamy-pool-water-causes-and-fixes",
  "foamy-water": "foamy-pool-water-causes-and-fixes",
  "milky-pool-water": "milky-white-pool-water-causes-and-fixes",
  "white-pool-water": "milky-white-pool-water-causes-and-fixes",
  "brown-pool-water": "brown-pool-water-iron-and-manganese-fix",
  "rusty-pool-water": "brown-pool-water-iron-and-manganese-fix",
  "iron-in-pool": "brown-pool-water-iron-and-manganese-fix",

  // Algae
  "black-algae": "black-algae-in-pool-removal-and-prevention",
  "yellow-algae": "yellow-mustard-algae-treatment-guide",
  "mustard-algae": "yellow-mustard-algae-treatment-guide",
  "pink-algae": "pink-slime-and-white-water-mold-in-pools",
  "pink-slime": "pink-slime-and-white-water-mold-in-pools",
  "water-mold": "pink-slime-and-white-water-mold-in-pools",
  "algae-prevention": "pool-algae-keeps-coming-back-prevention",

  // Chemistry shorthand
  "high-ph": "high-pH-pool-problems-and-fixes",
  "low-ph": "low-pH-pool-problems-and-fixes",
  "high-alkalinity": "high-alkalinity-pool-fix",
  "low-alkalinity": "low-alkalinity-pool-fix",
  "low-chlorine": "low-chlorine-pool-causes-and-solutions",
  "chlorine-lock": "chlorine-lock-vs-chlorine-demand",
  "chlorine-demand": "chlorine-lock-vs-chlorine-demand",
  "high-cya": "high-cyanuric-acid-stabilizer-fix",
  "high-stabilizer": "high-cyanuric-acid-stabilizer-fix",
  "calcium-hardness": "calcium-hardness-too-high-or-low",
  "high-tds": "total-dissolved-solids-tds-too-high-in-pool",
  phosphates: "phosphates-in-pool-water-removal-guide",
  chloramines: "pool-smells-like-chlorine-chloramines",
  "pool-smell": "pool-smells-like-chlorine-chloramines",

  // Equipment
  "pump-not-priming": "pool-pump-not-priming-troubleshooting",
  "pool-pump-priming": "pool-pump-not-priming-troubleshooting",
  "noisy-pump": "noisy-pump-causes-and-repair".replace("pump", "pool-pump"),
  "pump-leaking": "pool-pump-leaking-water-troubleshooting",
  "pump-overheating": "pool-pump-overheating-and-shutting-off",
  "high-filter-pressure": "pool-filter-pressure-too-high",
  "filter-pressure": "pool-filter-pressure-too-high",
  "sand-in-pool": "sand-in-pool-from-filter",
  "pool-heater-broken": "pool-heater-not-working-troubleshooting",
  "heater-not-working": "pool-heater-not-working-troubleshooting",
  "heat-pump-icing": "pool-heat-pump-icing-up-causes",
  "saltwater-low-salt": "saltwater-chlorinator-low-salt-warnings",
  "salt-cell-warning": "saltwater-chlorinator-low-salt-warnings",
  "pool-light-broken": "pool-light-not-working-or-flickering",
  "skimmer-not-working": "pool-skimmer-not-working-suction-problems",
  "vacuum-no-suction": "pool-vacuum-loses-suction-fix",
  "cleaner-not-moving": "automatic-pool-cleaner-not-moving",
  "vsp-error-codes": "variable-speed-pump-error-codes",
  "pool-timer-broken": "pool-timer-not-turning-on-troubleshooting",
  "hot-tub-not-heating": "hot-tub-attached-to-pool-not-heating",

  // Structural
  "pool-leak": "pool-leak-detection-and-repair",
  "pool-leaking": "pool-leak-detection-and-repair",
  "leak-detection": "pool-leak-detection-and-repair",
  "pool-cracks": "cracks-in-pool-shell-and-plaster",
  "plaster-cracks": "cracks-in-pool-shell-and-plaster",
  "liner-tear": "liner-pool-wrinkles-and-tears",
  "liner-wrinkles": "liner-pool-wrinkles-and-tears",
  "deck-cracks": "pool-deck-cracks-and-settling-repair",
  "tile-falling-off": "pool-tile-falling-off-causes-and-fix",
  "coping-damage": "pool-coping-damage-and-replacement",
  "above-ground-leaning": "above-ground-pool-leaning-or-bulging",

  // Maintenance / seasonal
  "after-storm": "after-storm-pool-recovery",
  "storm-cleanup": "after-storm-pool-recovery",
  winterizing: "pool-winterizing-mistakes-and-fixes",
  "pool-winterization": "pool-winterizing-mistakes-and-fixes",
  "spring-opening": "pool-opening-problems-spring-startup",
  "pool-opening": "pool-opening-problems-spring-startup",
  "pool-cover": "pool-cover-problems-sagging-and-tears",
  evaporation: "pool-water-loss-evaporation-vs-leak",
  "water-loss": "pool-water-loss-evaporation-vs-leak",
  "pool-stains": "pool-stains-metal-organic-and-mineral",
  "scale-on-tile": "scale-and-calcium-buildup-on-pool-tiles",
  "calcium-scale": "scale-and-calcium-buildup-on-pool-tiles",
  "frogs-in-pool": "insects-frogs-and-debris-in-pool",
  "bugs-in-pool": "insects-frogs-and-debris-in-pool",
  "hot-pool-water": "pool-water-too-hot-cooling-strategies",
  "cool-pool-down": "pool-water-too-hot-cooling-strategies",
};

/** Build the canonical reverse map (lowercase) for case-insensitive matching. */
const ALIAS_MAP_LOWER: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_ALIASES).map(([from, to]) => [from.toLowerCase(), to]),
);

/**
 * Canonicalize a raw slug from the URL:
 * - decode %xx
 * - lowercase
 * - strip leading/trailing slashes, whitespace
 * - drop common file extensions (.html, .htm, .php, .aspx)
 * - drop "blog-" / "post-" prefixes
 * - collapse "_" or repeated "-" into a single "-"
 * - strip trailing/leading "-"
 */
export function normalizeSlug(input: string): string {
  if (!input) return "";
  let s = input;
  try {
    s = decodeURIComponent(s);
  } catch {
    // ignore malformed encoding
  }
  s = s.trim().toLowerCase();
  s = s.replace(/^\/+|\/+$/g, "");
  s = s.replace(/\.(html?|php|aspx)$/i, "");
  s = s.replace(/^(blog|post|article)[-_]/i, "");
  s = s.replace(/[_\s]+/g, "-");
  s = s.replace(/-+/g, "-");
  s = s.replace(/^-+|-+$/g, "");
  return s;
}

/**
 * Resolve a requested slug to its canonical form.
 *
 * Returns:
 *   - canonical: the slug to look up in the DB / render
 *   - redirect:  true if the user URL differs from canonical (issue 301)
 */
export function resolveSlug(rawSlug: string): { canonical: string; redirect: boolean } {
  const normalized = normalizeSlug(rawSlug);
  // 1. explicit alias takes precedence
  const aliased = ALIAS_MAP_LOWER[normalized];
  if (aliased) {
    return { canonical: aliased, redirect: aliased !== rawSlug };
  }
  // 2. otherwise the normalized form is canonical (DB stores lowercase except pH variants,
  //    which are already covered by SLUG_ALIASES above).
  return { canonical: normalized, redirect: normalized !== rawSlug };
}
