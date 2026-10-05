/**
 * BRAND CONFIG — rebrand the whole marketplace from this one file.
 * Colors are hex values; they're converted to CSS variables at startup and
 * consumed by Tailwind (bg-primary, text-gold-dark, border-line, ...).
 */
export const brand = {
  name: "Vowly",
  tagline: "Find your dream wedding team",
  description:
  "Vowly connects couples with handpicked wedding photographers, venues, florists, caterers and more. Send an inquiry, start a conversation, and book directly.",
  region: "Northern California",
  supportEmail: "hello@vowly.co",
  legalEntity: "Vowly Inc.",
  currency: "USD",
  locale: "en-US",
  social: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    facebook: "https://facebook.com"
  },
  colors: {
    canvas: "#FBF7F2", // ivory page background
    surface: "#FFFFFF", // cards, inputs
    blush: "#F6E4DF", // soft blush fills
    blushStrong: "#EBC8C0", // stronger blush accents
    primary: "#8C4352", // deep rose — buttons & links (AA on white/ivory)
    primaryHover: "#733543",
    gold: "#C9AA72", // champagne gold accent
    goldDark: "#7A5C2A", // gold for text (AA on ivory)
    ink: "#2A2023", // primary text
    muted: "#6B5C5F", // secondary text (AA on ivory)
    line: "#EADFD7", // borders & dividers
    success: "#3D6B4E",
    warning: "#8A5A12",
    danger: "#A23A3A"
  },
  fonts: {
    display: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
    sans: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif"
  }
};

export type BrandColorKey = keyof typeof brand.colors;