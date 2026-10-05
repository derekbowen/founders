import type { ChecklistItem, Transaction, TxStatus } from '../types/marketplace';

export const statusMeta: Record<TxStatus, {label: string;className: string;description: string;}> = {
  requested: {
    label: 'Requested',
    className: 'bg-warning/10 text-warning ring-warning/25',
    description: 'Waiting for the owner to accept. You won’t be charged until they do.'
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-sea/10 text-sea ring-sea/25',
    description: 'You’re booked! Complete the pre-departure checklist before your trip.'
  },
  'on-the-water': {
    label: 'On the water',
    className: 'bg-navy text-white ring-navy',
    description: 'Trip in progress. Have a great time and stay safe out there.'
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/10 text-success ring-success/25',
    description: 'Trip complete. The fuel deposit is released within 3 business days.'
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-danger/10 text-danger ring-danger/25',
    description: 'This booking was cancelled. Any eligible refund has been issued.'
  }
};

export const statusOrder: TxStatus[] = ['requested', 'confirmed', 'on-the-water', 'completed'];

export interface TimelineStep {
  status: TxStatus;
  label: string;
  at?: string;
  state: 'done' | 'current' | 'upcoming' | 'cancelled';
}

export function getTimeline(tx: Transaction): TimelineStep[] {
  const labels: Record<TxStatus, string> = {
    requested: 'Booking requested',
    confirmed: 'Owner confirmed',
    'on-the-water': 'Departed marina',
    completed: 'Trip completed',
    cancelled: 'Booking cancelled'
  };
  if (tx.status === 'cancelled') {
    const reached = statusOrder.filter((s) => tx.history[s]);
    return [
    ...reached.map((s) => ({ status: s, label: labels[s], at: tx.history[s], state: 'done' as const })),
    { status: 'cancelled', label: labels.cancelled, at: tx.history.cancelled, state: 'cancelled' }];

  }
  const currentIdx = statusOrder.indexOf(tx.status);
  return statusOrder.map((s, i) => ({
    status: s,
    label: labels[s],
    at: tx.history[s],
    state: i < currentIdx ? 'done' : i === currentIdx ? s === 'completed' ? 'done' : 'current' : 'upcoming'
  }));
}

export function defaultChecklist(withCaptain: boolean): ChecklistItem[] {
  const items = [
  'Bring photo ID for every adult guest',
  'Review the marine forecast the evening before',
  'Pack sunscreen, water and non-marking shoes',
  'Confirm final guest count with the owner',
  'Find the departure slip and parking'];

  if (!withCaptain) items.splice(1, 0, 'Upload boater education card or license');
  return items.map((label, i) => ({ id: `ck-${i}`, label, done: false }));
}

export function withDone(items: ChecklistItem[], doneCount: number): ChecklistItem[] {
  return items.map((item, i) => ({ ...item, done: i < doneCount }));
}