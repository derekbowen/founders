import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InboxIcon } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { EmptyState } from '../common/EmptyState';
import { getListing, getUser } from '../../utils/lookup';
import { formatRange } from '../../utils/format';
import { buttonClass } from '../../utils/styles';
import type { InboxTab, Transaction, TransactionStatus } from '../../types/transaction';

const statuses: (TransactionStatus | 'All')[] = ['All', 'Requested', 'Confirmed', 'Active', 'Completed', 'Cancelled'];

interface TransactionListProps {
  items: Transaction[];
  tab: InboxTab;
  selectedId?: string;
}

export function TransactionList({ items, tab, selectedId }: TransactionListProps) {
  const [status, setStatus] = useState<TransactionStatus | 'All'>('All');
  const shown = status === 'All' ? items : items.filter((t) => t.status === status);

  return (
    <div>
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 py-3" role="group" aria-label="Filter by status">
        {statuses.map((s) => {
          const count = s === 'All' ? items.length : items.filter((t) => t.status === s).length;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              status === s ? 'bg-navy text-white' : 'bg-ink/5 text-ink hover:bg-ink/10'}`
              }>
              
              {s} <span className="opacity-60">{count}</span>
            </button>);

        })}
      </div>

      {shown.length === 0 ?
      <EmptyState
        icon={<InboxIcon size={22} aria-hidden />}
        title={items.length === 0 ? tab === 'parking' ? 'No reservations yet' : 'No bookings yet' : `No ${status.toLowerCase()} bookings`}
        text={tab === 'parking' ? 'When you reserve a spot, it will show up here.' : 'Requests for your spaces will appear here.'}
        action={
        items.length === 0 ?
        <Link to={tab === 'parking' ? '/s' : '/listings/new'} className={buttonClass('primary', 'sm')}>
                {tab === 'parking' ? 'Find parking' : 'List your space'}
              </Link> :
        undefined
        } /> :


      <ul className="divide-y divide-line">
          {shown.map((t) => {
          const listing = getListing(t.listingId);
          const other = getUser(tab === 'parking' ? t.providerId : t.customerId);
          const last = t.messages[t.messages.length - 1];
          const active = t.id === selectedId;
          return (
            <li key={t.id}>
                <Link
                to={`/inbox/${t.id}?tab=${tab}`}
                aria-current={active ? 'true' : undefined}
                className={`flex gap-3 px-4 py-4 transition-colors focus-visible:bg-canvas focus-visible:outline-none ${
                active ? 'bg-accent/15 shadow-[inset_3px_0_0_rgb(var(--c-accent))]' : 'hover:bg-canvas'}`
                }>
                
                  <img src={listing?.photos[0]} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{other?.name}</p>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="truncate text-xs text-muted">{listing?.title}</p>
                    <p className="mt-0.5 truncate text-xs font-medium">{formatRange(t.arrive, t.leave)}</p>
                    {last && <p className="mt-1 truncate text-xs text-muted">{last.text}</p>}
                  </div>
                </Link>
              </li>);

        })}
        </ul>
      }
    </div>);

}