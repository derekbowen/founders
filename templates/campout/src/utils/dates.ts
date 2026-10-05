import { addDays, differenceInCalendarDays, format, isValid, parseISO } from 'date-fns';

/** Fixed "today" so mock data stays coherent */
export const TODAY = new Date(2026, 9, 1);

export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function defaultStay(): {start: string;end: string;} {
  return { start: toISODate(addDays(TODAY, 8)), end: toISODate(addDays(TODAY, 10)) };
}

function parse(iso: string): Date | null {
  if (!iso) return null;
  const d = parseISO(iso);
  return isValid(d) ? d : null;
}

export function nightsBetween(start: string, end: string): number {
  const a = parse(start);
  const b = parse(end);
  if (!a || !b) return 0;
  return Math.max(0, differenceInCalendarDays(b, a));
}

export function formatDay(iso: string): string {
  const d = parse(iso);
  return d ? format(d, 'EEE, MMM d') : '—';
}

export function formatRange(start: string, end: string): string {
  const a = parse(start);
  const b = parse(end);
  if (!a || !b) return 'Add dates';
  if (a.getMonth() === b.getMonth()) return `${format(a, 'MMM d')} – ${format(b, 'd, yyyy')}`;
  return `${format(a, 'MMM d')} – ${format(b, 'MMM d, yyyy')}`;
}

export function formatTimestamp(iso: string): string {
  const d = parse(iso);
  return d ? format(d, 'MMM d, h:mm a') : '';
}

export function formatShortTimestamp(iso: string): string {
  const d = parse(iso);
  return d ? format(d, 'MMM d') : '';
}

export function plusDays(iso: string, days: number): string {
  const d = parse(iso) ?? TODAY;
  return toISODate(addDays(d, days));
}