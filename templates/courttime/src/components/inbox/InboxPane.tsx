import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlusIcon, InboxIcon } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';
import { TransactionDetail } from './TransactionDetail';
import { TransactionListItem } from './TransactionListItem';
import { useBookings } from '../../contexts/BookingContext';
import { TransactionRole, TransactionStatus } from '../../types/marketplace';
import { sortTransactions, statusMeta, statusOrder } from '../../utils/transactions';

export function InboxPane({ role, initialTxId }: {role: TransactionRole;initialTxId: string | null;}) {
  const { transactions } = useBookings();
  const all = sortTransactions(transactions.filter((t) => t.role === role));
  const [statusFilter, setStatusFilter] = useState<'all' | TransactionStatus>('all');
  const [selectedId, setSelectedId] = useState<string | null>(initialTxId && all.some((t) => t.id === initialTxId) ? initialTxId : null);

  const filtered = statusFilter === 'all' ? all : all.filter((t) => t.status === statusFilter);
  const selected = filtered.find((t) => t.id === selectedId) ?? filtered[0] ?? null;

  if (!all.length) {
    return (
      <EmptyState
        className="mt-6"
        icon={role === 'customer' ? <CalendarPlusIcon size={26} /> : <InboxIcon size={26} />}
        title={role === 'customer' ? 'No games yet' : 'No bookings yet'}
        description={role === 'customer' ? 'Book a court or grab an open-play seat and it will show up here.' : 'When players book your court, requests and chats will land here.'}
        action={
        <Link to={role === 'customer' ? '/search' : '/create-listing'} className="btn btn-primary btn-md">
            {role === 'customer' ? 'Find a court' : 'List your court'}
          </Link>
        } />);


  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className={selectedId ? 'hidden lg:block' : ''}>
        <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by status">
          {(['all', ...statusOrder] as const).map((s) => {
            const count = s === 'all' ? all.length : all.filter((t) => t.status === s).length;
            const active = statusFilter === s;
            return (
              <button key={s} type="button" aria-pressed={active} onClick={() => setStatusFilter(s)} className={`chip py-1 text-xs ${active ? 'chip-active' : ''}`}>
                {s === 'all' ? 'All' : statusMeta[s].label} <span className={active ? 'text-white/80' : 'text-slate-400'}>{count}</span>
              </button>);

          })}
        </div>
        {filtered.length ?
        <ul className="space-y-1.5">
            {filtered.map((tx) =>
          <li key={tx.id}>
                <TransactionListItem tx={tx} active={selected?.id === tx.id} onSelect={() => setSelectedId(tx.id)} />
              </li>
          )}
          </ul> :

        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">No {statusFilter !== 'all' ? statusMeta[statusFilter].label.toLowerCase() : ''} bookings.</p>
        }
      </div>
      <div className={selectedId ? '' : 'hidden lg:block'}>
        {selected ?
        <TransactionDetail key={selected.id} tx={selected} onBack={() => setSelectedId(null)} /> :

        <EmptyState icon={<InboxIcon size={26} />} title="Select a booking" description="Choose a booking on the left to see details and messages." />
        }
      </div>
    </div>);

}