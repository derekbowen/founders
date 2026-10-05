import { brand } from "../data/brand";

function hexToChannels(hex: string): string {
  const clean = hex.replace("#", "");
  const full =
  clean.length === 3 ?
  clean.
  split("").
  map((ch) => ch + ch).
  join("") :
  clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

function toKebab(key: string): string {
  return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** Writes brand colors + fonts into CSS variables consumed by tailwind.config.js */
export function applyBrandTheme(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([key, value]) => {
    root.style.setProperty(`--c-${toKebab(key)}`, hexToChannels(value));
  });
  root.style.setProperty("--font-display", brand.fonts.display);
  root.style.setProperty("--font-sans", brand.fonts.sans);
  document.title = `${brand.name} — ${brand.tagline}`;
}