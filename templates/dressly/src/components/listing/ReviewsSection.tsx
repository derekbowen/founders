import React from 'react';
import { MessageSquareIcon } from 'lucide-react';
import type { Listing, Review } from '../../types/marketplace';
import { getUser } from '../../utils/lookup';
import { Stars } from '../Stars';
import { UserAvatar } from '../UserAvatar';
import { EmptyState } from '../EmptyState';

interface ReviewsSectionProps {
  listing: Listing;
  reviews: Review[];
}

export function ReviewsSection({ listing, reviews }: ReviewsSectionProps) {
  const photos = reviews.filter((r) => r.photo);
  return (
    <section aria-labelledby="reviews-heading" className="border-t border-line pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="reviews-heading" className="font-display text-3xl text-ink">
            Reviews
          </h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <Stars rating={listing.rating} /> {listing.rating.toFixed(1)} · {listing.reviewCount} rentals reviewed
          </p>
        </div>
        {photos.length > 0 &&
        <p className="text-xs uppercase tracking-eyebrow text-muted">{photos.length} renter photos</p>
        }
      </div>

      {photos.length > 0 &&
      <div className="no-scrollbar mt-6 flex gap-3 overflow-x-auto">
          {photos.map((r) =>
        <figure key={r.id} className="w-28 shrink-0">
              <img
            src={r.photo}
            alt={`Renter wearing the dress to a ${r.occasion.toLowerCase()}`}
            loading="lazy"
            className="aspect-square w-full object-cover object-top" />
          
              <figcaption className="mt-1 truncate text-[11px] text-muted">{r.occasion}</figcaption>
            </figure>
        )}
        </div>
      }

      {reviews.length === 0 ?
      <div className="mt-6">
          <EmptyState
          icon={MessageSquareIcon}
          title="No written reviews yet"
          text="Be the first to rent this dress and share how it fit." />
        
        </div> :

      <ul className="mt-8 divide-y divide-line">
          {reviews.map((r) => {
          const author = getUser(r.authorId);
          if (!author) return null;
          return (
            <li key={r.id} className="grid gap-4 py-6 sm:grid-cols-[180px_1fr]">
                <div className="flex items-center gap-3 sm:block">
                  <UserAvatar user={author} size="md" />
                  <div className="sm:mt-3">
                    <p className="text-sm font-medium text-ink">{author.name.split(' ')[0]}</p>
                    <p className="text-xs text-muted">{r.date}</p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Stars rating={r.rating} size={13} />
                    <span className="text-[11px] uppercase tracking-wider text-muted">
                      Wore US {r.sizeWorn} · {r.fitFeedback} · {r.occasion}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{r.text}</p>
                  {r.photo &&
                <img
                  src={r.photo}
                  alt="Renter photo"
                  loading="lazy"
                  className="mt-4 h-28 w-24 object-cover object-top" />

                }
                </div>
              </li>);

        })}
        </ul>
      }
    </section>);

}