import React from 'react';
import { AvailabilityGrid } from '../listing/AvailabilityGrid';
import { StepProps } from '../../hooks/useListingDraft';
import { DayKey, Slot } from '../../types/sitter';

interface AvailabilityStepProps extends StepProps {
  onToggle: (day: DayKey, slot: Slot) => void;
}

export function AvailabilityStep({ draft, errors, onToggle }: AvailabilityStepProps) {
  const count = Object.values(draft.availability).reduce((n, s) => n + s.length, 0);
  return (
    <div>
      <p className="mb-4 text-sm text-ink-600">Tap the times you’re usually free. Families can still request other times — you’ll always choose whether to accept.</p>
      <AvailabilityGrid availability={draft.availability} onToggle={onToggle} />
      <p className={`mt-3 text-sm ${errors.availability ? 'font-medium text-red-600' : 'text-ink-600'}`} role={errors.availability ? 'alert' : undefined}>
        {errors.availability ?? `${count} time ${count === 1 ? 'slot' : 'slots'} selected`}
      </p>
    </div>);

}