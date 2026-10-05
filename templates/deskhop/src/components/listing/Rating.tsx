import React from 'react';
import { StarIcon } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  className?: string;
}

export function Rating({ value, count, className = '' }: RatingProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-sm ${className}`}>
      <StarIcon size={14} className="fill-ink text-ink" aria-hidden="true" />
      <span className="font-semibold">{value.toFixed(2).replace(/0$/, '')}</span>
      {count !== undefined && <span className="text-ink-muted">({count})</span>}
      <span className="sr-only">
        Rated {value} out of 5{count !== undefined ? ` from ${count} reviews` : ''}
      </span>
    </span>);

}