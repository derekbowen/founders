import React from 'react';
import { Badge } from '../Badge';
import type { OrderStatus } from '../../types/marketplace';

const map: Record<OrderStatus, {label: string;variant: 'primary' | 'success' | 'error';}> = {
  purchased: { label: 'Purchased', variant: 'primary' },
  downloaded: { label: 'Downloaded', variant: 'success' },
  refunded: { label: 'Refunded', variant: 'error' }
};

export function StatusPill({ status }: {status: OrderStatus;}) {
  const { label, variant } = map[status];
  return (
    <Badge variant={variant} size="small" style="bordered">
      {label}
    </Badge>);

}

export const statusLabels: Record<OrderStatus, string> = {
  purchased: 'Purchased',
  downloaded: 'Downloaded',
  refunded: 'Refunded'
};