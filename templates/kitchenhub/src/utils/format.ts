import { addDays, format, parseISO } from 'date-fns';
import { brand } from '../data/brand';

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatHour(hour: number): string {
  const h = (hour % 24 + 24) % 24;
  const suffix = h < 12 ? 'AM' : 'PM';
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:00 ${suffix}`;
}

export function formatTimeRange(startHour: number, hours: number): string {
  return `${formatHour(startHour)} – ${formatHour(startHour + hours)}`;
}

export function formatDate(iso: string, pattern = 'EEE, MMM d, yyyy'): string {
  return format(parseISO(iso), pattern);
}

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function daysFromTodayISO(days: number): string {
  return format(addDays(new Date(), days), 'yyyy-MM-dd');
}

export function initials(name: string): string {
  return name.
  split(' ').
  filter(Boolean).
  slice(0, 2).
  map((part) => part[0]?.toUpperCase()).
  join('');
}