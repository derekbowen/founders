import type { Order, OrderStatus } from '../types/marketplace';

export const statusMeta: Record<OrderStatus, {label: string;tone: string;dot: string;}> = {
  purchased: { label: 'Purchased', tone: 'bg-primary-soft text-primary-ink', dot: 'bg-primary' },
  shipped: { label: 'Shipped', tone: 'bg-info/10 text-info', dot: 'bg-info' },
  delivered: { label: 'Delivered', tone: 'bg-accent-soft text-accent-ink', dot: 'bg-accent' },
  received: { label: 'Received', tone: 'bg-success/10 text-success', dot: 'bg-success' },
  disputed: { label: 'Disputed', tone: 'bg-warning/10 text-warning', dot: 'bg-warning' },
  cancelled: { label: 'Cancelled', tone: 'bg-subtle text-muted', dot: 'bg-muted' }
};

export const statusOrder: OrderStatus[] = ['purchased', 'shipped', 'delivered', 'received', 'disputed', 'cancelled'];

export function orderTotal(o: Order): number {
  return o.unitPrice * o.quantity + o.deliveryFee;
}

export function needsAction(o: Order): boolean {
  if (o.role === 'sale') return o.status === 'purchased';
  return o.status === 'delivered' || o.status === 'shipped';
}

export function nextStepText(o: Order): string {
  const buyer = o.role === 'purchase';
  switch (o.status) {
    case 'purchased':
      return buyer ?
      'The maker is preparing your order.' :
      o.deliveryMethod === 'pickup' ?
      'Arrange a pickup time, then mark the order as picked up.' :
      'Pack the order and add a tracking number to mark it shipped.';
    case 'shipped':
      return buyer ? 'On its way. Mark it received once it arrives safely.' : 'In transit. Payout is released once the buyer marks it received.';
    case 'delivered':
      return buyer ? 'The carrier says it’s delivered. Mark it received to release payment.' : 'Delivered — waiting for the buyer to confirm.';
    case 'received':
      return buyer ? 'All done. Thanks for supporting an independent maker!' : 'Complete. Your payout is on its way.';
    case 'disputed':
      return 'Our support team is reviewing this order and will reply within 1 business day.';
    case 'cancelled':
      return 'This order was cancelled and refunded in full.';
  }
}