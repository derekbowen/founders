import React from 'react';
import { statusMeta } from '../../utils/transactions';
import { cn } from '../../utils/ui';
import type { TxStatus } from '../../types/marketplace';

export function StatusBadge({ status, className }: {status: TxStatus;className?: string;}) {
  const meta = statusMeta[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset', meta.className, className)}>
      {status === 'on-the-water' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" aria-hidden="true" />}
      {meta.label}
    </span>);

}