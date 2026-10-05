/**
 * BRAND CONFIG — rebrand the whole marketplace from this one file.
 * Colors are hex values; they're converted to CSS variables at startup
 * and consumed by Tailwind (bg-primary, text-accent-ink, etc.).
 * If you change fonts, also update the Google Fonts @import in index.css.
 */
export const brand = {
  name: 'Craftly',
  tagline: 'Made by hand, made to last',
  description:
  'Craftly is a marketplace for independent makers selling handmade ceramics, jewelry, candles, textiles, woodwork and prints.',
  supportEmail: 'hello@craftly.co',
  locale: 'en-US',
  currency: 'USD',
  marketplaceFeePercent: 8,
  fonts: {
    heading: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif"
  },
  colors: {
    canvas: '#FAF6F0',
    surface: '#FFFFFF',
    subtle: '#F3ECE2',
    ink: '#2B2420',
    muted: '#6B5E55',
    line: '#E6DCCF',
    primary: '#B5532F',
    primaryHover: '#963F21',
    primarySoft: '#F6E4D9',
    primaryInk: '#7A341B',
    accent: '#7A8F6E',
    accentSoft: '#E6ECE0',
    accentInk: '#4A5C40',
    info: '#3B5A80',
    success: '#3F7D4E',
    warning: '#9C6512',
    danger: '#B42318'
  },
  social: {
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
    facebook: 'https://facebook.com'
  }
};