import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronLeftIcon, CopyIcon, GiftIcon, PackageSearchIcon, TruckIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useListings } from '../contexts/ListingsContext';
import { useOrders } from '../contexts/OrdersContext';
import { OrderActions } from '../components/inbox/OrderActions';
import { OrderChat } from '../components/inbox/OrderChat';
import { OrderTimeline } from '../components/inbox/OrderTimeline';
import { StatusBadge } from '../components/inbox/StatusBadge';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { formatDate, formatPrice } from '../utils/format';
import { orderTotal } from '../utils/orderStatus';

export function OrderDetail() {
  const { id = '' } = useParams();
  const { getOrder } = useOrders();
  const { getListing } = useListings();
  const { user } = useAuth();
  const order = getOrder(id);
  const listing = order ? getListing(order.listingId) : undefined;

  if (!order || !listing) {
    return (
      <div className="container-page py-16">
        <EmptyState icon={<PackageSearchIcon className="h-5 w-5" />} title="Order not found" description="We couldn’t find that order. It may belong to a different account." action={<ButtonLink to="/inbox/purchases">Back to inbox</ButtonLink>} />
      </div>);

  }

  const tab = order.role === 'purchase' ? 'purchases' : 'sales';
  const myName = user ? `${user.firstName} ${user.lastName}` : 'You';

  return (
    <div className="container-page py-8 lg:py-10">
      <Link to={`/inbox/${tab}`} className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden /> Back to {tab}
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Order {order.id}</h1>
        <StatusBadge status={order.status} />
      </div>
      <p className="mt-1 text-sm text-muted">
        {order.role === 'purchase' ? 'Purchased from' : 'Sold to'} {order.counterparty.name} on {formatDate(order.createdAt)}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="order-2 lg:order-1">
          <OrderChat order={order} myName={myName} />
        </div>

        <aside className="order-1 space-y-4 lg:order-2">
          <section className="card p-5">
            <Link to={`/l/${listing.id}`} className="group flex gap-4">
              <img src={listing.image} alt="" className="h-24 w-20 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="font-medium group-hover:text-primary-ink">{listing.title}</p>
                <p className="mt-1 text-xs text-muted">Qty {order.quantity}{Object.entries(order.selections).map(([k, v]) => ` · ${k}: ${v}`).join('')}</p>
              </div>
            </Link>
            <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Items</dt><dd>{formatPrice(order.unitPrice * order.quantity)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">{order.deliveryMethod === 'pickup' ? 'Local pickup' : 'Shipping'}</dt><dd>{order.deliveryFee ? formatPrice(order.deliveryFee) : 'Free'}</dd></div>
              <div className="flex justify-between pt-1 font-semibold"><dt>Total</dt><dd>{formatPrice(orderTotal(order))}</dd></div>
            </dl>
          </section>

          <OrderActions order={order} />

          {order.trackingNumber &&
          <section className="card p-5">
              <h2 className="flex items-center gap-2 font-sans text-sm font-semibold"><TruckIcon className="h-4 w-4 text-accent-ink" aria-hidden /> Tracking</h2>
              <p className="mt-2 text-xs text-muted">{order.carrier}</p>
              <div className="mt-1 flex items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2">
                <code className="truncate font-mono text-sm">{order.trackingNumber}</code>
                <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(order.trackingNumber ?? '');
                  toast('Tracking number copied');
                }}
                className="rounded-md p-1.5 text-muted hover:bg-surface hover:text-ink"
                aria-label="Copy tracking number">
                
                  <CopyIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </section>
          }

          <section className="card p-5">
            <h2 className="mb-4 font-sans text-sm font-semibold">Timeline</h2>
            <OrderTimeline order={order} />
          </section>

          {order.shippingAddress &&
          <section className="card p-5 text-sm">
              <h2 className="font-sans text-sm font-semibold">Ship to</h2>
              <address className="mt-2 not-italic leading-relaxed text-muted">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </address>
            </section>
          }

          {order.giftNote &&
          <section className="rounded-2xl border border-primary/20 bg-primary-soft/60 p-5">
              <h2 className="flex items-center gap-2 font-sans text-sm font-semibold text-primary-ink"><GiftIcon className="h-4 w-4" aria-hidden /> Gift note</h2>
              <p className="mt-2 font-heading text-lg italic leading-snug">“{order.giftNote}”</p>
            </section>
          }
        </aside>
      </div>
    </div>);

}