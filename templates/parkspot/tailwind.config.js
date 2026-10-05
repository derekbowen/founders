// Brand colors are CSS variables injected from data/brand.ts (see components/layout/BrandStyles.tsx).
// Rebrand by editing data/brand.ts only.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: token('ink'),
        navy: token('navy'),
        'navy-soft': token('navy-soft'),
        accent: token('accent'),
        'accent-strong': token('accent-strong'),
        canvas: token('canvas'),
        surface: token('surface'),
        line: token('line'),
        muted: token('muted'),
        success: token('success'),
        danger: token('danger'),
        warning: token('warning'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(10 26 51 / 0.06), 0 4px 16px rgb(10 26 51 / 0.06)',
        pop: '0 8px 32px rgb(10 26 51 / 0.16)',
      },
    },
  },
}
