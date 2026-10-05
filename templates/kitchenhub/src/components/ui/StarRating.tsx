import React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface StarRatingProps {
  rating: number;
  count?: number;
  showStars?: boolean;
  className?: string;
}

export function StarRating({ rating, count, showStars = false, className }: StarRatingProps) {
  if (showStars) {
    return (
      <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon
          key={i}
          className={cn('h-4 w-4', i <= Math.round(rating) ? 'fill-primary text-primary' : 'fill-steel-200 text-steel-200')}
          aria-hidden="true" />

        )}
      </span>);

  }
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm', className)}>
      <StarIcon className="h-3.5 w-3.5 fill-steel-900 text-steel-900" aria-hidden="true" />
      <span className="font-semibold text-steel-900">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-steel-500">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>);

}