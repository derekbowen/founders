import { format, formatDistanceToNowStrict, parseISO } from 'date-fns';
import { brand } from '../data/brand';

const currency = new Intl.NumberFormat(brand.locale, {
  style: 'currency',
  currency: brand.currency
});

export function formatPrice(amount: number): string {
  return currency.format(amount);
}

export function formatDate(iso: string, pattern = 'MMM d, yyyy'): string {
  return format(parseISO(iso), pattern);
}

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), "MMM d, yyyy 'at' h:mm a");
}

export function timeAgo(iso: string): string {
  return `${formatDistanceToNowStrict(parseISO(iso))} ago`;
}

export function initials(name: string): string {
  return name.
  split(' ').
  map((p) => p[0]).
  join('').
  slice(0, 2).
  toUpperCase();
}

export function pluralize(count: number, word: string, plural = `${word}s`): string {
  return `${count} ${count === 1 ? word : plural}`;
}