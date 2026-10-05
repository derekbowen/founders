import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ChevronLeftIcon, CalendarIcon, ShieldCheckIcon, HomeIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { useToast } from '../components/ToastProvider';
import { AuthGate } from '../components/AuthGate';
import { EmptyState } from '../components/EmptyState';
import { InventoryList } from '../components/checkout/InventoryList';
import { CardForm, emptyCard, validateCard, type CardValues } from '../components/checkout/CardForm';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { findHost } from '../data/hosts';
import { sqft } from '../data/listings';
import { estimateBooking, formatMoney } from '../utils/pricing';
import { ui, cx } from '../utils/styles';
import type { Transaction } from '../types/marketplace';

export function Checkout() {
  return (
    <AuthGate title="checkout">
      <CheckoutContent />
    </AuthGate>);

}

function CheckoutContent() {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { getListing, addTransaction } = useMarketplace();
  const listing = getListing(id);
  const start = params.get('start') ?? '';
  const end = params.get('end');

  const [items, setItems] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [card, setCard] = useState<CardValues>(emptyCard);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const estimate = useMemo(
    () => listing ? estimateBooking({ monthlyPrice: listing.monthlyPrice, deposit: listing.deposit, moveIn: start, moveOut: end }) : null,
    [listing, start, end]
  );

  if (!listing || !estimate) {
    return (
      <div className={cx(ui.container, 'py-20')}>
        <EmptyState
          icon={<HomeIcon className="h-5 w-5" />}
          title="Booking details missing"
          text="Choose a space and move-in date to start a booking request."
          action={<Link to="/s" className={ui.linkBrand}>Browse spaces</Link>} />
        
      </div>);

  }
  const host = findHost(listing.hostId);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = { ...validateCard(card) } as Record<string, string>;
    if (!items.length) next.items = 'Add at least one item you’re storing';
    if (!agree) next.agree = 'Please accept the storage rules';
    setErrors(next);
    if (Object.keys(next).length) {
      addToast({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const now = new Date().toISOString();
      const txId = `tx-${Math.floor(2000 + Math.random() * 7000)}`;
      const tx: Transaction = {
        id: txId,
        role: 'storing',
        listingId: listing.id,
        counterpartName: host?.name ?? 'Host',
        status: 'requested',
        moveIn: start,
        moveOut: end,
        monthlyPrice: listing.monthlyPrice,
        deposit: listing.deposit,
        inventory: items,
        messages: [
        { id: 'sys', from: 'system', text: `Booking requested for ${format(parseISO(start), 'MMM d, yyyy')}${end ? ` – ${format(parseISO(end), 'MMM d, yyyy')}` : ' · ongoing monthly'}`, time: now },
        ...(message.trim() ? [{ id: 'm1', from: 'me' as const, text: message.trim(), time: now }] : [])],

        accessLog: [],
        updatedAt: now,
        unread: false
      };
      addTransaction(tx);
      addToast({ type: 'success', message: `Request sent to ${host?.name.split(' ')[0] ?? 'your host'}. You’ll hear back soon.` });
      navigate(`/inbox/tx/${txId}`);
    }, 900);
  };

  return (
    <div className="bg-stone-50 pb-16">
      <div className={cx(ui.container, 'pt-6')}>
        <Link to={`/l/${listing.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-brand-700">
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to listing
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">Request to book</h1>
      </div>

      <form onSubmit={submit} noValidate className={cx(ui.container, 'mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]')}>
        <div className="space-y-6">
          <Panel step={1} title="What are you storing?" text="A rough inventory helps your host prepare and keeps your protection claim simple.">
            <InventoryList items={items} onChange={setItems} error={errors.items} />
          </Panel>

          <Panel step={2} title="Message your host" text="Introduce yourself and share your move-in plans.">
            <label htmlFor="msg" className="sr-only">Message</label>
            <textarea
              id="msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${host?.name.split(' ')[0] ?? 'there'}, I’m planning to move in on…`}
              className={ui.field} />
            
          </Panel>

          <Panel step={3} title="Payment" text="You won’t be charged until your host accepts.">
            <CardForm value={card} onChange={setCard} errors={errors} />
            <div className="mt-5">
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                error={Boolean(errors.agree)}
                label={
                <span className="text-sm text-stone-700">
                    I agree to the <Link to="/terms" className="font-medium text-brand-700 underline">storage rules</Link> and won’t store prohibited items.
                  </span>
                } />
              
              {errors.agree && <p className="mt-1 text-xs font-medium text-red-700">{errors.agree}</p>}
            </div>
          </Panel>

          <Button type="submit" size="large" loading={submitting} className={cx(ui.btnBrand, 'w-full lg:hidden')}>
            Send request · {formatMoney(estimate.dueToday, 2)}
          </Button>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="flex gap-4 border-b border-stone-200 p-5">
              <img src={listing.images[0]} alt="" className="h-20 w-24 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold text-stone-900">{listing.title}</p>
                <p className="mt-1 text-xs text-stone-600">{sqft(listing)} sq ft · {listing.neighborhood}</p>
                {host && <p className="mt-1 text-xs text-stone-600">Hosted by {host.name}</p>}
              </div>
            </div>
            <div className="space-y-3 border-b border-stone-200 p-5 text-sm">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-xs text-stone-500">Move-in</p>
                  <p className="font-medium text-stone-900">{format(parseISO(start), 'EEE, MMM d, yyyy')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-xs text-stone-500">End</p>
                  <p className="font-medium text-stone-900">{end ? format(parseISO(end), 'EEE, MMM d, yyyy') : 'Ongoing monthly'}</p>
                </div>
              </div>
            </div>
            <dl className="space-y-2 p-5 text-sm">
              <SummaryRow label={`${formatMoney(estimate.dailyRate, 2)} × ${estimate.days} days`} value={formatMoney(estimate.base, 2)} />
              <SummaryRow label="Service fee" value={formatMoney(estimate.serviceFee, 2)} />
              <SummaryRow label="Refundable deposit" value={formatMoney(estimate.deposit, 2)} />
              <div className="border-t border-stone-200 pt-3">
                <SummaryRow label="Total due if accepted" value={formatMoney(estimate.dueToday, 2)} strong />
              </div>
              {estimate.ongoing &&
              <p className="pt-1 text-xs text-stone-500">Then about {formatMoney(estimate.monthlyEstimate)} every 30 days until you end the booking.</p>
              }
            </dl>
            <div className="hidden border-t border-stone-200 p-5 lg:block">
              <Button type="submit" size="large" loading={submitting} className={cx(ui.btnBrand, 'w-full')}>
                Send request
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-500">
                <ShieldCheckIcon className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" /> Protected up to $25,000
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>);

}

function Panel({ step, title, text, children }: {step: number;title: string;text: string;children: React.ReactNode;}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="mb-5 flex gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{step}</span>
        <div>
          <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
          <p className="text-sm text-stone-600">{text}</p>
        </div>
      </div>
      {children}
    </section>);

}

function SummaryRow({ label, value, strong }: {label: string;value: string;strong?: boolean;}) {
  return (
    <div className={cx('flex justify-between gap-4', strong ? 'text-base font-semibold text-stone-900' : 'text-stone-700')}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>);

}