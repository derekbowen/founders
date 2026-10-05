import React, { useState } from 'react';
import { Link, Navigate, NavLink, useParams } from 'react-router-dom';
import { ChevronRightIcon, InboxIcon, MapPinIcon, TruckIcon } from 'lucide-react';
import { useListings } from '../contexts/ListingsContext';
import { useOrders } from '../contexts/OrdersContext';
import { StatusBadge } from '../components/inbox/StatusBadge';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import type { OrderStatus } from '../types/marketplace';
import { formatDate, formatPrice } from '../utils/format';
import { needsAction, orderTotal, statusMeta, statusOrder } from '../utils/orderStatus';

export function Inbox() {
  const { tab } = useParams();
  const { orders } = useOrders();
  const { getListing } = useListings();
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');

  if (tab !== 'purchases' && tab !== 'sales') return <Navigate to="/inbox/purchases" replace />;
  const role = tab === 'purchases' ? 'purchase' : 'sale';
  const roleOrders = orders.filter((o) => o.role === role).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const visible = status === 'all' ? roleOrders : roleOrders.filter((o) => o.status === status);
  const actionCount = (r: 'purchase' | 'sale') => orders.filter((o) => o.role === r && needsAction(o)).length;

  const tabClass = ({ isActive }: {isActive: boolean;}) =>
  `relative flex items-center gap-2 px-1 pb-3 text-sm font-medium transition-colors ${isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary' : 'text-muted hover:text-ink'}`;

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="text-4xl font-medium tracking-tight">Inbox</h1>
      <nav className="mt-6 flex gap-8 border-b border-line" aria-label="Inbox tabs">
        {(['purchases', 'sales'] as const).map((t) => {
          const n = actionCount(t === 'purchases' ? 'purchase' : 'sale');
          return (
            <NavLink key={t} to={`/inbox/${t}`} className={tabClass} onClick={() => setStatus('all')}>
              {t === 'purchases' ? 'Purchases' : 'Sales'}
              {n > 0 && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white">{n}</span>}
            </NavLink>);

        })}
      </nav>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="group" aria-label="Filter by status">
        {(['all', ...statusOrder] as const).map((s) => {
          const count = s === 'all' ? roleOrders.length : roleOrders.filter((o) => o.status === s).length;
          const active = status === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${active ? 'border-ink bg-ink text-canvas' : 'border-line bg-surface text-ink hover:border-muted/50'}`}>
              
              {s === 'all' ? 'All' : statusMeta[s].label} <span className={active ? 'text-canvas/70' : 'text-muted'}>{count}</span>
            </button>);

        })}
      </div>

      <div className="mt-6">
        {visible.length === 0 ?
        <EmptyState
          icon={<InboxIcon className="h-5 w-5" />}
          title={roleOrders.length === 0 ? role === 'purchase' ? 'No purchases yet' : 'No sales yet' : 'No orders with this status'}
          description={
          roleOrders.length === 0 ?
          role === 'purchase' ?
          'Orders you place will appear here, along with your messages to makers.' :
          'When someone buys from your shop, you’ll manage it here.' :
          'Try a different status filter.'
          }
          action={roleOrders.length === 0 ? <ButtonLink to={role === 'purchase' ? '/s' : '/listings/new'}>{role === 'purchase' ? 'Start shopping' : 'Create a listing'}</ButtonLink> : undefined} /> :


        <ul className="card divide-y divide-line overflow-hidden">
            {visible.map((o) => {
            const listing = getListing(o.listingId);
            const last = o.messages[o.messages.length - 1];
            return (
              <li key={o.id}>
                  <Link to={`/orders/${o.id}`} className="group flex items-center gap-4 p-4 transition-colors hover:bg-subtle/60 sm:p-5">
                    <div className="relative shrink-0">
                      <img src={listing?.image} alt="" className="h-16 w-14 rounded-xl object-cover sm:h-20 sm:w-16" />
                      {needsAction(o) && <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-primary ring-2 ring-surface" aria-label="Needs action" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="truncate text-sm font-semibold">{o.counterparty.name}</p>
                        <StatusBadge status={o.status} />
                      </div>
                      <p className="mt-0.5 truncate text-sm text-ink/90">{o.quantity} × {listing?.title}</p>
                      <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted">
                        {o.deliveryMethod === 'pickup' ? <MapPinIcon className="h-3 w-3" aria-hidden /> : <TruckIcon className="h-3 w-3" aria-hidden />}
                        {last ? `${last.from === 'me' ? 'You: ' : ''}${last.text}` : `Order ${o.id}`}
                      </p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-semibold">{formatPrice(orderTotal(o))}</p>
                      <p className="text-xs text-muted">{formatDate(o.createdAt)}</p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>);

          })}
          </ul>
        }
      </div>
    </div>);

}