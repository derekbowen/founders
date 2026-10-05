// Brand colors are defined ONCE in data/brand.ts and injected as CSS variables
// at startup (see utils/theme.ts). This config just maps Tailwind names to them.
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

function scale(name) {
  return shades.reduce((acc, shade) => {
    acc[shade] = `rgb(var(--color-${name}-${shade}) / <alpha-value>)`
    return acc
  }, {})
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: scale('primary'),
        accent: scale('accent'),
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        lift: '0 8px 24px -8px rgba(15, 23, 42, 0.18)',
      },
    },
  },
}
