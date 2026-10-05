// ─────────────────────────────────────────────────────────────
//  BRAND CONFIG — rebrand the whole marketplace from this file.
//  Colors are applied at runtime as CSS variables and consumed by
//  Tailwind as `primary-*` and `accent-*` utilities.
//  To change the font: update `fontFamily` here AND the Google
//  Fonts @import at the top of index.css.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'Tutorly',
  tagline: 'Learn faster with the right tutor',
  description:
  'Book 1-on-1 online lessons with vetted tutors for school subjects, test prep and languages.',
  supportEmail: 'hello@tutorly.com',
  locale: 'en-US',
  currency: 'USD',
  /** Platform fee charged to learners on top of the lesson price. */
  serviceFeeRate: 0.04,
  /** Commission taken from tutor earnings. */
  tutorCommissionRate: 0.12,
  fontFamily: "'Lexend', ui-sans-serif, system-ui, sans-serif",
  colors: {
    // Bright sky blue. 600+ meets WCAG AA with white text.
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0279bd',
      700: '#03649c',
      800: '#075079',
      900: '#0c3f5e'
    },
    // Sunny yellow. Pair with dark ink text for contrast.
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12'
    },
    // Neutral ink used for text, borders and surfaces.
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
      900: '#0f172a'
    }
  },
  social: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com'
  }
} as const;

export type BrandColorName = keyof typeof brand.colors;