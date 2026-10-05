import { format, getDay, parseISO } from 'date-fns';
import type { DayHours } from '../types/listing';

export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function fromMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function hoursForDate(hours: DayHours[], date: string): DayHours {
  const index = (getDay(parseISO(date)) + 6) % 7;
  return hours[index];
}

export function timeSlots(open: string, close: string, stepMinutes = 30): string[] {
  const slots: string[] = [];
  for (let t = toMinutes(open); t <= toMinutes(close); t += stepMinutes) {
    slots.push(fromMinutes(t));
  }
  return slots;
}

export function durationHours(start: string, end: string): number {
  return (toMinutes(end) - toMinutes(start)) / 60;
}

export function formatDate(date: string, pattern = 'EEE d MMM yyyy'): string {
  return format(parseISO(date), pattern);
}

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), 'd MMM, HH:mm');
}