// Brand colors are CSS variables populated at runtime from data/brand.ts.
// To rebrand, edit data/brand.ts only — no changes needed here.
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const scale = (prefix) =>
  Object.fromEntries(shades.map((s) => [s, `rgb(var(--${prefix}-${s}) / <alpha-value>)`]))

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: scale('primary'),
        accent: scale('accent'),
      },
      fontFamily: {
        sans: ['var(--brand-font)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 6px 20px -6px rgb(15 23 42 / 0.10)',
        pop: '0 12px 40px -12px rgb(15 23 42 / 0.25)',
      },
    },
  },
}
