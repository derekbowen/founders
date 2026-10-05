import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import { SelectField } from '../ui/SelectField';
import { fieldClasses } from '../ui/TextField';
import type { ItineraryStep as Step } from '../../types/marketplace';
import type { WizardStepProps } from '../../types/listingDraft';
import { formatDuration } from '../../utils/format';

const durations = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 8];

export function ItineraryStep({ draft, update }: WizardStepProps) {
  const steps = draft.itinerary;

  const setStep = (i: number, patch: Partial<Step>) => update({ itinerary: steps.map((s, idx) => idx === i ? { ...s, ...patch } : s) });
  const remove = (i: number) => update({ itinerary: steps.filter((_, idx) => idx !== i) });
  const move = (i: number, dir: -1 | 1) => {
    const next = [...steps];
    const j = i + dir;
    [next[i], next[j]] = [next[j], next[i]];
    update({ itinerary: next });
  };
  const add = () => update({ itinerary: [...steps, { time: '', title: '', description: '' }] });

  const input = `${fieldClasses} border-slate-300 focus:border-primary-500`;

  return (
    <div className="space-y-6">
      <SelectField
        label="Total duration"
        value={String(draft.durationHours)}
        onChange={(e) => update({ durationHours: Number(e.target.value) })}
        options={durations.map((d) => ({ value: String(d), label: formatDuration(d) }))}
        className="max-w-xs" />
      
      <ol className="space-y-4">
        {steps.map((s, i) =>
        <li key={i} className="rounded-2xl border border-slate-200 bg-sand-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs text-white">{i + 1}</span>
                Stop {i + 1}
              </span>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white disabled:opacity-30" aria-label={`Move stop ${i + 1} up`}><ArrowUpIcon className="h-4 w-4" /></button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === steps.length - 1} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white disabled:opacity-30" aria-label={`Move stop ${i + 1} down`}><ArrowDownIcon className="h-4 w-4" /></button>
                <button type="button" onClick={() => remove(i)} disabled={steps.length === 1} className="flex h-8 w-8 items-center justify-center rounded-full text-red-600 hover:bg-red-50 disabled:opacity-30" aria-label={`Remove stop ${i + 1}`}><Trash2Icon className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-[110px_1fr]">
              <div>
                <label htmlFor={`it-time-${i}`} className="mb-1 block text-xs font-medium text-slate-600">Starts at</label>
                <input id={`it-time-${i}`} value={s.time} onChange={(e) => setStep(i, { time: e.target.value })} placeholder="+0:30" className={input} />
              </div>
              <div>
                <label htmlFor={`it-title-${i}`} className="mb-1 block text-xs font-medium text-slate-600">Title</label>
                <input id={`it-title-${i}`} value={s.title} onChange={(e) => setStep(i, { title: e.target.value })} placeholder="e.g. Tasting at the fish market" className={input} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`it-desc-${i}`} className="mb-1 block text-xs font-medium text-slate-600">What happens here</label>
                <textarea id={`it-desc-${i}`} rows={2} value={s.description} onChange={(e) => setStep(i, { description: e.target.value })} className={input} />
              </div>
            </div>
          </li>
        )}
      </ol>
      <Button variant="outline" onClick={add} leftIcon={<PlusIcon className="h-4 w-4" />}>Add a stop</Button>
      {steps.length < 2 && <p className="text-sm text-slate-600">Add at least 2 stops so guests know what to expect.</p>}
    </div>);

}