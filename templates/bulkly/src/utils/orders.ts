import { brand } from '../data/brand';
import type { OrderStatus } from '../types/marketplace';

export const orderFlow: OrderStatus[] = ['Ordered', 'Confirmed', 'Shipped', 'Delivered', 'Received'];

export const statusStyles: Record<OrderStatus, string> = {
  Ordered: 'bg-amber-50 text-amber-800 ring-amber-200',
  Confirmed: 'bg-primary-50 text-primary-700 ring-primary-200',
  Shipped: 'bg-sky-50 text-sky-800 ring-sky-200',
  Delivered: 'bg-accent-100 text-accent-800 ring-accent-300',
  Received: 'bg-slate-100 text-slate-700 ring-slate-200',
  Disputed: 'bg-red-50 text-red-700 ring-red-200'
};

export const statusDescriptions: Record<OrderStatus, string> = {
  Ordered: 'Order placed — waiting for the brand to confirm.',
  Confirmed: 'Brand confirmed the order and is preparing cases.',
  Shipped: 'Cases are on the way.',
  Delivered: 'Carrier marked the shipment as delivered.',
  Received: 'Retailer confirmed receipt. Payout released.',
  Disputed: `A problem was reported. ${brand.name} support is reviewing.`
};

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}