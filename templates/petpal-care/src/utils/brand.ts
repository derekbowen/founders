import { brand } from '../data/brand';

function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const n = parseInt(clean, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

/** Writes the brand palette from data/brand.ts into CSS variables consumed by Tailwind. */
export function applyBrand(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([scaleName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      root.style.setProperty(`--${scaleName}-${shade}`, hexToRgbChannels(hex));
    });
  });
  root.style.setProperty('--font-sans', `'${brand.font}'`);
  document.title = `${brand.name} — ${brand.tagline}`;
}