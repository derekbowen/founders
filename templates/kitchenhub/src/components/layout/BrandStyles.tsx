import React, { useEffect } from 'react';
import { brand } from '../../data/brand';
import { hexToRgbChannels } from '../../utils/color';

/** Emits CSS variables from data/brand.ts so Tailwind tokens follow the brand. */
export function BrandStyles() {
  const { colors, fonts } = brand;

  useEffect(() => {
    document.title = `${brand.name} — ${brand.tagline}`;
    const id = 'brand-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = fonts.googleFontsUrl;
      document.head.appendChild(link);
    }
  }, [fonts.googleFontsUrl]);

  const steelVars = Object.entries(colors.steel).
  map(([shade, hex]) => `--c-steel-${shade}: ${hexToRgbChannels(hex)};`).
  join('');

  const css = `:root{
    --c-primary:${hexToRgbChannels(colors.primary)};
    --c-primary-hover:${hexToRgbChannels(colors.primaryHover)};
    --c-primary-soft:${hexToRgbChannels(colors.primarySoft)};
    --c-accent:${hexToRgbChannels(colors.accent)};
    --c-accent-hover:${hexToRgbChannels(colors.accentHover)};
    --c-accent-soft:${hexToRgbChannels(colors.accentSoft)};
    ${steelVars}
    --font-heading:'${fonts.heading}';
    --font-body:'${fonts.body}';
  }`;

  return <style>{css}</style>;
}