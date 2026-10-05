/**
 * ─────────────────────────────────────────────────────────────
 *  BRAND CONFIG — rebrand the whole marketplace from this file.
 * ─────────────────────────────────────────────────────────────
 *  • name / tagline / copy  → used in the top bar, footer, page titles and legal pages
 *  • colors.primary         → main actions, highlights (10-step scale, 50 = lightest)
 *  • colors.accent          → secondary highlights, trust & safety moments
 *  • colors.canvas          → page background
 *  • font.family            → also update the Google Fonts @import at the top of index.css
 */
export const brand = {
  name: 'PetPal',
  slug: 'petpal',
  tagline: 'Trusted local pet sitters',
  description:
  'Book vetted local sitters for overnight boarding, house sitting, drop-in visits and dog walks.',
  heroTitle: 'Loving care while you’re away',
  heroSubtitle:
  'Find trusted, background-checked sitters near you for boarding, house sitting, drop-in visits and dog walks.',
  guaranteeName: 'PetPal Promise',
  companyName: 'PetPal Inc.',
  supportEmail: 'hello@petpal.example',
  supportPhone: '(503) 555-0142',
  address: '1120 NW Couch St, Suite 300, Portland, OR 97209',
  defaultCity: 'Portland, OR',
  locale: 'en-US',
  currency: 'USD',
  font: {
    family: 'Nunito'
  },
  map: {
    center: [45.523, -122.665] as [number, number],
    zoom: 12
  },
  colors: {
    canvas: '#FFFBF5',
    primary: {
      50: '#FFF8EB',
      100: '#FFEDC7',
      200: '#FFD98A',
      300: '#FFC24D',
      400: '#FBAA26',
      500: '#F28C0F',
      600: '#D66D08',
      700: '#B04F0B',
      800: '#8F3E10',
      900: '#753311'
    },
    accent: {
      50: '#EFFAF8',
      100: '#D5F1EC',
      200: '#ACE3DA',
      300: '#7BCDC2',
      400: '#4CB2A6',
      500: '#2E968B',
      600: '#227970',
      700: '#1E615B',
      800: '#1C4E4A',
      900: '#1A413E'
    }
  }
};