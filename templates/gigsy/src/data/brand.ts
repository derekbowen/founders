// ─────────────────────────────────────────────────────────────
// Rebrand the whole marketplace from this one file.
// Colors are applied as CSS variables and consumed by Tailwind
// (`primary-*` and `accent-*` utilities). Font loads from Google Fonts.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'Gigsy',
  tagline: 'Get a quote from top freelancers',
  description:
  'Describe your project, receive tailored offers from vetted freelancers, and hire with confidence.',
  supportEmail: 'hello@gigsy.co',
  legalEntity: 'Gigsy Labs, Inc.',
  currency: 'USD',
  locale: 'en-US',
  serviceFeePercent: 5,
  font: {
    family: 'Plus Jakarta Sans',
    googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
  },
  colors: {
    // Electric indigo
    primary: {
      50: '#F2F0FF',
      100: '#E6E1FF',
      200: '#CDC4FF',
      300: '#AC9CFF',
      400: '#8B72FF',
      500: '#6D4DFF',
      600: '#5B35F5',
      700: '#4A25D6',
      800: '#3C1FAD',
      900: '#2B177D'
    },
    // Mint
    accent: {
      50: '#EAFBF4',
      100: '#CBF5E3',
      200: '#9AEBCB',
      300: '#62DDB0',
      400: '#30CB96',
      500: '#14B07E',
      600: '#0B8E66',
      700: '#0A7154',
      800: '#0B5944',
      900: '#0A4939'
    }
  },
  social: {
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  }
} as const;