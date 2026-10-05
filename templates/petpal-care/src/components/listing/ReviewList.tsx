import React from 'react';
import { PawPrintIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StarRow } from '../common/StarRating';
import { EmptyState } from '../common/EmptyState';
import { formatLongDate } from '../../utils/format';
import type { Review } from '../../types/listing';

export function ReviewList({ reviews }: {reviews: Review[];}) {
  if (!reviews.length) {
    return <EmptyState title="No reviews yet" description="This sitter is new — be the first to leave a review after your stay." />;
  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {reviews.map((r) =>
      <li key={r.id} className="rounded-3xl border border-ink-200/70 bg-white p-5">
          <div className="flex items-center gap-3">
            <Avatar name={r.author} alt={r.author} size="md" />
            <div className="min-w-0">
              <p className="font-extrabold text-ink-900">{r.author}</p>
              <p className="text-xs text-ink-600">{formatLongDate(r.date)}</p>
            </div>
            <div className="ml-auto">
              <StarRow rating={r.rating} />
            </div>
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-bold text-accent-800">
            <PawPrintIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {r.petName} · {r.petDescription}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">{r.text}</p>
        </li>
      )}
    </ul>);

}