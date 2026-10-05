import React from 'react';
import { MessageSquareIcon, StoreIcon } from 'lucide-react';
import { RatingStars } from '../ui/RatingStars';
import type { Review } from '../../types/marketplace';
import { formatDate } from '../../utils/orders';

interface ReviewListProps {
  reviews: Review[];
  rating: number;
  count: number;
  title?: string;
}

export function ReviewList({ reviews, rating, count, title = 'Reviews from retailers' }: ReviewListProps) {
  return (
    <section aria-labelledby="reviews-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="reviews-heading" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          <div className="mt-1">
            <RatingStars rating={rating} count={count} size="md" />
          </div>
        </div>
        <p className="text-xs text-slate-500">Only verified retailers who ordered can leave reviews.</p>
      </div>
      {reviews.length === 0 ?
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          <MessageSquareIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          No written reviews yet. Retailers will be able to review after their order is received.
        </div> :

      <ul className="grid gap-3 md:grid-cols-2">
          {reviews.map((r) =>
        <li key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                    <StoreIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{r.store}</p>
                    <p className="text-xs text-slate-500">
                      {r.author} · {r.storeType} · {r.location}
                    </p>
                  </div>
                </div>
                <time className="shrink-0 text-xs text-slate-400" dateTime={r.date}>
                  {formatDate(r.date)}
                </time>
              </div>
              <div className="mt-3">
                <RatingStars rating={r.rating} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{r.body}</p>
            </li>
        )}
        </ul>
      }
    </section>);

}