import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { MessagesSquareIcon } from 'lucide-react';
import { AuthGate } from '../components/AuthGate';
import { TransactionList } from '../components/inbox/TransactionList';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { EmptyState } from '../components/EmptyState';
import { useMarketplace } from '../contexts/MarketplaceContext';
import type { TransactionRole, TransactionStatus } from '../types/marketplace';
import { ui, cx } from '../utils/styles';

export function Inbox() {
  return (
    <AuthGate title="inbox">
      <InboxContent />
    </AuthGate>);

}

function InboxContent() {
  const { tab, txId } = useParams();
  const { transactions, getListing, markRead } = useMarketplace();
  const selected = txId ? transactions.find((t) => t.id === txId) : undefined;
  const role: TransactionRole = selected?.role ?? (tab === 'hosting' ? 'hosting' : 'storing');
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'all'>('all');
  const items = transactions.filter((t) => t.role === role);

  useEffect(() => {
    if (selected?.unread) markRead(selected.id);
  }, [selected, markRead]);

  useEffect(() => setStatusFilter('all'), [role]);

  const unreadFor = (r: TransactionRole) => transactions.filter((t) => t.role === r && t.unread).length;

  return (
    <div className="bg-stone-50">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] flex-col lg:flex-row">
        <aside className={cx('flex w-full flex-col border-r border-stone-200 bg-white lg:w-[360px] lg:shrink-0', txId && 'hidden lg:flex')}>
          <div className="px-4 pb-2 pt-6">
            <h1 className="text-2xl font-bold text-stone-900">Inbox</h1>
            <div role="tablist" aria-label="Inbox type" className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-stone-100 p-1">
              {(['storing', 'hosting'] as const).map((r) =>
              <NavLink
                key={r}
                to={`/inbox/${r}`}
                role="tab"
                aria-selected={role === r}
                className={cx(
                  'flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-colors',
                  role === r ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                )}>
                
                  {r}
                  {unreadFor(r) > 0 &&
                <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-sand-500 px-1 text-[11px] font-bold text-white">{unreadFor(r)}</span>
                }
                </NavLink>
              )}
            </div>
          </div>
          <TransactionList
            items={items}
            activeId={selected?.id}
            getListing={getListing}
            statusFilter={statusFilter}
            onStatusFilter={setStatusFilter} />
          
        </aside>

        <section className={cx('flex-1', !txId && 'hidden lg:block')} aria-label="Conversation">
          {selected ?
          <TransactionDetail tx={selected} /> :
          txId ?
          <div className="p-6">
              <EmptyState
              icon={<MessagesSquareIcon className="h-5 w-5" />}
              title="Conversation not found"
              text="It may have been archived."
              action={<Link to="/inbox/storing" className={ui.linkBrand}>Back to inbox</Link>} />
            
            </div> :

          <div className="grid h-full place-items-center p-6">
              <div className="w-full max-w-md">
                <EmptyState
                icon={<MessagesSquareIcon className="h-5 w-5" />}
                title="Select a conversation"
                text={
                items.length ?
                'Choose a booking to see messages, the timeline, move-in instructions and the access log.' :
                role === 'hosting' ?
                'List a space to start receiving booking requests.' :
                'Find a space and request to book — conversations show up here.'
                }
                action={
                !items.length ?
                <Link to={role === 'hosting' ? '/listings/new' : '/s'} className={ui.linkBrand}>
                        {role === 'hosting' ? 'Rent out your space' : 'Browse spaces'}
                      </Link> :
                undefined
                } />
              
              </div>
            </div>
          }
        </section>
      </div>
    </div>);

}