import React from 'react';
import { StarIcon } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function RatingStars({ rating, count, size = 'sm' }: RatingStarsProps) {
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" aria-label={`Rated ${rating.toFixed(1)} out of 5`} role="img">
        {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon
          key={i}
          className={`${iconSize} ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
          aria-hidden="true" />

        )}
      </div>
      <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-medium text-slate-700 tabular-nums`}>
        {rating.toFixed(1)}
        {count !== undefined && <span className="font-normal text-slate-500"> ({count})</span>}
      </span>
    </div>);

}