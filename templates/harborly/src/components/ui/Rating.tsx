import React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '../../utils/ui';

interface RatingProps {
  value: number;
  count?: number;
  className?: string;
  showStars?: boolean;
}

export function Rating({ value, count, className, showStars }: RatingProps) {
  if (showStars) {
    return (
      <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon key={i} className={cn('h-3.5 w-3.5', i <= Math.round(value) ? 'fill-coral text-coral' : 'text-line')} aria-hidden="true" />
        )}
      </span>);

  }
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm text-ink', className)}>
      <StarIcon className="h-3.5 w-3.5 fill-coral text-coral" aria-hidden="true" />
      <span className="font-semibold">{value.toFixed(2)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
    </span>);

}