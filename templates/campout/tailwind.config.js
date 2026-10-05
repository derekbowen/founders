// Colors resolve to CSS variables set from data/brand.ts — edit colors there, not here.
const scale = (name, keys) =>
  Object.fromEntries(keys.map((k) => [k, `rgb(var(--c-${name}-${k}) / <alpha-value>)`]))

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: scale('primary', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        accent: scale('accent', [50, 100, 200, 300, 400, 500, 600, 700]),
        sand: scale('sand', [50, 100, 200, 300, 400]),
        ink: scale('ink', [300, 400, 500, 600, 700, 900]),
      },
      fontFamily: {
        serif: ['Bitter', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(30 35 31 / 0.05), 0 6px 20px -6px rgb(30 35 31 / 0.10)',
        lift: '0 2px 4px rgb(30 35 31 / 0.06), 0 16px 40px -12px rgb(30 35 31 / 0.22)',
      },
    },
  },
}
