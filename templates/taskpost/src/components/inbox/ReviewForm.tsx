import React, { useState } from 'react';
import { toast } from 'sonner';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../hooks/useApp';
import { cn, textareaClass } from '../../utils/styles';

export function ReviewForm({ txId, proName }: {txId: string;proName: string;}) {
  const { leaveReview } = useApp();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return setError('Choose a star rating.');
    leaveReview(txId, rating, text.trim());
    toast.success('Thanks for your review!');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <fieldset>
        <legend className="text-sm font-bold text-ink-900">How did {proName} do?</legend>
        <div className="mt-2 flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) =>
          <button
            key={n}
            type="button"
            onClick={() => {
              setRating(n);
              setError('');
            }}
            onMouseEnter={() => setHover(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-pressed={rating === n}
            className="rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            
              <StarIcon
              className={cn('h-7 w-7 transition-colors', (hover || rating) >= n ? 'fill-amber-400 text-amber-400' : 'text-ink-300')} />
            
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs font-semibold text-red-700">{error}</p>}
      </fieldset>
      <label htmlFor={`review-${txId}`} className="sr-only">
        Review
      </label>
      <textarea
        id={`review-${txId}`}
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share what went well…"
        className={cn(textareaClass, 'min-h-[88px]')} />
      
      <Button type="submit" fullWidth>
        Submit review
      </Button>
    </form>);

}