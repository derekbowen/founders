import { brand } from '../data/brand';
import type { Listing } from '../types/listing';
import { formatMoney } from './currency';

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  nights: number;
  lines: PriceLine[];
  total: number;
}

export function computeBreakdown(listing: Listing, nights: number, campers: number): PriceBreakdown {
  if (nights <= 0) return { nights: 0, lines: [], total: 0 };
  const lines: PriceLine[] = [
  {
    label: `${formatMoney(listing.price)} × ${nights} ${nights === 1 ? brand.unitLabel : `${brand.unitLabel}s`}`,
    amount: listing.price * nights
  }];

  const extra = Math.max(0, campers - listing.includedCampers);
  if (extra > 0 && listing.extraCamperFee > 0) {
    lines.push({
      label: `Extra campers (${extra} × ${formatMoney(listing.extraCamperFee)} × ${nights})`,
      amount: extra * listing.extraCamperFee * nights
    });
  }
  if (listing.cleaningFee > 0) {
    lines.push({ label: 'Site cleaning fee', amount: listing.cleaningFee });
  }
  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  lines.push({ label: `${brand.name} service fee`, amount: Math.round(subtotal * brand.serviceFeeRate) });
  return { nights, lines, total: lines.reduce((sum, l) => sum + l.amount, 0) };
}