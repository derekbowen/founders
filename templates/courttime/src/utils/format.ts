import { addDays, format, parseISO, startOfDay } from 'date-fns';
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
  return `${display} ${suffix}`;
}

export function formatTimeRange(startHour: number, hours: number): string {
  return `${formatHour(startHour)} – ${formatHour(startHour + hours)}`;
}

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function todayKey(): string {
  return toDateKey(new Date());
}

export function fromDateKey(key: string): Date {
  return parseISO(key);
}

export function dateFromOffset(offset: number): Date {
  return addDays(startOfDay(new Date()), offset);
}

export function formatDateLong(date: Date): string {
  return format(date, 'EEEE, MMMM d');
}

export function formatDateShort(date: Date): string {
  return format(date, 'EEE, MMM d');
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}