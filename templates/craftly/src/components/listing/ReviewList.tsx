import React from 'react';
import { MessageSquareIcon } from 'lucide-react';
import type { Review } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { Avatar } from '../ui/Avatar';
import { EmptyState } from '../ui/EmptyState';
import { StarRating } from '../ui/StarRating';

interface ReviewListProps {
  reviews: Review[];
  rating: number;
  total: number;
  title?: string;
}

export function ReviewList({ reviews, rating, total, title = 'Reviews' }: ReviewListProps) {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const n = reviews.filter((r) => r.rating === star).length;
    return { star, pct: reviews.length ? Math.round(n / reviews.length * 100) : 0 };
  });

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-32">
      <h2 id="reviews-heading" className="text-3xl font-medium tracking-tight">
        {title} <span className="font-sans text-lg font-normal text-muted">({total})</span>
      </h2>
      {reviews.length === 0 ?
      <div className="mt-6">
          <EmptyState icon={<MessageSquareIcon className="h-5 w-5" />} title="No reviews yet" description="Be the first to share how this piece fits into your home." />
        </div> :

      <div className="mt-6 grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <p className="font-heading text-5xl font-medium">{rating.toFixed(1)}</p>
            <StarRating rating={rating} size="md" />
            <p className="mt-1 text-xs text-muted">Based on {total} reviews</p>
            <ul className="mt-5 space-y-1.5" aria-label="Rating distribution">
              {distribution.map((d) =>
            <li key={d.star} className="flex items-center gap-2 text-xs text-muted">
                  <span className="w-3">{d.star}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <span className="block h-full rounded-full bg-primary" style={{ width: `${d.pct}%` }} />
                  </span>
                  <span className="w-8 text-right">{d.pct}%</span>
                </li>
            )}
            </ul>
          </div>
          <ul className="divide-y divide-line">
            {reviews.map((r) =>
          <li key={r.id} className="py-5 first:pt-0">
                <div className="flex items-center gap-3">
                  <Avatar name={r.author} size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r.author}</p>
                    <p className="text-xs text-muted">
                      {r.location} · {formatDate(r.date)}
                    </p>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/90">{r.text}</p>
              </li>
          )}
          </ul>
        </div>
      }
    </section>);

}