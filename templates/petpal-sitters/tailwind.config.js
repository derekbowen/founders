// Brand colors are driven by CSS variables that are set at runtime from data/brand.ts.
// To rebrand, edit data/brand.ts — you never need to touch this file.
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function scale(name) {
  return Object.fromEntries(
    steps.map((step) => [step, `rgb(var(--${name}-${step}) / <alpha-value>)`]),
  )
}

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: scale('primary'),
        accent: scale('accent'),
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(28, 25, 23, 0.04), 0 4px 16px rgba(28, 25, 23, 0.06)',
        lift: '0 8px 30px rgba(28, 25, 23, 0.12)',
      },
    },
  },
}
