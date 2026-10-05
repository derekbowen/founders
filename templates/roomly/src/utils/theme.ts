import { brand } from '../data/brand';

function hexToTriplet(hex: string): string {
  const clean = hex.replace('#', '');
  const full =
  clean.length === 3 ?
  clean.
  split('').
  map((c) => c + c).
  join('') :
  clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

export function applyBrandTheme(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const palettes = ['primary', 'navy', 'coral'] as const;
  palettes.forEach((name) => {
    Object.entries(brand.colors[name]).forEach(([shade, hex]) => {
      root.style.setProperty(`--${name}-${shade}`, hexToTriplet(hex));
    });
  });
  root.style.setProperty('--surface', hexToTriplet(brand.colors.surface));
  root.style.setProperty('--font-sans', `'${brand.fontFamily}'`);

  const fontId = 'brand-font';
  if (!document.getElementById(fontId)) {
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${brand.fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }
  document.title = `${brand.name} — ${brand.tagline}`;
}