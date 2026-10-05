import React from 'react';
import { StarIcon } from 'lucide-react';

export function Rating({ value, count, size = 'sm' }: {value: number;count?: number;size?: 'sm' | 'md';}) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium text-ink-900 ${size === 'md' ? 'text-base' : 'text-sm'}`}>
      <StarIcon size={size === 'md' ? 16 : 14} className="fill-accent-500 text-accent-500" aria-hidden="true" />
      <span>{value.toFixed(2)}</span>
      {count !== undefined && <span className="font-normal text-ink-500">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>);

}