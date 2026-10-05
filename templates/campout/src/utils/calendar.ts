import { addMonths, endOfMonth, getDay, startOfMonth } from 'date-fns';

/** Returns a 7-column grid of dates (null = padding) for the given month */
export function monthGrid(month: Date): (Date | null)[] {
  const first = startOfMonth(month);
  const last = endOfMonth(month);
  const cells: (Date | null)[] = Array.from({ length: getDay(first) }, () => null);
  for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(first.getFullYear(), first.getMonth(), d));
  return cells;
}

export function nextMonths(from: Date, count: number): Date[] {
  return Array.from({ length: count }, (_, i) => startOfMonth(addMonths(from, i)));
}