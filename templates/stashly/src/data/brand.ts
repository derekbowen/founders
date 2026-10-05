/**
 * Rebrand the entire marketplace from this one file.
 * Colors are applied as CSS variables at startup (see utils/theme.ts) and
 * consumed by Tailwind as `brand-*` and `sand-*` utilities.
 */
export const brand = {
  name: 'Stashly',
  tagline: 'Storage next door',
  description:
  'Stashly connects people who need storage with neighbors who have spare garages, basements, attics and closets.',
  supportEmail: 'help@stashly.co',
  legalEntity: 'Stashly, Inc.',
  homeCity: 'Portland, OR',
  colors: {
    brand: {
      50: '#effaf8',
      100: '#d6f1ec',
      200: '#afe2da',
      300: '#7ccbc1',
      400: '#4aafa5',
      500: '#2c938a',
      600: '#1f766f',
      700: '#1c5f5a',
      800: '#1b4d49',
      900: '#193f3d'
    },
    sand: {
      50: '#fbf8f2',
      100: '#f6efe2',
      200: '#ecdcc2',
      300: '#dfc49b',
      400: '#d0a872',
      500: '#c38f55',
      600: '#a87442',
      700: '#8a5c37',
      800: '#704a31',
      900: '#5c3e2b'
    }
  },
  marketplace: {
    currency: 'USD',
    locale: 'en-US',
    /** Booking unit used by the transaction process (Sharetribe default-booking). */
    unitType: 'day' as const,
    /** Days used to convert daily price into a displayed monthly price. */
    daysPerMonth: 30,
    /** Fee charged to the customer on top of the booking total. */
    serviceFeeRate: 0.08,
    /** Commission taken from the provider's payout. */
    hostCommissionRate: 0.1,
    mapCenter: [45.523, -122.645] as [number, number],
    mapZoom: 12
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    x: 'https://x.com'
  }
};

export type Brand = typeof brand;