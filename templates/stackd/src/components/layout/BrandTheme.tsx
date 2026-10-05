import { useLayoutEffect } from 'react';
import { brand } from '../../data/brand';
import { hexToRgbChannels, toKebab } from '../../utils/format';

/** Pushes the color tokens from data/brand.ts into CSS variables consumed by Tailwind. */
export function BrandTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.entries(brand.colors).forEach(([key, hex]) => {
      root.style.setProperty(`--color-${toKebab(key)}`, hexToRgbChannels(hex));
    });
    document.title = `${brand.name} — ${brand.tagline}`;
  }, []);
  return null;
}