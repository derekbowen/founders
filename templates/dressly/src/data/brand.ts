/**
 * BRAND CONFIG — rebrand the whole marketplace from this one file.
 * Colors are hex values; they are converted to CSS variables at runtime
 * (see components/layout/BrandStyles.tsx) and consumed by Tailwind tokens
 * (ink, paper, cream, accent, accent-dark, accent-soft, muted, line).
 * If you change fonts, also update the Google Fonts @import in index.css.
 */
export const brand = {
  name: 'Dressly',
  tagline: 'Designer dress rental, closet to closet',
  supportEmail: 'hello@dressly.co',
  legalEntity: 'Dressly Inc.',
  colors: {
    ink: '#111111', // primary text, primary buttons
    paper: '#ffffff', // surfaces
    cream: '#f7f3f0', // soft section backgrounds
    accent: '#c9a09f', // dusty rose — decorative fills, highlights
    accentDark: '#94585c', // dusty rose for text/links (AA on white)
    accentSoft: '#f4e7e5', // tinted backgrounds, chips
    muted: '#6b6461', // secondary text (AA on white)
    line: '#e8e2de' // borders and dividers
  },
  fonts: {
    display: "'Bodoni Moda', 'Didot', Georgia, serif",
    body: "'Inter', system-ui, -apple-system, sans-serif"
  },
  currency: 'USD',
  locale: 'en-US',
  fees: {
    serviceFeeRate: 0.1,
    damageProtection: 9,
    shipping: 14,
    lenderCommissionRate: 0.15
  },
  rentalOptions: [
  { days: 4 as const, label: '4-day rental', hint: 'Perfect for one event' },
  { days: 8 as const, label: '8-day rental', hint: 'Weddings & travel' }],

  social: {
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
    tiktok: 'https://tiktok.com'
  },
  images: {
    hero: "/ce809835-8a24-41f3-ade8-f75cb23ec475.jpg",
    lender: "/cf3a0a3c-9416-4b70-91a8-30a8ae80c197.jpg"
  }
};

export type Brand = typeof brand;