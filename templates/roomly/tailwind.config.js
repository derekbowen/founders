// Brand colors are NOT defined here. They live in data/brand.ts and are
// injected as CSS variables at runtime (see utils/theme.ts).
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const scale = (name) =>
  Object.fromEntries(
    shades.map((s) => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`]),
  )

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: scale('primary'),
        navy: scale('navy'),
        coral: scale('coral'),
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 27 51 / 0.05), 0 6px 20px rgb(15 27 51 / 0.06)',
        lift: '0 2px 4px rgb(15 27 51 / 0.06), 0 16px 40px rgb(15 27 51 / 0.12)',
      },
    },
  },
}
