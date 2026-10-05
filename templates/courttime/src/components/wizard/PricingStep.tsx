import React from 'react';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { Stepper } from '../common/Stepper';
import { skillLevels } from '../../data/listingDraft';
import { DraftSession, StepProps } from '../../types/listingDraft';
import { formatHour, formatMoney, pluralize } from '../../utils/format';

const hourOptions = Array.from({ length: 18 }, (_, i) => i + 5);

export function PricingStep({ draft, update }: StepProps) {
  const updateSession = (id: string, patch: Partial<DraftSession>) =>
  update({ sessions: draft.sessions.map((s) => s.id === id ? { ...s, ...patch } : s) });
  const addSession = () => update({ sessions: [...draft.sessions, { id: `s-${Date.now()}`, startHour: 9, durationHours: 2, level: 'All levels' }] });
  const removeSession = (id: string) => update({ sessions: draft.sessions.filter((s) => s.id !== id) });

  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="wiz-price"
          label="Price per hour (private court)"
          type="number"
          min={1}
          inputMode="decimal"
          startAdornment={<span className="text-slate-500">$</span>}
          value={draft.pricePerHour || ''}
          onChange={(e) => update({ pricePerHour: Number(e.target.value) })}
          helperText={`Players pay ${formatMoney(draft.pricePerHour || 0)} + service fee`} />
        
        <Stepper label="Minimum booking" value={draft.minHours} min={1} max={4} onChange={(v) => update({ minHours: v })} formatValue={(v) => pluralize(v, 'hour')} />
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold">Open-play sessions</h3>
            <p className="text-sm text-slate-600">Sell individual seats for drop-in games at set times.</p>
          </div>
          <Toggle aria-label="Enable open play" checked={draft.openPlayEnabled} onChange={(v) => update({ openPlayEnabled: v })} />
        </div>
        {draft.openPlayEnabled &&
        <div className="mt-5 space-y-5 border-t border-slate-100 pt-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Stepper label="Seats per session" value={draft.seatsTotal} min={2} max={24} onChange={(v) => update({ seatsTotal: v })} formatValue={(v) => pluralize(v, 'seat')} />
              <Input
              id="wiz-seat-price"
              label="Price per seat"
              type="number"
              min={1}
              startAdornment={<span className="text-slate-500">$</span>}
              value={draft.pricePerSeat || ''}
              onChange={(e) => update({ pricePerSeat: Number(e.target.value) })}
              helperText={`Full session earns up to ${formatMoney((draft.pricePerSeat || 0) * draft.seatsTotal)}`} />
            
            </div>
            <div>
              <p className="field-label">Recurring daily sessions</p>
              <ul className="space-y-2">
                {draft.sessions.map((s, i) =>
              <li key={s.id} className="grid grid-cols-2 items-end gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_1.4fr_auto]">
                    <label className="text-xs text-slate-600">
                      Start
                      <select className="field mt-1" value={s.startHour} onChange={(e) => updateSession(s.id, { startHour: Number(e.target.value) })} aria-label={`Session ${i + 1} start`}>
                        {hourOptions.map((h) => <option key={h} value={h}>{formatHour(h)}</option>)}
                      </select>
                    </label>
                    <label className="text-xs text-slate-600">
                      Length
                      <select className="field mt-1" value={s.durationHours} onChange={(e) => updateSession(s.id, { durationHours: Number(e.target.value) })} aria-label={`Session ${i + 1} length`}>
                        {[1, 2, 3].map((h) => <option key={h} value={h}>{pluralize(h, 'hour')}</option>)}
                      </select>
                    </label>
                    <label className="col-span-2 text-xs text-slate-600 sm:col-span-1">
                      Level
                      <select className="field mt-1" value={s.level} onChange={(e) => updateSession(s.id, { level: e.target.value })} aria-label={`Session ${i + 1} level`}>
                        {skillLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </label>
                    <button type="button" onClick={() => removeSession(s.id)} className="btn btn-ghost btn-sm col-span-2 sm:col-span-1" aria-label={`Remove session ${i + 1}`}>
                      <Trash2Icon size={16} />
                    </button>
                  </li>
              )}
              </ul>
              <button type="button" onClick={addSession} className="btn btn-outline btn-sm mt-3">
                <PlusIcon size={16} aria-hidden="true" /> Add session
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}