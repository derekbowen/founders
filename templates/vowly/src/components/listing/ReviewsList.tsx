import React from "react";
import { MessageSquareHeartIcon } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { StarRating } from "../ui/StarRating";
import { EmptyState } from "../ui/EmptyState";
import { formatDate } from "../../utils/format";
import type { Review } from "../../types/marketplace";

interface ReviewsListProps {
  reviews: Review[];
  showVendorName?: (vendorId: string) => string | undefined;
}

export function ReviewsList({ reviews, showVendorName }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={MessageSquareHeartIcon}
        title="No reviews yet"
        description="Reviews appear here after couples celebrate their wedding day." />);


  }
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {reviews.map((review) =>
      <li key={review.id} className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center gap-3">
            <Avatar name={review.couple} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{review.couple}</p>
              <p className="truncate text-xs text-muted">
                Married {formatDate(review.weddingDate, "MMMM yyyy")} · {review.location}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <StarRating rating={review.rating} showStars />
          </div>
          <blockquote className="mt-3 text-sm leading-relaxed text-ink/85">“{review.text}”</blockquote>
          {showVendorName &&
        <p className="mt-3 text-xs font-medium text-gold-dark">Review for {showVendorName(review.vendorId)}</p>
        }
        </li>
      )}
    </ul>);

}