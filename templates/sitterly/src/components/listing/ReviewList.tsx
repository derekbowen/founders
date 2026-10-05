import React, { useState } from 'react';
import { MessageSquareHeartIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { Stars } from '../ui/Rating';
import { Review } from '../../types/sitter';
import { formatDate } from '../../utils/format';

export function ReviewList({ reviews }: {reviews: Review[];}) {
  const [expanded, setExpanded] = useState(false);
  if (reviews.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-3xl border border-dashed border-ink-300 bg-white p-6 text-sm text-ink-600">
        <MessageSquareHeartIcon className="h-6 w-6 text-primary-500" aria-hidden />
        No reviews yet — be the first family to book and share your experience.
      </div>);

  }
  const visible = expanded ? reviews : reviews.slice(0, 4);
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2">
        {visible.map((r) =>
        <li key={r.id} className="rounded-3xl border border-ink-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <Avatar name={r.author} alt="" size="sm" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900">{r.author}</p>
                <p className="text-xs text-ink-600">
                  {r.context} · {formatDate(r.date, 'MMM yyyy')}
                </p>
              </div>
              <Stars value={r.rating} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">{r.text}</p>
          </li>
        )}
      </ul>
      {reviews.length > 4 &&
      <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-4 text-sm font-semibold text-primary-700 hover:underline">
          {expanded ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
        </button>
      }
    </div>);

}