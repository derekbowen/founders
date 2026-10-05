import React from 'react';
import type { TxStatus } from '../../types/transaction';

export const statusMeta: Record<TxStatus, {label: string;className: string;dot: string;}> = {
  requested: { label: 'Requested', className: 'bg-amber-50 text-amber-800 ring-amber-200', dot: 'bg-amber-500' },
  confirmed: { label: 'Confirmed', className: 'bg-brand-50 text-brand-800 ring-brand-200', dot: 'bg-brand-600' },
  'checked-in': { label: 'Checked in', className: 'bg-sky-50 text-sky-800 ring-sky-200', dot: 'bg-sky-500' },
  completed: { label: 'Completed', className: 'bg-mist text-ink-muted ring-line', dot: 'bg-ink-subtle' },
  cancelled: { label: 'Cancelled', className: 'bg-red-50 text-red-700 ring-red-200', dot: 'bg-red-500' }
};

export function StatusBadge({ status }: {status: TxStatus;}) {
  const meta = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${meta.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
      {meta.label}
    </span>);

}