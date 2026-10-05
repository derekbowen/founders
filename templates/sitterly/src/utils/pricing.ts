import { brand } from '../data/brand';
import { hoursBetween } from './time';

export interface PriceBreakdown {
  hours: number;
  base: number;
  extraChildren: number;
  extraCharge: number;
  subtotal: number;
  fee: number;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function priceBreakdown(
hourlyRate: number,
extraChildRate: number,
start: string,
end: string,
kids: number)
: PriceBreakdown {
  const hours = hoursBetween(start, end);
  const base = round2(hourlyRate * hours);
  const extraChildren = Math.max(0, kids - 1);
  const extraCharge = round2(extraChildRate * extraChildren * hours);
  const subtotal = round2(base + extraCharge);
  const fee = round2(subtotal * brand.bookingFeePercent);
  return { hours, base, extraChildren, extraCharge, subtotal, fee, total: round2(subtotal + fee) };
}