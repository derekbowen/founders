import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { InboxIcon, MessageSquareIcon } from 'lucide-react';
import { useInbox } from '../hooks/useInbox';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { getListing, getUser } from '../utils/lookup';
import { btn, cx } from '../utils/styles';

type Tab = 'rentals' | 'lending';

export function Inbox() {
  const [params, setParams] = useSearchParams();
  const tab: Tab = params.get('tab') === 'lending' ? 'lending' : 'rentals';
  const { items, setStatus, sendMessage } = useInbox();
  const list = items.filter((t) => t.role === (tab === 'rentals' ? 'renter' : 'lender'));
  const selectedId = params.get('tx');
  const selected = items.find((t) => t.id === selectedId && list.includes(t));

  const select = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set('tx', id);else
    next.delete('tx');
    setParams(next, { replace: true });
  };

  const setTab = (t: Tab) => setParams({ tab: t }, { replace: true });

  const counts = {
    rentals: items.filter((t) => t.role === 'renter').length,
    lending: items.filter((t) => t.role === 'lender' && t.status === 'requested').length
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 md:px-8 md:pt-12">
      <h1 className="font-display text-4xl md:text-5xl">Inbox</h1>

      <div role="tablist" aria-label="Inbox" className="mt-6 flex gap-8 border-b border-line">
        {(['rentals', 'lending'] as Tab[]).map((t) =>
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={tab === t}
          onClick={() => setTab(t)}
          className={cx(
            '-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-medium capitalize transition',
            tab === t ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'
          )}>
          
            {t === 'rentals' ? 'My rentals' : 'Lending'}
            {counts[t] > 0 &&
          <span className={cx('rounded-full px-1.5 text-[10px]', t === 'lending' ? 'bg-accent-dark text-paper' : 'bg-cream text-muted')}>
                {counts[t]}
              </span>
          }
          </button>
        )}
      </div>

      {list.length === 0 ?
      <div className="mt-10">
          <EmptyState
          icon={InboxIcon}
          title={tab === 'rentals' ? 'No rentals yet' : 'No lending requests yet'}
          text={tab === 'rentals' ? 'When you request a dress, the conversation lives here.' : 'List a dress and requests will appear here.'}
          action={
          <Link to={tab === 'rentals' ? '/s' : '/l/new'} className={btn('primary', 'md')}>
                {tab === 'rentals' ? 'Browse dresses' : 'List a dress'}
              </Link>
          } />
        
        </div> :

      <div className="mt-6 grid gap-8 lg:grid-cols-[360px_1fr]">
          <ul className={cx('divide-y divide-line border border-line', selected && 'hidden lg:block')}>
            {list.map((t) => {
            const l = getListing(t.listingId);
            const u = getUser(t.counterpartyId);
            if (!l || !u) return null;
            const last = t.messages[t.messages.length - 1];
            const active = t.id === selected?.id;
            return (
              <li key={t.id}>
                  <button
                  type="button"
                  onClick={() => select(t.id)}
                  aria-current={active}
                  className={cx(
                    'flex w-full gap-3 p-4 text-left transition',
                    active ? 'bg-cream' : 'hover:bg-cream/60'
                  )}>
                  
                    <img src={l.image} alt="" className="h-16 w-12 shrink-0 object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-ink">{u.name}</p>
                        <span className="shrink-0 text-[11px] text-muted">{t.updatedLabel}</span>
                      </div>
                      <p className="truncate text-xs text-muted">{l.designer} · {l.title}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <StatusBadge status={t.status} />
                        {last && <p className="truncate text-xs text-muted">{last.text}</p>}
                      </div>
                    </div>
                  </button>
                </li>);

          })}
          </ul>

          <section aria-label="Conversation" className={cx(!selected && 'hidden lg:block')}>
            {selected ?
          <TransactionDetail
            tx={selected}
            onStatus={(s) => setStatus(selected.id, s)}
            onSend={(text) => sendMessage(selected.id, text)}
            onBack={() => select(null)} /> :


          <EmptyState icon={MessageSquareIcon} title="Select a conversation" text="Pick a rental to see messages, timeline and next steps." />
          }
          </section>
        </div>
      }
    </div>);

}