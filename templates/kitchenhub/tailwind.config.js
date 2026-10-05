// Colors and fonts are driven by CSS variables emitted from data/brand.ts
// (see components/layout/BrandStyles.tsx). Rebrand there — not here.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: v('c-primary'),
          hover: v('c-primary-hover'),
          soft: v('c-primary-soft'),
        },
        accent: {
          DEFAULT: v('c-accent'),
          hover: v('c-accent-hover'),
          soft: v('c-accent-soft'),
        },
        steel: {
          50: v('c-steel-50'),
          100: v('c-steel-100'),
          200: v('c-steel-200'),
          300: v('c-steel-300'),
          400: v('c-steel-400'),
          500: v('c-steel-500'),
          600: v('c-steel-600'),
          700: v('c-steel-700'),
          800: v('c-steel-800'),
          900: v('c-steel-900'),
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(26 29 33 / 0.06), 0 2px 8px rgb(26 29 33 / 0.06)',
        lift: '0 4px 12px rgb(26 29 33 / 0.08), 0 16px 32px rgb(26 29 33 / 0.10)',
      },
    },
  },
  plugins: [],
};
