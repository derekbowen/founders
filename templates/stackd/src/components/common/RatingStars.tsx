import React from 'react';
import { StarIcon } from 'lucide-react';
import { formatCompact } from '../../utils/format';

interface RatingStarsProps {
  rating: number;
  count?: number;
  /** Render five stars instead of a compact single star */
  full?: boolean;
}

export function RatingStars({ rating, count, full = false }: RatingStarsProps) {
  if (full) {
    return (
      <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) =>
        <StarIcon
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${i < Math.round(rating) ? 'fill-brand text-ink' : 'fill-transparent text-ink/25'}`}
          strokeWidth={1.5} />

        )}
      </span>);

  }
  return (
    <span className="inline-flex items-center gap-1 text-sm" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <StarIcon className="h-4 w-4 fill-brand text-ink" strokeWidth={1.5} aria-hidden="true" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({formatCompact(count)})</span>}
    </span>);

}