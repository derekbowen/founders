import { brand } from '../data/brand';

function hexToChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const value = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** Writes the brand palette from data/brand.ts into CSS variables used by Tailwind. */
export function applyBrandTheme(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const palettes = brand.colors as Record<string, Record<string, string>>;
  Object.entries(palettes).forEach(([name, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      root.style.setProperty(`--color-${name}-${shade}`, hexToChannels(hex));
    });
  });
  document.title = `${brand.name} — ${brand.tagline}`;
}