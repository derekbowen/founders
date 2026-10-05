import { brand } from '../data/brand';

export function hexToChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return `${num >> 16 & 255} ${num >> 8 & 255} ${num & 255}`;
}

export function applyBrandTheme(): void {
  const root = document.documentElement;
  const map: Record<string, string> = {
    '--ct-primary': brand.colors.primary,
    '--ct-primary-dark': brand.colors.primaryDark,
    '--ct-primary-soft': brand.colors.primarySoft,
    '--ct-accent': brand.colors.accent,
    '--ct-accent-dark': brand.colors.accentDark,
    '--ct-ink': brand.colors.ink,
    '--ct-canvas': brand.colors.canvas
  };
  Object.entries(map).forEach(([key, value]) => root.style.setProperty(key, hexToChannels(value)));
  document.title = `${brand.name} — ${brand.tagline}`;
}