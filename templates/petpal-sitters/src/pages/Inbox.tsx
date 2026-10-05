import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CameraIcon, ChevronRightIcon, InboxIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { ServiceIcon } from '../components/ui/ServiceIcon';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useBookings } from '../contexts/BookingsContext';
import { statusMeta } from '../data/statuses';
import type { TransactionRole, TransactionStatus } from '../types/marketplace';
import { cn } from '../utils/cn';
import { transactionDateText, transactionTitle } from '../utils/transaction';

const tabs: {id: TransactionRole;label: string;}[] = [
{ id: 'customer', label: 'My pets’ stays' },
{ id: 'provider', label: 'Sitting' }];


const statusFilters: (TransactionStatus | 'all')[] = ['all', 'requested', 'confirmed', 'in-care', 'completed', 'cancelled'];

export function Inbox() {
  const { transactions } = useBookings();
  const [params, setParams] = useSearchParams();
  const role: TransactionRole = params.get('tab') === 'sitting' ? 'provider' : 'customer';
  const status = params.get('status') as TransactionStatus | null ?? 'all';

  const forRole = transactions.filter((t) => t.role === role);
  const visible = status === 'all' ? forRole : forRole.filter((t) => t.status === status);

  const setTab = (r: TransactionRole) => setParams(r === 'provider' ? { tab: 'sitting' } : {});
  const setStatus = (s: TransactionStatus | 'all') => {
    const next = new URLSearchParams(params);
    if (s === 'all') next.delete('status');else
    next.set('status', s);
    setParams(next);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Inbox</h1>

      <div className="mt-6 flex gap-1 border-b border-stone-200" role="tablist" aria-label="Inbox type">
        {tabs.map((tab) => {
          const count = transactions.filter((t) => t.role === tab.id).length;
          const unread = transactions.filter((t) => t.role === tab.id && t.unread).length;
          const active = tab.id === role;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(tab.id)}
              className={cn(
                '-mb-px flex items-center gap-2 border-b-[3px] px-4 pb-3 pt-2 text-[15px] font-extrabold transition-colors',
                active ? 'border-primary-500 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-800'
              )}>
              
              {tab.label}
              <span className={cn('rounded-full px-2 py-0.5 text-xs', active ? 'bg-primary-100 text-primary-800' : 'bg-stone-100 text-stone-600')}>{count}</span>
              {unread > 0 && <span className="h-2 w-2 rounded-full bg-primary-500" aria-label={`${unread} unread`} />}
            </button>);

        })}
      </div>

      <div className="scrollbar-none -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" aria-label="Filter by status">
        {statusFilters.map((s) => {
          const active = s === status;
          const count = s === 'all' ? forRole.length : forRole.filter((t) => t.status === s).length;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={active}
              className={cn(
                'flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-bold transition-colors',
                active ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
              )}>
              
              {s === 'all' ? 'All' : statusMeta[s].label}
              <span className={cn('text-xs', active ? 'text-stone-300' : 'text-stone-400')}>{count}</span>
            </button>);

        })}
      </div>

      {visible.length === 0 ?
      <EmptyState
        className="mt-8"
        icon={<InboxIcon className="h-7 w-7" />}
        title={status === 'all' ? role === 'customer' ? 'No bookings yet' : 'No sitting requests yet' : `No ${statusMeta[status as TransactionStatus].label.toLowerCase()} bookings`}
        text={
        role === 'customer' ?
        'When you request a sitter, your conversation and booking details will show up here.' :
        'Publish your listing to start receiving requests from local pet parents.'
        }
        action={role === 'customer' ? <ButtonLink to="/s">Find a sitter</ButtonLink> : <ButtonLink to="/listings/new">Create a listing</ButtonLink>} /> :


      <ul className="mt-6 divide-y divide-stone-100 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-stone-100">
          {visible.map((tx) => {
          const last = [...tx.messages].reverse().find((m) => m.from !== 'system') ?? tx.messages[tx.messages.length - 1];
          return (
            <li key={tx.id}>
                <Link to={`/order/${tx.id}`} className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-primary-50/60 sm:px-6">
                  <div className="relative shrink-0">
                    <Avatar name={tx.counterpartName} alt={tx.counterpartName} src={tx.counterpartAvatar} size="lg" />
                    {tx.petPhoto && <img src={tx.petPhoto} alt="" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-2 border-white object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className={cn('text-[15px] text-stone-900', tx.unread ? 'font-black' : 'font-extrabold')}>{tx.counterpartName}</p>
                      <StatusBadge status={tx.status} />
                      {tx.photoUpdates.length > 0 &&
                    <span className="flex items-center gap-1 text-xs font-bold text-accent-700">
                          <CameraIcon className="h-3.5 w-3.5" aria-hidden="true" /> {tx.photoUpdates.length}
                        </span>
                    }
                    </div>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-stone-600">
                      <ServiceIcon id={tx.serviceId} className="h-3.5 w-3.5 text-stone-400" />
                      {transactionTitle(tx)} · {transactionDateText(tx)}
                    </p>
                    <p className={cn('mt-1 truncate text-sm', tx.unread ? 'font-bold text-stone-800' : 'text-stone-500')}>
                      {last.from === 'me' ? 'You: ' : ''}
                      {last.text}
                    </p>
                  </div>
                  <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
                    <span className="text-xs font-semibold text-stone-400">{last.time}</span>
                    {tx.unread && <span className="h-2.5 w-2.5 rounded-full bg-primary-500" aria-label="Unread" />}
                  </div>
                  <ChevronRightIcon className="h-5 w-5 shrink-0 text-stone-300 transition-colors group-hover:text-stone-500" aria-hidden="true" />
                </Link>
              </li>);

        })}
        </ul>
      }
    </div>);

}