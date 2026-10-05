import React from 'react';
import type { TransactionStatus } from '../../types/transaction';

export const statusConfig: Record<TransactionStatus, {label: string;className: string;dot: string;}> = {
  requested: { label: 'Requested', className: 'bg-primary-100 text-primary-800', dot: 'bg-primary-500' },
  confirmed: { label: 'Confirmed', className: 'bg-accent-100 text-accent-800', dot: 'bg-accent-500' },
  'in-care': { label: 'In care', className: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
  completed: { label: 'Completed', className: 'bg-ink-100 text-ink-700', dot: 'bg-ink-400' },
  cancelled: { label: 'Cancelled', className: 'bg-red-50 text-red-700', dot: 'bg-red-400' }
};

export function StatusBadge({ status }: {status: TransactionStatus;}) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${cfg.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
      {cfg.label}
    </span>);

}