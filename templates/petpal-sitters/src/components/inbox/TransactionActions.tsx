import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../Dialog';
import { Button } from '../ui/Button';
import { TextArea } from '../ui/TextArea';
import { useBookings } from '../../contexts/BookingsContext';
import { statusMeta } from '../../data/statuses';
import type { Transaction } from '../../types/marketplace';
import { cn } from '../../utils/cn';

export function TransactionActions({ tx }: {tx: Transaction;}) {
  const { setStatus } = useBookings();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');
  const first = tx.counterpartName.split(' ')[0];
  const isProvider = tx.role === 'provider';

  const act = (status: Transaction['status'], system: string, toastText: string) => {
    setStatus(tx.id, status, system);
    toast.success(toastText);
  };

  const submitReview = () => {
    if (reviewText.trim().length < 10) {
      setReviewError('Please write at least a sentence about your experience.');
      return;
    }
    setReviewed(true);
    setReviewOpen(false);
    toast.success(`Thanks! Your review of ${first} was published.`);
  };

  let actions: React.ReactNode = null;
  if (isProvider) {
    if (tx.status === 'requested') {
      actions =
      <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => act('cancelled', 'You declined the request', 'Request declined')}>
            Decline
          </Button>
          <Button variant="accent" onClick={() => act('confirmed', 'You accepted the booking', `Booking with ${first} accepted`)}>
            Accept
          </Button>
        </div>;

    } else if (tx.status === 'confirmed') {
      actions =
      <Button fullWidth variant="accent" onClick={() => act('in-care', 'Care started', 'Care started — remember to post photo updates!')}>
          Start care
        </Button>;

    } else if (tx.status === 'in-care') {
      actions =
      <Button fullWidth onClick={() => act('completed', 'Booking completed', 'Booking marked as completed')}>
          Mark as completed
        </Button>;

    }
  } else {
    if (tx.status === 'requested') {
      actions =
      <Button fullWidth variant="danger" onClick={() => act('cancelled', 'You cancelled the request', 'Request cancelled. You were not charged.')}>
          Cancel request
        </Button>;

    } else if (tx.status === 'confirmed') {
      actions =
      <Button fullWidth variant="danger" onClick={() => act('cancelled', 'You cancelled the booking', 'Booking cancelled. A refund is on its way.')}>
          Cancel booking
        </Button>;

    } else if (tx.status === 'completed') {
      actions = reviewed ?
      <p className="rounded-xl bg-accent-50 px-3 py-2.5 text-center text-sm font-bold text-accent-800">You reviewed {first}. Thank you!</p> :

      <Button fullWidth leftIcon={<StarIcon className="h-4 w-4" />} onClick={() => setReviewOpen(true)}>
          Review {first}
        </Button>;

    }
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-stone-100">
      <p className="text-sm font-extrabold text-stone-900">{statusMeta[tx.status].label}</p>
      <p className="mt-0.5 text-sm text-stone-500">
        {isProvider && tx.status === 'requested' ? `Respond within 24 hours to keep your response rate high.` : statusMeta[tx.status].description}
      </p>
      {actions && <div className="mt-4">{actions}</div>}

      <Dialog isOpen={reviewOpen} onClose={() => setReviewOpen(false)} size="md">
        <DialogHeader>How was {tx.petNames.join(' & ')}’s experience with {first}?</DialogHeader>
        <DialogContent>
          <div className="space-y-5 py-2">
            <div className="flex gap-1" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) =>
              <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} stars`} onClick={() => setRating(n)} className="p-1">
                  <StarIcon className={cn('h-8 w-8 transition-colors', n <= rating ? 'fill-primary-400 text-primary-400' : 'fill-stone-200 text-stone-200')} />
                </button>
              )}
            </div>
            <TextArea
              id="review-text"
              label="Your review"
              rows={4}
              value={reviewText}
              error={reviewError}
              onChange={(e) => {
                setReviewText(e.target.value);
                setReviewError('');
              }}
              placeholder={`What did you love about ${first}’s care?`} />
            
          </div>
        </DialogContent>
        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onClick={() => setReviewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitReview}>Publish review</Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>);

}