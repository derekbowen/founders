import { useListings } from '../contexts/ListingsContext';
import type { CartItem, DeliveryMethod, Listing } from '../types/marketplace';

export interface OrderLine {
  item: CartItem;
  listing: Listing;
}

export function useOrderTotals(items: CartItem[], delivery: DeliveryMethod) {
  const { getListing } = useListings();
  const lines: OrderLine[] = items.flatMap((item) => {
    const listing = getListing(item.listingId);
    return listing ? [{ item, listing }] : [];
  });
  const subtotal = lines.reduce((s, l) => s + l.listing.price * l.item.quantity, 0);
  const shipping = delivery === 'pickup' ? 0 : lines.reduce((s, l) => s + l.listing.shippingPrice, 0);
  return { lines, subtotal, shipping, total: subtotal + shipping };
}