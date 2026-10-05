// ─────────────────────────────────────────────────────────────
//  REBRAND HERE. Name, copy, colors, contact and marketplace
//  settings for the whole template live in this one file.
//  (If you change the font family, also update the Google Fonts
//  @import at the top of index.css.)
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'PetPal',
  tagline: 'Loving care while you’re away',
  description:
  'Book trusted, vetted local sitters for overnight boarding, house sitting, drop-in visits and dog walks.',
  font: 'Nunito',

  colors: {
    // Warm golden-orange
    primary: {
      50: '#FFF8EB',
      100: '#FEEBC8',
      200: '#FDD48A',
      300: '#FBBB4E',
      400: '#F9A62B',
      500: '#F28F0E',
      600: '#D46F08',
      700: '#A9520B',
      800: '#87410F',
      900: '#6F3610'
    },
    // Soft teal
    accent: {
      50: '#EEFBFA',
      100: '#D5F4F1',
      200: '#ACE7E2',
      300: '#78D3CC',
      400: '#45B8B0',
      500: '#2A9D95',
      600: '#1F7E78',
      700: '#1D6561',
      800: '#1C514E',
      900: '#1A4442'
    },
    // Warm neutrals for text, borders and surfaces
    ink: {
      50: '#FBF8F4',
      100: '#F4EFE8',
      200: '#E8E0D5',
      300: '#D4C9BA',
      400: '#A99C8B',
      500: '#7B7062',
      600: '#5D544A',
      700: '#453E36',
      800: '#2E2924',
      900: '#1F1B16'
    }
  },

  contact: {
    email: 'hello@petpal.example',
    phone: '(503) 555-0142',
    address: '1120 NW Couch St, Portland, OR 97209'
  },

  social: [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'TikTok', href: '#' }],


  marketplace: {
    currency: 'USD',
    locale: 'en-US',
    serviceFeeRate: 0.1, // customer commission shown at checkout
    providerFeeRate: 0.15, // sitter commission shown in payouts
    defaultCity: 'Portland, OR',
    mapCenter: [45.53, -122.665] as [number, number],
    reservationProtection: 2000
  }
};