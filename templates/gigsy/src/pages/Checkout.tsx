import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, FileWarningIcon, ShieldCheckIcon } from 'lucide-react';
import { CardForm } from '../components/checkout/CardForm';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useToast } from '../components/ToastProvider';
import { useTransactions } from '../contexts/TransactionsContext';
import { brand } from '../data/brand';
import { formatDate, formatMoney, serviceFee } from '../utils/format';
import { getListing, getUser } from '../utils/lookup';
import { pendingOffer, roleFor } from '../utils/txStatus';

export function Checkout() {
  const { txId = '' } = useParams();
  const { getTransaction, acceptOffer } = useTransactions();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const tx = getTransaction(txId);
  const offer = tx ? pendingOffer(tx) : undefined;

  if (!tx || !offer || offer.from !== 'freelancer' || roleFor(tx) !== 'client') {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState
          icon={<FileWarningIcon className="h-6 w-6" />}
          title="This offer can't be paid right now"
          text="It may have already been accepted, countered or declined."
          action={<ButtonLink to={tx ? `/inbox/${tx.id}` : '/inbox'} variant="secondary">Back to inbox</ButtonLink>} />
        
      </div>);

  }

  const listing = getListing(tx.listingId);
  const freelancer = getUser(tx.freelancerId);
  const fee = serviceFee(offer.price);
  const total = offer.price + fee;

  const pay = () =>
  new Promise<void>((resolve) => {
    window.setTimeout(() => {
      acceptOffer(tx.id, 'client');
      addToast({ type: 'success', message: `Payment confirmed — ${freelancer?.name.split(' ')[0]} can start working` });
      navigate(`/inbox/${tx.id}`);
      resolve();
    }, 1400);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to={`/inbox/${tx.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to conversation
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">Accept offer & pay</h1>
      <p className="mt-1 text-slate-600">Your payment is held by {brand.name} until you approve the delivery.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="payment-heading">
          <h2 id="payment-heading" className="text-lg font-bold text-slate-900">Payment details</h2>
          <div className="mt-6">
            <CardForm amountLabel={formatMoney(total)} onPay={pay} />
          </div>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
            Secured with 256-bit encryption · Powered by Stripe
          </p>
        </section>

        <aside aria-labelledby="summary-heading">
          <div className="rounded-2xl border border-slate-200 bg-white lg:sticky lg:top-24">
            <div className="flex gap-4 border-b border-slate-100 p-5">
              {listing && <img src={listing.cover} alt="" className="h-16 w-20 shrink-0 rounded-xl object-cover" />}
              <div className="min-w-0">
                <h2 id="summary-heading" className="line-clamp-2 text-sm font-bold text-slate-900">{listing?.title}</h2>
                {freelancer &&
                <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-600">
                    <Avatar name={freelancer.name} alt="" src={freelancer.avatar} size="xs" /> {freelancer.name}
                  </p>
                }
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scope</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{offer.scope}</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm">
                <CalendarIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span className="text-slate-600">Delivery by</span>
                <span className="ml-auto font-semibold text-slate-900">{formatDate(offer.deliveryDate, 'EEE, MMM d, yyyy')}</span>
              </div>
              <dl className="space-y-2 border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Offer price</dt>
                  <dd className="font-medium text-slate-900">{formatMoney(offer.price)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Service fee ({brand.serviceFeePercent}%)</dt>
                  <dd className="font-medium text-slate-900">{formatMoney(fee)}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
                  <dt className="font-bold text-slate-900">Total due today</dt>
                  <dd className="font-extrabold text-slate-900">{formatMoney(total)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </div>);

}