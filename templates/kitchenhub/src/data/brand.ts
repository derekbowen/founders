/**
 * ─────────────────────────────────────────────────────────────
 *  REBRAND HERE. Name, copy, colors, fonts, currency and fees
 *  for the whole marketplace live in this one file.
 * ─────────────────────────────────────────────────────────────
 */
export const brand = {
  name: 'KitchenHub',
  tagline: 'Licensed commercial kitchens, by the hour',
  description:
  'KitchenHub connects caterers, food trucks, bakers and meal-prep brands with licensed commercial kitchens they can book by the hour.',
  legalEntity: 'KitchenHub, Inc.',
  supportEmail: 'support@kitchenhub.co',
  locale: 'en-US',
  currency: 'USD',
  /** Customer service fee applied at checkout (0.08 = 8%) */
  serviceFeeRate: 0.08,
  /** Unit the marketplace books in */
  unit: 'hour',
  fonts: {
    heading: 'Oswald',
    body: 'Inter',
    googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap'
  },
  colors: {
    /** Tomato red */
    primary: '#D23A22',
    primaryHover: '#AF2E19',
    primarySoft: '#FDECE8',
    /** Basil green */
    accent: '#3F7D3A',
    accentHover: '#32652E',
    accentSoft: '#E8F2E6',
    /** Stainless steel greys */
    steel: {
      50: '#F6F7F8',
      100: '#ECEEF0',
      200: '#DADEE2',
      300: '#BEC4CB',
      400: '#8F99A3',
      500: '#66707B',
      600: '#4F5862',
      700: '#3B424A',
      800: '#282D33',
      900: '#181B1F'
    }
  },
  social: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com'
  }
} as const;