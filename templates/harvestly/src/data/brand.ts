/**
 * ─────────────────────────────────────────────────────────────
 *  BRAND CONFIG — rebrand the entire marketplace from this file.
 *  Colors are applied as CSS variables at runtime and consumed by
 *  Tailwind tokens (bg-primary, text-accent, bg-kraft, …).
 * ─────────────────────────────────────────────────────────────
 */
export const brand = {
  name: "Harvestly",
  tagline: "Fresh from farms near you",
  description:
  "Harvestly connects you with local farms for fresh produce, eggs, honey, meat and baked goods — picked up at the farm or delivered to your door.",
  region: "Hudson Valley",
  defaultLocation: "Kingston, NY",
  supportEmail: "hello@harvestly.example",
  sellerCta: "Sell your harvest",
  currency: "USD",
  locale: "en-US",
  /** Marketplace commission charged to buyers, as a fraction. */
  serviceFeeRate: 0.05,
  colors: {
    /** Leafy green — primary actions, links, focus rings */
    primary: "#2F6B3A",
    primaryDark: "#1F4D29",
    primarySoft: "#E1EBD5",
    /** Harvest orange — highlights, badges, secondary CTAs */
    accent: "#B4531A",
    accentDark: "#8F3F12",
    accentSoft: "#F6E0CB",
    /** Kraft paper page background + card surface */
    kraft: "#F2E9D8",
    paper: "#FBF7EE",
    /** Text */
    ink: "#2B2418",
    muted: "#675A47",
    /** Hairlines and dividers */
    line: "#E2D4BC",
    danger: "#B42318"
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  }
} as const;

export type BrandColorKey = keyof typeof brand.colors;