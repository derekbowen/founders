/**
 * BRAND CONFIG — rebrand the whole marketplace from this one file.
 * Colors are hex values; they are converted to CSS variables at runtime and
 * consumed by Tailwind (bg-navy, text-coral-dark, border-line, ...).
 */
export const brand = {
  name: 'Harborly',
  legalName: 'Harborly Marine, Inc.',
  tagline: 'Rent boats, yachts & sailboats — with or without a captain',
  description:
  'Harborly connects people who love the water with trusted boat owners and licensed captains in the best harbors in the country.',
  supportEmail: 'help@harborly.com',
  phone: '+1 (305) 555-0147',
  address: '1 Harbor Walk, Suite 400, Miami, FL 33131',
  locale: 'en-US',
  currency: 'USD',
  /** Marketplace commission charged to renters, as a fraction of subtotal. */
  serviceFeeRate: 0.1,
  colors: {
    navy: '#0B2545',
    navyDeep: '#061730',
    navySoft: '#1B3A63',
    sand: '#E8DCC6',
    sandLight: '#F8F4EC',
    coral: '#E4704F',
    coralDark: '#B4472A',
    ink: '#0E1A2B',
    muted: '#566275',
    line: '#E5DED1',
    sea: '#2A6F97',
    success: '#1E7F55',
    warning: '#9A6A12',
    danger: '#B3261E'
  },
  fonts: {
    heading: '"Playfair Display", Georgia, serif',
    body: 'Inter, ui-sans-serif, system-ui, sans-serif'
  },
  social: [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'YouTube', href: 'https://youtube.com' }]

};