import React, { useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangleIcon, CheckCircle2Icon } from 'lucide-react';
import { carriers } from '../../data/filters';
import { useOrders } from '../../contexts/OrdersContext';
import type { Order } from '../../types/marketplace';
import { nextStepText } from '../../utils/orderStatus';
import { Button } from '../ui/Button';
import { SelectField } from '../ui/SelectField';
import { TextArea } from '../ui/TextArea';
import { TextField } from '../ui/TextField';

export function OrderActions({ order }: {order: Order;}) {
  const { markShipped, markHandedOver, markReceived, openDispute, cancelOrder } = useOrders();
  const [carrier, setCarrier] = useState(carriers[0]);
  const [tracking, setTracking] = useState('');
  const [trackingError, setTrackingError] = useState('');
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [reason, setReason] = useState('');

  const buyer = order.role === 'purchase';
  const done = order.status === 'received' || order.status === 'cancelled' || order.status === 'disputed';

  return (
    <section className="card p-5" aria-labelledby="next-step-heading">
      <h2 id="next-step-heading" className="font-sans text-sm font-semibold">
        {done ? 'Status' : 'Next step'}
      </h2>
      <p className="mt-1 flex items-start gap-2 text-sm text-muted">
        {order.status === 'received' && <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />}
        {order.status === 'disputed' && <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />}
        {nextStepText(order)}
      </p>

      {buyer && (order.status === 'shipped' || order.status === 'delivered') && !disputeOpen &&
      <div className="mt-4 space-y-2">
          <Button
          className="w-full"
          onClick={() => {
            markReceived(order.id);
            toast.success('Marked as received — payment released to the maker.');
          }}>
          
            Mark received
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setDisputeOpen(true)}>
            Report a problem
          </Button>
        </div>
      }

      {buyer && disputeOpen &&
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!reason.trim()) return;
          openDispute(order.id, reason.trim());
          setDisputeOpen(false);
          toast('Dispute opened. Our team will be in touch within 1 business day.');
        }}>
        
          <TextArea label="What went wrong?" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={400} hint="Payment stays on hold while we review." placeholder="The item arrived damaged…" />
          <div className="flex gap-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setDisputeOpen(false)}>Back</Button>
            <Button type="submit" variant="danger" className="flex-1" disabled={!reason.trim()}>Open dispute</Button>
          </div>
        </form>
      }

      {!buyer && order.status === 'purchased' && order.deliveryMethod === 'shipping' &&
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (tracking.trim().length < 8) {
            setTrackingError('Enter a valid tracking number');
            return;
          }
          markShipped(order.id, carrier, tracking.trim());
          toast.success(`Marked shipped via ${carrier}. The buyer has been notified.`);
        }}>
        
          <SelectField label="Carrier" value={carrier} onChange={(e) => setCarrier(e.target.value)} options={carriers} />
          <TextField label="Tracking number" value={tracking} onChange={(e) => {setTracking(e.target.value);setTrackingError('');}} error={trackingError} placeholder="9400 1118 9922…" />
          <Button type="submit" className="w-full">Mark shipped</Button>
        </form>
      }

      {!buyer && order.status === 'purchased' && order.deliveryMethod === 'pickup' &&
      <Button
        className="mt-4 w-full"
        onClick={() => {
          markHandedOver(order.id);
          toast.success('Marked as picked up.');
        }}>
        
          Mark as picked up
        </Button>
      }

      {!buyer && order.status === 'purchased' &&
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 w-full text-danger hover:bg-danger/5"
        onClick={() => {
          cancelOrder(order.id, 'Cancelled by maker — refunded in full');
          toast('Order cancelled and buyer refunded.');
        }}>
        
          Cancel order
        </Button>
      }
    </section>);

}