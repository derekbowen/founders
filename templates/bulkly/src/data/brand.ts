/**
 * REBRAND HERE.
 * Everything brand-specific — name, copy, contact details and the full color
 * palette — lives in this one file. Colors are applied as CSS variables at
 * startup and consumed by Tailwind as `primary-*` and `accent-*`.
 */
export const brand = {
  name: 'Bulkly',
  legalName: 'Bulkly, Inc.',
  domain: 'bulkly.co',
  supportEmail: 'support@bulkly.co',
  tagline: 'Wholesale from independent brands',
  heroSubtitle:
  'Stock your shelves with 3,000+ products from independent makers. Order by the case, unlock tiered pricing, and pay on terms.',
  metaDescription:
  'The B2B wholesale marketplace where independent brands sell to retailers and cafés.',
  stats: {
    retailers: '2,400+',
    brands: '380',
    averageMargin: '52%'
  },
  /** First-order minimum across all brands, in USD. */
  firstOrderMinimum: 100,
  /** Per-brand order subtotal that unlocks free shipping, in USD. */
  freeShippingThreshold: 300,
  /** Flat shipping per brand below the threshold, in USD. */
  flatShippingRate: 18,
  /** Commission shown to sellers on the brand CTA. */
  sellerCommission: '15%',
  colors: {
    primary: {
      50: '#EEF3FB',
      100: '#D8E3F6',
      200: '#B1C7EC',
      300: '#7FA1DC',
      400: '#4C78C6',
      500: '#2858A8',
      600: '#1A468F',
      700: '#143A78',
      800: '#0F2D5E',
      900: '#0A2045',
      950: '#06142D'
    },
    accent: {
      50: '#F7FEE7',
      100: '#ECFCCB',
      200: '#D9F99D',
      300: '#BEF264',
      400: '#A3E635',
      500: '#84CC16',
      600: '#65A30D',
      700: '#4D7C0F',
      800: '#3F6212',
      900: '#365314',
      950: '#1A2E05'
    }
  }
} as const;

export type BrandConfig = typeof brand;