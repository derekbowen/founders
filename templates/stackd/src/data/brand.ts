// ─────────────────────────────────────────────────────────────
// REBRAND HERE. Name, copy, fees and every color token used across
// the template live in this one file. Colors are injected as CSS
// variables at runtime (see components/layout/BrandTheme.tsx) and
// consumed by Tailwind (bg-brand, text-ink, border-line, …).
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'Stackd',
  tagline: 'Buy it once, download it now.',
  description:
  'The marketplace for instant digital downloads from independent creators — e-books, printables, templates, photo packs, audio and course workbooks.',
  supportEmail: 'hello@stackd.shop',
  domain: 'stackd.shop',
  /** Platform commission taken from each sale (0.1 = 10%). */
  commissionRate: 0.1,
  currency: 'USD',
  locale: 'en-US',
  social: {
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com'
  },
  colors: {
    /** Electric orange — backgrounds, CTAs, highlights (use with ink text). */
    accent: '#FF5A1F',
    /** Darker accent for text/links on white (meets WCAG AA). */
    accentInk: '#B83A0B',
    /** Soft accent tint for subtle surfaces. */
    accentSoft: '#FFEDE4',
    /** Primary text, borders and dark surfaces. */
    ink: '#0A0A0A',
    /** Off-white secondary surface. */
    paper: '#F7F6F3',
    /** Hairline dividers. */
    line: '#E7E5E0',
    /** Secondary text (AA on white). */
    muted: '#5A5A5A',
    success: '#0F7B4B',
    warning: '#9A5800',
    danger: '#C42B1C'
  }
} as const;

export type BrandColorKey = keyof typeof brand.colors;