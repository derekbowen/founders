import { differenceInCalendarDays, parseISO } from 'date-fns';
import { brand } from '../data/brand';

const { currency, locale, daysPerMonth, serviceFeeRate, hostCommissionRate } = brand.marketplace;

export function formatMoney(amount: number, fractionDigits = 0): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount);
}

export function dailyRate(monthlyPrice: number): number {
  return monthlyPrice / daysPerMonth;
}

export interface PriceEstimate {
  days: number;
  ongoing: boolean;
  dailyRate: number;
  base: number;
  serviceFee: number;
  deposit: number;
  dueToday: number;
  monthlyEstimate: number;
}

export function estimateBooking(params: {
  monthlyPrice: number;
  deposit: number;
  moveIn: string;
  moveOut: string | null;
}): PriceEstimate | null {
  const { monthlyPrice, deposit, moveIn, moveOut } = params;
  if (!moveIn) return null;
  const ongoing = !moveOut;
  const days = ongoing ?
  daysPerMonth :
  differenceInCalendarDays(parseISO(moveOut as string), parseISO(moveIn));
  if (days <= 0) return null;
  const rate = dailyRate(monthlyPrice);
  const base = Math.round(rate * days * 100) / 100;
  const serviceFee = Math.round(base * serviceFeeRate * 100) / 100;
  return {
    days,
    ongoing,
    dailyRate: rate,
    base,
    serviceFee,
    deposit,
    dueToday: base + serviceFee + deposit,
    monthlyEstimate: Math.round(monthlyPrice * (1 + serviceFeeRate))
  };
}

export function hostPayout(monthly: number): number {
  return Math.round(monthly * (1 - hostCommissionRate));
}