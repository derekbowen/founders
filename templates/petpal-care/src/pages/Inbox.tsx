import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { InboxIcon, MessagesSquareIcon } from 'lucide-react';
import { TransactionList } from '../components/inbox/TransactionList';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { EmptyState } from '../components/common/EmptyState';
import { statusConfig } from '../components/common/StatusBadge';
import { useInbox } from '../hooks/useInbox';
import type { TransactionStatus } from '../types/transaction';

const tabs = [
{ id: 'orders', label: 'My pets’ stays', role: 'customer' },
{ id: 'sales', label: 'Sitting', role: 'provider' }] as
const;

const statusFilters: (TransactionStatus | 'all')[] = ['all', 'requested', 'confirmed', 'in-care', 'completed', 'cancelled'];

export function Inbox() {
  const { tab = 'orders', txId } = useParams();
  const { items, setStatus, sendMessage, addPhotoUpdate } = useInbox();
  const [filter, setFilter] = useState<TransactionStatus | 'all'>('all');

  const current = tabs.find((t) => t.id === tab);
  if (!current) return <Navigate to="/inbox/orders" replace />;

  const tabItems = items.filter((t) => t.role === current.role);
  const visible = filter === 'all' ? tabItems : tabItems.filter((t) => t.status === filter);
  const active = items.find((t) => t.id === txId && t.role === current.role);

  return (
    <div className="flex bg-white lg:h-[calc(100vh-72px)]">
      {/* List */}
      <section aria-label="Conversations" className={`flex w-full flex-col border-r border-ink-200 lg:w-[380px] lg:shrink-0 ${active ? 'hidden lg:flex' : 'flex'}`}>
        <div className="border-b border-ink-200 px-4 pb-3 pt-5">
          <h1 className="text-2xl font-black text-ink-900">Inbox</h1>
          <nav aria-label="Inbox type" className="mt-4 grid grid-cols-2 rounded-full bg-ink-100 p-1">
            {tabs.map((t) => {
              const count = items.filter((i) => i.role === t.role && i.status === 'requested').length;
              return (
                <Link
                  key={t.id}
                  to={`/inbox/${t.id}`}
                  onClick={() => setFilter('all')}
                  aria-current={t.id === tab ? 'page' : undefined}
                  className={`flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-bold transition ${t.id === tab ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'}`}>
                  
                  {t.label}
                  {count > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1.5 text-[11px] font-black text-ink-900">{count}</span>}
                </Link>);

            })}
          </nav>
          <div className="no-scrollbar -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4" role="radiogroup" aria-label="Filter by status">
            {statusFilters.map((s) =>
            <button key={s} type="button" role="radio" aria-checked={filter === s} onClick={() => setFilter(s)} className={`chip shrink-0 px-3 py-1 text-xs ${filter === s ? 'chip-active' : ''}`}>
                {s === 'all' ? 'All' : statusConfig[s].label}
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {visible.length ?
          <TransactionList items={visible} tab={tab} activeId={active?.id} /> :

          <div className="p-4">
              <EmptyState
              icon={<InboxIcon className="h-7 w-7" aria-hidden="true" />}
              title="Nothing here yet"
              description={current.role === 'customer' ? 'When you book a sitter, your requests and stays show up here.' : 'Booking requests from pet owners will appear here.'}
              action={
              current.role === 'customer' ?
              <Link to="/search" className="btn btn-md btn-primary">
                      Find a sitter
                    </Link> :
              undefined
              } />
            
            </div>
          }
        </div>
      </section>

      {/* Detail */}
      <section aria-label="Conversation detail" className={`min-w-0 flex-1 overflow-y-auto bg-ink-50 ${active ? 'block' : 'hidden lg:block'}`}>
        {active ?
        <TransactionDetail
          key={active.id}
          tx={active}
          backTo={`/inbox/${tab}`}
          onStatus={(s) => setStatus(active.id, s)}
          onSend={(t) => sendMessage(active.id, t)}
          onPhoto={(c) => addPhotoUpdate(active.id, c)} /> :


        <div className="flex h-full items-center justify-center p-8">
            <div className="max-w-sm">
              <EmptyState icon={<MessagesSquareIcon className="h-7 w-7" aria-hidden="true" />} title="Select a conversation" description="Choose a booking on the left to see messages, photo updates and booking details." />
            </div>
          </div>
        }
      </section>
    </div>);

}