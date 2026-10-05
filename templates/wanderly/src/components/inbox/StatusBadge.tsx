import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { TransactionStatus } from '../../types/marketplace';
import { statusMeta } from '../../utils/transactions';

export function StatusBadge({ status, className }: {status: TransactionStatus;className?: string;}) {
  const meta = statusMeta[status];
  return (
    <span className={twMerge('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', meta.className, className)}>
      {meta.label}
    </span>);

}