import { differenceInCalendarDays } from 'date-fns';
import { brand } from '../data/brand';
import type { Listing } from '../types/listing';
import { getListingService, getServiceMeta } from './listing';
import { formatMoney, pluralize } from './format';

export interface LineItem {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  units: number;
  unitLabel: string;
  basePrice: number;
  lineItems: LineItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
}

interface BreakdownInput {
  listing: Listing;
  serviceId: string;
  variantId: string;
  start?: Date | null;
  end?: Date | null;
  petCount: number;
}

const round = (n: number) => Math.round(n * 100) / 100;

export function calculateBreakdown(input: BreakdownInput): PriceBreakdown | null {
  const { listing, serviceId, variantId, start, end, petCount } = input;
  const service = getListingService(listing, serviceId);
  const meta = getServiceMeta(serviceId);
  if (!service || !meta) return null;
  const variant = service.variants.find((v) => v.id === variantId) ?? service.variants[0];

  let units = 1;
  if (meta.unitType === 'night') {
    if (!start || !end) return null;
    units = differenceInCalendarDays(end, start);
    if (units < 1) return null;
  } else if (!start) {
    return null;
  }

  const extraPets = Math.max(0, petCount - 1);
  const baseTotal = round(variant.price * units);
  const extraTotal = round(extraPets * service.extraPetFee * units);
  const lineItems: LineItem[] = [
  {
    label: `${variant.label} · ${formatUnit(variant.price)} × ${pluralize(units, meta.unitLabel)}`,
    amount: baseTotal
  }];

  if (extraPets > 0) {
    lineItems.push({
      label: `Additional ${pluralize(extraPets, 'pet')} · ${formatUnit(service.extraPetFee)} × ${pluralize(units, meta.unitLabel)}`,
      amount: extraTotal
    });
  }
  const subtotal = round(baseTotal + extraTotal);
  const serviceFee = round(subtotal * brand.marketplace.serviceFeeRate);

  return {
    units,
    unitLabel: meta.unitLabel,
    basePrice: variant.price,
    lineItems,
    subtotal,
    serviceFee,
    total: round(subtotal + serviceFee)
  };
}

function formatUnit(n: number): string {
  return formatMoney(n);
}