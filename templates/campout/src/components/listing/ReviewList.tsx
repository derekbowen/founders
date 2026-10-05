import React from 'react';
import { MessageSquareIcon, StarIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { EmptyState } from '../EmptyState';
import type { Review } from '../../types/user';

export function ReviewList({ reviews, showListing }: {reviews: Review[];showListing?: (listingId: string) => string;}) {
  if (reviews.length === 0) {
    return <EmptyState icon={MessageSquareIcon} title="No reviews yet" description="Be one of the first campers to stay and share how it went." />;
  }
  return (
    <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {reviews.map((r) =>
      <li key={r.id}>
          <div className="flex items-center gap-3">
            <Avatar name={r.authorName} alt={r.authorName} size="md" />
            <div>
              <p className="text-sm font-semibold text-ink-900">{r.authorName}</p>
              <p className="text-xs text-ink-500">
                {r.authorLocation} · {r.date}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) =>
          <StarIcon key={i} size={14} className={i < r.rating ? 'fill-accent-500 text-accent-500' : 'text-sand-300'} aria-hidden="true" />
          )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">{r.text}</p>
          {showListing && <p className="mt-2 text-xs font-medium text-primary-700">{showListing(r.listingId)}</p>}
        </li>
      )}
    </ul>);

}