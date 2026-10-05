import { brand } from '../data/brand';
import type { BookingDetails, Listing } from '../types/listing';
import { durationHours } from './time';

export interface Quote {
  units: number;
  unitLabel: string;
  unitPrice: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function getQuote(
listing: Listing,
booking: Pick<BookingDetails, 'mode' | 'start' | 'end' | 'seats'>)
: Quote {
  const isHourly = booking.mode === 'hour';
  const units = isHourly ? Math.max(0, durationHours(booking.start, booking.end)) : 1;
  const unitPrice = isHourly ? listing.pricePerHour : listing.pricePerDay;
  const subtotal = round2(unitPrice * units * booking.seats);
  const serviceFee = round2(subtotal * brand.serviceFeePercent / 100);
  return {
    units,
    unitLabel: isHourly ? units === 1 ? 'hour' : 'hours' : 'day',
    unitPrice,
    subtotal,
    serviceFee,
    total: round2(subtotal + serviceFee)
  };
}