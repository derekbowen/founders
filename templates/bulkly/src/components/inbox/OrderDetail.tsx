import React from 'react';
import { ArrowLeftIcon, DownloadIcon, ExternalLinkIcon, TruckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { OrderActions } from './OrderActions';
import { OrderChat } from './OrderChat';
import { OrderTimeline } from './OrderTimeline';
import { BrandButton } from '../ui/BrandButton';
import { StatusPill } from '../ui/StatusPill';
import type { Order, OrderStatus } from '../../types/marketplace';
import { getProduct } from '../../utils/catalog';
import { formatDate, formatDateTime, statusDescriptions } from '../../utils/orders';
import { formatCurrency } from '../../utils/pricing';

interface OrderDetailProps {
  order: Order;
  backTo: string;
  onUpdate: (status: OrderStatus, note?: string) => void;
  onSend: (body: string) => void;
}

export function OrderDetail({ order, backTo, onUpdate, onSend }: OrderDetailProps) {
  const product = getProduct(order.productId);
  if (!product) return null;
  const units = order.cases * product.casePack;
  const subtotal = order.unitPrice * units;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to={backTo} className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-primary-700 lg:hidden">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> All orders
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-mono text-lg font-semibold text-slate-900">{order.id}</h2>
            <StatusPill status={order.status} />
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {order.role === 'purchase' ? 'Purchased from' : 'Sold to'} <span className="font-medium text-slate-900">{order.counterparty.business}</span> ·{' '}
            {order.counterparty.location} · Placed {formatDateTime(order.placedAt)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{statusDescriptions[order.status]}</p>
        </div>
        <BrandButton
          variant="secondary"
          size="sm"
          onClick={() => toast.success(`Invoice ${order.id}.pdf is being prepared`, { description: 'Invoices are a placeholder in this template.' })}>
          
          <DownloadIcon className="h-4 w-4" aria-hidden="true" />
          Download invoice
        </BrandButton>
      </div>

      <OrderActions order={order} onUpdate={onUpdate} />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <OrderChat order={order} onSend={onSend} />

        <div className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-4" aria-labelledby="order-items">
            <h3 id="order-items" className="text-sm font-semibold text-slate-900">
              Order details
            </h3>
            <Link to={`/products/${product.id}`} className="mt-3 flex gap-3 rounded-lg p-1 -m-1 hover:bg-slate-50">
              <img src={product.image} alt="" className="h-14 w-14 rounded-lg border border-slate-200 object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{product.title}</p>
                <p className="text-xs text-slate-500 tabular-nums">
                  {order.cases} cases × {product.casePack} = {units} units
                </p>
                <p className="text-xs text-slate-500 tabular-nums">{formatCurrency(order.unitPrice)} / unit (tier applied)</p>
              </div>
            </Link>
            <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="tabular-nums">{formatCurrency(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Shipping</dt>
                <dd className="tabular-nums">{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</dd>
              </div>
              {order.role === 'sale' &&
              <div className="flex justify-between">
                  <dt className="text-slate-600">Marketplace fee (15%)</dt>
                  <dd className="tabular-nums text-slate-600">−{formatCurrency(subtotal * 0.15)}</dd>
                </div>
              }
              <div className="flex justify-between border-t border-slate-100 pt-2 font-semibold">
                <dt>{order.role === 'sale' ? 'Your payout' : 'Total'}</dt>
                <dd className="tabular-nums">
                  {formatCurrency(order.role === 'sale' ? subtotal * 0.85 + order.shipping : subtotal + order.shipping)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4" aria-labelledby="tracking-heading">
            <h3 id="tracking-heading" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <TruckIcon className="h-4 w-4 text-primary-600" aria-hidden="true" /> Tracking
            </h3>
            {order.tracking ?
            <div className="mt-3 space-y-1 text-sm">
                <p className="text-slate-600">{order.tracking.carrier}</p>
                <p className="font-mono text-xs text-slate-900">{order.tracking.number}</p>
                <p className="text-slate-600">
                  {order.status === 'Shipped' ? 'Estimated delivery' : 'Delivered by'}{' '}
                  <span className="font-medium text-slate-900">{formatDate(order.tracking.eta)}</span>
                </p>
                <button
                type="button"
                onClick={() => toast('Carrier tracking opens in a new tab in production.')}
                className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-900">
                
                  Track with carrier <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </div> :

            <p className="mt-2 text-sm text-slate-500">Tracking appears here once the brand ships.</p>
            }
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4" aria-labelledby="timeline-heading">
            <h3 id="timeline-heading" className="mb-4 text-sm font-semibold text-slate-900">
              Timeline
            </h3>
            <OrderTimeline order={order} />
          </section>
        </div>
      </div>
    </div>);

}