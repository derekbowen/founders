import { addDays, differenceInCalendarDays } from 'date-fns';
import { brand } from '../data/brand';
import { fromToday } from './format';
import type { DeliveryMethod, Listing, RentalDays } from '../types/marketplace';

export interface PriceLine {
  label: string;
  amount: number;
  note?: string;
}

export interface PriceBreakdown {
  lines: PriceLine[];
  total: number;
  rental: number;
}

export function rentalPrice(listing: Listing, days: RentalDays): number {
  return days === 4 ? listing.price4 : listing.price8;
}

export function getBreakdown(
listing: Listing,
days: RentalDays,
delivery: DeliveryMethod)
: PriceBreakdown {
  const rental = rentalPrice(listing, days);
  const service = Math.round(rental * brand.fees.serviceFeeRate);
  const shipping = delivery === 'ship' ? brand.fees.shipping : 0;
  const lines: PriceLine[] = [
  { label: `${days}-day rental`, amount: rental },
  { label: 'Professional cleaning', amount: 0, note: 'Included' },
  {
    label: delivery === 'ship' ? 'Round-trip shipping' : 'Local pickup',
    amount: shipping,
    note: delivery === 'pickup' ? 'Free' : undefined
  },
  { label: 'Damage protection', amount: brand.fees.damageProtection },
  { label: 'Service fee', amount: service }];

  return {
    lines,
    rental,
    total: lines.reduce((sum, l) => sum + l.amount, 0)
  };
}

/** Rental window: arrives the day before the event and lasts `days` days. */
export function rentalWindow(eventDate: Date, days: RentalDays) {
  const start = addDays(eventDate, -1);
  const end = addDays(start, days - 1);
  return { start, end };
}

export function isDayBooked(listing: Listing, day: Date): boolean {
  const offset = differenceInCalendarDays(day, fromToday(0));
  return listing.booked.some(([s, e]) => offset >= s && offset <= e);
}

export function isWindowAvailable(
listing: Listing,
eventDate: Date,
days: RentalDays)
: boolean {
  const { start } = rentalWindow(eventDate, days);
  if (differenceInCalendarDays(start, fromToday(0)) < 1) return false;
  for (let i = 0; i < days; i++) {
    if (isDayBooked(listing, addDays(start, i))) return false;
  }
  return true;
}

export function savingsPercent(listing: Listing): number {
  return Math.round((1 - listing.price4 / listing.retailPrice) * 100);
}