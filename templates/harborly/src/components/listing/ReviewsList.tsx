import React, { useState } from 'react';
import { MessageSquareIcon } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { EmptyState } from '../ui/EmptyState';
import { formatDate } from '../../utils/format';
import type { Review } from '../../types/marketplace';

export function ReviewsList({ reviews, rating, total }: {reviews: Review[];rating: number;total: number;}) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? reviews : reviews.slice(0, 4);

  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="flex items-center gap-3 font-heading text-2xl text-navy">
        Reviews
        {total > 0 && <Rating value={rating} count={total} className="font-sans text-base" />}
      </h2>
      {reviews.length === 0 ?
      <div className="mt-6">
          <EmptyState icon={MessageSquareIcon} title="No reviews yet" text="Be the first to take this boat out and share how it went." />
        </div> :

      <>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {shown.map((r) =>
          <li key={r.id} className="rounded-2xl border border-line p-5">
                <div className="flex items-center gap-3">
                  <Avatar initials={r.authorInitials} seed={r.id} />
                  <div>
                    <p className="text-sm font-semibold text-ink">{r.authorName}</p>
                    <p className="text-xs text-muted">{formatDate(r.date, 'MMMM yyyy')}</p>
                  </div>
                  <Rating value={r.rating} showStars className="ml-auto" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">{r.text}</p>
              </li>
          )}
          </ul>
          {reviews.length > 4 &&
        <button type="button" onClick={() => setExpanded((e) => !e)} className="mt-6 text-sm font-semibold text-navy underline-offset-4 hover:underline">
              {expanded ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
            </button>
        }
        </>
      }
    </section>);

}