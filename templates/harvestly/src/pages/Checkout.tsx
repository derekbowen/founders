import React from "react";
import { AlertCircleIcon, ArrowLeftIcon, Loader2Icon, LockIcon, ShoppingBasketIcon } from "lucide-react";
import { CardForm } from "../components/checkout/CardForm";
import { FarmFulfillmentCard } from "../components/checkout/FarmFulfillmentCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { TextField } from "../components/ui/TextField";
import { brand } from "../data/brand";
import { useCheckout } from "../hooks/useCheckout";
import { formatPrice, pluralUnit } from "../utils/format";

function Step({ n, title, children }: {n: number;title: string;children: React.ReactNode;}) {
  return (
    <section aria-labelledby={`step-${n}`} className="rounded-2xl border border-line bg-white/60 p-5 sm:p-6">
      <h2 id={`step-${n}`} className="mb-5 flex items-center gap-3 font-display text-xl font-semibold text-ink">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{n}</span>
        {title}
      </h2>
      {children}
    </section>);

}

export function Checkout() {
  const c = useCheckout();

  if (c.groups.length === 0) {
    return (
      <div className="container-site py-16">
        <EmptyState
          icon={<ShoppingBasketIcon className="h-6 w-6" />}
          title="Nothing to check out"
          text="Your basket is empty. Add something fresh first."
          action={<Button to="/search">Browse products</Button>} />
        
      </div>);

  }

  return (
    <div className="container-site py-8 lg:py-12">
      <Button to="/cart" variant="ghost" size="sm" className="-ml-3 mb-4">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to order
      </Button>
      <h1 className="mb-8 font-display text-4xl font-semibold text-ink">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Step n={1} title="Pickup or delivery">
            <div className="space-y-4">
              {c.groups.map((g) =>
              <FarmFulfillmentCard
                key={g.farm.id}
                farm={g.farm}
                lines={g.lines}
                value={c.fulfillment[g.farm.id]}
                onChange={(v) => c.setFarmFulfillment(g.farm.id, v)} />

              )}
            </div>
            {c.needsAddress &&
            <div className="mt-6 border-t border-dashed border-line pt-6">
                <h3 className="mb-4 font-semibold text-ink">Delivery address</h3>
                <div className="grid gap-4 sm:grid-cols-6">
                  <TextField
                  className="sm:col-span-6"
                  label="Street address"
                  autoComplete="street-address"
                  value={c.address.line1}
                  onChange={(e) => c.setAddress({ ...c.address, line1: e.target.value })}
                  error={c.addressError && !c.address.line1 ? c.addressError : undefined}
                  placeholder="214 Mill Road" />
                
                  <TextField
                  className="sm:col-span-4"
                  label="Town"
                  autoComplete="address-level2"
                  value={c.address.city}
                  onChange={(e) => c.setAddress({ ...c.address, city: e.target.value })}
                  placeholder="Rhinebeck, NY" />
                
                  <TextField
                  className="sm:col-span-2"
                  label="ZIP"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={c.address.zip}
                  onChange={(e) => c.setAddress({ ...c.address, zip: e.target.value.replace(/\D/g, "").slice(0, 5) })}
                  placeholder="12572" />
                
                  <TextField
                  className="sm:col-span-6"
                  label="Delivery notes (optional)"
                  value={c.address.notes}
                  onChange={(e) => c.setAddress({ ...c.address, notes: e.target.value })}
                  placeholder="Leave in the cooler on the porch" />
                
                </div>
              </div>
            }
          </Step>

          <Step n={2} title="Payment">
            {c.status === "declined" &&
            <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
                <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Your card was declined. Try a different card — you haven't been charged.
              </div>
            }
            <CardForm values={c.card} errors={c.cardErrors} onChange={c.setCard} />
          </Step>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-paper p-6 lg:sticky lg:top-24" aria-label="Order summary">
          <h2 className="font-display text-xl font-semibold text-ink">Order summary</h2>
          <ul className="mt-4 space-y-4">
            {c.groups.flatMap((g) =>
            g.lines.map((l) =>
            <li key={l.product.id} className="flex gap-3">
                  <img src={l.product.images[0]} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-ink">{l.product.title}</p>
                    <p className="text-muted">
                      {l.quantity} {pluralUnit(l.product.unit, l.quantity)} · {g.farm.name}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink">{formatPrice(l.product.price * l.quantity)}</p>
                </li>
            )
            )}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="text-ink">{formatPrice(c.totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="text-ink">{c.totals.delivery ? formatPrice(c.totals.delivery) : "Free pickup"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Service fee ({Math.round(brand.serviceFeeRate * 100)}%)</dt>
              <dd className="text-ink">{formatPrice(c.totals.service)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-bold text-ink">{formatPrice(c.totals.total)}</dd>
            </div>
          </dl>
          <Button
            fullWidth
            size="lg"
            className="mt-6"
            onClick={c.placeOrder}
            disabled={c.status === "processing" || c.deliveryMinUnmet}>
            
            {c.status === "processing" ?
            <>
                <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" /> Processing…
              </> :

            <>
                <LockIcon className="h-4 w-4" aria-hidden="true" /> Pay {formatPrice(c.totals.total)}
              </>
            }
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            Test card: 4242 4242 4242 4242 · Decline: 4000 0000 0000 0002
          </p>
        </aside>
      </div>
    </div>);

}