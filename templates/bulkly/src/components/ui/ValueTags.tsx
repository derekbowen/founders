import React from 'react';
import { LeafIcon, SproutIcon, UsersIcon } from 'lucide-react';
import type { ProductValue } from '../../types/marketplace';

const valueMeta: Record<ProductValue, {label: string;icon: typeof LeafIcon;}> = {
  organic: { label: 'Organic', icon: LeafIcon },
  vegan: { label: 'Vegan', icon: SproutIcon },
  'women-owned': { label: 'Women-owned', icon: UsersIcon }
};

export function ValueTags({ values, size = 'sm' }: {values: ProductValue[];size?: 'sm' | 'md';}) {
  if (values.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Values">
      {values.map((v) => {
        const { label, icon: Icon } = valueMeta[v];
        return (
          <li
            key={v}
            className={`inline-flex items-center gap-1 rounded-full bg-accent-100 font-medium text-accent-900 ${
            size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'}`
            }>
            
            <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} aria-hidden="true" />
            {label}
          </li>);

      })}
    </ul>);

}