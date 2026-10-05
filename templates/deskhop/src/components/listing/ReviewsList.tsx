import React from 'react';
import { MessageSquareDashedIcon, StarIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import type { Review } from '../../types/user';
import { getUser } from '../../utils/lookup';
import { formatDate } from '../../utils/time';
import { EmptyState } from '../ui/EmptyState';

export function ReviewsList({ reviews }: {reviews: Review[];}) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={MessageSquareDashedIcon}
        title="No reviews yet"
        description="Reviews appear here after guests complete a booking." />);


  }
  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {reviews.map((r) => {
        const author = getUser(r.authorId);
        const name = author?.name ?? 'Guest';
        return (
          <li key={r.id}>
            <div className="flex items-center gap-3">
              <Avatar name={name} alt={name} size="md" />
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-ink-muted">{formatDate(r.date, 'MMMM yyyy')}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) =>
              <StarIcon
                key={i}
                size={13}
                aria-hidden="true"
                className={i < r.rating ? 'fill-ink text-ink' : 'fill-line text-line'} />

              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink">{r.text}</p>
          </li>);

      })}
    </ul>);

}