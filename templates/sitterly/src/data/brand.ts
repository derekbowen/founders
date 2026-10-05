// ─────────────────────────────────────────────────────────────
// REBRAND HERE. Every color, font, and brand string in the app
// reads from this one file.
// ─────────────────────────────────────────────────────────────
export const brand = {
  name: 'Sitterly',
  tagline: 'Trusted sitters, whenever you need them',
  description:
  'Book vetted babysitters and nannies by the hour for date nights, after-school care, and last-minute help.',
  city: 'Austin, TX',
  mapCenter: [30.2895, -97.7376] as [number, number],
  supportEmail: 'hello@sitterly.com',
  supportPhone: '(512) 555-0142',
  /** Fee charged to parents on top of the sitter's rate */
  bookingFeePercent: 0.06,
  /** Commission kept from sitter earnings */
  sitterCommissionPercent: 0.1,
  minimumBookingHours: 2,
  fonts: {
    heading: 'Quicksand',
    body: 'Inter',
    googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Quicksand:wght@500;600;700&display=swap'
  },
  colors: {
    primary: {
      50: '#f7f5ff',
      100: '#efebff',
      200: '#e1d9ff',
      300: '#cabcfd',
      400: '#ad97f8',
      500: '#9275ef',
      600: '#7856de',
      700: '#6443c2',
      800: '#52389d',
      900: '#41307b'
    },
    accent: {
      50: '#fff7f2',
      100: '#ffeee3',
      200: '#ffdcc7',
      300: '#ffc3a1',
      400: '#ffa476',
      500: '#fb8a55',
      600: '#ea6f3a',
      700: '#c3552a',
      800: '#9a4425',
      900: '#7c3921'
    },
    ink: {
      50: '#faf9fc',
      100: '#f3f1f7',
      200: '#e6e2ee',
      300: '#d1cbdc',
      400: '#a69eb4',
      500: '#7c7389',
      600: '#5d556a',
      700: '#453e51',
      800: '#2e2838',
      900: '#1e1a26'
    }
  }
};