import React from 'react';
import { StarIcon } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

export function Rating({ rating, reviewCount, className = '' }: RatingProps) {
  if (!rating) {
    return (
      <span className={`inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-bold uppercase text-ink ${className}`}>
        New
      </span>);

  }
  return (
    <span className={`inline-flex items-center gap-1 text-sm ${className}`}>
      <StarIcon size={14} className="fill-brand text-brand" aria-hidden="true" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && <span className="text-slate-500">({reviewCount})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>);

}