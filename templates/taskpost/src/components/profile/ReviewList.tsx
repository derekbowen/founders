import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useApp } from '../../hooks/useApp';
import type { Review } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { cn } from '../../utils/styles';

export function ReviewList({ reviews }: {reviews: Review[];}) {
  const { getUser } = useApp();
  return (
    <ul className="divide-y divide-ink-100">
      {reviews.map((r) => {
        const author = getUser(r.authorId);
        return (
          <li key={r.id} className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <Avatar name={author?.name ?? 'User'} alt={author?.name ?? 'User'} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link to={`/profile/${r.authorId}`} className="text-sm font-extrabold text-ink-900 hover:underline">
                    {author?.name}
                  </Link>
                  <span className="text-xs text-ink-500">{formatDate(r.date, 'MMM d, yyyy')}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) =>
                  <StarIcon
                    key={n}
                    className={cn('h-3.5 w-3.5', n <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-ink-300')}
                    aria-hidden="true" />

                  )}
                  <span className="ml-2 text-xs font-semibold text-ink-500">{r.jobTitle}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{r.text}</p>
              </div>
            </div>
          </li>);

      })}
    </ul>);

}