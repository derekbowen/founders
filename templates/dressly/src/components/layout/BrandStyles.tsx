import React from 'react';
import { brand } from '../../data/brand';
import { hexToRgbTriplet } from '../../utils/color';

export function BrandStyles() {
  const c = brand.colors;
  const css = `:root{
  --c-ink:${hexToRgbTriplet(c.ink)};
  --c-paper:${hexToRgbTriplet(c.paper)};
  --c-cream:${hexToRgbTriplet(c.cream)};
  --c-accent:${hexToRgbTriplet(c.accent)};
  --c-accent-dark:${hexToRgbTriplet(c.accentDark)};
  --c-accent-soft:${hexToRgbTriplet(c.accentSoft)};
  --c-muted:${hexToRgbTriplet(c.muted)};
  --c-line:${hexToRgbTriplet(c.line)};
  --font-display:${brand.fonts.display};
  --font-body:${brand.fonts.body};
}`;
  return <style>{css}</style>;
}