import { brand } from '../data/brand';

function hexToChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

export function applyBrandTheme(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  Object.entries(brand.colors.primary).forEach(([shade, hex]) => {
    root.style.setProperty(`--primary-${shade}`, hexToChannels(hex));
  });
  Object.entries(brand.colors.accent).forEach(([shade, hex]) => {
    root.style.setProperty(`--accent-${shade}`, hexToChannels(hex));
  });
  root.style.setProperty('--brand-font', `'${brand.font.family}'`);

  if (!document.getElementById('brand-font')) {
    const link = document.createElement('link');
    link.id = 'brand-font';
    link.rel = 'stylesheet';
    link.href = brand.font.googleFontsUrl;
    document.head.appendChild(link);
  }

  document.title = `${brand.name} — ${brand.tagline}`;
}