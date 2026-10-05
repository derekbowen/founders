import { brand } from '../data/brand';

function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full =
  clean.length === 3 ?
  clean.
  split('').
  map((c) => c + c).
  join('') :
  clean;
  const num = parseInt(full, 16);
  return `${num >> 16 & 255} ${num >> 8 & 255} ${num & 255}`;
}

export function applyBrandTheme(): void {
  const root = document.documentElement;
  Object.entries(brand.colors.primary).forEach(([shade, hex]) =>
  root.style.setProperty(`--color-primary-${shade}`, hexToRgbChannels(hex))
  );
  Object.entries(brand.colors.ink).forEach(([shade, hex]) =>
  root.style.setProperty(`--color-ink-${shade}`, hexToRgbChannels(hex))
  );
  root.style.setProperty('--font-sans', `'${brand.font.family}'`);
  document.title = `${brand.name} — ${brand.tagline}`;
}