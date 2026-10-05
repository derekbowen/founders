import React from 'react';
import { ShirtIcon, BedDoubleIcon, ArchiveIcon, HomeIcon, WarehouseIcon, TentTreeIcon, CaravanIcon } from 'lucide-react';
import { Toggle } from '../Toggle';
import { Checkbox } from '../Checkbox';
import { FieldError } from './FieldError';
import { spaceTypes, accessFrequencyLabel } from '../../data/spaceTypes';
import type { AccessFrequency, SpaceType } from '../../types/marketplace';
import type { StepProps } from '../../types/listingDraft';
import { ui, cx } from '../../utils/styles';

const typeIcons: Record<SpaceType, React.ElementType> = {
  closet: ShirtIcon,
  room: BedDoubleIcon,
  basement: ArchiveIcon,
  attic: HomeIcon,
  garage: WarehouseIcon,
  shed: TentTreeIcon,
  parking: CaravanIcon
};

export function StepSpaceType({ draft, set, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="sr-only">Space type</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {spaceTypes.map((t) => {
            const Icon = typeIcons[t.value];
            const on = draft.type === t.value;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  set('type', t.value);
                  if (t.value === 'parking' || t.value === 'garage') set('vehicleStorage', true);
                }}
                className={cx(
                  'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300',
                  on ? 'border-brand-600 bg-brand-50' : 'border-stone-200 hover:border-stone-300'
                )}>
                
                <span className={cx('grid h-11 w-11 place-items-center rounded-lg', on ? 'bg-brand-600 text-white' : 'bg-sand-100 text-sand-700')}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-stone-900">{t.label}</span>
                  <span className="block text-sm text-stone-600">{t.hint}</span>
                </span>
              </button>);

          })}
        </div>
        <FieldError message={errors.type} />
      </fieldset>
      <div>
        <label htmlFor="w-title" className={ui.label}>Listing title</label>
        <input id="w-title" value={draft.title} maxLength={70} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Dry basement room near Hawthorne" className={ui.field} />
        <p className="mt-1 text-xs text-stone-500">{draft.title.length}/70 · Mention the neighborhood and what makes it great.</p>
        <FieldError message={errors.title} />
      </div>
    </div>);

}

export function StepSize({ draft, set, errors }: StepProps) {
  const w = Number(draft.width) || 0;
  const l = Number(draft.length) || 0;
  const area = Math.round(w * l);
  const maxDim = Math.max(w, l, 1);
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_220px]">
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {(
          [
          ['width', 'Width (ft)'],
          ['length', 'Length (ft)'],
          ['height', 'Ceiling (ft)']] as
          const).
          map(([k, label]) =>
          <div key={k}>
              <label htmlFor={`w-${k}`} className={ui.label}>{label}</label>
              <input id={`w-${k}`} inputMode="decimal" value={draft[k]} onChange={(e) => set(k, e.target.value.replace(/[^\d.]/g, ''))} className={cx(ui.field, errors[k] && '!border-red-500')} placeholder={k === 'height' ? 'Optional' : '0'} />
              <FieldError message={errors[k]} />
            </div>
          )}
        </div>
        <p className="rounded-xl bg-sand-50 px-4 py-3 text-sm text-stone-700">
          Measure wall to wall at the floor. Storers rely on accurate sizes — listings with exact dimensions get 2× more requests.
        </p>
        <div>
          <label htmlFor="w-desc" className={ui.label}>Describe the space</label>
          <textarea id="w-desc" rows={4} value={draft.description} onChange={(e) => set('description', e.target.value)} placeholder="Shelving, lighting, flooring, what it’s best for…" className={ui.field} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div className="relative grid h-40 w-40 place-items-center">
          <div
            className="rounded-md border-2 border-brand-600 bg-brand-50 transition-all"
            style={{ width: `${w / maxDim * 100}%`, height: `${l / maxDim * 100}%`, minWidth: 8, minHeight: 8 }}
            aria-hidden="true" />
          
        </div>
        <p className="mt-3 text-2xl font-bold text-stone-900">{area || '—'} <span className="text-sm font-medium text-stone-500">sq ft</span></p>
        <p className="text-xs text-stone-500">Live floor-plan preview</p>
      </div>
    </div>);

}

const securityOptions = ['Lockable door', 'Smart lock / keypad', 'Camera coverage', 'Alarm system', 'Fenced or gated', 'Water / smoke sensor', 'Host on site'];
const hourPresets = ['24/7', 'Daily, 8am–8pm', 'Weekdays, 9am–6pm', 'Weekends only', 'By appointment'];

export function StepAccess({ draft, set }: StepProps) {
  const toggles = [
  ['climateControlled', 'Climate controlled', 'Heated/cooled and dry year-round'],
  ['access247', '24/7 access', 'Storers can visit anytime'],
  ['groundFloor', 'Ground floor / step-free', 'No stairs or ladders'],
  ['vehicleStorage', 'Fits a vehicle', 'Car, RV, boat or trailer']] as
  const;
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className={ui.label}>Access hours</legend>
        <div className="flex flex-wrap gap-2">
          {hourPresets.map((h) =>
          <button key={h} type="button" aria-pressed={draft.accessHours === h} onClick={() => {set('accessHours', h);if (h === '24/7') set('access247', true);}} className={cx(ui.chip, draft.accessHours === h ? ui.chipOn : ui.chipOff)}>
              {h}
            </button>
          )}
        </div>
      </fieldset>
      <div>
        <label htmlFor="w-freq" className={ui.label}>How often can storers visit?</label>
        <select id="w-freq" value={draft.accessFrequency} onChange={(e) => set('accessFrequency', e.target.value as AccessFrequency)} className={ui.field}>
          {Object.entries(accessFrequencyLabel).map(([v, label]) =>
          <option key={v} value={v}>{label}</option>
          )}
        </select>
      </div>
      <fieldset>
        <legend className={ui.label}>Features</legend>
        <div className="divide-y divide-stone-100 rounded-xl border border-stone-200">
          {toggles.map(([k, label, hint]) =>
          <div key={k} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-stone-900">{label}</p>
                <p className="text-xs text-stone-500">{hint}</p>
              </div>
              <Toggle checked={draft[k]} onChange={(c) => set(k, c)} aria-label={label} size="small" />
            </div>
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend className={ui.label}>Security</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {securityOptions.map((s) =>
          <Checkbox
            key={s}
            label={s}
            checked={draft.security.includes(s)}
            onChange={(e) => set('security', e.target.checked ? [...draft.security, s] : draft.security.filter((x) => x !== s))} />

          )}
        </div>
      </fieldset>
    </div>);

}