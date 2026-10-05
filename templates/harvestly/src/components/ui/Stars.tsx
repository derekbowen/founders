import React from "react";
import { StarIcon } from "lucide-react";

interface StarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}

export function Stars({ rating, count, size = "sm" }: StarsProps) {
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  if (count === 0 || rating === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-dark">
        New listing
      </span>);

  }
  return (
    <span className="inline-flex items-center gap-1 text-sm" aria-label={`Rated ${rating} out of 5`}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) =>
        <StarIcon
          key={i}
          className={`${icon} ${i <= Math.round(rating) ? "fill-accent text-accent" : "fill-line text-line"}`} />

        )}
      </span>
      <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
    </span>);

}