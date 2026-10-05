import { addDays, format, getDay, parseISO, startOfDay } from 'date-fns';
import type { DayKey, Tutor } from '../types/marketplace';

const DAY_KEYS_BY_INDEX: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export type SlotState = 'open' | 'booked' | 'past' | 'unavailable';

export function dayKeyOf(date: Date): DayKey {
  return DAY_KEYS_BY_INDEX[getDay(date)];
}

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function fromDateKey(key: string): Date {
  return parseISO(key);
}

export function getUpcomingDays(count: number, offset = 0): Date[] {
  const today = startOfDay(new Date());
  return Array.from({ length: count }, (_, i) => addDays(today, i + offset));
}

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = h * 31 + value.charCodeAt(i) | 0;
  return Math.abs(h);
}

/** Deterministic mock "already booked" slots so calendars look realistic. */
export function isSlotBooked(tutorId: string, date: Date, hour: number): boolean {
  return hash(`${tutorId}-${toDateKey(date)}-${hour}`) % 5 === 0;
}

export function getSlotState(tutor: Tutor, date: Date, hour: number): SlotState {
  if (!tutor.availability[dayKeyOf(date)].includes(hour)) return 'unavailable';
  const slot = new Date(date);
  slot.setHours(hour, 0, 0, 0);
  // Require at least 2 hours notice
  if (slot.getTime() < Date.now() + 2 * 60 * 60 * 1000) return 'past';
  if (isSlotBooked(tutor.id, date, hour)) return 'booked';
  return 'open';
}

export function getOpenHours(tutor: Tutor, date: Date): number[] {
  return tutor.availability[dayKeyOf(date)].filter((h) => getSlotState(tutor, date, h) === 'open');
}

export function canBookRange(tutor: Tutor, date: Date, startHour: number, hours: number): boolean {
  return Array.from({ length: hours }, (_, i) => startHour + i).every(
    (h) => getSlotState(tutor, date, h) === 'open'
  );
}

/** Earliest and latest hour across the tutor's weekly availability. */
export function getHourBounds(tutor: Tutor): [number, number] {
  const all = Object.values(tutor.availability).flat();
  if (all.length === 0) return [9, 17];
  return [Math.min(...all), Math.max(...all)];
}

export function getWeeklyHours(tutor: Tutor): number {
  return Object.values(tutor.availability).reduce((sum, hours) => sum + hours.length, 0);
}

/** First open date + hour within the next two weeks, if any. */
export function getNextOpenSlot(tutor: Tutor): {date: Date;hour: number;} | null {
  for (const date of getUpcomingDays(14)) {
    const open = getOpenHours(tutor, date);
    if (open.length > 0) return { date, hour: open[0] };
  }
  return null;
}