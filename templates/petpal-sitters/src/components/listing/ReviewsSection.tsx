import React from 'react';
import { MessageSquareIcon, PawPrintIcon, StarIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { EmptyState } from '../ui/EmptyState';
import { RatingStars } from '../ui/RatingStars';
import type { Review } from '../../types/marketplace';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  total: number;
}

export function ReviewsSection({ reviews, rating, total }: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return <EmptyState icon={<MessageSquareIcon className="h-7 w-7" />} title="No reviews yet" text="Be the first to book and share your experience." />;
  }
  return (
    <div>
      <div className="flex items-center gap-3">
        <StarIcon className="h-7 w-7 fill-primary-400 text-primary-400" aria-hidden="true" />
        <p className="text-2xl font-black text-stone-900">{rating.toFixed(2)}</p>
        <p className="text-stone-500">· {total} reviews</p>
      </div>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {reviews.map((r) =>
        <li key={r.id} className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <Avatar name={r.author} alt={r.author} size="md" />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-stone-900">{r.author}</p>
                <p className="text-sm text-stone-500">{r.date}</p>
              </div>
              <RatingStars rating={r.rating} />
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-extrabold text-primary-800">
              <PawPrintIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {r.petName} · {r.petType}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{r.text}</p>
          </li>
        )}
      </ul>
    </div>);

}