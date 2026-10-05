import { brand } from "../data/brand";
import { OrderStatus, Unit } from "../types/marketplace";

const currency = new Intl.NumberFormat(brand.locale, {
  style: "currency",
  currency: brand.currency
});

export function formatPrice(value: number): string {
  return currency.format(value);
}

export function formatUnit(unit: Unit): string {
  return `/ ${unit}`;
}

export function pluralUnit(unit: Unit, qty: number): string {
  if (qty === 1) return unit;
  if (unit === "bunch") return "bunches";
  if (unit === "loaf") return "loaves";
  if (unit === "half dozen") return "half dozens";
  if (unit === "dozen") return "dozen";
  if (unit === "lb") return "lb";
  return `${unit}s`;
}

export function initials(name: string): string {
  return name.
  split(" ").
  map((p) => p[0]).
  slice(0, 2).
  join("").
  toUpperCase();
}

export const statusLabels: Record<OrderStatus, string> = {
  ordered: "Ordered",
  ready: "Ready for pickup",
  "out-for-delivery": "Out for delivery",
  received: "Received",
  cancelled: "Cancelled"
};

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(brand.locale, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(brand.locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}