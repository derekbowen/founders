import { addDays, format } from 'date-fns';
import { brand } from '../data/brand';

export function formatMoney(amount: number, decimals = 0): string {
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
}

export function fromToday(offset: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return addDays(d, offset);
}

export function shortDate(d: Date): string {
  return format(d, 'MMM d');
}

export function longDate(d: Date): string {
  return format(d, 'EEE, MMM d, yyyy');
}

export function isoDate(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}

export function parseIsoDate(value: string | null): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function sizeLabel(size: number): string {
  return `US ${size}`;
}