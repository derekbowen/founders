import React from 'react';
import { StarIcon } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, count, size = 'sm' }: StarRatingProps) {
  const text = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <span className={`inline-flex items-center gap-1 ${text} font-bold text-ink-900`}>
      <StarIcon className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} fill="currentColor" style={{ color: 'rgb(var(--primary-500))' }} aria-hidden="true" />
      <span>{rating.toFixed(2).replace(/0$/, '')}</span>
      {count !== undefined && <span className="font-semibold text-ink-600">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>);

}

export function StarRow({ rating }: {rating: number;}) {
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
      <StarIcon
        key={i}
        className="h-4 w-4"
        aria-hidden="true"
        fill={i <= rating ? 'currentColor' : 'none'}
        style={{ color: i <= rating ? 'rgb(var(--primary-500))' : 'rgb(var(--ink-300))' }} />

      )}
    </span>);

}