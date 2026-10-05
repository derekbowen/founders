import { marketplaceFees, services } from '../data/services';
import type { Listing, ServiceDefinition, ServiceId } from '../types/marketplace';
import { formatMoney, pluralize } from './format';

export interface LineItem {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  lines: LineItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
  commission: number;
  payout: number;
}

interface BreakdownInput {
  unitPrice: number;
  units: number;
  pets: number;
  extraPetPrice: number;
  unitLabel: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function computeBreakdown({ unitPrice, units, pets, extraPetPrice, unitLabel }: BreakdownInput): PriceBreakdown {
  const base = unitPrice * units;
  const extraPets = Math.max(0, pets - 1);
  const extra = extraPets * extraPetPrice * units;
  const lines: LineItem[] = [
  { label: `${formatMoney(unitPrice)} × ${units} ${pluralize(unitLabel, units)}`, amount: base }];

  if (extra > 0) {
    lines.push({
      label: `${extraPets} additional ${pluralize('pet', extraPets)} × ${formatMoney(extraPetPrice)} × ${units}`,
      amount: extra
    });
  }
  const subtotal = base + extra;
  const serviceFee = round2(subtotal * marketplaceFees.customerFeePercent / 100);
  const commission = round2(subtotal * marketplaceFees.providerCommissionPercent / 100);
  return {
    lines,
    subtotal,
    serviceFee,
    total: round2(subtotal + serviceFee),
    commission,
    payout: round2(subtotal - commission)
  };
}

export function getService(id: ServiceId): ServiceDefinition {
  return services.find((s) => s.id === id) ?? services[0];
}

export function getStartingPrice(listing: Listing, serviceId?: ServiceId | null) {
  const offerings = serviceId ?
  listing.services.filter((o) => o.serviceId === serviceId) :
  listing.services.filter((o) => getService(o.serviceId).unitType === 'night');
  const pool = offerings.length > 0 ? offerings : listing.services;
  let best = { price: Infinity, unitLabel: 'night', serviceId: pool[0].serviceId };
  pool.forEach((o) => {
    o.variations.forEach((v) => {
      if (v.price < best.price) {
        best = { price: v.price, unitLabel: getService(o.serviceId).unitLabel, serviceId: o.serviceId };
      }
    });
  });
  return best;
}