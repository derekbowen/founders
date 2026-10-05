import React from 'react';
import type { OrderStatus } from '../../types/marketplace';
import { statusStyles } from '../../utils/orders';

export function StatusPill({ status }: {status: OrderStatus;}) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>);

}