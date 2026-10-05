import { format, formatDistanceToNowStrict, isToday, isYesterday, parseISO } from "date-fns";
import { brand } from "../data/brand";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: "currency",
    currency: brand.currency,
    maximumFractionDigits: 0
  }).format(amount);
}

/** "per guest" reads naturally after a price; other units get a separator ("· venue rental") */
export function priceSuffix(unit: string): string {
  return unit.startsWith("per") ? unit : `· ${unit}`;
}

export function formatPackagePrice(amount: number): string {
  return amount === 0 ? "Complimentary" : formatPrice(amount);
}

export function formatDate(iso: string, pattern = "MMM d, yyyy"): string {
  if (!iso) return "";
  return format(parseISO(iso), pattern);
}

export function formatMessageTime(iso: string): string {
  const date = parseISO(iso);
  if (isToday(date)) return format(date, "h:mm a");
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMM d");
}

export function formatAgo(iso: string): string {
  return `${formatDistanceToNowStrict(parseISO(iso))} ago`;
}

export function initialsOf(name: string): string {
  return name.
  split(/\s|&/).
  filter(Boolean).
  slice(0, 2).
  map((part) => part[0]?.toUpperCase() ?? "").
  join("");
}

export function pluralize(count: number, word: string, plural = `${word}s`): string {
  return `${count} ${count === 1 ? word : plural}`;
}