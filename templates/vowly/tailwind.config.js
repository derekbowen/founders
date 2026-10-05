// Colors resolve to CSS variables populated from data/brand.ts at startup (see utils/theme.ts).
// To rebrand, edit data/brand.ts — no changes are needed here.
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: c("canvas"),
        surface: c("surface"),
        blush: { DEFAULT: c("blush"), strong: c("blush-strong") },
        primary: { DEFAULT: c("primary"), hover: c("primary-hover") },
        gold: { DEFAULT: c("gold"), dark: c("gold-dark") },
        ink: c("ink"),
        muted: c("muted"),
        line: c("line"),
        success: c("success"),
        warning: c("warning"),
        danger: c("danger"),
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        soft: "0 1px 2px rgb(42 32 35 / 0.04), 0 10px 30px -12px rgb(42 32 35 / 0.12)",
        lift: "0 2px 4px rgb(42 32 35 / 0.05), 0 20px 40px -16px rgb(42 32 35 / 0.22)",
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
};
