import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, LockIcon, PackageOpenIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { CardForm, type CardErrors, type CardFields, validateCard } from '../components/checkout/CardForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { DownloadSuccess } from '../components/checkout/DownloadSuccess';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../contexts/StoreContext';
import { basePrice, formatMoneyExact } from '../utils/format';
import type { Order } from '../types/marketplace';

export function Checkout() {
  const { slug = '' } = useParams();
  const [params] = useSearchParams();
  const { getListing, getCreator, purchase, user } = useStore();
  const listing = getListing(slug);

  const [email, setEmail] = useState(user?.email ?? '');
  const [emailError, setEmailError] = useState<string>();
  const [card, setCard] = useState<CardFields>({ number: '', expiry: '', cvc: '', name: user?.name ?? '', country: 'United States' });
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  if (!listing) {
    return (
      <div className="container-page py-20">
        <EmptyState icon={PackageOpenIcon} title="Nothing to check out" body="We couldn’t find that product." action={<Link to="/s" className="btn btn-ink">Browse products</Link>} />
      </div>);

  }

  const requested = Number(params.get('amount'));
  const amount = listing.payWhatYouWant ?
  Math.max(basePrice(listing), Number.isNaN(requested) ? listing.price : requested) :
  listing.price;
  const isFreeOrder = amount === 0;
  const creator = getCreator(listing.creatorId);

  if (order) {
    return (
      <div className="bg-paper py-10 md:py-16">
        <div className="container-page">
          <DownloadSuccess order={order} listing={listing} />
        </div>
      </div>);

  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? undefined : 'Enter a valid email for your receipt.';
    const cErr = isFreeOrder ? {} : validateCard(card);
    setEmailError(eErr);
    setCardErrors(cErr);
    if (eErr || Object.keys(cErr).length) return;
    setProcessing(true);
    window.setTimeout(() => {
      setOrder(purchase(listing, amount, email));
      setProcessing(false);
      window.scrollTo({ top: 0 });
    }, 1300);
  };

  return (
    <div className="bg-paper py-8 md:py-12">
      <div className="container-page">
        <Link to={`/l/${listing.slug}`} className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:text-brand-ink">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back to product
        </Link>
        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <form onSubmit={submit} noValidate className="space-y-6">
            <section className="card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-xs text-white">1</span>
                Email for receipt
              </h2>
              <div className="mt-4">
                <Input
                  id="checkout-email"
                  type="email"
                  label="Email address"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  error={emailError}
                  helperText="We’ll send your receipt and permanent download links here."
                  onChange={(e) => setEmail(e.target.value)} />
                
              </div>
            </section>

            <section className="card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-xs text-white">2</span>
                Payment
              </h2>
              <div className="mt-4">
                {isFreeOrder ?
                <p className="rounded-lg bg-brand-soft p-4 text-sm">
                    This one’s free — no card needed. You can always come back and tip the creator later.
                  </p> :

                <CardForm value={card} errors={cardErrors} onChange={(p) => setCard((c) => ({ ...c, ...p }))} />
                }
              </div>
            </section>

            <button type="submit" disabled={processing} className="btn btn-accent btn-lg w-full">
              {processing ?
              <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" aria-hidden="true" />
                  Processing…
                </> :

              <>
                  <LockIcon className="h-4 w-4" aria-hidden="true" />
                  {isFreeOrder ? 'Get my free download' : `Pay ${formatMoneyExact(amount)} & download`}
                </>
              }
            </button>
            <p className="text-center text-xs text-muted">
              By purchasing you agree to the{' '}
              <Link to="/terms" className="link">
                Terms
              </Link>{' '}
              and the product’s {listing.license} license.
            </p>
          </form>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <OrderSummary listing={listing} creator={creator} amount={amount} />
          </div>
        </div>
      </div>
    </div>);

}