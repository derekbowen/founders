import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InboxIcon, MessagesSquareIcon } from 'lucide-react';
import { statusMeta } from '../components/inbox/StatusBadge';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { TransactionList } from '../components/inbox/TransactionList';
import { EmptyState } from '../components/ui/EmptyState';
import { useInbox } from '../hooks/useInbox';
import type { BookingStatus } from '../types/marketplace';
import { cn, focusRing } from '../utils/styles';

type Role = 'customer' | 'provider';
const statuses: (BookingStatus | 'all')[] = ['all', 'requested', 'approved', 'in-session', 'completed', 'cancelled'];

export function InboxPage() {
  const { txId } = useParams();
  const { items, sendMessage, transition, toggleChecklist } = useInbox();
  const selected = items.find((t) => t.id === txId);
  const [role, setRole] = useState<Role>(selected?.role ?? 'customer');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');

  useEffect(() => {
    if (selected && selected.role !== role) setRole(selected.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  const roleItems = items.filter((t) => t.role === role);
  const list = roleItems.
  filter((t) => statusFilter === 'all' || t.status === statusFilter).
  sort((a, b) => b.date.localeCompare(a.date));

  const tabs: {key: Role;label: string;}[] = [
  { key: 'customer', label: 'Bookings' },
  { key: 'provider', label: 'Hosting' }];


  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <div className={cn('flex w-full flex-col border-r border-steel-200 lg:w-[380px] lg:shrink-0', selected && 'hidden lg:flex')}>
        <div className="border-b border-steel-200 px-4 pt-5">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-wide text-steel-900">Inbox</h1>
          <div role="tablist" aria-label="Inbox type" className="mt-4 flex gap-6">
            {tabs.map((tab) => {
              const count = items.filter((t) => t.role === tab.key && t.status === 'requested').length;
              const active = role === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => {
                    setRole(tab.key);
                    setStatusFilter('all');
                  }}
                  className={cn(
                    '-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors',
                    focusRing,
                    active ? 'border-primary text-steel-900' : 'border-transparent text-steel-500 hover:text-steel-800'
                  )}>
                  
                  {tab.label}
                  {count > 0 && <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-primary px-1.5 text-[11px] text-white">{count}</span>}
                </button>);

            })}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto border-b border-steel-200 px-4 py-3" aria-label="Filter by status">
          {statuses.map((s) => {
            const active = statusFilter === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                  focusRing,
                  active ? 'border-steel-900 bg-steel-900 text-white' : 'border-steel-300 text-steel-700 hover:border-steel-500'
                )}>
                
                {s === 'all' ? 'All' : statusMeta[s].label}
              </button>);

          })}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto" role="tabpanel">
          {list.length === 0 ?
          <div className="p-4">
              <EmptyState
              icon={<InboxIcon className="h-5 w-5" aria-hidden="true" />}
              title={statusFilter === 'all' ? 'No conversations yet' : `No ${statusMeta[statusFilter].label.toLowerCase()} bookings`}
              body={role === 'customer' ? 'Book a kitchen and your requests will appear here.' : 'Requests from renters will show up here.'} />
            
            </div> :

          <TransactionList items={list} />
          }
        </div>
      </div>

      <section className={cn('min-w-0 flex-1', !selected && 'hidden lg:block')} aria-label="Conversation">
        {selected ?
        <TransactionDetail
          key={selected.id}
          tx={selected}
          onSend={(text) => sendMessage(selected.id, text)}
          onTransition={(status, label) => transition(selected.id, status, label)}
          onToggleChecklist={(itemId) => toggleChecklist(selected.id, itemId)} /> :


        <div className="grid h-full place-items-center p-8">
            <EmptyState
            icon={<MessagesSquareIcon className="h-5 w-5" aria-hidden="true" />}
            title="Select a conversation"
            body="Choose a booking to see messages, the timeline and the cleaning checklist."
            className="max-w-md" />
          
          </div>
        }
      </section>
    </div>);

}