import { brand } from '../data/brand';

export function applyBrandTheme(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([palette, steps]) => {
    Object.entries(steps).forEach(([step, hex]) => {
      root.style.setProperty(`--${palette}-${step}`, hex);
    });
  });
  document.title = `${brand.name} — ${brand.tagline}`;
}