import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CameraIcon, MessageCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { BookingSummary } from '../components/checkout/BookingSummary';
import { ChatPanel } from '../components/inbox/ChatPanel';
import { PhotoFeed } from '../components/inbox/PhotoFeed';
import { StatusTimeline } from '../components/inbox/StatusTimeline';
import { TransactionActions } from '../components/inbox/TransactionActions';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useBookings } from '../contexts/BookingsContext';
import { listings } from '../data/listings';
import { cn } from '../utils/cn';
import { getService } from '../utils/pricing';
import { transactionBreakdown, transactionDateText, transactionTitle } from '../utils/transaction';
import { NotFound } from './NotFound';

export function TransactionDetail() {
  const { id } = useParams();
  const { transactions, sendMessage, addPhotoUpdate, markRead } = useBookings();
  const tx = transactions.find((t) => t.id === id);
  const [tab, setTab] = useState<'chat' | 'photos'>(() => tx && tx.photoUpdates.length > 0 && tx.status === 'in-care' ? 'photos' : 'chat');

  useEffect(() => {
    if (tx?.unread) markRead(tx.id);
  }, [tx, markRead]);

  if (!tx) return <NotFound />;

  const listing = listings.find((l) => l.id === tx.listingId);
  const service = getService(tx.serviceId);
  const isProvider = tx.role === 'provider';
  const first = tx.counterpartName.split(' ')[0];

  const tabBtn = (active: boolean) =>
  cn(
    'flex items-center gap-2 border-b-[3px] px-4 pb-3 pt-4 text-[15px] font-extrabold transition-colors',
    active ? 'border-primary-500 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-800'
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to={isProvider ? '/inbox?tab=sitting' : '/inbox'} className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 hover:text-stone-900">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to inbox
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">{transactionTitle(tx)}</h1>
        <StatusBadge status={tx.status} />
      </div>
      <p className="mt-1 text-[15px] text-stone-600">
        {isProvider ? `Requested by ${tx.counterpartName}` : `With ${tx.counterpartName}`} · Booking #{tx.id.replace('tx-', '')}
      </p>

      <div className="mt-6 rounded-3xl bg-white px-5 py-5 shadow-card ring-1 ring-stone-100 sm:px-8">
        <StatusTimeline status={tx.status} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-stone-100" aria-label="Conversation">
          <div className="flex border-b border-stone-100 px-2" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'chat'} className={tabBtn(tab === 'chat')} onClick={() => setTab('chat')}>
              <MessageCircleIcon className="h-4 w-4" aria-hidden="true" /> Messages
            </button>
            <button type="button" role="tab" aria-selected={tab === 'photos'} className={tabBtn(tab === 'photos')} onClick={() => setTab('photos')}>
              <CameraIcon className="h-4 w-4" aria-hidden="true" /> Photo updates
              <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs text-accent-800">{tx.photoUpdates.length}</span>
            </button>
          </div>
          {tab === 'chat' ?
          <ChatPanel
            messages={tx.messages}
            counterpartName={tx.counterpartName}
            counterpartAvatar={tx.counterpartAvatar}
            onSend={(text) => sendMessage(tx.id, text)}
            disabled={tx.status === 'cancelled'} /> :


          <PhotoFeed
            updates={tx.photoUpdates}
            canPost={isProvider && tx.status === 'in-care'}
            onPost={(caption) => {
              addPhotoUpdate(tx.id, caption);
              toast.success(`Photo update sent to ${first}`);
            }}
            emptyText={
            isProvider ?
            tx.status === 'in-care' ?
            'Share the first photo so the owner knows everything is going great.' :
            'You can post photo updates once care has started.' :
            `${first} will share photos here once care begins.`
            } />

          }
        </section>

        <aside className="space-y-4">
          <TransactionActions tx={tx} />
          <BookingSummary
            photo={isProvider ? undefined : listing?.photos[0]}
            title={tx.listingTitle}
            subtitle={isProvider ? `Owner: ${tx.counterpartName}` : `Sitter: ${tx.counterpartName}`}
            serviceId={tx.serviceId}
            serviceLabel={service.label}
            variationLabel={tx.variationLabel}
            dateText={transactionDateText(tx)}
            petsText={tx.petNames.join(', ')}
            breakdown={transactionBreakdown(tx)}
            view={isProvider ? 'provider' : 'customer'} />
          
          {listing &&
          <Link to={`/l/${listing.id}`} className="block text-center text-sm font-bold text-primary-700 hover:underline">
              View {first}’s listing
            </Link>
          }
        </aside>
      </div>
    </div>);

}