import { useLayoutEffect } from 'react';
import { brand } from '../data/brand';
import { hexToRgbChannels } from '../utils/color';

/** Applies brand colors + fonts from data/brand.ts as CSS variables. */
export function useBrandTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.entries(brand.colors).forEach(([name, palette]) => {
      Object.entries(palette).forEach(([shade, hex]) => {
        root.style.setProperty(`--color-${name}-${shade}`, hexToRgbChannels(hex));
      });
    });
    root.style.setProperty('--font-heading', `'${brand.fonts.heading}'`);
    root.style.setProperty('--font-body', `'${brand.fonts.body}'`);
    document.title = `${brand.name} — ${brand.tagline}`;
  }, []);
}