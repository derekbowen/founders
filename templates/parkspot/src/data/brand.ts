/**
 * Single source of truth for branding.
 * Change the name, copy, font and colors here to rebrand the whole marketplace.
 * Colors must be 6-digit hex values.
 */
export const brand = {
  name: 'ParkSpot',
  tagline: 'Park closer for less',
  description:
  'Rent private driveways, garages and lot spaces by the hour or day — right where you need to be.',
  supportEmail: 'help@parkspot.com',
  legalEntity: 'ParkSpot, Inc.',
  marketCity: 'San Francisco Bay Area',
  locale: 'en-US',
  currency: 'USD',
  fees: {
    /** Charged to drivers on top of the parking price */
    serviceFeeRate: 0.1,
    /** Deducted from host earnings */
    hostCommissionRate: 0.12
  },
  font: {
    family: 'Space Grotesk',
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap'
  },
  colors: {
    ink: '#0A1A33',
    navy: '#0F2547',
    navySoft: '#1C3A6B',
    accent: '#FFC400',
    accentStrong: '#E6AF00',
    canvas: '#F4F6FA',
    surface: '#FFFFFF',
    line: '#DCE2EC',
    muted: '#55657E',
    success: '#0F7A4A',
    danger: '#C0362C',
    warning: '#9A5B00'
  },
  social: {
    instagram: 'https://instagram.com',
    x: 'https://x.com',
    linkedin: 'https://linkedin.com'
  }
} as const;