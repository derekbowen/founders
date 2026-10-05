import { brand } from '../data/brand';
import type { PriceTier, Product } from '../types/marketplace';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function getBaseUnitPrice(product: Product): number {
  return product.tiers[0].unitPrice;
}

export function getTierForCases(product: Product, cases: number): PriceTier {
  return (
    product.tiers.find((t) => cases >= t.minCases && (t.maxCases === null || cases <= t.maxCases)) ??
    product.tiers[0]);

}

export function getMarginPercent(wholesale: number, msrp: number): number {
  if (msrp <= 0) return 0;
  return Math.round((1 - wholesale / msrp) * 100);
}

export function getProductMargin(product: Product): number {
  return getMarginPercent(getBaseUnitPrice(product), product.msrp);
}

export function getCasePrice(product: Product, cases = 1): number {
  return getTierForCases(product, cases).unitPrice * product.casePack;
}

export function getLineTotal(product: Product, cases: number): number {
  return getTierForCases(product, cases).unitPrice * product.casePack * cases;
}

export function getLineSavings(product: Product, cases: number): number {
  const base = getBaseUnitPrice(product) * product.casePack * cases;
  return base - getLineTotal(product, cases);
}

export function formatTierRange(tier: PriceTier): string {
  if (tier.maxCases === null) return `${tier.minCases}+ cases`;
  if (tier.minCases === tier.maxCases) return `${tier.minCases} case${tier.minCases > 1 ? 's' : ''}`;
  return `${tier.minCases}–${tier.maxCases} cases`;
}

export function getTierDiscount(product: Product, tier: PriceTier): number {
  const base = getBaseUnitPrice(product);
  return Math.round((1 - tier.unitPrice / base) * 100);
}

export function getShippingForSubtotal(subtotal: number): number {
  return subtotal >= brand.freeShippingThreshold ? 0 : brand.flatShippingRate;
}