import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { InboxIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StatusPill } from '../StatusPill';
import { EmptyState } from '../EmptyState';
import type { Listing, Transaction, TransactionStatus } from '../../types/marketplace';
import { cx } from '../../utils/styles';

interface Props {
  items: Transaction[];
  activeId?: string;
  getListing: (id: string) => Listing | undefined;
  statusFilter: TransactionStatus | 'all';
  onStatusFilter: (s: TransactionStatus | 'all') => void;
}

const filters: Array<TransactionStatus | 'all'> = ['all', 'requested', 'accepted', 'active', 'ending', 'completed'];

export function TransactionList({ items, activeId, getListing, statusFilter, onStatusFilter }: Props) {
  const shown = statusFilter === 'all' ? items : items.filter((t) => t.status === statusFilter);
  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1.5 overflow-x-auto border-b border-stone-200 px-4 py-3 scrollbar-none">
        {filters.map((f) => {
          const count = f === 'all' ? items.length : items.filter((t) => t.status === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={statusFilter === f}
              onClick={() => onStatusFilter(f)}
              className={cx(
                'shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors',
                statusFilter === f ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              )}>
              
              {f} <span className="opacity-70">{count}</span>
            </button>);

        })}
      </div>
      {shown.length === 0 ?
      <div className="p-4">
          <EmptyState icon={<InboxIcon className="h-5 w-5" />} title="Nothing here" text="Bookings with this status will show up here." />
        </div> :

      <ul className="flex-1 divide-y divide-stone-100 overflow-y-auto">
          {shown.map((t) => {
          const l = getListing(t.listingId);
          const last = t.messages[t.messages.length - 1];
          return (
            <li key={t.id}>
                <Link
                to={`/inbox/tx/${t.id}`}
                aria-current={activeId === t.id ? 'page' : undefined}
                className={cx(
                  'flex gap-3 px-4 py-4 transition-colors',
                  activeId === t.id ? 'bg-brand-50' : 'hover:bg-stone-50'
                )}>
                
                  <Avatar name={t.counterpartName} alt={t.counterpartName} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cx('truncate text-sm', t.unread ? 'font-bold text-stone-900' : 'font-semibold text-stone-800')}>
                        {t.counterpartName}
                      </p>
                      <span className="shrink-0 text-xs text-stone-500">
                        {formatDistanceToNowStrict(parseISO(t.updatedAt), { addSuffix: false })}
                      </span>
                    </div>
                    <p className="truncate text-xs text-stone-600">{l?.title ?? 'Listing'}</p>
                    <p className={cx('mt-1 truncate text-sm', t.unread ? 'text-stone-900' : 'text-stone-600')}>{last?.text}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <StatusPill status={t.status} />
                      {t.unread && <span className="h-2 w-2 rounded-full bg-sand-500" aria-label="Unread" />}
                    </div>
                  </div>
                </Link>
              </li>);

        })}
        </ul>
      }
    </div>);

}