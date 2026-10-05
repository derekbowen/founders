import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBasketIcon, Trash2Icon } from "lucide-react";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { QuantityStepper } from "../components/ui/QuantityStepper";
import { useCart } from "../contexts/CartContext";
import { useCatalog } from "../contexts/CatalogContext";
import { brand } from "../data/brand";
import { formatPrice, formatUnit } from "../utils/format";

export function Cart() {
  const { items, setQuantity, remove } = useCart();
  const { getProduct, getFarm } = useCatalog();

  const lines = items.
  map((i) => ({ ...i, product: getProduct(i.productId) })).
  filter((l): l is typeof l & {product: NonNullable<typeof l.product>;} => !!l.product);

  const farmIds = Array.from(new Set(lines.map((l) => l.product.farmId)));
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);

  return (
    <div className="container-site py-8 lg:py-12">
      <h1 className="mb-8 font-display text-4xl font-semibold text-ink">Your order</h1>
      {lines.length === 0 ?
      <EmptyState
        icon={<ShoppingBasketIcon className="h-6 w-6" />}
        title="Your basket is empty"
        text="Fill it with something fresh — tomatoes, eggs and sourdough are all in this week."
        action={<Button to="/search">Start shopping</Button>} /> :


      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {farmIds.map((farmId) => {
            const farm = getFarm(farmId);
            return (
              <section key={farmId} className="rounded-2xl border border-line bg-paper" aria-label={farm?.name}>
                  <header className="flex items-center justify-between border-b border-line px-5 py-3">
                    <Link to={`/farms/${farmId}`} className="font-semibold text-ink hover:text-primary">
                      {farm?.name}
                    </Link>
                    <span className="text-sm text-muted">{farm?.location}</span>
                  </header>
                  <ul className="divide-y divide-line">
                    {lines.
                  filter((l) => l.product.farmId === farmId).
                  map((l) =>
                  <li key={l.productId} className="flex gap-4 p-5">
                          <img src={l.product.images[0]} alt="" className="h-20 w-20 rounded-xl object-cover" />
                          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="flex-1">
                              <Link to={`/listings/${l.productId}`} className="font-semibold text-ink hover:text-primary">
                                {l.product.title}
                              </Link>
                              <p className="text-sm text-muted">
                                {formatPrice(l.product.price)} {formatUnit(l.product.unit)}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <QuantityStepper
                          size="sm"
                          value={l.quantity}
                          max={l.product.stock}
                          onChange={(v) => setQuantity(l.productId, v)} />
                        
                              <span className="w-20 text-right font-semibold text-ink">
                                {formatPrice(l.product.price * l.quantity)}
                              </span>
                              <button
                          type="button"
                          onClick={() => remove(l.productId)}
                          aria-label={`Remove ${l.product.title}`}
                          className="rounded-full p-2 text-muted transition hover:bg-danger/10 hover:text-danger">
                          
                                <Trash2Icon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </li>
                  )}
                  </ul>
                </section>);

          })}
          </div>
          <aside className="h-fit rounded-2xl border border-line bg-paper p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold text-ink">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{brand.name} service fee</dt>
                <dd className="text-ink">{formatPrice(subtotal * brand.serviceFeeRate)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Pickup or delivery</dt>
                <dd className="text-muted">Chosen at checkout</dd>
              </div>
            </dl>
            <p className="mt-4 rounded-xl bg-primary-soft/60 p-3 text-xs text-primary-dark">
              Ordering from {farmIds.length} {farmIds.length === 1 ? "farm" : "farms"}. You'll pick a pickup slot or
              delivery for each.
            </p>
            <Button to="/checkout" fullWidth size="lg" className="mt-5">
              Continue to checkout
            </Button>
            <Button to="/search" variant="ghost" fullWidth className="mt-2">
              Keep shopping
            </Button>
          </aside>
        </div>
      }
    </div>);

}