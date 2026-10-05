import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import { useApp } from '../../hooks/useApp';
import type { Transaction } from '../../types/marketplace';
import { formatMoney, timeAgo } from '../../utils/format';
import { cn } from '../../utils/styles';
import { getLatestOffer, needsAction } from '../../utils/transactions';

interface InboxListProps {
  items: Transaction[];
  selectedId?: string;
  tab: 'jobs' | 'offers';
}

export function InboxList({ items, selectedId, tab }: InboxListProps) {
  const { user, getUser, getJob } = useApp();
  if (!user) return null;

  return (
    <ul className="divide-y divide-ink-100" aria-label={tab === 'jobs' ? 'Offers on my jobs' : 'My offers'}>
      {items.map((tx) => {
        const otherId = tab === 'jobs' ? tx.proId : tx.customerId;
        const other = getUser(otherId);
        const job = getJob(tx.jobId);
        const latest = getLatestOffer(tx);
        const action = needsAction(tx, user.id);
        const selected = tx.id === selectedId;
        return (
          <li key={tx.id}>
            <Link
              to={`/inbox/${tx.id}?tab=${tab}`}
              aria-current={selected ? 'page' : undefined}
              className={cn(
                'relative flex gap-3 px-4 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                selected ? 'bg-primary-50/70' : 'hover:bg-ink-50'
              )}>
              
              {selected && <span className="absolute inset-y-0 left-0 w-1 bg-primary-600" aria-hidden="true" />}
              <Avatar name={other?.name ?? 'User'} alt={other?.name ?? 'User'} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn('truncate text-sm text-ink-900', action ? 'font-extrabold' : 'font-bold')}>
                    {other?.name}
                  </p>
                  <span className="shrink-0 text-xs text-ink-500">{timeAgo(tx.updatedAt)}</span>
                </div>
                <p className="truncate text-sm text-ink-600">{job?.title}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <StatusBadge status={tx.status} />
                  <span className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
                    {formatMoney(latest.amount)}
                    {action &&
                    <span className="h-2 w-2 rounded-full bg-primary-600" aria-label="Needs your action" />
                    }
                  </span>
                </div>
              </div>
            </Link>
          </li>);

      })}
    </ul>);

}