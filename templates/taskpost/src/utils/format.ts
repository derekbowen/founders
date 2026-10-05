import { format, formatDistanceStrict, isValid, parseISO } from 'date-fns';
import { brand } from '../data/brand';
import { now } from './time';

export function formatMoney(amount: number): string {
  const whole = amount % 1 === 0;
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2
  }).format(amount);
}

export function formatBudget(min: number, max: number): string {
  if (min === max) return formatMoney(min);
  return `${formatMoney(min)}–${formatMoney(max)}`;
}

export function formatDate(iso: string, pattern = 'EEE, MMM d'): string {
  const d = parseISO(iso);
  return isValid(d) ? format(d, pattern) : '—';
}

export function formatTimestamp(iso: string): string {
  const d = parseISO(iso);
  return isValid(d) ? format(d, 'MMM d, h:mm a') : '—';
}

export function timeAgo(iso: string): string {
  const d = parseISO(iso);
  if (!isValid(d)) return '';
  const diff = now().getTime() - d.getTime();
  if (diff < 60_000) return 'just now';
  return formatDistanceStrict(d, now(), { addSuffix: true });
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}