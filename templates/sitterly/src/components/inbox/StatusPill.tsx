import React from 'react';
import { TxStatus } from '../../types/transaction';

const styles: Record<TxStatus, {pill: string;dot: string;}> = {
  Requested: { pill: 'bg-accent-50 text-accent-800 ring-accent-200', dot: 'bg-accent-500' },
  Confirmed: { pill: 'bg-primary-50 text-primary-800 ring-primary-200', dot: 'bg-primary-600' },
  'In progress': { pill: 'bg-sky-50 text-sky-800 ring-sky-200', dot: 'bg-sky-500 animate-pulse' },
  Completed: { pill: 'bg-emerald-50 text-emerald-800 ring-emerald-200', dot: 'bg-emerald-600' },
  Cancelled: { pill: 'bg-ink-100 text-ink-700 ring-ink-200', dot: 'bg-ink-400' }
};

export function StatusPill({ status }: {status: TxStatus;}) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${s.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {status}
    </span>);

}