// Brand colors are defined in data/brand.ts and injected as CSS variables at startup.
// Tailwind reads them here so `bg-primary-600`, `text-ink-900`, etc. follow the brand file.
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const scale = (name) =>
  Object.fromEntries(
    shades.map((s) => [s, `rgb(var(--color-${name}-${s}) / <alpha-value>)`]),
  )

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: scale('primary'),
        ink: scale('ink'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 1px 3px rgb(15 23 42 / 0.06)',
        lift: '0 18px 40px -18px rgb(15 23 42 / 0.35)',
      },
    },
  },
}
