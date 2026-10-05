import type { Transaction, TransactionStatus } from '../types/marketplace';

export const statusMeta: Record<TransactionStatus, {label: string;description: string;className: string;}> = {
  booked: { label: 'Booked', description: 'Waiting for the host to confirm', className: 'bg-amber-100 text-amber-900' },
  confirmed: { label: 'Confirmed', description: 'You’re all set', className: 'bg-accent-100 text-accent-900' },
  completed: { label: 'Completed', description: 'Experience finished', className: 'bg-slate-200 text-slate-800' },
  cancelled: { label: 'Cancelled', description: 'This booking was cancelled', className: 'bg-red-100 text-red-800' },
  refunded: { label: 'Refunded', description: 'Payment returned to card', className: 'bg-primary-100 text-primary-900' }
};

export interface TimelineStep {
  label: string;
  detail: string;
  state: 'done' | 'current' | 'upcoming' | 'failed';
}

export function buildTimeline(tx: Transaction): TimelineStep[] {
  const s = tx.status;
  const steps: TimelineStep[] = [
  { label: 'Booking requested', detail: 'Payment authorized', state: 'done' },
  {
    label: 'Host confirmed',
    detail: s === 'booked' ? 'Usually within a few hours' : 'Seats reserved',
    state: s === 'booked' ? 'current' : s === 'cancelled' || s === 'refunded' ? 'done' : 'done'
  }];

  if (s === 'cancelled') {
    steps.push({ label: 'Cancelled', detail: 'Booking cancelled before the experience', state: 'failed' });
    return steps;
  }
  if (s === 'refunded') {
    steps.push({ label: 'Cancelled by host', detail: 'Weather or safety call', state: 'failed' });
    steps.push({ label: 'Refunded', detail: 'Full refund issued to your card', state: 'done' });
    return steps;
  }
  steps.push({
    label: 'Experience day',
    detail: 'Meet your host at the meeting point',
    state: s === 'completed' ? 'done' : s === 'confirmed' ? 'current' : 'upcoming'
  });
  steps.push({
    label: 'Review',
    detail: 'Share how it went',
    state: s === 'completed' ? 'current' : 'upcoming'
  });
  return steps;
}