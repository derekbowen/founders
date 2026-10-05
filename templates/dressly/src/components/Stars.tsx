import React from 'react';
import { StarIcon } from 'lucide-react';
import { cx } from '../utils/styles';

interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
}

export function Stars({ rating, size = 14, className }: StarsProps) {
  return (
    <span
      className={cx('inline-flex items-center gap-0.5', className)}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      role="img">
      
      {[1, 2, 3, 4, 5].map((i) =>
      <StarIcon
        key={i}
        size={size}
        aria-hidden="true"
        className={
        i <= Math.round(rating) ?
        'fill-ink text-ink' :
        'fill-transparent text-line'
        } />

      )}
    </span>);

}