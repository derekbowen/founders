import { addDays, format } from 'date-fns';
import type { Departure, Experience } from '../types/marketplace';

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Deterministic mock availability per experience/date/time. */
export function getDepartures(experience: Experience, dateISO: string): Departure[] {
  return experience.departureTimes.map((time) => {
    const seed = hash(`${experience.id}-${dateISO}-${time}`);
    const roll = seed % 10;
    const seatsLeft = roll === 0 ? 0 : roll < 3 ? 1 + seed % 3 : experience.maxGuests - seed % 4;
    return {
      time,
      capacity: experience.maxGuests,
      seatsLeft: Math.max(0, Math.min(experience.maxGuests, seatsLeft))
    };
  });
}

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function nextDaysISO(count: number, start = new Date()): string[] {
  return Array.from({ length: count }, (_, i) => format(addDays(start, i + 1), 'yyyy-MM-dd'));
}

export function calculatePrice(
experience: Experience,
guests: number,
privateGroup: boolean,
serviceFeeRate: number)
{
  const subtotal = privateGroup ?
  experience.privateGroupPrice :
  experience.pricePerPerson * guests;
  const serviceFee = Math.round(subtotal * serviceFeeRate * 100) / 100;
  return { subtotal, serviceFee, total: subtotal + serviceFee };
}