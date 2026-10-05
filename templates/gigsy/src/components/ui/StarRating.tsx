import React from 'react';
import { StarIcon } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  showStars?: boolean;
}

export function StarRating({ rating, count, size = 'sm', showStars = false }: StarRatingProps) {
  const icon = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const text = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <span className={`inline-flex items-center gap-1 ${text}`} aria-label={`Rated ${rating.toFixed(1)} out of 5${count !== undefined ? ` from ${count} reviews` : ''}`}>
      {showStars ?
      <span className="flex items-center gap-0.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon key={i} className={`${icon} ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
        )}
        </span> :

      <StarIcon className={`${icon} fill-amber-400 text-amber-400`} aria-hidden="true" />
      }
      <span className="font-semibold text-slate-900" aria-hidden="true">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-slate-500" aria-hidden="true">({count})</span>}
    </span>);

}