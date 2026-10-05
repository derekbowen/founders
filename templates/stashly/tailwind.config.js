const scale = (name) =>
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].reduce((acc, step) => {
    acc[step] = `var(--${name}-${step})`
    return acc
  }, {})

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: scale('brand'),
        sand: scale('sand'),
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28, 25, 23, 0.04), 0 4px 16px rgba(28, 25, 23, 0.06)',
        lift: '0 2px 4px rgba(28, 25, 23, 0.04), 0 12px 32px rgba(28, 25, 23, 0.10)',
      },
    },
  },
}
