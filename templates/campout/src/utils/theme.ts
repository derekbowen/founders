import { brand } from '../data/brand';

function hexToChannels(hex: string): string {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

/** Writes brand colors to CSS variables consumed by tailwind.config.js */
export function applyBrandTheme(root: HTMLElement = document.documentElement) {
  Object.entries(brand.colors).forEach(([group, scale]) => {
    Object.entries(scale).forEach(([step, hex]) => {
      root.style.setProperty(`--c-${group}-${step}`, hexToChannels(hex));
    });
  });
  document.title = `${brand.name} — ${brand.tagline}`;
}