import { brand } from '../data/brand';

export interface PriceBreakdown {
  rate: number;
  hours: number;
  lessons: number;
  perLesson: number;
  subtotal: number;
  discountPercent: number;
  discount: number;
  serviceFee: number;
  total: number;
}

const round = (n: number) => Math.round(n * 100) / 100;

export function calculatePrice(
rate: number,
hours: number,
lessons: number,
discountPercent: number)
: PriceBreakdown {
  const perLesson = round(rate * hours);
  const subtotal = round(perLesson * lessons);
  const discount = round(subtotal * discountPercent / 100);
  const serviceFee = round((subtotal - discount) * brand.serviceFeeRate);
  const total = round(subtotal - discount + serviceFee);
  return { rate, hours, lessons, perLesson, subtotal, discountPercent, discount, serviceFee, total };
}

export function calculateTutorEarnings(rate: number): number {
  return round(rate * (1 - brand.tutorCommissionRate));
}