import React from "react";
import { inquiryStatuses } from "../../data/inquiryStatuses";
import type { InquiryStatus } from "../../types/marketplace";

interface StatusBadgeProps {
  status: InquiryStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const meta = inquiryStatuses[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${meta.badgeClass} ${className}`}>
      
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} />
      {meta.label}
    </span>);

}