import { brand } from '../data/brand';

function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const value = parseInt(clean, 16);
  return `${value >> 16 & 255} ${value >> 8 & 255} ${value & 255}`;
}

/** Writes the brand palette + font from data/brand.ts into CSS variables used by Tailwind. */
export function applyBrandTheme(): void {
  const root = document.documentElement;
  Object.entries(brand.colors.primary).forEach(([step, hex]) => {
    root.style.setProperty(`--primary-${step}`, hexToRgbChannels(hex));
  });
  Object.entries(brand.colors.accent).forEach(([step, hex]) => {
    root.style.setProperty(`--accent-${step}`, hexToRgbChannels(hex));
  });
  root.style.setProperty('--canvas', hexToRgbChannels(brand.colors.canvas));
  root.style.setProperty('--font-sans', `'${brand.font.family}'`);
  document.title = `${brand.name} — ${brand.tagline}`;
}