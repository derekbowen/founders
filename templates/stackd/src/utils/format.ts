import { format, formatDistanceToNowStrict, parseISO } from 'date-fns';
import { brand } from '../data/brand';
import type { Listing } from '../types/marketplace';

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatMoneyExact(amount: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: 2
  }).format(amount);
}

/** Lowest price a buyer can pay for a listing. */
export function basePrice(listing: Listing): number {
  return listing.payWhatYouWant ? listing.minPrice : listing.price;
}

export function isFree(listing: Listing): boolean {
  return basePrice(listing) === 0;
}

/** Short label used on cards: "$14", "$5+", "Free+" */
export function priceLabel(listing: Listing): string {
  const base = basePrice(listing);
  if (listing.payWhatYouWant) return base === 0 ? '$0+' : `${formatMoney(base)}+`;
  return base === 0 ? 'Free' : formatMoney(base);
}

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy');
}

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy · h:mm a');
}

export function formatTime(iso: string): string {
  return format(parseISO(iso), 'h:mm a');
}

export function timeAgo(iso: string): string {
  return `${formatDistanceToNowStrict(parseISO(iso))} ago`;
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat(brand.locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

/** "#FF5A1F" -> "255 90 31" for use in rgb(var(--x) / alpha) */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

export function toKebab(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function slugify(value: string): string {
  return value.
  toLowerCase().
  replace(/[^a-z0-9]+/g, '-').
  replace(/(^-|-$)/g, '');
}