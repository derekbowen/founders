// Brand colors and fonts are defined in data/brand.ts and injected as CSS variables
// at runtime (components/BrandStyles.tsx). Rebrand there — not here.
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const scale = (name) =>
  Object.fromEntries(shades.map((s) => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`]))

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: scale('primary'),
        accent: scale('accent'),
        ink: scale('ink'),
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(30 26 38 / 0.04), 0 4px 16px rgb(30 26 38 / 0.06)',
        lift: '0 12px 32px rgb(30 26 38 / 0.12)',
      },
    },
  },
}
