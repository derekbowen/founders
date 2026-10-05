import React, { useState } from 'react';
import { InboxIcon, MousePointerClickIcon } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { OrderDetail } from '../components/inbox/OrderDetail';
import { OrderListItem } from '../components/inbox/OrderListItem';
import { EmptyState } from '../components/ui/EmptyState';
import { needsAction, useInbox } from '../hooks/useInbox';
import type { OrderRole, OrderStatus } from '../types/marketplace';

const tabs: {id: 'purchases' | 'sales';label: string;role: OrderRole;}[] = [
{ id: 'purchases', label: 'Purchases', role: 'purchase' },
{ id: 'sales', label: 'Sales', role: 'sale' }];


const statusFilters: (OrderStatus | 'All')[] = ['All', 'Ordered', 'Confirmed', 'Shipped', 'Delivered', 'Received', 'Disputed'];

export function Inbox() {
  const { tab, orderId } = useParams();
  const { orders, updateStatus, sendMessage } = useInbox();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');

  const activeTab = tabs.find((t) => t.id === tab);
  if (!activeTab) return <Navigate to="/inbox/purchases" replace />;

  const tabOrders = orders.filter((o) => o.role === activeTab.role);
  const visible = statusFilter === 'All' ? tabOrders : tabOrders.filter((o) => o.status === statusFilter);
  const selected = orders.find((o) => o.id === orderId && o.role === activeTab.role);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Inbox</h1>
          <p className="mt-1 text-sm text-slate-600">Track wholesale orders, message brands and retailers, and manage fulfillment.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className={`${selected ? 'hidden lg:block' : ''}`}>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex border-b border-slate-200" role="tablist" aria-label="Order type">
              {tabs.map((t) => {
                const count = orders.filter((o) => o.role === t.role && needsAction(o)).length;
                const isActive = t.id === activeTab.id;
                return (
                  <Link
                    key={t.id}
                    to={`/inbox/${t.id}`}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setStatusFilter('All')}
                    className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive ? 'border-primary-700 text-primary-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`
                    }>
                    
                    {t.label}
                    {count > 0 &&
                    <span className="rounded-full bg-accent-400 px-1.5 text-[11px] font-bold text-primary-950" aria-label={`${count} need action`}>
                        {count}
                      </span>
                    }
                  </Link>);

              })}
            </div>
            <div className="scrollbar-none flex gap-1.5 overflow-x-auto border-b border-slate-100 px-3 py-2.5">
              {statusFilters.map((s) =>
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                aria-pressed={statusFilter === s}
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                statusFilter === s ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                }>
                
                  {s}
                </button>
              )}
            </div>
            {visible.length > 0 ?
            <ul className="divide-y divide-slate-100">
                {visible.map((o) =>
              <OrderListItem key={o.id} order={o} active={o.id === selected?.id} tab={activeTab.id} />
              )}
              </ul> :

            <div className="px-6 py-12 text-center">
                <InboxIcon className="mx-auto h-6 w-6 text-slate-300" aria-hidden="true" />
                <p className="mt-2 text-sm font-medium text-slate-700">No {statusFilter.toLowerCase()} orders</p>
                <p className="text-xs text-slate-500">Orders with this status will show up here.</p>
              </div>
            }
          </div>
        </div>

        <div className={`${selected ? '' : 'hidden lg:block'}`}>
          {selected ?
          <OrderDetail
            order={selected}
            backTo={`/inbox/${activeTab.id}`}
            onUpdate={(status, note) => updateStatus(selected.id, status, note)}
            onSend={(body) => sendMessage(selected.id, body)} /> :


          <EmptyState
            icon={MousePointerClickIcon}
            title="Select an order"
            description={`Choose a ${activeTab.role} on the left to see messages, tracking and its timeline.`} />

          }
        </div>
      </div>
    </div>);

}