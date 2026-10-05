import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon, InboxIcon, MessagesSquareIcon } from 'lucide-react';
import { TransactionRow } from '../components/inbox/TransactionRow';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { statusMeta } from '../utils/transactions';
import { cn } from '../utils/ui';
import type { TxStatus } from '../types/marketplace';

type Tab = 'trips' | 'listings';
const statusFilters: (TxStatus | 'all')[] = ['all', 'requested', 'confirmed', 'on-the-water', 'completed', 'cancelled'];

export function Inbox() {
  const { tab: rawTab, txId } = useParams();
  const { transactions, currentUser } = useMarketplace();
  const [statusFilter, setStatusFilter] = useState<TxStatus | 'all'>('all');
  const tab: Tab = rawTab === 'listings' ? 'listings' : 'trips';

  const byTab = useMemo(
    () => ({
      trips: transactions.filter((t) => t.customerId === currentUser.id),
      listings: transactions.filter((t) => t.providerId === currentUser.id)
    }),
    [transactions, currentUser.id]
  );

  if (rawTab !== 'trips' && rawTab !== 'listings') return <Navigate to="/inbox/trips" replace />;

  const list = byTab[tab].filter((t) => statusFilter === 'all' || t.status === statusFilter);
  const selected = txId ? byTab[tab].find((t) => t.id === txId) : undefined;
  const pending = byTab.listings.filter((t) => t.status === 'requested').length;

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-content px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <h1 className={cn('font-heading text-3xl text-navy', txId && 'hidden lg:block')}>Inbox</h1>

        <div className="mt-6 grid overflow-hidden rounded-3xl border border-line lg:grid-cols-[380px_1fr]">
          <div className={cn('border-line lg:border-r', txId && 'hidden lg:block')}>
            <div className="border-b border-line p-4">
              <div className="grid grid-cols-2 gap-1 rounded-full bg-sand-light p-1" role="tablist" aria-label="Inbox type">
                {(['trips', 'listings'] as Tab[]).map((t) =>
                <Link
                  key={t}
                  to={`/inbox/${t}`}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setStatusFilter('all')}
                  className={cn('flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-colors', tab === t ? 'bg-white text-navy shadow-sm' : 'text-muted hover:text-navy')}>
                  
                    {t === 'trips' ? 'My trips' : 'My listings'}
                    <span className="text-xs font-medium text-muted">{byTab[t].length}</span>
                    {t === 'listings' && pending > 0 && <span className="h-2 w-2 rounded-full bg-coral-dark" aria-label={`${pending} pending`} />}
                  </Link>
                )}
              </div>
              <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto">
                {statusFilters.map((s) =>
                <button
                  key={s}
                  type="button"
                  aria-pressed={statusFilter === s}
                  onClick={() => setStatusFilter(s)}
                  className={cn('shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors', statusFilter === s ? 'bg-navy text-white' : 'text-muted hover:bg-sand-light hover:text-navy')}>
                  
                    {s === 'all' ? 'All' : statusMeta[s].label}
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-[70vh] space-y-1 overflow-y-auto p-2">
              {list.length === 0 ?
              <div className="p-3">
                  <EmptyState
                  icon={InboxIcon}
                  title={byTab[tab].length === 0 ? tab === 'trips' ? 'No trips yet' : 'No bookings yet' : 'Nothing here'}
                  text={byTab[tab].length === 0 ? tab === 'trips' ? 'When you request a boat, the conversation shows up here.' : 'Requests for your boats will appear here.' : 'No conversations match this status.'}
                  action={byTab[tab].length === 0 ? <Button to={tab === 'trips' ? '/s' : '/listings/new'} size="sm">{tab === 'trips' ? 'Find a boat' : 'List your boat'}</Button> : undefined} />
                
                </div> :

              list.map((tx) => <TransactionRow key={tx.id} tx={tx} tab={tab} active={tx.id === txId} />)
              }
            </div>
          </div>

          <div className={cn('min-h-[560px]', !txId && 'hidden lg:block')}>
            {txId &&
            <Link to={`/inbox/${tab}`} className="flex items-center gap-1 border-b border-line px-5 py-3 text-sm font-medium text-muted hover:text-navy lg:hidden">
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> All conversations
              </Link>
            }
            {selected ?
            <TransactionDetail key={selected.id} tx={selected} tab={tab} /> :

            <div className="flex h-full items-center justify-center p-10">
                <div className="text-center">
                  <MessagesSquareIcon className="mx-auto h-10 w-10 text-line" aria-hidden="true" />
                  <p className="mt-3 font-heading text-xl text-navy">{txId ? 'Conversation not found' : 'Select a conversation'}</p>
                  <p className="mt-1 text-sm text-muted">Trip details, chat and your checklist live here.</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}