// Brand colors are CSS variables set from data/brand.ts at runtime.
// To rebrand, edit data/brand.ts — no changes needed here.
const channel = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: channel('--ct-primary'),
          dark: channel('--ct-primary-dark'),
          soft: channel('--ct-primary-soft'),
        },
        accent: {
          DEFAULT: channel('--ct-accent'),
          dark: channel('--ct-accent-dark'),
        },
        ink: channel('--ct-ink'),
        canvas: channel('--ct-canvas'),
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
