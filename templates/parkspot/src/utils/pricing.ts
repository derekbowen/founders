import { brand } from '../data/brand';
import type { Listing, UnitType } from '../types/listing';

export interface Quote {
  valid: boolean;
  error?: string;
  hours: number;
  units: number;
  unitLabel: string;
  unitPrice: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  hostCommission: number;
  hostPayout: number;
  dailySavings: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function getHours(arrive: string, leave: string) {
  if (!arrive || !leave) return 0;
  const diff = new Date(leave).getTime() - new Date(arrive).getTime();
  return Math.max(0, diff / 3_600_000);
}

export function getQuote(listing: Listing, arrive: string, leave: string, unit: UnitType): Quote {
  const hours = getHours(arrive, leave);
  const empty: Quote = {
    valid: false,
    hours,
    units: 0,
    unitLabel: unit === 'hour' ? 'hours' : 'days',
    unitPrice: unit === 'hour' ? listing.hourlyPrice : listing.dailyPrice,
    subtotal: 0,
    serviceFee: 0,
    total: 0,
    hostCommission: 0,
    hostPayout: 0,
    dailySavings: 0
  };
  if (!arrive || !leave) return { ...empty, error: 'Choose when you arrive and leave' };
  if (hours <= 0) return { ...empty, error: 'Leave time must be after arrival' };

  const unitPrice = unit === 'hour' ? listing.hourlyPrice : listing.dailyPrice;
  const units =
  unit === 'hour' ? Math.max(Math.ceil(hours), listing.minHours) : Math.max(1, Math.ceil(hours / 24));
  const subtotal = round2(units * unitPrice);
  const serviceFee = round2(subtotal * brand.fees.serviceFeeRate);
  const hostCommission = round2(subtotal * brand.fees.hostCommissionRate);
  const dailyCost = Math.max(1, Math.ceil(hours / 24)) * listing.dailyPrice;
  const dailySavings = unit === 'hour' && dailyCost < subtotal ? round2(subtotal - dailyCost) : 0;

  return {
    valid: true,
    hours,
    units,
    unitLabel: unit === 'hour' ? units === 1 ? 'hour' : 'hours' : units === 1 ? 'day' : 'days',
    unitPrice,
    subtotal,
    serviceFee,
    total: round2(subtotal + serviceFee),
    hostCommission,
    hostPayout: round2(subtotal - hostCommission),
    dailySavings
  };
}