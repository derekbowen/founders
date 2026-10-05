import { Offer, Transaction, TxRole, TxStatus } from '../types/marketplace';
import { CURRENT_USER_ID } from '../data/users';

export const statusMeta: Record<TxStatus, {label: string;className: string;dot: string;}> = {
  'quote-requested': { label: 'Quote requested', className: 'bg-amber-50 text-amber-800 ring-amber-200', dot: 'bg-amber-500' },
  'offer-sent': { label: 'Offer sent', className: 'bg-primary-50 text-primary-700 ring-primary-200', dot: 'bg-primary-500' },
  countered: { label: 'Countered', className: 'bg-orange-50 text-orange-800 ring-orange-200', dot: 'bg-orange-500' },
  accepted: { label: 'Accepted', className: 'bg-sky-50 text-sky-800 ring-sky-200', dot: 'bg-sky-500' },
  delivered: { label: 'Delivered', className: 'bg-accent-50 text-accent-800 ring-accent-200', dot: 'bg-accent-500' },
  completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-800 ring-emerald-200', dot: 'bg-emerald-600' },
  declined: { label: 'Declined', className: 'bg-rose-50 text-rose-700 ring-rose-200', dot: 'bg-rose-500' }
};

export const timelineOrder: TxStatus[] = ['quote-requested', 'offer-sent', 'accepted', 'delivered', 'completed'];

export function roleFor(tx: Transaction): TxRole {
  return tx.clientId === CURRENT_USER_ID ? 'client' : 'freelancer';
}

export function latestOffer(tx: Transaction): Offer | undefined {
  return tx.offers[tx.offers.length - 1];
}

export function pendingOffer(tx: Transaction): Offer | undefined {
  const last = latestOffer(tx);
  return last && last.status === 'pending' ? last : undefined;
}

export function acceptedOffer(tx: Transaction): Offer | undefined {
  return tx.offers.find((o) => o.status === 'accepted');
}