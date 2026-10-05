/**
 * ─────────────────────────────────────────────────────────────
 *  BRAND CONFIG — rebrand the whole marketplace from this file.
 * ─────────────────────────────────────────────────────────────
 *  • name / tagline / copy: used across nav, hero, footer, legal pages
 *  • colors: injected as CSS variables (see components/BrandStyle.tsx)
 *    and consumed by Tailwind (brand-*, ink, line, mist, canvas)
 *  • fonts: the family names used for body + display text.
 *    If you change them, update the Google Fonts @import in index.css too.
 */
export const brand = {
  name: 'DeskHop',
  legalName: 'DeskHop Technologies Ltd.',
  tagline: 'Work from anywhere, by the hour',
  description:
  'Book hot desks, private offices and meeting rooms in great coworking spaces — by the hour or by the day.',
  supportEmail: 'hello@deskhop.co',
  salesEmail: 'teams@deskhop.co',
  address: '22 Paul Street, London EC2A 4QE',
  locale: 'en-GB',
  currency: 'EUR',
  serviceFeePercent: 8,
  colors: {
    'brand-50': '#ecfdf5',
    'brand-100': '#d1fae5',
    'brand-200': '#a7f3d0',
    'brand-500': '#10b981',
    'brand-600': '#059669',
    'brand-700': '#047857',
    'brand-800': '#065f46',
    'brand-900': '#064e3b',
    ink: '#1f2328',
    'ink-muted': '#4b5563',
    'ink-subtle': '#8a929c',
    line: '#e5e7eb',
    mist: '#f5f7f6',
    canvas: '#ffffff'
  },
  fonts: {
    body: 'Inter',
    display: 'Sora'
  },
  social: [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'X', href: 'https://x.com' }]

};