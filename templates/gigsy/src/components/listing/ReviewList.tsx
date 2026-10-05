import React from 'react';
import { MessageSquareIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StarRating } from '../ui/StarRating';
import { EmptyState } from '../ui/EmptyState';
import { Review } from '../../types/marketplace';
import { formatDate } from '../../utils/format';

export function ReviewList({ reviews }: {reviews: Review[];}) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={<MessageSquareIcon className="h-6 w-6" />}
        title="No reviews yet"
        text="Reviews appear here after clients complete a project with this freelancer." />);


  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) =>
      <li key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-3">
            <Avatar name={r.authorName} alt="" src={r.authorAvatar} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{r.authorName}</p>
                  <p className="text-xs text-slate-500">{r.authorRole}</p>
                </div>
                <time dateTime={r.date} className="text-xs text-slate-500">{formatDate(r.date)}</time>
              </div>
              <div className="mt-2"><StarRating rating={r.rating} showStars /></div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{r.text}</p>
            </div>
          </div>
        </li>
      )}
    </ul>);

}