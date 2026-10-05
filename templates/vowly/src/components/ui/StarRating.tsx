import React from "react";
import { StarIcon } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  showStars?: boolean;
}

export function StarRating({ rating, count, size = "sm", showStars = false }: StarRatingProps) {
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const text = size === "sm" ? "text-sm" : "text-base";

  return (
    <span className={`inline-flex items-center gap-1.5 ${text}`}>
      {showStars ?
      <span className="flex items-center gap-0.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon
          key={i}
          className={`${icon} ${i <= Math.round(rating) ? "fill-gold text-gold" : "fill-line text-line"}`} />

        )}
        </span> :

      <StarIcon aria-hidden="true" className={`${icon} fill-gold text-gold`} />
      }
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
      <span className="sr-only">
        Rated {rating.toFixed(1)} out of 5{count !== undefined ? ` from ${count} reviews` : ""}
      </span>
    </span>);

}