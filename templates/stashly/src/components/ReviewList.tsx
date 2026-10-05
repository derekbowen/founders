import React from 'react';
import { StarIcon, MessageSquareIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Avatar } from './Avatar';
import type { Review } from '../types/marketplace';
import { EmptyState } from './EmptyState';

export function ReviewList({ items }: {items: Review[];}) {
  if (!items.length) {
    return (
      <EmptyState
        icon={<MessageSquareIcon className="h-5 w-5" />}
        title="No reviews yet"
        text="Reviews appear here once a booking is completed." />);


  }
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((r) =>
      <li key={r.id} className="rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-3">
            <Avatar name={r.author} alt={r.author} size="sm" />
            <div>
              <p className="text-sm font-semibold text-stone-900">{r.author}</p>
              <p className="text-xs text-stone-500">{format(parseISO(r.date), 'MMMM yyyy')}</p>
            </div>
            <span className="ml-auto flex" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) =>
            <StarIcon key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-sand-500 text-sand-500' : 'text-stone-300'}`} aria-hidden="true" />
            )}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-stone-700">{r.text}</p>
        </li>
      )}
    </ul>);

}