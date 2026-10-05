import { brand } from '../data/brand';

function toKebab(key: string): string {
  return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

/** Pushes the colors & fonts from data/brand.ts into CSS variables. */
export function applyBrandTheme(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${toKebab(key)}`, hexToRgbTriplet(value));
  });
  root.style.setProperty('--font-heading', brand.fonts.heading);
  root.style.setProperty('--font-body', brand.fonts.body);
  document.title = `${brand.name} — ${brand.tagline}`;
}