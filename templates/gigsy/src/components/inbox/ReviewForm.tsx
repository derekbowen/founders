import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextAreaField } from '../ui/TextAreaField';

interface ReviewFormProps {
  name: string;
  onSubmit: () => void;
}

export function ReviewForm({ name, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  return (
    <form
      noValidate
      className="mt-4 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!rating) {
          setError('Select a star rating.');
          return;
        }
        onSubmit();
      }}>
      
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-slate-800">How was working with {name}?</legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) =>
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-pressed={rating === n}
            onMouseEnter={() => setHover(n)}
            onClick={() => {
              setRating(n);
              setError('');
            }}
            className="rounded-md p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            
              <StarIcon className={`h-7 w-7 transition-colors ${(hover || rating) >= n ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-300'}`} />
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
      </fieldset>
      <TextAreaField label="Your review" rows={3} placeholder="What stood out? Would you hire again?" value={text} onChange={(e) => setText(e.target.value)} />
      <Button type="submit">Publish review</Button>
    </form>);

}