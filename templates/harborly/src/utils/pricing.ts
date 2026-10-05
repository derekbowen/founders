import { brand } from '../data/brand';
import { packages } from '../data/booking';
import type { Listing, PackageId } from '../types/marketplace';

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function isCaptainIncluded(listing: Listing, withCaptain: boolean): boolean {
  return listing.captainMode === 'required' || listing.captainMode === 'optional' && withCaptain;
}

export function getPackage(pkg: PackageId) {
  return packages.find((p) => p.id === pkg) ?? packages[1];
}

export interface PriceBreakdown {
  base: number;
  captainFee: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  fuelDeposit: number;
  hours: number;
}

export function getPriceBreakdown(listing: Listing, pkg: PackageId, withCaptain: boolean): PriceBreakdown {
  const base = pkg === 'half' ? listing.pricing.halfDay : listing.pricing.fullDay;
  const captainFee = isCaptainIncluded(listing, withCaptain) ?
  pkg === 'half' ?
  listing.pricing.captainHalfDay :
  listing.pricing.captainFullDay :
  0;
  const subtotal = base + captainFee;
  const serviceFee = Math.round(subtotal * brand.serviceFeeRate);
  return {
    base,
    captainFee,
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
    fuelDeposit: listing.pricing.fuelDeposit,
    hours: getPackage(pkg).hours
  };
}