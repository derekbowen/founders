const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

// Colors resolve to CSS variables set at runtime from data/brand.ts
const scale = (name) =>
  Object.fromEntries(
    shades.map((shade) => [shade, `rgb(var(--color-${name}-${shade}) / <alpha-value>)`]),
  )

export default {
  content: [
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
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 4px 16px rgb(15 23 42 / 0.06)',
        lift: '0 8px 30px rgb(15 23 42 / 0.10)',
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
}
