import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, GiftIcon, LockIcon, MapPinIcon, ShoppingBagIcon, TruckIcon } from 'lucide-react';
import { useCheckout } from '../hooks/useCheckout';
import { AddressForm } from '../components/checkout/AddressForm';
import { CardForm } from '../components/checkout/CardForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CheckboxField } from '../components/ui/CheckboxField';
import { EmptyState } from '../components/ui/EmptyState';
import { RadioCard } from '../components/ui/RadioCard';
import { TextArea } from '../components/ui/TextArea';
import { formatPrice } from '../utils/format';

function Step({ n, title, children }: {n: number;title: string;children: React.ReactNode;}) {
  return (
    <section className="card p-6 sm:p-8" aria-labelledby={`step-${n}`}>
      <h2 id={`step-${n}`} className="flex items-center gap-3 text-2xl font-medium">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-sans text-xs font-semibold text-canvas">{n}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>);

}

export function Checkout() {
  const c = useCheckout();

  if (c.items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<ShoppingBagIcon className="h-5 w-5" />}
          title="Nothing to check out"
          description="Your cart is empty. Find something handmade and come back when you’re ready."
          action={<ButtonLink to="/s">Browse makers</ButtonLink>} />
        
      </div>);

  }

  return (
    <div className="container-page py-8 lg:py-12">
      <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden /> Back to cart
      </Link>
      <h1 className="mt-3 text-4xl font-medium tracking-tight">Checkout</h1>

      <form onSubmit={c.submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Step n={1} title="Delivery method">
            <div className="grid gap-3 sm:grid-cols-2">
              <RadioCard
                name="delivery-method"
                value="shipping"
                checked={c.delivery === 'shipping'}
                onChange={() => c.setDelivery('shipping')}
                icon={<TruckIcon className="h-4 w-4" />}
                title="Ship to me"
                description="Tracked shipping from each maker’s studio"
                aside={formatPrice(c.totals.lines.reduce((s, l) => s + l.listing.shippingPrice, 0))} />
              
              <RadioCard
                name="delivery-method"
                value="pickup"
                checked={c.delivery === 'pickup'}
                onChange={() => c.setDelivery('pickup')}
                disabled={!c.pickupAvailable}
                icon={<MapPinIcon className="h-4 w-4" />}
                title="Local pickup"
                description={c.pickupAvailable ? 'Collect in person — the maker will message you' : 'Not available for every item in your cart'}
                aside="Free" />
              
            </div>
          </Step>

          <Step n={2} title={c.delivery === 'shipping' ? 'Shipping address' : 'Pickup details'}>
            {c.delivery === 'shipping' ?
            <AddressForm value={c.address} onChange={c.setAddress} errors={c.addressErrors} idPrefix="ship" /> :

            <ul className="space-y-3">
                {c.pickupMakers.map((m) =>
              m ?
              <li key={m.id} className="flex items-start gap-3 rounded-xl bg-subtle p-4">
                      <img src={m.portrait} alt="" className="h-10 w-10 rounded-full object-cover" />
                      <div className="text-sm">
                        <p className="font-medium">{m.shopName}</p>
                        <p className="text-muted">{m.pickupArea}, {m.location}</p>
                        <p className="mt-1 text-xs text-accent-ink">{m.ownerName} will message you to arrange a time.</p>
                      </div>
                    </li> :
              null
              )}
              </ul>
            }
          </Step>

          <Step n={3} title="Gift options">
            <CheckboxField
              label={<span className="inline-flex items-center gap-2"><GiftIcon className="h-4 w-4 text-primary" aria-hidden /> This order is a gift</span>}
              description="Add a handwritten-style note the maker will tuck into the package."
              checked={c.isGift}
              onChange={(e) => c.setIsGift(e.target.checked)} />
            
            {c.isGift &&
            <div className="mt-4 space-y-3 pl-7">
                <TextArea label="Gift note" value={c.giftNote} onChange={(e) => c.setGiftNote(e.target.value)} maxLength={240} placeholder="Happy birthday! Thought of you the moment I saw this." />
                <CheckboxField label="Hide prices on the packing slip" checked={c.hidePrices} onChange={(e) => c.setHidePrices(e.target.checked)} />
              </div>
            }
          </Step>

          <Step n={4} title="Payment">
            <CardForm value={c.card} onChange={c.setCard} errors={c.cardErrors} />
          </Step>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <OrderSummary items={c.items} delivery={c.delivery}>
            <Button type="submit" size="lg" className="mt-5 w-full" loading={c.submitting} leftIcon={<LockIcon className="h-4 w-4" />}>
              {c.submitting ? 'Processing payment…' : `Pay ${formatPrice(c.totals.total)}`}
            </Button>
            <p className="mt-3 text-center text-xs text-muted">
              By placing your order you agree to our <Link to="/terms" className="underline hover:text-ink">Terms</Link> and{' '}
              <Link to="/privacy" className="underline hover:text-ink">Privacy Policy</Link>.
            </p>
          </OrderSummary>
        </div>
      </form>
    </div>);

}