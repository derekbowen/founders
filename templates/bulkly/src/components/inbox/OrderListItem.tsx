import React from 'react';
import { Link } from 'react-router-dom';
import { StatusPill } from '../ui/StatusPill';
import { needsAction } from '../../hooks/useInbox';
import type { Order } from '../../types/marketplace';
import { getProduct } from '../../utils/catalog';
import { formatDate } from '../../utils/orders';
import { formatCurrency } from '../../utils/pricing';

export function OrderListItem({ order, active, tab }: {order: Order;active: boolean;tab: string;}) {
  const product = getProduct(order.productId);
  if (!product) return null;
  const total = order.unitPrice * product.casePack * order.cases + order.shipping;
  const action = needsAction(order);

  return (
    <li>
      <Link
        to={`/inbox/${tab}/${order.id}`}
        aria-current={active ? 'page' : undefined}
        className={`flex gap-3 border-l-2 px-4 py-3.5 transition-colors ${
        active ? 'border-primary-600 bg-primary-50/60' : 'border-transparent hover:bg-slate-50'}`
        }>
        
        <img src={product.image} alt="" className="h-12 w-12 shrink-0 rounded-lg border border-slate-200 object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-slate-900">{order.counterparty.business}</p>
            <time className="shrink-0 text-xs text-slate-400" dateTime={order.placedAt}>
              {formatDate(order.placedAt).replace(', 2026', '')}
            </time>
          </div>
          <p className="truncate text-xs text-slate-600">
            {order.cases} cs · {product.title}
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <StatusPill status={order.status} />
            <span className="flex items-center gap-1.5 text-xs font-semibold tabular-nums text-slate-800">
              {action && <span className="h-2 w-2 rounded-full bg-accent-500" aria-label="Action needed" />}
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </Link>
    </li>);

}