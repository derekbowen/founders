import React from 'react';
import { cleaningChecklist } from '../../data/catalog';
import { CheckboxField } from '../ui/CheckboxField';

interface CleaningChecklistProps {
  done: string[];
  editable: boolean;
  onToggle: (id: string) => void;
  txId: string;
}

export function CleaningChecklist({ done, editable, onToggle, txId }: CleaningChecklistProps) {
  const pct = Math.round(done.length / cleaningChecklist.length * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-steel-600">{done.length} of {cleaningChecklist.length} complete</span>
        <span className="font-semibold text-steel-900">{pct}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-steel-200" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Cleaning sign-off progress">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3">
        {cleaningChecklist.map((item) =>
        <CheckboxField
          key={item.id}
          id={`${txId}-${item.id}`}
          checked={done.includes(item.id)}
          onChange={() => editable && onToggle(item.id)}
          label={<span className={done.includes(item.id) ? 'text-steel-500 line-through' : ''}>{item.label}</span>}
          className={editable ? '' : 'pointer-events-none opacity-70'} />

        )}
      </div>
      {!editable && done.length === 0 &&
      <p className="mt-2 text-xs text-steel-500">Unlocks when the session starts.</p>
      }
    </div>);

}