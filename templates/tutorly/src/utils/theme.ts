import { brand } from '../data/brand';

function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const value = parseInt(full, 16);
  return `${value >> 16 & 255} ${value >> 8 & 255} ${value & 255}`;
}

/** Writes brand colors + font from data/brand.ts into CSS variables. */
export function applyBrandTheme(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([name, scale]) => {
    Object.entries(scale).forEach(([shade, hex]) => {
      root.style.setProperty(`--color-${name}-${shade}`, hexToRgbChannels(hex));
    });
  });
  root.style.setProperty('--font-sans', brand.fontFamily);
  document.title = `${brand.name} — ${brand.tagline}`;
}