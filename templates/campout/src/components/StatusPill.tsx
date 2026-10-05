import React from 'react';
import type { TransactionStatus } from '../types/transaction';

const styles: Record<TransactionStatus, {label: string;className: string;}> = {
  requested: { label: 'Requested', className: 'bg-accent-50 text-accent-700 ring-accent-200' },
  booked: { label: 'Booked', className: 'bg-primary-50 text-primary-700 ring-primary-200' },
  'checked-in': { label: 'Checked in', className: 'bg-primary-700 text-white ring-primary-700' },
  completed: { label: 'Completed', className: 'bg-sand-100 text-ink-600 ring-sand-300' },
  cancelled: { label: 'Cancelled', className: 'bg-red-50 text-red-700 ring-red-200' }
};

export function statusLabel(status: TransactionStatus): string {
  return styles[status].label;
}

export function StatusPill({ status }: {status: TransactionStatus;}) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${s.className}`}>
      {s.label}
    </span>);

}