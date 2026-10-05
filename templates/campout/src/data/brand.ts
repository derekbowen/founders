/**
 * ─────────────────────────────────────────────────────────────
 *  BRAND CONFIG — rebrand the whole marketplace from this file.
 *  Colors are applied as CSS variables at startup and consumed
 *  by Tailwind (primary-*, accent-*, sand-*, ink-*).
 *  Keep the same scale keys so every utility keeps working.
 * ─────────────────────────────────────────────────────────────
 */
export const brand = {
  name: 'CampOut',
  tagline: 'Wake up somewhere wild',
  description:
  'Book private campsites, RV spots, cabins and glamping tents on farms, ranches and private land — by the night.',
  hostCta: 'Host on your land',
  supportEmail: 'hello@campout.co',
  legalEntity: 'CampOut Outdoors, Inc.',
  locale: 'en-US',
  currency: 'USD',
  unitLabel: 'night',
  serviceFeeRate: 0.1,
  hostCommissionRate: 0.12,
  colors: {
    // Forest green — primary actions, links, brand surfaces
    primary: {
      50: '#EEF4EF',
      100: '#D6E5D9',
      200: '#AECBB4',
      300: '#7FA98A',
      400: '#4F8460',
      500: '#356B47',
      600: '#2A5A3B',
      700: '#224A31',
      800: '#1B3B27',
      900: '#132B1C'
    },
    // Burnt orange — highlights, eyebrows, secondary CTAs
    accent: {
      50: '#FDF1E8',
      100: '#FADDC6',
      200: '#F3B98E',
      300: '#EA9A5E',
      400: '#E07C3A',
      500: '#C9631F',
      600: '#A94F15',
      700: '#8A3F11'
    },
    // Warm off-white surfaces and borders
    sand: {
      50: '#FAF7F1',
      100: '#F3EDE2',
      200: '#E7DFCF',
      300: '#D5C8B0',
      400: '#B9A98A'
    },
    // Text
    ink: {
      300: '#B4B9B0',
      400: '#8A9286',
      500: '#5F685B',
      600: '#4A5247',
      700: '#363D35',
      900: '#1E231F'
    }
  },
  social: [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'Facebook', href: 'https://facebook.com' }]

} as const;