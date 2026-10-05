import React from 'react';
import type { TransactionStatus } from '../types/marketplace';
import { cx } from '../utils/styles';

const styles: Record<TransactionStatus, {label: string;cls: string;dot: string;}> = {
  requested: { label: 'Requested', cls: 'bg-sand-100 text-sand-800', dot: 'bg-sand-500' },
  accepted: { label: 'Accepted', cls: 'bg-sky-50 text-sky-800', dot: 'bg-sky-500' },
  active: { label: 'Active', cls: 'bg-brand-50 text-brand-800', dot: 'bg-brand-500' },
  ending: { label: 'Ending', cls: 'bg-amber-50 text-amber-800', dot: 'bg-amber-500' },
  completed: { label: 'Completed', cls: 'bg-stone-100 text-stone-700', dot: 'bg-stone-400' },
  declined: { label: 'Declined', cls: 'bg-red-50 text-red-700', dot: 'bg-red-500' }
};

export function StatusPill({ status }: {status: TransactionStatus;}) {
  const s = styles[status];
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold', s.cls)}>
      <span className={cx('h-1.5 w-1.5 rounded-full', s.dot)} aria-hidden="true" />
      {s.label}
    </span>);

}