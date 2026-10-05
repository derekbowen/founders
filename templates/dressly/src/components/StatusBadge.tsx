import React from 'react';
import type { TxStatus } from '../types/marketplace';
import { cx } from '../utils/styles';

export const statusMeta: Record<TxStatus, {label: string;className: string;}> = {
  requested: { label: 'Requested', className: 'bg-accent-soft text-accent-dark' },
  confirmed: { label: 'Confirmed', className: 'bg-ink text-paper' },
  shipped: { label: 'Shipped', className: 'bg-cream text-ink border border-line' },
  worn: { label: 'Worn', className: 'bg-[#f3ead8] text-[#6b5320]' },
  returned: { label: 'Returned', className: 'bg-[#e4ece6] text-[#2f5a3f]' },
  completed: { label: 'Completed', className: 'bg-paper text-muted border border-line' },
  declined: { label: 'Declined', className: 'bg-paper text-[#9b2c2c] border border-[#f1c9c9]' }
};

export function StatusBadge({ status }: {status: TxStatus;}) {
  const meta = statusMeta[status];
  return (
    <span
      className={cx(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]',
        meta.className
      )}>
      
      {meta.label}
    </span>);

}