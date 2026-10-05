import { brand } from '../data/brand';

const formatter = new Intl.NumberFormat(brand.locale, {
  style: 'currency',
  currency: brand.currency,
  maximumFractionDigits: 0
});

export function formatMoney(amount: number): string {
  return formatter.format(amount);
}