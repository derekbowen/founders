import { format, parseISO, differenceInCalendarDays } from 'date-fns';
import { brand } from '../data/brand';

const money = new Intl.NumberFormat(brand.locale, {
  style: 'currency',
  currency: brand.currency,
  maximumFractionDigits: 0
});

export function formatMoney(amount: number): string {
  return money.format(amount);
}

export function formatDate(iso: string, pattern = 'd MMM yyyy'): string {
  if (!iso) return '—';
  return format(parseISO(iso), pattern);
}

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), 'd MMM, HH:mm');
}

export function nowIso(): string {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
}

export function formatShortRelative(iso: string, now = new Date()): string {
  const days = differenceInCalendarDays(now, parseISO(iso));
  if (days <= 0) return format(parseISO(iso), 'HH:mm');
  if (days === 1) return 'Yesterday';
  if (days < 7) return format(parseISO(iso), 'EEE');
  return format(parseISO(iso), 'd MMM');
}

export function formatMonths(months: number | null): string {
  if (months === null) return 'No maximum';
  return `${months} month${months === 1 ? '' : 's'}`;
}

export function currencySymbol(): string {
  return (
    money.formatToParts(0).find((p) => p.type === 'currency')?.value ?? brand.currency);

}