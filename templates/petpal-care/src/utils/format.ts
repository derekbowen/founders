import { format, parseISO } from 'date-fns';
import { brand } from '../data/brand';

export function formatMoney(amount: number, withCents = false): string {
  return new Intl.NumberFormat(brand.marketplace.locale, {
    style: 'currency',
    currency: brand.marketplace.currency,
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0
  }).format(amount);
}

export function toDate(value: string | Date): Date {
  return typeof value === 'string' ? parseISO(value) : value;
}

export function formatShortDate(value: string | Date): string {
  return format(toDate(value), 'MMM d');
}

export function formatLongDate(value: string | Date): string {
  return format(toDate(value), 'EEE, MMM d, yyyy');
}

export function formatDateRange(start: string | Date, end?: string | Date): string {
  if (!end) return format(toDate(start), 'EEE, MMM d');
  return `${format(toDate(start), 'MMM d')} – ${format(toDate(end), 'MMM d, yyyy')}`;
}

export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return format(d, 'h:mm a');
}

export function formatRelativeTime(value: string): string {
  return format(toDate(value), 'MMM d, h:mm a');
}

export function pluralize(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}