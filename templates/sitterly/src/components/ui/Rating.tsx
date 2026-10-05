import React from 'react';
import { StarIcon } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function Rating({ value, count, size = 'sm' }: RatingProps) {
  return (
    <span className={`inline-flex items-center gap-1 font-semibold text-ink-900 ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
      <StarIcon className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} fill-accent-500 text-accent-500`} aria-hidden />
      <span>{value.toFixed(2).replace(/0$/, '')}</span>
      {count !== undefined && <span className="font-normal text-ink-600">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>);

}

export function Stars({ value }: {value: number;}) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
      <StarIcon key={i} aria-hidden className={`h-4 w-4 ${i <= value ? 'fill-accent-500 text-accent-500' : 'fill-ink-200 text-ink-200'}`} />
      )}
    </span>);

}