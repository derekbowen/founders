import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, InboxIcon, InfoIcon, LockIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';
import { Field } from '../ui/Field';
import { StatusBadge } from '../ui/StatusBadge';
import { brand } from '../../data/brand';
import { useApp } from '../../hooks/useApp';
import type { Job } from '../../types/marketplace';
import { formatBudget, formatMoney, pluralize } from '../../utils/format';
import { cn, inputClass, inputErrorClass, textareaClass } from '../../utils/styles';
import { todayISODate } from '../../utils/time';
import { proCommission, proPayout } from '../../utils/transactions';

interface Errors {
  amount?: string;
  date?: string;
  message?: string;
}

export function OfferPanel({ job }: {job: Job;}) {
  const { user, transactions, makeOffer, enableRole } = useApp();
  const [amount, setAmount] = useState(String(Math.round((job.budgetMin + job.budgetMax) / 2)));
  const [date, setDate] = useState(job.preferredDate < todayISODate() ? todayISODate() : job.preferredDate);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const existing = user ? transactions.find((t) => t.jobId === job.id && t.proId === user.id) : undefined;
  const amountNum = Number(amount) || 0;

  function validate(): Errors {
    const e: Errors = {};
    if (!amountNum || amountNum < 10) e.amount = 'Enter a price of at least $10.';else
    if (amountNum > 10000) e.amount = 'Offers over $10,000 aren’t supported.';
    if (!date) e.date = 'Pick your earliest available date.';else
    if (date < todayISODate()) e.date = 'Date can’t be in the past.';
    if (message.trim().length < 20) e.message = 'Tell the customer a bit more (at least 20 characters).';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setSubmitting(true);
    setTimeout(() => {
      makeOffer(job.id, { amount: amountNum, earliestDate: date, message: message.trim() });
      setSubmitting(false);
    }, 600);
  }

  const header =
  <div className="border-b border-ink-100 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Customer budget</p>
      <p className="mt-1 text-3xl font-extrabold text-ink-900">{formatBudget(job.budgetMin, job.budgetMax)}</p>
      <p className="mt-1 text-sm text-ink-600">
        {job.offerCount === 0 ? 'No offers yet — be the first.' : `${pluralize(job.offerCount, 'pro')} already sent offers`}
      </p>
    </div>;


  let body: React.ReactNode;
  if (job.status !== 'open') {
    body = <p className="p-5 text-sm text-ink-600">This job is no longer accepting offers.</p>;
  } else if (!user) {
    body =
    <div className="space-y-3 p-5">
        <p className="text-sm text-ink-600">Log in with a pro account to send an offer on this job.</p>
        <ButtonLink to={`/login?redirect=/jobs/${job.id}`} fullWidth leftIcon={<LockIcon className="h-4 w-4" />}>
          Log in to make an offer
        </ButtonLink>
        <ButtonLink to="/signup" variant="secondary" fullWidth>
          Join as a pro
        </ButtonLink>
      </div>;

  } else if (job.customerId === user.id) {
    body =
    <div className="space-y-3 p-5">
        <p className="text-sm text-ink-600">This is your job. Review and respond to offers in your inbox.</p>
        <ButtonLink to="/inbox?tab=jobs" fullWidth leftIcon={<InboxIcon className="h-4 w-4" />}>
          View offers
        </ButtonLink>
      </div>;

  } else if (!user.roles.includes('pro')) {
    body =
    <div className="space-y-3 p-5">
        <p className="text-sm text-ink-600">Only pros can send offers. Add a pro profile to your account to start bidding on jobs.</p>
        <Button fullWidth onClick={() => enableRole('pro')}>
          Add pro profile
        </Button>
      </div>;

  } else if (existing) {
    const latest = existing.offers[existing.offers.length - 1];
    body =
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-5">
        <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-inset ring-emerald-200">
          <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <div>
            <p className="text-sm font-extrabold text-emerald-900">Your offer is in</p>
            <p className="text-sm text-emerald-800">
              Latest offer: <strong>{formatMoney(latest.amount)}</strong>. We’ll notify you when the customer responds.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-600">Status</span>
          <StatusBadge status={existing.status} />
        </div>
        <ButtonLink to={`/inbox/${existing.id}`} variant="dark" fullWidth leftIcon={<InboxIcon className="h-4 w-4" />}>
          Open conversation
        </ButtonLink>
      </motion.div>;

  } else {
    body =
    <form id="offer-form" onSubmit={handleSubmit} noValidate className="space-y-4 p-5">
        <h2 className="text-lg font-extrabold text-ink-900">Make an offer</h2>
        <Field label="Your price" htmlFor="offer-amount" error={errors.amount}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-500">$</span>
            <input
            id="offer-amount"
            type="number"
            inputMode="numeric"
            min={10}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'offer-amount-error' : undefined}
            className={cn(inputClass, 'pl-7 text-base font-bold', errors.amount && inputErrorClass)} />
          
          </div>
        </Field>
        <Field label="Earliest date you can do it" htmlFor="offer-date" error={errors.date}>
          <input
          id="offer-date"
          type="date"
          min={todayISODate()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-invalid={Boolean(errors.date)}
          className={cn(inputClass, errors.date && inputErrorClass)} />
        
        </Field>
        <Field label="Message to the customer" htmlFor="offer-message" error={errors.message} hint="Explain your approach, experience and what’s included.">
          <textarea
          id="offer-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi! I’ve done this kind of job many times…"
          aria-invalid={Boolean(errors.message)}
          className={cn(textareaClass, errors.message && inputErrorClass)} />
        
        </Field>
        {amountNum > 0 &&
      <dl className="space-y-1.5 rounded-xl bg-ink-50 p-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-600">Your offer</dt>
              <dd className="font-bold text-ink-900">{formatMoney(amountNum)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-600">{brand.name} fee ({brand.fees.proCommissionRate * 100}%)</dt>
              <dd className="text-ink-700">−{formatMoney(proCommission(amountNum))}</dd>
            </div>
            <div className="flex justify-between border-t border-ink-200 pt-1.5">
              <dt className="font-bold text-ink-900">You’ll earn</dt>
              <dd className="font-extrabold text-ink-900">{formatMoney(proPayout(amountNum))}</dd>
            </div>
          </dl>
      }
        <Button type="submit" fullWidth size="lg" loading={submitting}>
          Send offer
        </Button>
        <p className="flex items-start gap-1.5 text-xs text-ink-500">
          <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          You won’t be charged anything. The customer can accept, counter or decline.{' '}
          <Link to="/terms" className="font-bold text-ink-700 underline">Terms</Link>
        </p>
      </form>;

  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
      {header}
      {body}
    </div>);

}