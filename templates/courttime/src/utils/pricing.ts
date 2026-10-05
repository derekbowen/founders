import { brand } from '../data/brand';
import { BookingType, Listing, PriceLine, PriceQuote } from '../types/marketplace';
import { formatMoney, pluralize } from './format';

interface QuoteInput {
  listing: Listing;
  bookingType: BookingType;
  hours: number;
  seats: number;
  addOnIds: string[];
}

export function getBookingQuote({ listing, bookingType, hours, seats, addOnIds }: QuoteInput): PriceQuote {
  const lines: PriceLine[] = [];
  if (bookingType === 'openplay' && listing.openPlay) {
    const price = listing.openPlay.pricePerSeat;
    lines.push({ label: `${formatMoney(price)} × ${pluralize(seats, 'seat')}`, amount: price * seats });
  } else {
    lines.push({ label: `${formatMoney(listing.pricePerHour)} × ${pluralize(hours, 'hour')}`, amount: listing.pricePerHour * hours });
  }
  listing.addOns.
  filter((addOn) => addOnIds.includes(addOn.id)).
  forEach((addOn) => {
    const amount = addOn.per === 'hour' ? addOn.price * hours : addOn.price;
    lines.push({ label: addOn.per === 'hour' ? `${addOn.label} (${pluralize(hours, 'hr')})` : addOn.label, amount });
  });
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const fee = Math.round(subtotal * brand.serviceFeeRate * 100) / 100;
  return { lines, subtotal, fee, total: Math.round((subtotal + fee) * 100) / 100 };
}