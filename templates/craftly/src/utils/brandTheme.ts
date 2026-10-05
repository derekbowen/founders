import { brand } from '../data/brand';

function toKebab(key: string): string {
  return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

export function applyBrandTheme(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([key, value]) => {
    root.style.setProperty(`--c-${toKebab(key)}`, hexToRgbChannels(value));
  });
  root.style.setProperty('--font-heading', brand.fonts.heading);
  root.style.setProperty('--font-body', brand.fonts.body);
  document.title = `${brand.name} — ${brand.tagline}`;
}