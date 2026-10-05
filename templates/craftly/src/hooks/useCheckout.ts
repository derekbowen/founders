import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useListings } from '../contexts/ListingsContext';
import { useOrders } from '../contexts/OrdersContext';
import { validateAddress, type AddressErrors } from '../components/checkout/AddressForm';
import type { CardErrors, CardValue } from '../components/checkout/CardForm';
import type { Address, DeliveryMethod } from '../types/marketplace';
import { expiryValid, luhnValid } from '../utils/card';
import { useOrderTotals } from './useOrderTotals';

export function useCheckout() {
  const { user } = useAuth();
  const { items, clear } = useCart();
  const { getMaker, decrementStock } = useListings();
  const { placeOrders } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();
  const initialDelivery = (location.state as {delivery?: DeliveryMethod;} | null)?.delivery ?? 'shipping';

  const [delivery, setDelivery] = useState<DeliveryMethod>(initialDelivery);
  const [address, setAddress] = useState<Address>(
    user?.shippingAddress ?? { fullName: '', line1: '', city: '', state: '', postalCode: '', country: 'United States' }
  );
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [hidePrices, setHidePrices] = useState(true);
  const [card, setCard] = useState<CardValue>({ number: '', expiry: '', cvc: '', name: user ? `${user.firstName} ${user.lastName}` : '', zip: '' });
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const totals = useOrderTotals(items, delivery);
  const pickupAvailable = totals.lines.length > 0 && totals.lines.every((l) => l.listing.localPickup);
  const effectiveDelivery: DeliveryMethod = delivery === 'pickup' && !pickupAvailable ? 'shipping' : delivery;
  const pickupMakers = Array.from(new Set(totals.lines.map((l) => l.listing.makerId))).map((id) => getMaker(id));

  const validate = () => {
    const aErr = effectiveDelivery === 'shipping' ? validateAddress(address) : {};
    const cErr: CardErrors = {};
    if (!card.name.trim()) cErr.name = 'Enter the name on your card';
    if (!luhnValid(card.number)) cErr.number = 'Your card number is incomplete or invalid';else
    if (!expiryValid(card.expiry)) cErr.expiry = 'Your card’s expiration date is invalid';else
    if (card.cvc.length < 3) cErr.cvc = 'Your card’s security code is incomplete';else
    if (card.zip.length !== 5) cErr.zip = 'Your ZIP code is incomplete';
    setAddressErrors(aErr);
    setCardErrors(cErr);
    return Object.keys(aErr).length === 0 && Object.keys(cErr).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please check the highlighted fields.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const ids = placeOrders(
      totals.lines.map(({ item, listing }) => {
        const maker = getMaker(listing.makerId);
        return {
          listingId: listing.id,
          quantity: item.quantity,
          selections: item.selections,
          unitPrice: listing.price,
          deliveryFee: effectiveDelivery === 'pickup' ? 0 : listing.shippingPrice,
          deliveryMethod: effectiveDelivery,
          counterparty: { name: maker?.ownerName ?? 'Maker', location: maker?.location ?? '' },
          shippingAddress: effectiveDelivery === 'shipping' ? address : undefined,
          giftNote: isGift && giftNote.trim() ? giftNote.trim() : undefined
        };
      })
    );
    totals.lines.forEach(({ item, listing }) => decrementStock(listing.id, item.quantity));
    clear();
    setSubmitting(false);
    toast.success('Order placed — thank you for supporting independent makers!');
    navigate(ids.length === 1 ? `/orders/${ids[0]}` : '/inbox/purchases');
  };

  return {
    items,
    totals,
    delivery: effectiveDelivery,
    setDelivery,
    pickupAvailable,
    pickupMakers,
    address,
    setAddress,
    addressErrors,
    isGift,
    setIsGift,
    giftNote,
    setGiftNote,
    hidePrices,
    setHidePrices,
    card,
    setCard,
    cardErrors,
    submitting,
    submit
  };
}