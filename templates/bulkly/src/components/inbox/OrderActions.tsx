import React from 'react';
import { AlertTriangleIcon, InfoIcon } from 'lucide-react';
import { toast } from 'sonner';
import { BrandButton } from '../ui/BrandButton';
import { brand } from '../../data/brand';
import type { Order, OrderStatus } from '../../types/marketplace';

interface OrderActionsProps {
  order: Order;
  onUpdate: (status: OrderStatus, note?: string) => void;
}

export function OrderActions({ order, onUpdate }: OrderActionsProps) {
  const act = (status: OrderStatus, message: string, note?: string) => {
    onUpdate(status, note);
    toast.success(message);
  };

  let content: React.ReactNode = null;
  let tone: 'action' | 'info' | 'warn' = 'info';

  if (order.role === 'sale' && order.status === 'Ordered') {
    tone = 'action';
    content =
    <>
        <p className="text-sm font-semibold text-slate-900">New order — confirm within 48 hours</p>
        <p className="text-sm text-slate-600">Confirming captures payment and commits you to ship within your lead time.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <BrandButton size="sm" onClick={() => act('Confirmed', 'Order confirmed', 'Confirmed by brand.')}>
            Confirm order
          </BrandButton>
          <BrandButton size="sm" variant="secondary" onClick={() => toast('Decline flow would open here with a reason picker.')}>
            Decline
          </BrandButton>
        </div>
      </>;

  } else if (order.role === 'sale' && order.status === 'Confirmed') {
    tone = 'action';
    content =
    <>
        <p className="text-sm font-semibold text-slate-900">Ready to ship?</p>
        <p className="text-sm text-slate-600">Add tracking so the retailer can follow the shipment.</p>
        <BrandButton size="sm" className="mt-3" onClick={() => act('Shipped', 'Marked as shipped — tracking shared', 'Label created and handed to carrier.')}>
          Mark as shipped
        </BrandButton>
      </>;

  } else if (order.role === 'purchase' && order.status === 'Delivered') {
    tone = 'action';
    content =
    <>
        <p className="text-sm font-semibold text-slate-900">Your cases were delivered</p>
        <p className="text-sm text-slate-600">Check the shipment and confirm receipt within 7 days, or report a problem.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <BrandButton size="sm" onClick={() => act('Received', 'Thanks! Payment released to the brand.')}>
            Mark as received
          </BrandButton>
          <BrandButton size="sm" variant="secondary" onClick={() => act('Disputed', 'Problem reported', 'Retailer reported an issue.')}>
            Report a problem
          </BrandButton>
        </div>
      </>;

  } else if (order.status === 'Disputed') {
    tone = 'warn';
    content =
    <>
        <p className="text-sm font-semibold text-red-800">Dispute open</p>
        <p className="text-sm text-red-700">
          {brand.name} support is reviewing and will respond within 1 business day. Contact {brand.supportEmail} with any photos.
        </p>
      </>;

  } else {
    const info: Record<string, string> = {
      'purchase-Ordered': 'Waiting for the brand to confirm. You won’t be charged until they do.',
      'purchase-Confirmed': 'The brand is preparing your cases. You’ll get tracking when they ship.',
      'purchase-Shipped': 'On the way — follow tracking below.',
      'purchase-Received': 'Order complete. Leave a review to help other retailers.',
      'sale-Shipped': 'Shipped. Payout is released 2 days after delivery.',
      'sale-Delivered': 'Delivered — waiting for the retailer to confirm receipt.',
      'sale-Received': 'Complete. Payout has been released to your bank.'
    };
    content = <p className="text-sm text-slate-700">{info[`${order.role}-${order.status}`]}</p>;
  }

  const styles = {
    action: 'border-accent-300 bg-accent-50',
    info: 'border-slate-200 bg-white',
    warn: 'border-red-200 bg-red-50'
  };
  const Icon = tone === 'warn' ? AlertTriangleIcon : InfoIcon;

  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${styles[tone]}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone === 'warn' ? 'text-red-600' : tone === 'action' ? 'text-accent-800' : 'text-primary-600'}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">{content}</div>
    </div>);

}