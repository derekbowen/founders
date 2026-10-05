/**
 * REBRAND HERE.
 * Everything brand-related (name, copy, font, palette, currency) is read from this file.
 * Colors are injected as CSS variables at runtime, so Tailwind classes like
 * `bg-primary-400`, `text-navy-900` and `bg-coral-500` update automatically.
 */
export const brand = {
  name: 'Roomly',
  tagline: 'Rooms & shared flats for medium and long stays',
  heroTitle: 'Find your next room',
  heroSubtitle:
  'Verified private rooms, studios and flatshares for students, interns and remote workers — message landlords directly, no booking fees.',
  supportEmail: 'hello@roomly.co',
  companyName: 'Roomly Technologies Ltd.',
  companyAddress: 'Torstraße 140, 10119 Berlin, Germany',
  currency: 'EUR',
  locale: 'en-IE',
  /** Any Google Font family name. */
  fontFamily: 'Outfit',
  colors: {
    /** Fresh mint – primary actions, highlights */
    primary: {
      50: '#effdf7',
      100: '#d6f9ea',
      200: '#aef2d5',
      300: '#7be8bc',
      400: '#45d9a0',
      500: '#22c088',
      600: '#149c6e',
      700: '#117c5a',
      800: '#11624a',
      900: '#0f513e'
    },
    /** Navy – text, dark surfaces */
    navy: {
      50: '#f3f5f9',
      100: '#e4e8f1',
      200: '#c9d1e1',
      300: '#9eabc6',
      400: '#6b7c9f',
      500: '#4a5b80',
      600: '#364669',
      700: '#283655',
      800: '#1b2742',
      900: '#0f1b33'
    },
    /** Coral – accents, badges, attention */
    coral: {
      50: '#fff4f1',
      100: '#ffe5de',
      200: '#ffc8b9',
      300: '#ffa28b',
      400: '#ff7c5f',
      500: '#f65d3d',
      600: '#dd4524',
      700: '#b8361b',
      800: '#952e1a',
      900: '#7a2a1a'
    },
    surface: '#f6faf8'
  },
  social: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com'
  }
};