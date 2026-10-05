import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../Dialog';
import type { Transaction, TxStatus } from '../../types/transaction';
import { BrandButton } from '../ui/BrandButton';

interface TransactionActionsProps {
  tx: Transaction;
  viewer: 'customer' | 'provider';
  onStatus: (status: TxStatus) => void;
}

export function TransactionActions({ tx, viewer, onStatus }: TransactionActionsProps) {
  const [confirmCancel, setConfirmCancel] = useState(false);

  const cancelLabel =
  viewer === 'provider' && tx.status === 'requested' ?
  'Decline' :
  tx.status === 'requested' ?
  'Cancel request' :
  'Cancel booking';

  let primary: {label: string;status: TxStatus;} | null = null;
  if (viewer === 'provider') {
    if (tx.status === 'requested') primary = { label: 'Accept booking', status: 'confirmed' };
    if (tx.status === 'confirmed') primary = { label: 'Mark as checked in', status: 'checked-in' };
    if (tx.status === 'checked-in') primary = { label: 'Mark as completed', status: 'completed' };
  } else {
    if (tx.status === 'confirmed') primary = { label: 'Check in now', status: 'checked-in' };
    if (tx.status === 'checked-in') primary = { label: 'Check out', status: 'completed' };
  }
  const canCancel = tx.status === 'requested' || tx.status === 'confirmed';

  return (
    <div className="flex flex-wrap gap-2">
      {primary && <BrandButton onClick={() => onStatus(primary!.status)}>{primary.label}</BrandButton>}
      {canCancel &&
      <BrandButton tone="danger" onClick={() => setConfirmCancel(true)}>
          {cancelLabel}
        </BrandButton>
      }
      {tx.status === 'completed' && viewer === 'customer' &&
      <Link to={`/l/${tx.listingId}`} className="btn-secondary">
          Book again
        </Link>
      }
      {tx.status === 'cancelled' && viewer === 'customer' &&
      <Link to="/s" className="btn-secondary">
          Find another space
        </Link>
      }

      <Dialog isOpen={confirmCancel} onClose={() => setConfirmCancel(false)} size="sm">
        <DialogHeader>
          <span className="font-display text-lg font-semibold">{cancelLabel}?</span>
        </DialogHeader>
        <DialogContent>
          <p className="text-sm text-ink-muted">
            {viewer === 'provider' ?
            'The guest will be notified and fully refunded.' :
            'Cancelling more than 24 hours before your booking is free. Within 24 hours, 50% is refunded.'}
          </p>
        </DialogContent>
        <DialogFooter>
          <div className="flex justify-end gap-2">
            <BrandButton tone="secondary" onClick={() => setConfirmCancel(false)}>
              Keep booking
            </BrandButton>
            <BrandButton
              tone="danger"
              onClick={() => {
                onStatus('cancelled');
                setConfirmCancel(false);
              }}>
              
              {cancelLabel}
            </BrandButton>
          </div>
        </DialogFooter>
      </Dialog>
    </div>);

}