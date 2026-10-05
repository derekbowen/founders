const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: token('ink'),
        paper: token('paper'),
        cream: token('cream'),
        accent: {
          DEFAULT: token('accent'),
          dark: token('accent-dark'),
          soft: token('accent-soft'),
        },
        muted: token('muted'),
        line: token('line'),
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
    },
  },
}
