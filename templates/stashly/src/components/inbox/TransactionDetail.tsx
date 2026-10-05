import React from 'react';
import { Link } from 'react-router-dom';
import { addDays, format, parseISO } from 'date-fns';
import { ChevronLeftIcon } from 'lucide-react';
import { Button } from '../Button';
import { useToast } from '../ToastProvider';
import { StatusPill } from '../StatusPill';
import { ChatThread } from './ChatThread';
import { TransactionSidebar } from './TransactionSidebar';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import type { Transaction, TransactionStatus } from '../../types/marketplace';
import { formatMoney } from '../../utils/pricing';
import { ui } from '../../utils/styles';

interface Action {
  label: string;
  next: TransactionStatus;
  note: string;
  primary?: boolean;
}

function actionsFor(tx: Transaction): Action[] {
  const host = tx.role === 'hosting';
  switch (tx.status) {
    case 'requested':
      return host ?
      [
      { label: 'Accept request', next: 'accepted', note: 'You accepted the request', primary: true },
      { label: 'Decline', next: 'declined', note: 'You declined the request' }] :

      [{ label: 'Withdraw request', next: 'declined', note: 'You withdrew the request' }];
    case 'accepted':
      return [{ label: host ? 'Mark as moved in' : 'Confirm move-in', next: 'active', note: 'Move-in confirmed', primary: true }];
    case 'active':
      return [{ label: host ? 'Request move-out' : 'Give 7-day notice', next: 'ending', note: `Move-out scheduled for ${format(addDays(new Date(), 7), 'MMM d, yyyy')}` }];
    case 'ending':
      return [{ label: 'Confirm move-out', next: 'completed', note: 'Booking completed · deposit refund started', primary: true }];
    default:
      return [];
  }
}

export function TransactionDetail({ tx }: {tx: Transaction;}) {
  const { getListing, setStatus, sendMessage } = useMarketplace();
  const { addToast } = useToast();
  const listing = getListing(tx.listingId);
  const actions = actionsFor(tx);

  const run = (a: Action) => {
    setStatus(tx.id, a.next, a.note);
    addToast({ type: 'success', message: a.note });
  };

  return (
    <div className="flex h-full flex-col gap-5 p-4 sm:p-6">
      <Link to={`/inbox/${tx.role}`} className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-brand-700 lg:hidden">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> All conversations
      </Link>
      <header className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center">
        {listing && <img src={listing.images[0]} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" />}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-semibold text-stone-900">
              {tx.role === 'hosting' ? `${tx.counterpartName} is storing` : `Storing with ${tx.counterpartName}`}
            </h2>
            <StatusPill status={tx.status} />
          </div>
          {listing &&
          <Link to={`/l/${listing.id}`} className="text-sm text-stone-600 hover:text-brand-700">{listing.title}</Link>
          }
          <p className="mt-1 text-sm text-stone-600">
            {format(parseISO(tx.moveIn), 'MMM d, yyyy')} → {tx.moveOut ? format(parseISO(tx.moveOut), 'MMM d, yyyy') : 'Ongoing'} ·{' '}
            <span className="font-semibold text-stone-900">{formatMoney(tx.monthlyPrice)}/mo</span>
          </p>
        </div>
        {actions.length > 0 &&
        <div className="flex shrink-0 flex-wrap gap-2">
            {actions.map((a) =>
          <Button key={a.label} variant={a.primary ? 'primary' : 'secondary'} className={a.primary ? ui.btnBrand : ui.btnOutline} onClick={() => run(a)}>
                {a.label}
              </Button>
          )}
          </div>
        }
      </header>
      <div className="grid flex-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <ChatThread messages={tx.messages} counterpart={tx.counterpartName} onSend={(t) => sendMessage(tx.id, t)} />
        <TransactionSidebar tx={tx} listing={listing} />
      </div>
    </div>);

}