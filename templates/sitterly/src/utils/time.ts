import { format } from 'date-fns';
import { formatTime } from './format';

const pad = (n: number) => String(n).padStart(2, '0');

export const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const value = `${pad(Math.floor(i / 2))}:${i % 2 ? '30' : '00'}`;
  return { value, label: formatTime(value) };
});

/** Hours between two HH:mm values; wraps past midnight for overnight bookings */
export function hoursBetween(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let diff = eh * 60 + em - (sh * 60 + sm);
  if (diff <= 0) diff += 24 * 60;
  return diff / 60;
}

export function addHours(hhmm: string, hours: number): string {
  const [h, m] = hhmm.split(':').map(Number);
  const total = (h * 60 + m + hours * 60) % (24 * 60);
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

export function crossesMidnight(start: string, end: string): boolean {
  return end <= start;
}

export function todayIso(): string {
  return format(new Date(), 'yyyy-MM-dd');
}