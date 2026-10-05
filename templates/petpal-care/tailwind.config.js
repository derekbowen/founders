// Brand colors are CSS variables injected at runtime from data/brand.ts (see utils/brand.ts).
// To rebrand, edit data/brand.ts — you never need to touch this file.
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const scale = (name) =>
  Object.fromEntries(shades.map((k) => [k, `rgb(var(--${name}-${k}) / <alpha-value>)`]))

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
        sans: ['var(--font-sans)', 'Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(31 27 22 / 0.04), 0 6px 20px -8px rgb(31 27 22 / 0.12)',
        lift: '0 4px 10px -2px rgb(31 27 22 / 0.08), 0 18px 40px -12px rgb(31 27 22 / 0.22)',
      },
    },
  },
}
