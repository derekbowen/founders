// ─────────────────────────────────────────────────────────────────────────────
// Plan model — shared client/server.
//
// Single source of truth for which features each plan unlocks, page-generation
// quotas, keyword tracking slots, seat counts, and display strings used on the
// pricing page + billing UI. The marketing landing copy in
// src/components/founders-home.tsx is hand-written to match this — keep them
// in sync.
// ─────────────────────────────────────────────────────────────────────────────

export type Plan = "starter" | "growth" | "scale" | "enterprise";

export const PLAN_ORDER: Record<Plan, number> = {
  starter: 1,
  growth: 2,
  scale: 3,
  enterprise: 4,
};

// Every gateable feature has a stable key. Admin sidebar items + server-side
// requirePlan() calls reference these — never the route path or label, so we
// can re-shuffle UI without breaking gating.
export type Feature =
  // Content
  | "content.quick_page"
  | "content.generate"
  | "content.migration"
  | "content.bulk_editor"
  | "content.blog"
  | "content.learning"
  | "content.city_heroes"
  // SEO
  | "seo.rank_tracker"
  | "seo.health"
  | "seo.competitor_radar"
  | "seo.page_auditor"
  | "seo.keyword_opportunities"
  | "seo.competitor_tracker"
  | "seo.internal_links"
  | "seo.link_checker"
  | "seo.missing_pages"
  | "seo.indexing"
  | "seo.gsc_import"
  | "seo.scrape_import"
  | "seo.click_report"
  // Ops
  | "ops.leads"
  | "ops.email_branding"
  | "ops.site_footer"
  | "ops.directory"
  | "ops.claims"
  | "ops.plan_requests"
  | "ops.team";

export type PlanQuotas = {
  /** Max AI-generated /p/ pages per month. Infinity = unlimited. */
  pageGenerationsPerMonth: number;
  /** Tracked keyword slots in rank-tracker. */
  keywordSlots: number;
  /** Workspace member seats. */
  seats: number;
};

export type PlanDescriptor = {
  name: string;
  /** Display price (renders on landing + billing). null = "Custom". */
  monthlyUsdCents: number | null;
  blurb: string;
  features: ReadonlySet<Feature>;
  quotas: PlanQuotas;
  /** Stripe price ID env var name, resolved server-side. */
  stripePriceEnvVar: string | null;
  /** Whether to show in customer-facing self-serve pickers. */
  selfServe: boolean;
};

const STARTER_FEATURES: Feature[] = [
  "content.quick_page",
  "content.generate",
  "content.bulk_editor",
  "content.blog",
  "seo.rank_tracker",
  "seo.health",
  "ops.leads",
  "ops.site_footer",
];

const GROWTH_FEATURES: Feature[] = [
  ...STARTER_FEATURES,
  "content.migration",
  "content.city_heroes",
  "seo.competitor_radar",
  "seo.page_auditor",
  "seo.keyword_opportunities",
  "seo.competitor_tracker",
  "seo.internal_links",
  "seo.link_checker",
  "seo.gsc_import",
  "seo.scrape_import",
  "seo.click_report",
  "ops.directory",
];

const SCALE_FEATURES: Feature[] = [
  ...GROWTH_FEATURES,
  "content.learning",
  "seo.missing_pages",
  "seo.indexing",
  "ops.email_branding",
  "ops.claims",
  "ops.plan_requests",
  "ops.team",
];

const ENTERPRISE_FEATURES: Feature[] = [...SCALE_FEATURES];

export const PLAN_FEATURES: Record<Plan, PlanDescriptor> = {
  starter: {
    name: "Starter",
    monthlyUsdCents: 10900,
    blurb: "Solo founders launching their first marketplace.",
    features: new Set(STARTER_FEATURES),
    quotas: { pageGenerationsPerMonth: 50, keywordSlots: 50, seats: 1 },
    stripePriceEnvVar: "STRIPE_PRICE_STARTER",
    selfServe: true,
  },
  growth: {
    name: "Growth",
    monthlyUsdCents: 39000,
    blurb: "Scaling marketplaces with active SEO & content goals.",
    features: new Set(GROWTH_FEATURES),
    quotas: { pageGenerationsPerMonth: 500, keywordSlots: 500, seats: 3 },
    stripePriceEnvVar: "STRIPE_PRICE_GROWTH",
    selfServe: true,
  },
  scale: {
    name: "Scale",
    monthlyUsdCents: 89900,
    blurb: "Established platforms competing on volume and velocity.",
    features: new Set(SCALE_FEATURES),
    quotas: { pageGenerationsPerMonth: 5000, keywordSlots: 5000, seats: 10 },
    stripePriceEnvVar: "STRIPE_PRICE_SCALE",
    selfServe: true,
  },
  enterprise: {
    name: "Enterprise",
    monthlyUsdCents: null,
    blurb: "Multi-team operators with custom integrations.",
    features: new Set(ENTERPRISE_FEATURES),
    quotas: {
      pageGenerationsPerMonth: Number.POSITIVE_INFINITY,
      keywordSlots: Number.POSITIVE_INFINITY,
      seats: Number.POSITIVE_INFINITY,
    },
    stripePriceEnvVar: null,
    selfServe: false,
  },
};

export function planOrder(plan: Plan): number {
  return PLAN_ORDER[plan];
}

/** Plan A is at least plan B (i.e. unlocks everything B does). */
export function planAtLeast(plan: Plan, minimum: Plan): boolean {
  return planOrder(plan) >= planOrder(minimum);
}

/** First plan tier that unlocks the given feature. */
export function minimumPlanFor(feature: Feature): Plan {
  for (const plan of ["starter", "growth", "scale", "enterprise"] as const) {
    if (PLAN_FEATURES[plan].features.has(feature)) return plan;
  }
  // Should never happen — every Feature must appear in at least one tier.
  return "enterprise";
}

export function featureUnlocked(plan: Plan, feature: Feature): boolean {
  return PLAN_FEATURES[plan].features.has(feature);
}

/** "starter" -> "Starter", etc. */
export function planLabel(plan: Plan): string {
  return PLAN_FEATURES[plan].name;
}

/** Format a plan price for display. Returns "Custom" for enterprise. */
export function formatPlanPrice(plan: Plan): string {
  const cents = PLAN_FEATURES[plan].monthlyUsdCents;
  if (cents === null) return "Custom";
  return `$${(cents / 100).toFixed(0)}`;
}
