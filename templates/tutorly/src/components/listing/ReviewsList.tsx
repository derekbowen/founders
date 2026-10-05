import React, { useState } from 'react';
import { MessageSquareIcon, StarIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { RatingStars } from '../tutors/RatingStars';
import { EmptyState } from '../common/EmptyState';
import { FilterChip } from '../search/FilterSection';
import type { Review } from '../../types/marketplace';

interface ReviewsListProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

type RoleFilter = 'all' | 'Student' | 'Parent';

export function ReviewsList({ reviews, rating, reviewCount }: ReviewsListProps) {
  const [role, setRole] = useState<RoleFilter>('all');
  const [expanded, setExpanded] = useState(false);
  const filtered = reviews.filter((r) => role === 'all' || r.role === role);
  const visible = expanded ? filtered : filtered.slice(0, 3);
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    share: reviews.length ? reviews.filter((r) => r.rating === star).length / reviews.length : 0
  }));

  return (
    <div>
      <div className="grid gap-6 rounded-2xl bg-ink-50 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="text-center sm:pr-6">
          <p className="text-4xl font-semibold text-ink-900">{rating.toFixed(1)}</p>
          <RatingStars rating={rating} size={16} />
          <p className="mt-1 text-sm text-ink-500">{reviewCount} reviews</p>
        </div>
        <ul className="space-y-1.5" aria-label="Rating distribution">
          {distribution.map((d) =>
          <li key={d.star} className="flex items-center gap-2 text-xs text-ink-600">
              <span className="flex w-8 items-center gap-0.5">
                {d.star} <StarIcon size={11} className="fill-accent-400 text-accent-500" aria-hidden="true" />
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink-200">
                <span className="block h-full rounded-full bg-accent-400" style={{ width: `${d.share * 100}%` }} />
              </span>
              <span className="w-9 text-right">{Math.round(d.share * 100)}%</span>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-5 flex gap-2" role="group" aria-label="Filter reviews">
        {(['all', 'Student', 'Parent'] as RoleFilter[]).map((r) =>
        <FilterChip key={r} pressed={role === r} onClick={() => setRole(r)}>
            {r === 'all' ? 'All' : `${r}s`}
          </FilterChip>
        )}
      </div>

      {filtered.length === 0 ?
      <div className="mt-5">
          <EmptyState icon={MessageSquareIcon} title="No reviews yet" description="Reviews appear here after completed lessons." />
        </div> :

      <ul className="mt-5 divide-y divide-ink-100">
          {visible.map((r) =>
        <li key={r.id} className="py-5 first:pt-0">
              <div className="flex items-center gap-3">
                <Avatar name={r.author} alt={r.author} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">
                    {r.author} <span className="font-normal text-ink-500">· {r.role}</span>
                  </p>
                  <p className="text-xs text-ink-500">{r.subject} · {r.date}</p>
                </div>
                <RatingStars rating={r.rating} size={13} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{r.text}</p>
            </li>
        )}
        </ul>
      }

      {filtered.length > 3 &&
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-2 rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-50">
        
          {expanded ? 'Show fewer reviews' : `Show all ${filtered.length} reviews`}
        </button>
      }
    </div>);

}