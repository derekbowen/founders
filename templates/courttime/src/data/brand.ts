// ─────────────────────────────────────────────────────────────
// REBRAND HERE. Name, copy, market, fees and colors live in this
// one file. Colors are applied as CSS variables on app load and
// power every `brand`, `accent`, `ink` and `canvas` Tailwind class.
// ─────────────────────────────────────────────────────────────
export const brand = {
  name: 'CourtTime',
  tagline: 'Book a court in seconds',
  description:
  'Book tennis, pickleball, padel and basketball courts by the hour — or grab a seat in an open-play session near you.',
  city: 'Austin, TX',
  mapCenter: { lat: 30.2849, lng: -97.7441 },
  locale: 'en-US',
  currency: 'USD',
  serviceFeeRate: 0.08,
  freeCancellationHours: 24,
  supportEmail: 'help@courttime.app',
  inviteBaseUrl: 'https://courttime.app/join',
  legalEntity: 'CourtTime Inc.',
  colors: {
    primary: '#0E7C3A',
    primaryDark: '#0A5C2B',
    primarySoft: '#E7F5EC',
    accent: '#DCF24A',
    accentDark: '#C4DB2E',
    ink: '#0C1A12',
    canvas: '#F5F7F3'
  }
};