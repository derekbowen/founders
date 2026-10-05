import React from 'react';
import type { OrderStatus } from '../../types/marketplace';
import { statusMeta } from '../../utils/orderStatus';

export function StatusBadge({ status }: {status: OrderStatus;}) {
  const meta = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.tone}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden />
      {meta.label}
    </span>);

}