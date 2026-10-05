import { brand } from '../data/brand';
import type { Listing, StorageOption, StorageType } from '../types/marketplace';

export interface PriceBreakdown {
  hourly: number;
  hours: number;
  base: number;
  storageItems: StorageOption[];
  storageTotal: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
}

export function calcBreakdown(listing: Listing, hours: number, storage: StorageType[]): PriceBreakdown {
  const base = listing.pricePerHour * hours;
  const storageItems = listing.storage.filter((option) => storage.includes(option.type));
  const storageTotal = storageItems.reduce((sum, option) => sum + option.monthlyPrice, 0);
  const subtotal = base + storageTotal + listing.cleaningFee;
  const serviceFee = Math.round(subtotal * brand.serviceFeeRate * 100) / 100;
  return {
    hourly: listing.pricePerHour,
    hours,
    base,
    storageItems,
    storageTotal,
    cleaningFee: listing.cleaningFee,
    serviceFee,
    total: Math.round((subtotal + serviceFee) * 100) / 100
  };
}