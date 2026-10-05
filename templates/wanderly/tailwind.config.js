// Brand colors live in data/brand.ts and are injected as CSS variables at runtime.
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const scale = (name, list = shades) =>
  Object.fromEntries(
    list.map((s) => [s, `rgb(var(--color-${name}-${s}) / <alpha-value>)`]),
  )

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: scale('primary'),
        accent: scale('accent'),
        sand: scale('sand', [50, 100, 200, 300]),
      },
      fontFamily: {
        display: ['var(--font-heading)', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.06)',
        float: '0 8px 30px rgba(15, 23, 42, 0.12)',
      },
      maxWidth: {
        page: '80rem',
      },
    },
  },
}
