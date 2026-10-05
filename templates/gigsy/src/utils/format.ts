import { format, parseISO } from 'date-fns';
import { brand } from '../data/brand';

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2
  }).format(amount);
}

export function formatDate(iso: string, pattern = 'MMM d, yyyy'): string {
  try {
    return format(parseISO(iso), pattern);
  } catch {
    return iso;
  }
}

export function deliveryLabel(days: number): string {
  if (days === 1) return '1 day';
  if (days % 7 === 0 && days >= 14) return `${days / 7} weeks`;
  return `${days} days`;
}

export function initials(name: string): string {
  return name.
  split(' ').
  map((p) => p[0]).
  slice(0, 2).
  join('').
  toUpperCase();
}

export function serviceFee(amount: number): number {
  return Math.round(amount * brand.serviceFeePercent) / 100;
}