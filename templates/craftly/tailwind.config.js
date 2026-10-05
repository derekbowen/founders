// Colors and fonts are driven by CSS variables that are set from data/brand.ts at runtime.
// To rebrand, edit data/brand.ts — you should not need to touch this file.
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: c('canvas'),
        surface: c('surface'),
        subtle: c('subtle'),
        ink: c('ink'),
        muted: c('muted'),
        line: c('line'),
        primary: {
          DEFAULT: c('primary'),
          hover: c('primary-hover'),
          soft: c('primary-soft'),
          ink: c('primary-ink'),
        },
        accent: {
          DEFAULT: c('accent'),
          soft: c('accent-soft'),
          ink: c('accent-ink'),
        },
        info: c('info'),
        success: c('success'),
        warning: c('warning'),
        danger: c('danger'),
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(43 36 32 / 0.04), 0 4px 16px rgb(43 36 32 / 0.06)',
        lift: '0 2px 4px rgb(43 36 32 / 0.06), 0 12px 32px rgb(43 36 32 / 0.10)',
      },
    },
  },
}
