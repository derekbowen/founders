// Brand colors are CSS variables set from data/brand.ts at runtime.
// To rebrand, edit data/brand.ts — no changes needed here.
const v = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: v('navy'), deep: v('navy-deep'), soft: v('navy-soft') },
        sand: { DEFAULT: v('sand'), light: v('sand-light') },
        coral: { DEFAULT: v('coral'), dark: v('coral-dark') },
        ink: v('ink'),
        muted: v('muted'),
        line: v('line'),
        sea: v('sea'),
        success: v('success'),
        warning: v('warning'),
        danger: v('danger'),
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-body)'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(14 26 43 / 0.06), 0 4px 16px rgb(14 26 43 / 0.06)',
        lift: '0 8px 30px rgb(14 26 43 / 0.12)',
      },
      maxWidth: { content: '1280px' },
    },
  },
  plugins: [],
};
