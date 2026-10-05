import React from 'react';
import { MessageSquareIcon, StarIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { EmptyState } from '../common/EmptyState';
import { Review } from '../../types/marketplace';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  title?: string;
}

export function ReviewsSection({ reviews, rating, reviewCount, title = 'Reviews' }: ReviewsSectionProps) {
  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="heading-md flex items-center gap-3">
        {title}
        {reviewCount > 0 &&
        <span className="inline-flex items-center gap-1 font-sans text-base font-semibold normal-case tracking-normal text-slate-600">
            <StarIcon size={16} className="fill-brand text-brand" aria-hidden="true" /> {rating.toFixed(1)} · {reviewCount} reviews
          </span>
        }
      </h2>
      {reviews.length ?
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {reviews.map((review) =>
        <li key={review.id} className="card p-5">
              <div className="flex items-center gap-3">
                <Avatar name={review.authorName} alt={review.authorName} size="sm" />
                <div>
                  <p className="text-sm font-semibold">{review.authorName}</p>
                  <p className="text-xs text-slate-500">{review.dateLabel}</p>
                </div>
                <span className="ml-auto flex" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) =>
              <StarIcon key={i} size={14} className={i < review.rating ? 'fill-brand text-brand' : 'text-slate-300'} aria-hidden="true" />
              )}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{review.text}</p>
            </li>
        )}
        </ul> :

      <EmptyState className="mt-5" icon={<MessageSquareIcon size={24} />} title="No reviews yet" description="Be one of the first to play here and share how it went." />
      }
    </section>);

}