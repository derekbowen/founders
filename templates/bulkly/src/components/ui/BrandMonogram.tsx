import React from 'react';
import type { Brand } from '../../types/marketplace';

const sizes = {
  sm: 'h-8 w-8 text-xs rounded-md',
  md: 'h-11 w-11 text-sm rounded-lg',
  lg: 'h-16 w-16 text-xl rounded-xl',
  xl: 'h-24 w-24 text-3xl rounded-2xl'
};

export function BrandMonogram({ brand, size = 'md' }: {brand: Brand;size?: keyof typeof sizes;}) {
  const initials = brand.name.
  replace(/&/g, '').
  split(/\s+/).
  filter(Boolean).
  slice(0, 2).
  map((w) => w[0]).
  join('');
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-semibold tracking-wide text-white ${sizes[size]}`}
      style={{ backgroundColor: brand.monogramColor }}
      aria-hidden="true">
      
      {initials}
    </span>);

}