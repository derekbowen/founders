import React from 'react';
import { statusMeta } from '../../data/statuses';
import type { TransactionStatus } from '../../types/marketplace';
import { cn } from '../../utils/cn';

export function StatusBadge({ status, className }: {status: TransactionStatus;className?: string;}) {
  const meta = statusMeta[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold', meta.className, className)}>
      {status === 'in-care' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />}
      {meta.label}
    </span>);

}