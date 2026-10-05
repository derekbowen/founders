import React from 'react';
import { StarIcon } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export function RatingStars({ rating, size = 14, showValue = false, reviewCount }: RatingStarsProps) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-accent-400 text-accent-500' : 'fill-ink-200 text-ink-200'} />

        )}
      </span>
      {showValue && <span className="text-sm font-semibold text-ink-900">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && <span className="text-sm text-ink-500">({reviewCount})</span>}
    </span>);

}