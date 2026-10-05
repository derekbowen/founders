import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InboxIcon, LibraryIcon } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/marketplace';
import { OrderRow } from './OrderRow';
import { EmptyState } from '../common/EmptyState';
import { statusLabels } from '../common/StatusPill';

const statuses: (OrderStatus | 'all')[] = ['all', 'purchased', 'downloaded', 'refunded'];

export function OrderList({ orders, role }: {orders: Order[];role: 'buyer' | 'seller';}) {
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');
  const visible = status === 'all' ? orders : orders.filter((o) => o.status === status);

  if (orders.length === 0) {
    return role === 'buyer' ?
    <EmptyState
      icon={LibraryIcon}
      title="Your library is empty"
      body="Everything you buy shows up here, ready to download again any time."
      action={
      <Link to="/s" className="btn btn-accent">
            Find something great
          </Link>
      } /> :


    <EmptyState
      icon={InboxIcon}
      title="No sales yet"
      body="Publish your first product and your sales will appear here."
      action={
      <Link to="/listings/new" className="btn btn-accent">
            Create a listing
          </Link>
      } />;


  }

  return (
    <div>
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto" role="radiogroup" aria-label="Filter by status">
        {statuses.map((s) => {
          const count = s === 'all' ? orders.length : orders.filter((o) => o.status === s).length;
          const active = status === s;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setStatus(s)}
              className={`chip shrink-0 py-1.5 text-sm ${active ? 'border-ink bg-ink text-white hover:border-ink' : ''}`}>
              
              {s === 'all' ? 'All' : statusLabels[s]}
              <span className={active ? 'text-white/70' : 'text-muted'}>{count}</span>
            </button>);

        })}
      </div>
      {visible.length === 0 ?
      <p className="rounded-xl border border-dashed border-ink/25 bg-paper p-8 text-center text-sm text-muted">
          No {statusLabels[status as OrderStatus].toLowerCase()} items.
        </p> :

      <ul className="space-y-3">
          {visible.map((o) =>
        <OrderRow key={o.id} order={o} />
        )}
        </ul>
      }
    </div>);

}