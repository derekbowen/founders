/**
 * Rebrand the entire marketplace from this one file.
 * Colors are applied as CSS variables at runtime and consumed by Tailwind
 * (`bg-primary-600`, `text-accent-700`, `bg-sand-100`, ...).
 * Fonts must also be loaded in index.css (Google Fonts @import).
 */
export const brand = {
  name: 'Wanderly',
  tagline: 'Experience cities like a local',
  description:
  'Book small-group tours and experiences hosted by locals — food walks, kayak trips, cooking classes and photo walks in cities around the world.',
  supportEmail: 'hello@wanderly.travel',
  locale: 'en-US',
  currency: 'USD',
  serviceFeeRate: 0.08,
  hostCommissionRate: 0.12,
  fonts: {
    heading: 'Poppins',
    body: 'Inter'
  },
  colors: {
    // Sunset coral
    primary: {
      50: '#FFF3F0',
      100: '#FFE2DA',
      200: '#FFC4B4',
      300: '#FF9D85',
      400: '#FA7A5C',
      500: '#F0603E',
      600: '#D23F1F',
      700: '#B0331A',
      800: '#8C2A18',
      900: '#6E2316'
    },
    // Deep teal
    accent: {
      50: '#EAF7F6',
      100: '#CDEDEA',
      200: '#9DDAD4',
      300: '#63BFB8',
      400: '#2F9E98',
      500: '#12807B',
      600: '#0E6966',
      700: '#0D5452',
      800: '#0E4443',
      900: '#0B3534'
    },
    // Warm paper backgrounds
    sand: {
      50: '#FDFBF8',
      100: '#FAF5EF',
      200: '#F3EADF',
      300: '#E8DACB'
    }
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://x.com'
  }
} as const;

export type Brand = typeof brand;