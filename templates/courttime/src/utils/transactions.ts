import { TimelineStep, Transaction, TransactionStatus } from '../types/marketplace';
import { dateFromOffset, formatDateShort, formatTimeRange } from './format';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export const statusMeta: Record<TransactionStatus, {label: string;variant: BadgeVariant;}> = {
  booked: { label: 'Booked', variant: 'primary' },
  confirmed: { label: 'Confirmed', variant: 'success' },
  played: { label: 'Played', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'error' },
  'no-show': { label: 'No-show', variant: 'warning' }
};

export const statusOrder: TransactionStatus[] = ['booked', 'confirmed', 'played', 'cancelled', 'no-show'];

export function getTimeline(tx: Transaction): TimelineStep[] {
  const gameDay = `${formatDateShort(dateFromOffset(tx.dayOffset))} · ${formatTimeRange(tx.startHour, tx.hours)}`;
  const steps: TimelineStep[] = [
  { label: 'Booked', detail: 'Booking placed and card charged', state: 'done' }];

  if (tx.status === 'cancelled') {
    steps.push({ label: 'Cancelled', detail: 'Refund issued according to the cancellation policy', state: 'cancelled' });
    return steps;
  }
  const confirmed = tx.status !== 'booked';
  steps.push({
    label: 'Confirmed by host',
    detail: confirmed ? 'Court assigned — you’re all set' : 'Waiting for the host to confirm',
    state: confirmed ? 'done' : 'current'
  });
  const finished = tx.status === 'played' || tx.status === 'no-show';
  steps.push({ label: 'Game day', detail: gameDay, state: finished ? 'done' : confirmed ? 'current' : 'upcoming' });
  if (tx.status === 'no-show') {
    steps.push({ label: 'Marked as no-show', detail: 'No refund for missed bookings', state: 'cancelled' });
  } else {
    steps.push({ label: 'Played', detail: finished ? 'Leave a review for the court' : 'Payout released after play', state: finished ? 'done' : 'upcoming' });
  }
  return steps;
}

export function sortTransactions(list: Transaction[]): Transaction[] {
  const upcoming = list.filter((t) => t.dayOffset >= 0).sort((a, b) => a.dayOffset - b.dayOffset || a.startHour - b.startHour);
  const past = list.filter((t) => t.dayOffset < 0).sort((a, b) => b.dayOffset - a.dayOffset);
  return [...upcoming, ...past];
}