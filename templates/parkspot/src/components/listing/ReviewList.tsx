import React from 'react';
import { MessageSquareTextIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { Stars } from '../common/Rating';
import { EmptyState } from '../common/EmptyState';
import { getUser } from '../../utils/lookup';
import { formatDate } from '../../utils/format';
import type { Review } from '../../types/review';

export function ReviewList({ reviews }: {reviews: Review[];}) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface">
        <EmptyState icon={<MessageSquareTextIcon size={22} aria-hidden />} title="No reviews yet" text="Be the first to park here and share how it went." />
      </div>);

  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {reviews.map((r) => {
        const author = getUser(r.authorId);
        return (
          <li key={r.id} className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center gap-3">
              <Avatar name={author?.name ?? 'Guest'} alt={author?.name ?? 'Guest'} src={author?.avatar} size="sm" />
              <div>
                <p className="text-sm font-semibold">{author?.name ?? 'Guest'}</p>
                <p className="text-xs text-muted">{formatDate(r.date)}</p>
              </div>
              <span className="ml-auto">
                <Stars value={r.rating} />
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
          </li>);

      })}
    </ul>);

}