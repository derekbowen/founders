import { format, parseISO } from 'date-fns';
import { brand } from '../data/brand';

const currencyFormatter = new Intl.NumberFormat(brand.locale, {
  style: 'currency',
  currency: brand.currency,
  maximumFractionDigits: 0
});

const preciseCurrencyFormatter = new Intl.NumberFormat(brand.locale, {
  style: 'currency',
  currency: brand.currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatPrice(amount: number, precise = false): string {
  return precise ?
  preciseCurrencyFormatter.format(amount) :
  currencyFormatter.format(amount);
}

export function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  if (minutes === 0) return `${whole} hr${whole > 1 ? 's' : ''}`;
  return `${whole} hr ${minutes} min`;
}

export function formatDate(iso: string, pattern = 'EEE, MMM d'): string {
  return format(parseISO(iso), pattern);
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

export function pluralize(count: number, singular: string, plural?: string) {
  return `${count} ${count === 1 ? singular : plural ?? `${singular}s`}`;
}