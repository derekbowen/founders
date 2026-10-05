import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon, ArrowLeftIcon, ReceiptTextIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { CardForm } from '../components/checkout/CardForm';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';
import { BrandButton } from '../components/ui/BrandButton';
import { EmptyState } from '../components/ui/EmptyState';
import { useCheckout } from '../hooks/useCheckout';
import { formatMoney } from '../utils/format';
import { getUser } from '../utils/lookup';

export function Checkout() {
  const c = useCheckout();

  if (!c.listing || !c.booking || !c.quote) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={AlertTriangleIcon}
          title="We couldn’t find that booking"
          description="Your booking details are missing or have expired. Pick a time on the space page to continue."
          action={<Link to="/s" className="btn-primary">Find a space</Link>} />
        
      </div>);

  }

  const host = getUser(c.listing.hostId);
  const section = 'rounded-2xl border border-line bg-white p-5 sm:p-6';

  return (
    <div className="container-page max-w-6xl py-8 lg:py-12">
      <Link
        to={`/l/${c.listing.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
        
        <ArrowLeftIcon size={15} aria-hidden="true" /> Back to space
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">{c.listing.instantBook ? 'Confirm and pay' : 'Request to book'}</h1>

      <form onSubmit={c.submit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="order-2 space-y-6 lg:order-1">
          <section className={section} aria-labelledby="invoice-heading">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <ReceiptTextIcon size={20} className="mt-0.5 text-brand-700" aria-hidden="true" />
                <div>
                  <h2 id="invoice-heading" className="font-sans text-lg font-semibold">Invoice details</h2>
                  <p className="text-sm text-ink-muted">Add your company to receive a VAT invoice.</p>
                </div>
              </div>
              <Toggle checked={c.invoice} onChange={c.setInvoice} aria-label="Request a company invoice" />
            </div>
            {c.invoice &&
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Input
                id="company"
                label="Company name"
                value={c.company}
                error={c.errors.company}
                onChange={(e) => c.setCompany(e.target.value)}
                placeholder="Acme Ltd."
                autoComplete="organization" />
              
                <Input
                id="vat"
                label="VAT number (optional)"
                value={c.vat}
                error={c.errors.vat}
                helperText="Reverse charge applies for valid EU/UK VAT IDs"
                onChange={(e) => c.setVat(e.target.value.toUpperCase())}
                placeholder="GB123456789" />
              
              </div>
            }
          </section>

          <section className={section} aria-labelledby="payment-heading">
            <div className="mb-5 flex items-center justify-between">
              <h2 id="payment-heading" className="font-sans text-lg font-semibold">Pay with card</h2>
              <div className="flex gap-1.5" aria-label="Accepted cards">
                {['VISA', 'MC', 'AMEX'].map((b) =>
                <span key={b} className="rounded border border-line px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-ink-muted">
                    {b}
                  </span>
                )}
              </div>
            </div>
            <CardForm values={c.card} errors={c.errors} onChange={c.setCard} />
          </section>

          <section className={section} aria-labelledby="message-heading">
            <h2 id="message-heading" className="font-sans text-lg font-semibold">Message {host?.firstName ?? 'the host'}</h2>
            <p className="text-sm text-ink-muted">Let them know what you’re working on or if you need anything set up.</p>
            <label htmlFor="host-message" className="sr-only">Message to host</label>
            <textarea
              id="host-message"
              rows={3}
              value={c.message}
              onChange={(e) => c.setMessage(e.target.value)}
              placeholder="Hi! We’re a team of two looking for a quiet spot for a planning day…"
              className="field mt-3 resize-none" />
            
          </section>

          <div className="rounded-2xl bg-mist p-5 text-sm text-ink-muted">
            <p className="font-semibold text-ink">Cancellation policy</p>
            <p className="mt-1">
              Free cancellation until 24 hours before your booking. After that, 50% is refunded. By booking you agree to the{' '}
              <Link to="/terms" className="link">Terms of service</Link> and the space’s house rules.
            </p>
          </div>

          <BrandButton type="submit" size="large" fullWidth loading={c.submitting}>
            {c.listing.instantBook ? `Pay ${formatMoney(c.quote.total)}` : `Request to book · ${formatMoney(c.quote.total)}`}
          </BrandButton>
        </div>

        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-24">
            <CheckoutSummary listing={c.listing} booking={c.booking} quote={c.quote} />
          </div>
        </aside>
      </form>
    </div>);

}