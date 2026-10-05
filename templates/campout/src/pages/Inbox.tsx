import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { MessagesSquareIcon } from 'lucide-react';
import { ConversationList } from '../components/inbox/ConversationList';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { useInbox } from '../contexts/InboxContext';

type Tab = 'trips' | 'hosting';

export function Inbox() {
  const { txId } = useParams();
  const [params, setParams] = useSearchParams();
  const { transactions } = useInbox();
  const active = transactions.find((t) => t.id === txId);
  const tab: Tab = params.get('tab') === 'hosting' || active?.role === 'hosting' ? 'hosting' : 'trips';
  const items = transactions.
  filter((t) => tab === 'trips' ? t.role === 'trip' : t.role === 'hosting').
  sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const counts = {
    trips: transactions.filter((t) => t.role === 'trip').length,
    hosting: transactions.filter((t) => t.role === 'hosting' && t.status === 'requested').length
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] lg:grid-cols-[380px_1fr]">
      <section className={`flex min-h-0 flex-col border-r border-sand-200 bg-white ${active ? 'hidden lg:flex' : 'flex'}`} aria-label="Conversations">
        <div className="border-b border-sand-200 px-4 pb-0 pt-5">
          <h1 className="text-2xl font-bold text-ink-900">Inbox</h1>
          <div role="tablist" aria-label="Inbox type" className="mt-4 flex gap-6">
            {(['trips', 'hosting'] as Tab[]).map((t) =>
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setParams({ tab: t })}
              className={`-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
              tab === t ? 'border-primary-700 text-primary-800' : 'border-transparent text-ink-500 hover:text-ink-900'}`
              }>
              
                {t === 'trips' ? 'Trips' : 'Hosting'}
                {counts[t] > 0 &&
              <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${t === 'hosting' ? 'bg-accent-600 text-white' : 'bg-sand-200 text-ink-700'}`}>
                    {counts[t]}
                  </span>
              }
              </button>
            )}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto" role="tabpanel">
          <ConversationList items={items} activeId={active?.id} tab={tab} />
        </div>
      </section>

      <section className={`min-h-0 ${active ? 'block' : 'hidden lg:block'}`} aria-label="Conversation">
        {active ?
        <TransactionDetail tx={active} tab={tab} /> :

        <div className="flex h-full flex-col items-center justify-center bg-sand-50 px-6 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary-50 text-primary-700">
              <MessagesSquareIcon size={26} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl font-bold text-ink-900">Select a conversation</h2>
            <p className="mt-1 max-w-sm text-sm text-ink-500">Chat with hosts and campers, track booking status and find arrival instructions.</p>
            {items[0] &&
          <Link to={`/inbox/${items[0].id}?tab=${tab}`} className="btn-outline mt-5">
                Open latest
              </Link>
          }
          </div>
        }
      </section>
    </div>);

}