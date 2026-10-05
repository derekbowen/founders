import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, HomeIcon, NotebookPenIcon, StarIcon, UsersIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { useToast } from '../components/ToastProvider';
import { StatusPill } from '../components/inbox/StatusPill';
import { ChatThread } from '../components/inbox/ChatThread';
import { BookingTimeline } from '../components/inbox/BookingTimeline';
import { EmergencyContactCard } from '../components/inbox/EmergencyContactCard';
import { BrandButton } from '../components/ui/BrandButton';
import { TextAreaField } from '../components/ui/TextAreaField';
import { useSession } from '../contexts/SessionContext';
import { actionsFor, useTransactionState } from '../hooks/useTransactionState';
import { transactions } from '../data/transactions';
import { careTypes } from '../data/careTypes';
import { demoUser } from '../data/currentUser';
import { formatCurrency, formatDate, formatTime } from '../utils/format';
import { NotFound } from './NotFound';

export function TransactionDetail() {
  const { id } = useParams();
  const tx = transactions.find((t) => t.id === id);
  const state = useTransactionState(tx);
  const { user } = useSession();
  const { addToast } = useToast();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSent, setReviewSent] = useState(false);

  if (!tx) return <NotFound />;
  const me = user ?? { ...demoUser };
  const isJob = tx.kind === 'job';
  const actions = actionsFor(tx, state.status);
  const care = careTypes.find((c) => c.id === tx.careType)?.title;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to={isJob ? '/inbox?tab=jobs' : '/inbox'} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-primary-700">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Back to inbox
      </Link>

      <header className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={tx.counterpartName} alt="" src={tx.counterpartPhoto} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-bold text-ink-900 sm:text-3xl">{tx.counterpartName}</h1>
              <StatusPill status={state.status} />
            </div>
            <p className="mt-1 text-sm text-ink-600">
              {care} · {isJob ? 'Sitting job' : 'Your booking'} #{tx.id.toUpperCase()}
              {!isJob &&
              <>
                  {' · '}
                  <Link to={`/l/${tx.sitterId}`} className="font-semibold text-primary-700 hover:underline">View listing</Link>
                </>
              }
            </p>
          </div>
        </div>
        {actions.length > 0 &&
        <div className="flex flex-wrap gap-2">
            {actions.map((a) =>
          <BrandButton
            key={a.label}
            tone={a.tone}
            onClick={() => {
              state.runAction(a);
              addToast({ type: a.next === 'Cancelled' ? 'warning' : 'success', message: `${a.event}.` });
            }}>
            
                {a.label}
              </BrandButton>
          )}
          </div>
        }
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {state.status === 'Completed' && !isJob &&
          <section aria-labelledby="review-heading" className="rounded-3xl border border-primary-200 bg-primary-50 p-6">
              {reviewSent ?
            <p className="font-semibold text-primary-900">Thanks for your review! It helps other families find great sitters. 💜</p> :

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!rating) return;
                setReviewSent(true);
                addToast({ type: 'success', message: 'Review published' });
              }}>
              
                  <h2 id="review-heading" className="font-heading text-xl font-bold text-ink-900">How was your sit with {tx.counterpartName.split(' ')[0]}?</h2>
                  <div className="mt-3 flex gap-1" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((n) =>
                <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} stars`} onClick={() => setRating(n)} className="rounded-md p-0.5 hover:scale-110">
                        <StarIcon className={`h-7 w-7 ${n <= rating ? 'fill-accent-500 text-accent-500' : 'text-ink-300'}`} aria-hidden />
                      </button>
                )}
                  </div>
                  <TextAreaField className="mt-4" label="Your review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} maxLength={500} placeholder="What did your kids love? Would you book again?" />
                  <BrandButton type="submit" className="mt-4" disabled={!rating}>Publish review</BrandButton>
                </form>
            }
            </section>
          }
          <ChatThread
            messages={state.messages}
            counterpartName={tx.counterpartName}
            counterpartPhoto={tx.counterpartPhoto}
            myName={`${me.firstName} ${me.lastName}`}
            myPhoto={me.photo}
            onSend={state.send}
            isTyping={state.isTyping}
            disabled={state.status === 'Cancelled'} />
          
        </div>

        <aside className="space-y-6">
          <section aria-labelledby="details-heading" className="rounded-3xl border border-ink-200 bg-white p-5">
            <h2 id="details-heading" className="font-heading text-lg font-bold text-ink-900">Booking details</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-700">
              <li className="flex gap-2.5"><CalendarIcon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />{formatDate(tx.date, 'EEEE, MMMM d')}</li>
              <li className="flex gap-2.5"><ClockIcon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />{formatTime(tx.start)} – {formatTime(tx.end)}</li>
              <li className="flex gap-2.5"><UsersIcon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />{tx.children.map((c) => `${c.name} (${c.age})`).join(', ')}</li>
              <li className="flex gap-2.5"><HomeIcon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />{state.status === 'Requested' && isJob ? 'Address shared after you accept' : tx.address}</li>
              {tx.notes && <li className="flex gap-2.5"><NotebookPenIcon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden /><span>{tx.notes}</span></li>}
            </ul>
            <div className="mt-4 flex justify-between border-t border-ink-200 pt-4 font-semibold text-ink-900">
              <span>{isJob ? 'Your earnings' : 'Total paid'}</span>
              <span>{formatCurrency(tx.total)}</span>
            </div>
          </section>

          <section aria-labelledby="timeline-heading" className="rounded-3xl border border-ink-200 bg-white p-5">
            <h2 id="timeline-heading" className="mb-4 font-heading text-lg font-bold text-ink-900">Timeline</h2>
            <BookingTimeline events={state.timeline} />
          </section>

          <EmergencyContactCard contact={tx.emergencyContact} />
        </aside>
      </div>
    </div>);

}