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

/** 16 → "4 PM" */
export function formatHour(hour: number): string {
  const suffix = hour >= 12 && hour < 24 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h} ${suffix}`;
}

/** 16, 2 → "4:00 – 6:00 PM" */
export function formatHourRange(start: number, hours: number): string {
  const end = start + hours;
  const fmt = (h: number) => `${h % 12 === 0 ? 12 : h % 12}:00`;
  const endSuffix = end >= 12 && end < 24 ? 'PM' : 'AM';
  const startSuffix = start >= 12 ? 'PM' : 'AM';
  return startSuffix === endSuffix ?
  `${fmt(start)} – ${fmt(end)} ${endSuffix}` :
  `${fmt(start)} ${startSuffix} – ${fmt(end)} ${endSuffix}`;
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function getInitials(name: string): string {
  return name.
  split(' ').
  filter(Boolean).
  slice(0, 2).
  map((part) => part[0]?.toUpperCase()).
  join('');
}