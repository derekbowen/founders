import React, { useState } from 'react';
import { InquiryRow } from './InquiryRow';
import { inquiryStatuses, statusOrder } from '../../data/inquiryStatuses';
import { chipStyles } from '../../utils/styles';
import type { Inquiry, InquiryStatus } from '../../types/inquiry';

interface InquiryListProps {
  inquiries: Inquiry[];
  perspective: 'renter' | 'landlord';
  empty: React.ReactNode;
}

export function InquiryList({ inquiries, perspective, empty }: InquiryListProps) {
  const [status, setStatus] = useState<InquiryStatus | 'all'>('all');

  if (inquiries.length === 0) return <>{empty}</>;

  const sorted = [...inquiries].sort((a, b) => {
    const la = a.messages[a.messages.length - 1]?.sentAt ?? a.createdAt;
    const lb = b.messages[b.messages.length - 1]?.sentAt ?? b.createdAt;
    return lb.localeCompare(la);
  });
  const visible = status === 'all' ? sorted : sorted.filter((i) => i.status === status);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="group" aria-label="Filter by status">
        <button
          type="button"
          aria-pressed={status === 'all'}
          onClick={() => setStatus('all')}
          className={`${chipStyles.base} shrink-0 ${status === 'all' ? chipStyles.active : chipStyles.idle}`}>
          
          All ({inquiries.length})
        </button>
        {statusOrder.map((s) => {
          const count = inquiries.filter((i) => i.status === s).length;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className={`${chipStyles.base} shrink-0 ${status === s ? chipStyles.active : chipStyles.idle}`}>
              
              {inquiryStatuses[s].label}
              <span className={status === s ? 'text-navy-200' : 'text-navy-400'}>{count}</span>
            </button>);

        })}
      </div>
      {visible.length === 0 ?
      <p className="mt-6 rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center text-sm text-navy-500">
          No inquiries with status “{status !== 'all' ? inquiryStatuses[status].label : ''}”.
        </p> :

      <ul className="mt-5 space-y-3">
          {visible.map((inq) =>
        <li key={inq.id}>
              <InquiryRow inquiry={inq} perspective={perspective} />
            </li>
        )}
        </ul>
      }
    </div>);

}