import React from 'react';
import type { Listing } from '../../types/marketplace';
import { priceLabel } from '../../utils/format';

export function PriceTag({ listing, large = false }: {listing: Listing;large?: boolean;}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-ink bg-brand font-display font-bold text-ink ${
      large ? 'px-3 py-1 text-2xl' : 'px-2.5 py-0.5 text-sm'}`
      }>
      
      {priceLabel(listing)}
    </span>);

}