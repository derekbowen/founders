import { addHours, format, isSameDay, startOfHour } from 'date-fns';
import { brand } from '../data/brand';

export function formatMoney(value: number) {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatDateTime(iso: string) {
  return format(new Date(iso), 'EEE, MMM d · h:mm a');
}

export function formatDate(iso: string) {
  return format(new Date(iso), 'MMM d, yyyy');
}

export function formatShortDate(iso: string) {
  return format(new Date(iso), 'MMM d');
}

export function formatTime(iso: string) {
  return format(new Date(iso), 'h:mm a');
}

export function formatMessageTime(iso: string) {
  return format(new Date(iso), 'MMM d, h:mm a');
}

export function formatRange(arrive: string, leave: string) {
  const a = new Date(arrive);
  const l = new Date(leave);
  if (isSameDay(a, l)) {
    return `${format(a, 'EEE, MMM d')} · ${format(a, 'h:mm a')} – ${format(l, 'h:mm a')}`;
  }
  return `${format(a, 'MMM d, h:mm a')} – ${format(l, 'MMM d, h:mm a')}`;
}

export function formatDuration(hours: number) {
  if (hours < 24) {
    const rounded = Math.ceil(hours);
    return `${rounded} ${rounded === 1 ? 'hour' : 'hours'}`;
  }
  const days = Math.floor(hours / 24);
  const rest = Math.ceil(hours - days * 24);
  return rest > 0 ? `${days}d ${rest}h` : `${days} ${days === 1 ? 'day' : 'days'}`;
}

/** Value for <input type="datetime-local" /> */
export function toInputValue(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export function defaultArriveLeave() {
  const arrive = addHours(startOfHour(new Date()), 1);
  return { arrive: toInputValue(arrive), leave: toInputValue(addHours(arrive, 3)) };
}