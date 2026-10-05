import React from 'react';
import type { TransactionStatus } from '../../types/marketplace';
import { cn } from '../../utils/styles';
import { statusLabels } from '../../utils/transactions';

const styles: Record<TransactionStatus, string> = {
  offer_sent: 'bg-sky-50 text-sky-800 ring-sky-200',
  countered: 'bg-amber-50 text-amber-800 ring-amber-200',
  accepted: 'bg-primary-50 text-primary-800 ring-primary-200',
  paid: 'bg-violet-50 text-violet-800 ring-violet-200',
  completed: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  declined: 'bg-ink-100 text-ink-600 ring-ink-200'
};

const dots: Record<TransactionStatus, string> = {
  offer_sent: 'bg-sky-500',
  countered: 'bg-amber-500',
  accepted: 'bg-primary-500',
  paid: 'bg-violet-500',
  completed: 'bg-emerald-500',
  declined: 'bg-ink-400'
};

export function StatusBadge({ status, className }: {status: TransactionStatus;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset',
        styles[status],
        className
      )}>
      
      <span className={cn('h-1.5 w-1.5 rounded-full', dots[status])} aria-hidden="true" />
      {statusLabels[status]}
    </span>);

}