import React, { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2Icon, ClockIcon, CreditCardIcon, HourglassIcon, StarIcon, WrenchIcon, XCircleIcon } from 'lucide-react';
import { ReviewForm } from './ReviewForm';
import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';
import { useApp } from '../../hooks/useApp';
import type { Transaction } from '../../types/marketplace';
import { formatDate, formatMoney } from '../../utils/format';
import { cn } from '../../utils/styles';
import {
  customerTotal,
  getActiveOffer,
  getAgreedOffer,
  isNegotiating,
  proPayout,
  viewerRole,
  whoseTurn } from
'../../utils/transactions';

function Panel({
  tone = 'neutral',
  icon,
  title,
  children





}: {tone?: 'neutral' | 'action' | 'success' | 'muted';icon: React.ReactNode;title: string;children?: React.ReactNode;}) {
  const tones = {
    neutral: 'border-ink-200 bg-white',
    action: 'border-primary-300 bg-primary-50/60',
    success: 'border-emerald-200 bg-emerald-50/60',
    muted: 'border-ink-200 bg-ink-50'
  };
  return (
    <section aria-label="Next step" className={cn('rounded-2xl border p-5', tones[tone])}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-extrabold text-ink-900">{title}</h2>
          <div className="mt-1 text-sm text-ink-700">{children}</div>
        </div>
      </div>
    </section>);

}

export function ActionPanel({ tx }: {tx: Transaction;}) {
  const { user, getUser, markDone, confirmCompletion } = useApp();
  const [confirming, setConfirming] = useState(false);
  if (!user) return null;

  const role = viewerRole(tx, user.id);
  const other = getUser(role === 'customer' ? tx.proId : tx.customerId);
  const otherFirst = other?.name.split(' ')[0] ?? 'They';
  const agreed = getAgreedOffer(tx);
  const active = getActiveOffer(tx);

  if (isNegotiating(tx) && active) {
    const myTurn = whoseTurn(tx) === role;
    return myTurn ?
    <Panel tone="action" icon={<ClockIcon className="h-5 w-5 text-primary-700" />} title="Your move">
        <p>
          {otherFirst} {active.by === 'pro' ? 'offered' : 'countered with'} <strong>{formatMoney(active.amount)}</strong>.
          Accept, counter or decline.
        </p>
        <a href="#active-offer" className="mt-2 inline-block text-sm font-bold text-primary-700 underline-offset-2 hover:underline">
          Respond to offer →
        </a>
      </Panel> :

    <Panel icon={<HourglassIcon className="h-5 w-5 text-ink-500" />} title={`Waiting for ${otherFirst}`}>
        <p>
          Your {tx.offers.length > 1 ? 'counter-offer' : 'offer'} of <strong>{formatMoney(active.amount)}</strong> is awaiting a response.
        </p>
      </Panel>;

  }

  if (tx.status === 'accepted' && agreed) {
    return role === 'customer' ?
    <Panel tone="action" icon={<CreditCardIcon className="h-5 w-5 text-primary-700" />} title="Pay to confirm the booking">
        <p>Your payment is held until you confirm the job is done.</p>
        <ButtonLink to={`/checkout/${tx.id}`} className="mt-3" fullWidth>
          Pay {formatMoney(customerTotal(agreed.amount))}
        </ButtonLink>
      </Panel> :

    <Panel icon={<HourglassIcon className="h-5 w-5 text-ink-500" />} title={`Waiting for ${otherFirst} to pay`}>
        <p>Offer accepted at {formatMoney(agreed.amount)}. You’ll be notified once payment is secured.</p>
      </Panel>;

  }

  if (tx.status === 'paid' && agreed) {
    if (role === 'pro') {
      return tx.proMarkedDone ?
      <Panel icon={<HourglassIcon className="h-5 w-5 text-ink-500" />} title="Waiting for confirmation">
          <p>
            {otherFirst} will confirm completion. Your payout of <strong>{formatMoney(proPayout(agreed.amount))}</strong> is released right after.
          </p>
        </Panel> :

      <Panel tone="action" icon={<WrenchIcon className="h-5 w-5 text-primary-700" />} title={`Booked for ${formatDate(agreed.earliestDate, 'EEE, MMM d')}`}>
          <p>Payment is secured. Mark the job as done once you’ve finished the work.</p>
          <Button
          className="mt-3"
          fullWidth
          onClick={() => {
            markDone(tx.id);
            toast.success(`We’ve asked ${otherFirst} to confirm completion.`);
          }}>
          
            Mark job as done
          </Button>
        </Panel>;

    }
    return (
      <Panel
        tone={tx.proMarkedDone ? 'action' : 'neutral'}
        icon={<CheckCircle2Icon className={cn('h-5 w-5', tx.proMarkedDone ? 'text-primary-700' : 'text-ink-500')} />}
        title={tx.proMarkedDone ? `${otherFirst} marked the job as done` : `Booked for ${formatDate(agreed.earliestDate, 'EEE, MMM d')}`}>
        
        <p>
          {tx.proMarkedDone ?
          'Happy with the work? Confirm completion to release payment.' :
          `${formatMoney(customerTotal(agreed.amount))} is held securely until you confirm the job is complete.`}
        </p>
        {confirming ?
        <div className="mt-3 space-y-2">
            <p className="text-xs font-semibold text-ink-700">
              This releases {formatMoney(agreed.amount)} to {otherFirst}. Only confirm once the work is finished.
            </p>
            <div className="flex gap-2">
              <Button
              size="sm"
              onClick={() => {
                confirmCompletion(tx.id);
                toast.success('Job completed — payment released.');
              }}>
              
                Confirm & release
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
            </div>
          </div> :

        <Button
          className="mt-3"
          fullWidth
          variant={tx.proMarkedDone ? 'primary' : 'secondary'}
          onClick={() => setConfirming(true)}>
          
            Confirm job completed
          </Button>
        }
      </Panel>);

  }

  if (tx.status === 'completed' && agreed) {
    if (role === 'customer') {
      return tx.review ?
      <Panel tone="success" icon={<StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" />} title={`You rated ${otherFirst} ${tx.review.rating}/5`}>
          {tx.review.text && <p className="italic">“{tx.review.text}”</p>}
        </Panel> :

      <Panel tone="success" icon={<CheckCircle2Icon className="h-5 w-5 text-emerald-600" />} title="Job completed">
          <p className="mb-3">Payment has been released. Leave a review to help other customers.</p>
          <ReviewForm txId={tx.id} proName={otherFirst} />
        </Panel>;

    }
    return (
      <Panel tone="success" icon={<CheckCircle2Icon className="h-5 w-5 text-emerald-600" />} title="Job completed · payout sent">
        <p>
          {formatMoney(proPayout(agreed.amount))} is on its way to your bank
          {user.payout ? ` ••${user.payout.last4}` : ''}. It usually arrives in 1–2 business days.
        </p>
      </Panel>);

  }

  return (
    <Panel tone="muted" icon={<XCircleIcon className="h-5 w-5 text-ink-500" />} title="Offer declined">
      <p>This negotiation has ended.</p>
      {role === 'pro' ?
      <ButtonLink to="/search" variant="secondary" size="sm" className="mt-3">
          Find other jobs
        </ButtonLink> :

      <ButtonLink to="/inbox?tab=jobs" variant="secondary" size="sm" className="mt-3">
          See other offers
        </ButtonLink>
      }
    </Panel>);

}