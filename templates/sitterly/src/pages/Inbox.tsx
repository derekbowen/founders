import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { InboxIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { StatusPill } from '../components/inbox/StatusPill';
import { buttonLinkClass } from '../components/ui/BrandButton';
import { transactions } from '../data/transactions';
import { careTypes } from '../data/careTypes';
import { TxStatus } from '../types/transaction';
import { formatCurrency, formatDate, formatTime } from '../utils/format';

const statusFilters: ('All' | TxStatus)[] = ['All', 'Requested', 'Confirmed', 'In progress', 'Completed', 'Cancelled'];

export function Inbox() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'jobs' ? 'jobs' : 'bookings';
  const [status, setStatus] = useState<'All' | TxStatus>('All');

  const kind = tab === 'jobs' ? 'job' : 'booking';
  const ofKind = transactions.filter((t) => t.kind === kind);
  const list = ofKind.filter((t) => status === 'All' || t.status === status).sort((a, b) => b.lastActivity.localeCompare(a.lastActivity));

  const tabs = [
  { id: 'bookings', label: 'Bookings', count: transactions.filter((t) => t.kind === 'booking').length },
  { id: 'jobs', label: 'Sitting jobs', count: transactions.filter((t) => t.kind === 'job').length }];


  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">Inbox</h1>

      <div role="tablist" aria-label="Inbox type" className="mt-6 flex gap-6 border-b border-ink-200">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => {setParams(t.id === 'jobs' ? { tab: 'jobs' } : {});setStatus('All');}}
              className={`-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${active ? 'border-primary-600 text-primary-700' : 'border-transparent text-ink-600 hover:text-ink-900'}`}>
              
              {t.label}
              <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-primary-100 text-primary-800' : 'bg-ink-100 text-ink-700'}`}>{t.count}</span>
            </button>);

        })}
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1" aria-label="Filter by status">
        {statusFilters.map((s) =>
        <button
          key={s}
          type="button"
          aria-pressed={status === s}
          onClick={() => setStatus(s)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition ${status === s ? 'bg-ink-900 text-white ring-ink-900' : 'bg-white text-ink-700 ring-ink-200 hover:ring-ink-400'}`}>
          
            {s}
          </button>
        )}
      </div>

      <div role="tabpanel" className="mt-6">
        {list.length === 0 ?
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <InboxIcon className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-4 font-heading text-xl font-bold text-ink-900">
              {status === 'All' ? `No ${tab === 'jobs' ? 'sitting jobs' : 'bookings'} yet` : `No ${status.toLowerCase()} ${tab === 'jobs' ? 'jobs' : 'bookings'}`}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-ink-600">
              {tab === 'jobs' ? 'When families request you, their jobs will show up here.' : 'Find a sitter you love and send your first request.'}
            </p>
            <Link to={tab === 'jobs' ? '/listings/new' : '/s'} className={buttonLinkClass('primary', 'md', 'mt-6')}>
              {tab === 'jobs' ? 'Improve your listing' : 'Find a sitter'}
            </Link>
          </div> :

        <ul className="divide-y divide-ink-200 overflow-hidden rounded-3xl border border-ink-200 bg-white">
            {list.map((t) => {
            const last = t.messages[t.messages.length - 1];
            const unread = last?.from === 'them' && (t.status === 'Requested' || t.status === 'In progress');
            return (
              <li key={t.id}>
                  <Link to={`/inbox/${t.id}`} className="flex items-start gap-4 p-4 transition hover:bg-ink-50 focus-visible:bg-primary-50 focus-visible:outline-none sm:p-5">
                    <div className="relative">
                      <Avatar name={t.counterpartName} alt="" src={t.counterpartPhoto} size="md" />
                      {unread && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-accent-500 ring-2 ring-white" aria-label="Unread" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className={`text-ink-900 ${unread ? 'font-bold' : 'font-semibold'}`}>{t.counterpartName}</p>
                        <StatusPill status={t.status} />
                      </div>
                      <p className="mt-0.5 text-sm text-ink-600">
                        {careTypes.find((c) => c.id === t.careType)?.title} · {formatDate(t.date)} · {formatTime(t.start)}–{formatTime(t.end)} · {t.children.length} {t.children.length === 1 ? 'child' : 'kids'}
                      </p>
                      {last && <p className={`mt-1.5 truncate text-sm ${unread ? 'text-ink-900' : 'text-ink-600'}`}>{last.from === 'me' ? 'You: ' : ''}{last.text}</p>}
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="font-semibold text-ink-900">{formatCurrency(t.total)}</p>
                      <p className="text-xs text-ink-500">{tab === 'jobs' ? 'earnings' : 'total'}</p>
                    </div>
                  </Link>
                </li>);

          })}
          </ul>
        }
      </div>
    </div>);

}