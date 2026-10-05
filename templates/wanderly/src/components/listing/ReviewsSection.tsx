import React, { useState } from 'react';
import { MessageSquareIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { Stars, StarRating } from '../ui/StarRating';
import { EmptyState } from '../ui/EmptyState';
import type { Review } from '../../types/marketplace';
import { formatDate } from '../../utils/format';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

const breakdown = [
{ label: 'Host', value: 4.98 },
{ label: 'Value', value: 4.9 },
{ label: 'Accuracy', value: 4.95 },
{ label: 'Meeting point', value: 4.93 }];


export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? reviews : reviews.slice(0, 4);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-6">
        <StarRating rating={rating} count={reviewCount} size="md" className="text-xl" />
        <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
          {breakdown.map((b) =>
          <div key={b.label}>
              <dt className="text-xs text-slate-500">{b.label}</dt>
              <dd className="flex items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <span className="block h-full rounded-full bg-accent-600" style={{ width: `${b.value / 5 * 100}%` }} />
                </span>
                <span className="text-xs font-semibold text-slate-900">{b.value.toFixed(1)}</span>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {reviews.length === 0 ?
      <div className="mt-6">
          <EmptyState icon={MessageSquareIcon} title="No reviews yet" description="Be one of the first guests to book and share your experience." />
        </div> :

      <ul className="mt-8 grid gap-8 md:grid-cols-2">
          {visible.map((r) =>
        <li key={r.id}>
              <div className="flex items-center gap-3">
                <Avatar name={r.author} alt={r.author} size="md" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{r.author}</p>
                  <p className="text-xs text-slate-500">{r.country} · {formatDate(r.date, 'MMMM yyyy')}</p>
                </div>
              </div>
              <div className="mt-3"><Stars rating={r.rating} /></div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{r.text}</p>
            </li>
        )}
        </ul>
      }
      {reviews.length > 4 &&
      <button type="button" onClick={() => setExpanded((e) => !e)} className="mt-8 rounded-full border border-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-sand-100">
          {expanded ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
        </button>
      }
    </div>);

}