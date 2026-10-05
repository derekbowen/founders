import { format, parseISO } from 'date-fns';

export function formatDate(iso: string, pattern = 'EEE, MMM d, yyyy'): string {
  if (!iso) return '';
  try {
    return format(parseISO(iso), pattern);
  } catch {
    return iso;
  }
}

export function formatDateTime(iso: string): string {
  return formatDate(iso, 'MMM d · h:mm a');
}

export function memberSince(iso: string): string {
  return formatDate(iso, 'MMMM yyyy');
}

export function todayIso(): string {
  return format(new Date(), 'yyyy-MM-dd');
}