/**
 * BRAND CONFIG — rebrand the whole marketplace from this one file.
 * Colors are injected as CSS variables at startup (see utils/theme.ts) and
 * consumed by Tailwind as `primary-*` and `ink-*`.
 * If you change the font family, also update the Google Fonts @import in index.css.
 */
export const brand = {
  name: 'TaskPost',
  tagline: 'Post a job, get offers from local pros',
  description:
  'TaskPost is the reverse marketplace for home jobs. Customers post what needs doing, local pros send offers, and payment is held safely until the job is done.',
  city: 'Portland, OR',
  supportEmail: 'support@taskpost.com',
  font: {
    family: 'Manrope'
  },
  colors: {
    // Confident orange — 600 is used for buttons/links and passes WCAG AA with white text.
    primary: {
      50: '#fff6ed',
      100: '#ffead3',
      200: '#fed1a6',
      300: '#fdaf6e',
      400: '#fb8a3c',
      500: '#f26b1d',
      600: '#c94a0c',
      700: '#a83c0b',
      800: '#87310e',
      900: '#6e2a0f',
      950: '#3d1305'
    },
    // Slate accents for text, borders and surfaces.
    ink: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },
  fees: {
    customerServiceRate: 0.05,
    proCommissionRate: 0.1
  },
  locale: 'en-US',
  currency: 'USD',
  guaranteeAmount: 1000,
  stats: {
    pros: '1,200+',
    avgRating: '4.8',
    firstOffer: '3 hrs'
  }
} as const;