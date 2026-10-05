import React from "react";
import { MessageSquareIcon } from "lucide-react";
import { Review } from "../../types/marketplace";
import { formatDate } from "../../utils/format";
import { Avatar } from "../ui/Avatar";
import { EmptyState } from "../ui/EmptyState";
import { Stars } from "../ui/Stars";

export function ReviewList({ reviews }: {reviews: Review[];}) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={<MessageSquareIcon className="h-6 w-6" />}
        title="No reviews yet"
        text="Be the first to share how it tasted after your pickup." />);


  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {reviews.map((r) =>
      <li key={r.id} className="rounded-2xl border border-line bg-paper p-5">
          <div className="flex items-center gap-3">
            <Avatar name={r.author} tone="orange" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">{r.author}</p>
              <p className="text-xs text-muted">
                {r.location} · {formatDate(r.date)}
              </p>
            </div>
            <Stars rating={r.rating} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/90">{r.text}</p>
        </li>
      )}
    </ul>);

}