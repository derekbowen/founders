import React, { useState } from 'react';
import { MessageSquareDashedIcon } from 'lucide-react';
import type { Review } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { StarRating } from '../ui/StarRating';

interface ReviewListProps {
  reviews: Review[];
  showListingTitle?: (listingId: string) => string | undefined;
}

export function ReviewList({ reviews, showListingTitle }: ReviewListProps) {
  const [expanded, setExpanded] = useState(false);

  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={<MessageSquareDashedIcon className="h-5 w-5" aria-hidden="true" />}
        title="No reviews yet"
        body="Reviews appear here after renters complete a session and the cleaning sign-off." />);


  }

  const visible = expanded ? reviews : reviews.slice(0, 4);

  return (
    <div>
      <ul className="grid gap-8 md:grid-cols-2">
        {visible.map((r) =>
        <li key={r.id}>
            <div className="flex items-center gap-3">
              <Avatar name={r.author} />
              <div>
                <p className="text-sm font-semibold text-steel-900">{r.author}</p>
                <p className="text-xs text-steel-500">{r.business} · {formatDate(r.date, 'MMMM yyyy')}</p>
              </div>
            </div>
            <StarRating rating={r.rating} showStars className="mt-3" />
            {showListingTitle && <p className="mt-2 text-xs font-medium text-steel-500">{showListingTitle(r.listingId)}</p>}
            <p className="mt-2 text-sm leading-relaxed text-steel-700">{r.body}</p>
          </li>
        )}
      </ul>
      {reviews.length > 4 &&
      <Button variant="outline" className="mt-8" onClick={() => setExpanded((e) => !e)}>
          {expanded ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
        </Button>
      }
    </div>);

}