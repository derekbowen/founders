import React, { useEffect, useMemo } from 'react';
import { brand } from '../data/brand';
import { hexToChannels } from '../utils/color';

/** Injects brand colors + fonts from data/brand.ts as CSS variables. */
export function BrandStyles() {
  const css = useMemo(() => {
    const vars: string[] = [];
    Object.entries(brand.colors).forEach(([name, scale]) => {
      Object.entries(scale).forEach(([shade, hex]) => vars.push(`--${name}-${shade}: ${hexToChannels(hex)};`));
    });
    vars.push(`--font-heading: '${brand.fonts.heading}';`);
    vars.push(`--font-body: '${brand.fonts.body}';`);
    return `:root{${vars.join('')}}`;
  }, []);

  useEffect(() => {
    document.title = `${brand.name} — ${brand.tagline}`;
    const id = 'brand-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = brand.fonts.googleFontsUrl;
    document.head.appendChild(link);
  }, []);

  return <style>{css}</style>;
}