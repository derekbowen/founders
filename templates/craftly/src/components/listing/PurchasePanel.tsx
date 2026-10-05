import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ClockIcon, MapPinIcon, PackageIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import type { DeliveryMethod, Listing, Maker } from '../../types/marketplace';
import { formatPrice } from '../../utils/format';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';
import { RadioCard } from '../ui/RadioCard';
import { StarRating } from '../ui/StarRating';
import { FavoriteButton } from '../product/FavoriteButton';
import { VariationPicker } from './VariationPicker';

export function PurchasePanel({ listing, maker }: {listing: Listing;maker: Maker;}) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState<DeliveryMethod>(listing.shippingDisabled ? 'pickup' : 'shipping');
  const [showErrors, setShowErrors] = useState(false);

  const soldOut = listing.stock === 0 && !listing.madeToOrder;
  const maxQty = listing.madeToOrder ? 10 : Math.max(1, listing.stock);
  const complete = listing.variations.every((v) => selections[v.name]);

  const stockLabel = soldOut ?
  { text: 'Sold out', tone: 'text-danger' } :
  listing.madeToOrder ?
  { text: 'Made to order', tone: 'text-accent-ink' } :
  listing.stock <= 5 ?
  { text: `Only ${listing.stock} left in stock`, tone: 'text-primary-ink' } :
  { text: `${listing.stock} in stock`, tone: 'text-success' };

  const commit = (thenCheckout: boolean) => {
    if (!complete) {
      setShowErrors(true);
      toast.error('Choose your options before continuing.');
      return;
    }
    addItem(listing.id, quantity, selections);
    if (thenCheckout) navigate('/checkout', { state: { delivery } });else

    toast.success(`Added to cart`, {
      description: `${quantity} × ${listing.title}`,
      action: { label: 'View cart', onClick: () => navigate('/cart') }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to={`/shop/${maker.id}`} className="text-sm font-medium text-accent-ink hover:underline">
          {maker.shopName}
        </Link>
        <h1 className="mt-1 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{listing.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="#reviews" className="hover:opacity-80">
            <StarRating rating={listing.rating} count={listing.reviewCount} size="md" showValue />
          </a>
          <span className={`text-sm font-medium ${stockLabel.tone}`}>{stockLabel.text}</span>
        </div>
        <p className="mt-4 text-3xl font-semibold text-ink">{formatPrice(listing.price)}</p>
      </div>

      {listing.variations.map((v) =>
      <VariationPicker
        key={v.name}
        variation={v}
        value={selections[v.name]}
        onChange={(val) => setSelections((s) => ({ ...s, [v.name]: val }))}
        showError={showErrors} />

      )}

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Quantity</p>
        <QuantityStepper value={quantity} onChange={setQuantity} max={maxQty} />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Delivery</legend>
        <div className="space-y-2">
          <RadioCard
            name="delivery"
            value="shipping"
            checked={delivery === 'shipping'}
            onChange={() => setDelivery('shipping')}
            disabled={listing.shippingDisabled}
            icon={<TruckIcon className="h-4 w-4" />}
            title={`Ship from ${maker.location}`}
            description={listing.shippingDisabled ? 'Shipping not offered — pickup only' : listing.processingTime}
            aside={listing.shippingPrice === 0 ? 'Free' : formatPrice(listing.shippingPrice)} />
          
          <RadioCard
            name="delivery"
            value="pickup"
            checked={delivery === 'pickup'}
            onChange={() => setDelivery('pickup')}
            disabled={!listing.localPickup}
            icon={<MapPinIcon className="h-4 w-4" />}
            title="Local pickup"
            description={listing.localPickup ? maker.pickupArea : 'Not offered for this item'}
            aside="Free" />
          
        </div>
      </fieldset>

      <div className="flex gap-3">
        <Button size="lg" className="flex-1" onClick={() => commit(true)} disabled={soldOut}>
          {soldOut ? 'Sold out' : 'Buy now'}
        </Button>
        <FavoriteButton listingId={listing.id} title={listing.title} variant="outline" />
      </div>
      {!soldOut &&
      <Button variant="secondary" size="lg" className="w-full" onClick={() => commit(false)}>
          Add to cart
        </Button>
      }

      <ul className="space-y-3 rounded-2xl bg-subtle p-5 text-sm">
        <li className="flex gap-3">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
          <span>
            <span className="font-medium">Processing time:</span> {listing.processingTime}
          </span>
        </li>
        <li className="flex gap-3">
          <PackageIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
          <span>Ships from {listing.shipsFrom} in plastic-free packaging</span>
        </li>
        <li className="flex gap-3">
          <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
          <span>Covered by buyer protection — arrives as described or your money back</span>
        </li>
      </ul>
    </div>);

}