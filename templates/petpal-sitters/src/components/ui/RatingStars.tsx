import React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function RatingStars({ rating, size = 'sm', className }: RatingStarsProps) {
  const s = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5';
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) =>
      <StarIcon
        key={i}
        className={cn(s, i <= Math.round(rating) ? 'fill-primary-400 text-primary-400' : 'fill-stone-200 text-stone-200')}
        aria-hidden="true" />

      )}
    </span>);

}