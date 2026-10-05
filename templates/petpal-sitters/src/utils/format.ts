import { addDays, format } from 'date-fns';
import { brand } from '../data/brand';

export function formatMoney(amount: number): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export function pluralize(word: string, count: number): string {
  return count === 1 ? word : `${word}s`;
}

export function dayFromOffset(offset: number): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return addDays(today, offset);
}

export function formatDayOffset(offset: number, pattern = 'EEE, MMM d'): string {
  return format(dayFromOffset(offset), pattern);
}

export function toInputDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function fromInputDate(value: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function initials(name: string): string {
  return name.
  split(' ').
  map((part) => part[0]).
  join('').
  slice(0, 2).
  toUpperCase();
}