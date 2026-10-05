import React, { useEffect } from 'react';
import { brand } from '../../data/brand';

export function BrandStyles() {
  useEffect(() => {
    document.title = `${brand.name} — ${brand.tagline}`;
    const id = 'brand-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = brand.font.url;
      document.head.appendChild(link);
    }
  }, []);

  const vars = Object.entries(brand.colors).
  map(([key, hex]) => `--c-${toKebab(key)}: ${hexToRgb(hex)};`).
  join('');

  return <style>{`:root{${vars}--font-sans:'${brand.font.family}';}`}</style>;
}

function toKebab(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}