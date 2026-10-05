import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagesSquareIcon } from 'lucide-react';
import { TransactionList } from '../components/inbox/TransactionList';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { EmptyState } from '../components/ui/EmptyState';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useTransactions } from '../contexts/TransactionsContext';
import { TxRole, TxStatus } from '../types/marketplace';
import { roleFor, statusMeta } from '../utils/txStatus';

const statusFilters: (TxStatus | 'all')[] = ['all', 'quote-requested', 'offer-sent', 'countered', 'accepted', 'delivered', 'completed', 'declined'];

export function Inbox() {
  const { txId } = useParams();
  const { transactions, getTransaction } = useTransactions();
  const active = txId ? getTransaction(txId) : undefined;
  const [tab, setTab] = useState<TxRole>(active ? roleFor(active) : 'client');
  const [status, setStatus] = useState<TxStatus | 'all'>('all');

  useEffect(() => {
    if (active) setTab(roleFor(active));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id]);

  const byRole = useMemo(
    () => ({
      client: transactions.filter((t) => roleFor(t) === 'client'),
      freelancer: transactions.filter((t) => roleFor(t) === 'freelancer')
    }),
    [transactions]
  );

  const visible = byRole[tab].
  filter((t) => status === 'all' || t.status === status).
  sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const tabs: {id: TxRole;label: string;}[] = [
  { id: 'client', label: 'As client' },
  { id: 'freelancer', label: 'As freelancer' }];


  return (
    <div className="mx-auto max-w-7xl px-0 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-7rem)] overflow-hidden border-slate-200 bg-white sm:rounded-2xl sm:border">
        <aside className={`w-full shrink-0 flex-col border-r border-slate-200 lg:flex lg:w-[360px] ${txId ? 'hidden' : 'flex'}`} aria-label="Conversations">
          <div className="border-b border-slate-200 p-4">
            <h1 className="text-xl font-bold text-slate-900">Inbox</h1>
            <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Inbox role">
              {tabs.map((t) => {
                const unread = byRole[t.id].filter((x) => x.unread).length;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-colors ${tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                    
                    {t.label}
                    <span className={`rounded-full px-1.5 text-xs ${unread ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {unread || byRole[t.id].length}
                    </span>
                  </button>);

              })}
            </div>
            <div className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 scrollbar-none">
              {statusFilters.map((s) =>
              <button
                key={s}
                type="button"
                aria-pressed={status === s}
                onClick={() => setStatus(s)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-colors ${status === s ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-300'}`}>
                
                  {s === 'all' ? 'All' : statusMeta[s].label}
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <TransactionList transactions={visible} role={tab} />
          </div>
        </aside>

        <section className={`min-w-0 flex-1 bg-slate-50 ${txId ? 'block' : 'hidden lg:block'}`}>
          {active ?
          <TransactionDetail tx={active} /> :
          txId ?
          <div className="p-6">
              <EmptyState
              icon={<MessagesSquareIcon className="h-6 w-6" />}
              title="Conversation not found"
              text="This transaction may have been removed."
              action={<ButtonLink to="/inbox" variant="secondary">Back to inbox</ButtonLink>} />
            
            </div> :

          <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                  <MessagesSquareIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-slate-900">Select a conversation</h2>
                <p className="mt-1 text-sm text-slate-600">Quote requests, offers and deliveries all live here.</p>
              </div>
            </div>
          }
        </section>
      </div>
    </div>);

}