import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CompassIcon, InboxIcon, MessagesSquareIcon, PlusCircleIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { TransactionList } from '../components/inbox/TransactionList';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useTransactions } from '../contexts/TransactionsContext';

const tabs = [
{ id: 'trips', label: 'Trips', role: 'trip' as const },
{ id: 'hosting', label: 'Hosting', role: 'hosting' as const }];


export function Inbox() {
  const { tab = 'trips', txId } = useParams();
  const { transactions } = useTransactions();
  const current = tabs.find((t) => t.id === tab);
  if (!current) return <Navigate to="/inbox/trips" replace />;

  const items = transactions.filter((t) => t.role === current.role);
  const selected = items.find((t) => t.id === txId);

  return (
    <div className="mx-auto flex h-[calc(100vh-72px)] max-w-page border-x border-slate-200 bg-white">
      <aside className={twMerge('flex w-full flex-col border-r border-slate-200 lg:w-[380px]', selected && 'hidden lg:flex')}>
        <div className="px-4 pb-2 pt-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inbox</h1>
        </div>
        <div className="flex gap-1 border-b border-slate-200 px-4" role="tablist" aria-label="Inbox type">
          {tabs.map((t) => {
            const count = transactions.filter((x) => x.role === t.role && (x.status === 'booked' || x.status === 'confirmed')).length;
            const active = t.id === current.id;
            return (
              <Link
                key={t.id}
                to={`/inbox/${t.id}`}
                role="tab"
                aria-selected={active}
                className={twMerge(
                  '-mb-px flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition-colors',
                  active ? 'border-primary-600 text-slate-900' : 'border-transparent text-slate-600 hover:text-slate-900'
                )}>
                
                {t.label}
                {count > 0 && <span className="rounded-full bg-primary-600 px-1.5 text-[11px] font-bold leading-5 text-white">{count}</span>}
              </Link>);

          })}
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ?
          <div className="p-4">
              <EmptyState
              icon={InboxIcon}
              title={current.id === 'trips' ? 'No trips yet' : 'No guest bookings yet'}
              description={current.id === 'trips' ? 'When you book an experience, it will show up here.' : 'Publish an experience to start receiving bookings.'}
              action={
              current.id === 'trips' ?
              <Button to="/s" leftIcon={<CompassIcon className="h-4 w-4" />}>Explore experiences</Button> :
              <Button to="/host/new/details" leftIcon={<PlusCircleIcon className="h-4 w-4" />}>Create listing</Button>
              } />
            
            </div> :

          <TransactionList items={items} activeId={selected?.id} tab={current.id} />
          }
        </div>
      </aside>
      <section className={twMerge('min-w-0 flex-1', !selected && 'hidden lg:block')} aria-label="Conversation">
        {selected ?
        <TransactionDetail tx={selected} backTo={`/inbox/${current.id}`} /> :

        <div className="flex h-full items-center justify-center bg-sand-50 p-8">
            <div className="text-center">
              <MessagesSquareIcon className="mx-auto h-10 w-10 text-slate-300" aria-hidden />
              <p className="mt-3 text-sm font-medium text-slate-700">Select a booking to see messages and details</p>
            </div>
          </div>
        }
      </section>
    </div>);

}