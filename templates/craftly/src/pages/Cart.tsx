import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, Trash2Icon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useListings } from '../contexts/ListingsContext';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { formatPrice, pluralize } from '../utils/format';

export function Cart() {
  const { items, count, updateQuantity, removeItem } = useCart();
  const { getListing, getMaker } = useListings();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<ShoppingBagIcon className="h-5 w-5" />}
          title="Your cart is empty"
          description="When you find something made by hand that you love, it’ll wait for you here."
          action={<ButtonLink to="/s">Start browsing</ButtonLink>} />
        
      </div>);

  }

  return (
    <div className="container-page py-10">
      <h1 className="text-4xl font-medium tracking-tight">Your cart</h1>
      <p className="mt-1 text-sm text-muted">{pluralize(count, 'item')}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => {
            const listing = getListing(item.listingId);
            if (!listing) return null;
            const maker = getMaker(listing.makerId);
            return (
              <li key={item.key} className="flex gap-4 py-6 sm:gap-6">
                <Link to={`/l/${listing.id}`} className="shrink-0">
                  <img src={listing.image} alt={listing.title} className="h-32 w-24 rounded-xl object-cover sm:h-36 sm:w-28" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link to={`/l/${listing.id}`} className="font-medium hover:text-primary-ink">{listing.title}</Link>
                      <p className="text-sm text-muted">{maker?.shopName}</p>
                      {Object.entries(item.selections).length > 0 &&
                      <p className="mt-1 text-xs text-muted">{Object.entries(item.selections).map(([k, v]) => `${k}: ${v}`).join(' · ')}</p>
                      }
                    </div>
                    <p className="font-semibold">{formatPrice(listing.price * item.quantity)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper size="sm" value={item.quantity} onChange={(q) => updateQuantity(item.key, q)} max={listing.madeToOrder ? 10 : listing.stock} />
                    <button type="button" onClick={() => removeItem(item.key)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted hover:bg-subtle hover:text-danger">
                      <Trash2Icon className="h-3.5 w-3.5" aria-hidden /> Remove
                    </button>
                  </div>
                </div>
              </li>);

          })}
        </ul>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <OrderSummary items={items} delivery="shipping">
            <Button size="lg" className="mt-5 w-full" onClick={() => navigate('/checkout')}>
              Continue to checkout
            </Button>
          </OrderSummary>
        </div>
      </div>
    </div>);

}