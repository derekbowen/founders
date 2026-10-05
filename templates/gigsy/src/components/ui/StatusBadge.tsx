import React from 'react';
import { TxStatus } from '../../types/marketplace';
import { statusMeta } from '../../utils/txStatus';

export function StatusBadge({ status }: {status: TxStatus;}) {
  const meta = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${meta.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
      {meta.label}
    </span>);

}