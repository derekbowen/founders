import React from 'react';
import { StarIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

/** Compact rating: ★ 4.9 (128) */
export function StarRating({ rating, count, size = 'sm', className }: StarRatingProps) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1 font-medium text-slate-900',
        size === 'sm' ? 'text-sm' : 'text-base',
        className
      )}>
      
      <StarIcon
        className={twMerge('fill-primary-500 text-primary-500', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')}
        aria-hidden />
      
      <span>{rating.toFixed(2)}</span>
      {count !== undefined && <span className="font-normal text-slate-500">({count})</span>}
      <span className="sr-only">
        Rated {rating} out of 5{count !== undefined ? ` from ${count} reviews` : ''}
      </span>
    </span>);

}

export function Stars({ rating }: {rating: number;}) {
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
      <StarIcon
        key={i}
        className={twMerge('h-3.5 w-3.5', i <= Math.round(rating) ? 'fill-primary-500 text-primary-500' : 'text-slate-300')}
        aria-hidden />

      )}
    </span>);

}