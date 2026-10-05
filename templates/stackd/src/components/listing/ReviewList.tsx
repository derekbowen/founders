import React from 'react';
import { MessageSquareIcon } from 'lucide-react';
import type { Review } from '../../types/marketplace';
import { RatingStars } from '../common/RatingStars';
import { EmptyState } from '../common/EmptyState';
import { formatCompact, formatDate } from '../../utils/format';

interface ReviewListProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  showListingTitle?: (slug: string) => string | undefined;
}

export function ReviewList({ reviews, rating, reviewCount, showListingTitle }: ReviewListProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <p className="font-display text-5xl font-bold">{rating.toFixed(1)}</p>
        <div>
          <RatingStars rating={rating} full />
          <p className="mt-1 text-sm text-muted">Based on {formatCompact(reviewCount)} ratings</p>
        </div>
      </div>
      {reviews.length === 0 ?
      <EmptyState icon={MessageSquareIcon} title="No written reviews yet" body="Buyers can leave a review from their library after downloading." /> :

      <ul className="divide-y divide-line border-y border-line">
          {reviews.map((r) =>
        <li key={r.id} className="py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-ink bg-brand-soft font-display text-sm font-bold" aria-hidden="true">
                    {r.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{r.author}</p>
                    <p className="text-xs text-muted">{formatDate(r.date)}</p>
                  </div>
                </div>
                <RatingStars rating={r.rating} full />
              </div>
              {showListingTitle &&
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-ink">{showListingTitle(r.listingSlug)}</p>
          }
              <p className="mt-2 text-sm leading-relaxed text-ink/90">{r.text}</p>
            </li>
        )}
        </ul>
      }
    </div>);

}