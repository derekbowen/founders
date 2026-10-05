import React from "react";
import { inquiryStatuses } from "../../data/inquiryStatuses";
import { formatDate } from "../../utils/format";
import type { TimelineEvent } from "../../types/marketplace";

export function InquiryTimeline({ events }: {events: TimelineEvent[];}) {
  return (
    <ol className="relative space-y-5 border-l border-line pl-5">
      {events.map((event) => {
        const dot = event.status === "message" ? "bg-muted" : inquiryStatuses[event.status].dotClass;
        return (
          <li key={event.id} className="relative">
            <span aria-hidden="true" className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full ring-4 ring-surface ${dot}`} />
            <p className="text-sm font-medium text-ink">{event.label}</p>
            <p className="text-xs text-muted">{formatDate(event.at, "MMM d, yyyy · h:mm a")}</p>
          </li>);

      })}
    </ol>);

}