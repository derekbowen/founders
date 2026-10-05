import React from 'react';
import { StarIcon } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
}

export function StarRating({ rating, count, size = 'sm', showValue = false }: StarRatingProps) {
  const s = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon
          key={i}
          className={`${s} ${i <= Math.round(rating) ? 'fill-primary text-primary' : 'fill-line text-line'}`}
          aria-hidden />

        )}
      </span>
      {showValue && <span className="text-sm font-medium text-ink">{rating.toFixed(1)}</span>}
      {count !== undefined && <span className="text-xs text-muted">({count})</span>}
    </span>);

}