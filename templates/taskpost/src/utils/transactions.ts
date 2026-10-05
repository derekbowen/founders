import { brand } from '../data/brand';
import type { Offer, Transaction, TransactionStatus, UserRole } from '../types/marketplace';

export const statusLabels: Record<TransactionStatus, string> = {
  offer_sent: 'Offer sent',
  countered: 'Countered',
  accepted: 'Accepted',
  paid: 'Paid',
  completed: 'Completed',
  declined: 'Declined'
};

export function viewerRole(tx: Transaction, userId: string): UserRole {
  return tx.customerId === userId ? 'customer' : 'pro';
}

export function getActiveOffer(tx: Transaction): Offer | undefined {
  return tx.offers.find((o) => o.state === 'active');
}

export function getLatestOffer(tx: Transaction): Offer {
  return tx.offers[tx.offers.length - 1];
}

export function getAgreedOffer(tx: Transaction): Offer | undefined {
  return tx.offers.find((o) => o.state === 'accepted');
}

export function isNegotiating(tx: Transaction): boolean {
  return tx.status === 'offer_sent' || tx.status === 'countered';
}

/** Whose move it is during negotiation — the party that did NOT make the active offer. */
export function whoseTurn(tx: Transaction): UserRole | null {
  const active = getActiveOffer(tx);
  if (!isNegotiating(tx) || !active) return null;
  return active.by === 'pro' ? 'customer' : 'pro';
}

export function needsAction(tx: Transaction, userId: string): boolean {
  const role = viewerRole(tx, userId);
  if (isNegotiating(tx)) return whoseTurn(tx) === role;
  if (tx.status === 'accepted') return role === 'customer';
  if (tx.status === 'paid') return role === 'pro' ? !tx.proMarkedDone : tx.proMarkedDone;
  if (tx.status === 'completed') return role === 'customer' && !tx.review;
  return false;
}

export function customerFee(amount: number): number {
  return Math.round(amount * brand.fees.customerServiceRate * 100) / 100;
}

export function customerTotal(amount: number): number {
  return Math.round((amount + customerFee(amount)) * 100) / 100;
}

export function proCommission(amount: number): number {
  return Math.round(amount * brand.fees.proCommissionRate * 100) / 100;
}

export function proPayout(amount: number): number {
  return Math.round((amount - proCommission(amount)) * 100) / 100;
}