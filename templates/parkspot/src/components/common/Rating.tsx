import React from 'react';
import { StarIcon } from 'lucide-react';

export function Rating({ value, count, size = 'sm' }: {value: number;count?: number;size?: 'sm' | 'md';}) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${size === 'md' ? 'text-base' : 'text-sm'}`}>
      <StarIcon size={size === 'md' ? 16 : 14} className="fill-accent text-accent-strong" aria-hidden />
      <span>{value.toFixed(2)}</span>
      {count !== undefined && <span className="font-normal text-muted">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>);

}

export function Stars({ value }: {value: number;}) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
      <StarIcon
        key={i}
        size={14}
        aria-hidden
        className={i <= value ? 'fill-accent text-accent-strong' : 'fill-line text-line'} />

      )}
    </span>);

}