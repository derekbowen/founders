import React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function StarRating({ rating, count, size = 'sm', className }: StarRatingProps) {
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <span className={cn('inline-flex items-center gap-1 text-ink-900', className)}>
      <StarIcon className={cn(iconSize, 'fill-amber-400 text-amber-400')} aria-hidden="true" />
      <span className={cn('font-bold', size === 'sm' ? 'text-sm' : 'text-base')}>{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-sm text-ink-500">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>);

}