import type { TransactionStatus } from '../types/marketplace';

export const statusMeta: Record<TransactionStatus, {label: string;className: string;description: string;}> = {
  requested: {
    label: 'Requested',
    className: 'bg-primary-100 text-primary-800',
    description: 'Waiting for the sitter to accept.'
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-accent-100 text-accent-800',
    description: 'Booking accepted. Your card has been charged.'
  },
  'in-care': {
    label: 'In care',
    className: 'bg-accent-600 text-white',
    description: 'Care is underway — watch for photo updates.'
  },
  completed: {
    label: 'Completed',
    className: 'bg-stone-200 text-stone-700',
    description: 'This booking is complete.'
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-700',
    description: 'This booking was cancelled. No charge was made.'
  }
};

export const statusOrder: TransactionStatus[] = ['requested', 'confirmed', 'in-care', 'completed'];