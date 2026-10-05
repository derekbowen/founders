import React from 'react';
import type { TransactionStatus } from '../../types/transaction';

const styles: Record<TransactionStatus, string> = {
  Requested: 'bg-accent/25 text-warning ring-accent/50',
  Confirmed: 'bg-navy/10 text-navy ring-navy/20',
  Active: 'bg-success/10 text-success ring-success/30',
  Completed: 'bg-ink/5 text-muted ring-line',
  Cancelled: 'bg-danger/10 text-danger ring-danger/25'
};

export function StatusBadge({ status }: {status: TransactionStatus;}) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
      {status === 'Active' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" aria-hidden />}
      {status}
    </span>);

}

export function SpotTypeChip({ label, tone = 'light' }: {label: string;tone?: 'light' | 'solid';}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
      tone === 'solid' ? 'bg-navy text-white' : 'bg-white/95 text-ink shadow-sm'}`
      }>
      
      {label}
    </span>);

}