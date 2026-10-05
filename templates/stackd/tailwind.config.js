// Colors resolve to CSS variables defined from data/brand.ts at runtime.
const v = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: v('accent'),
          ink: v('accent-ink'),
          soft: v('accent-soft'),
        },
        ink: v('ink'),
        paper: v('paper'),
        line: v('line'),
        muted: v('muted'),
        success: v('success'),
        warning: v('warning'),
        danger: v('danger'),
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pop: '4px 4px 0 0 rgb(var(--color-ink))',
        'pop-sm': '2px 2px 0 0 rgb(var(--color-ink))',
        'pop-accent': '4px 4px 0 0 rgb(var(--color-accent))',
      },
    },
  },
}
