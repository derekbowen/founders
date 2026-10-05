const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: token("primary"),
          dark: token("primary-dark"),
          soft: token("primary-soft"),
        },
        accent: {
          DEFAULT: token("accent"),
          dark: token("accent-dark"),
          soft: token("accent-soft"),
        },
        kraft: token("kraft"),
        paper: token("paper"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        danger: token("danger"),
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(43,36,24,0.06), 0 4px 16px rgba(43,36,24,0.06)",
        lift: "0 2px 4px rgba(43,36,24,0.08), 0 12px 32px rgba(43,36,24,0.10)",
      },
      maxWidth: {
        site: "1240px",
      },
    },
  },
  plugins: [],
};
