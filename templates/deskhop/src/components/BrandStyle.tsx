import React from 'react';
import { brand } from '../data/brand';
import { hexToRgbTriplet } from '../utils/color';

export function BrandStyle() {
  const colorVars = Object.entries(brand.colors).
  map(([key, hex]) => `--${key}: ${hexToRgbTriplet(hex)};`).
  join(' ');
  const css = `:root { ${colorVars} --font-body: '${brand.fonts.body}'; --font-display: '${brand.fonts.display}'; }`;
  return <style>{css}</style>;
}