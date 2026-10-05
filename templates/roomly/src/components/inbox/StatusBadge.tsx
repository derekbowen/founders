import React from 'react';
import { inquiryStatuses } from '../../data/inquiryStatuses';
import type { InquiryStatus } from '../../types/inquiry';

export function StatusBadge({ status }: {status: InquiryStatus;}) {
  const meta = inquiryStatuses[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badge}`}>
      
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden />
      {meta.label}
    </span>);

}