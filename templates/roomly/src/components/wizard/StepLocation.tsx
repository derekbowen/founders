import React, { useState } from 'react';
import { LockIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '../Input';
import { Button } from '../Button';
import { LocationMap } from '../map/LocationMap';
import { cityCenters, cityOptions } from '../../data/features';
import { buttonStyles, fieldStyles } from '../../utils/styles';
import type { WizardStepProps } from '../../hooks/useListingWizard';
import type { TransitType } from '../../types/listing';

const transitTypes: TransitType[] = ['metro', 'tram', 'bus', 'train', 'bike'];

export function StepLocation({ draft, update, errors }: WizardStepProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<TransitType>('metro');
  const [minutes, setMinutes] = useState('');
  const center = draft.city ? cityCenters[draft.city] : null;

  const addTransit = () => {
    if (!name.trim() || !Number(minutes)) return;
    update('transit', [...draft.transit, { name: name.trim(), type, minutes: Number(minutes) }]);
    setName('');
    setMinutes('');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="w-city" className={fieldStyles.label}>
            City
          </label>
          <select
            id="w-city"
            value={draft.city}
            onChange={(e) => update('city', e.target.value)}
            className={fieldStyles.control}
            aria-invalid={!!errors.city}>
            
            <option value="">Select a city</option>
            {cityOptions.map((c) =>
            <option key={c} value={c}>
                {c}
              </option>
            )}
          </select>
          {errors.city && <p className={fieldStyles.error}>{errors.city}</p>}
        </div>
        <Input
          id="w-neigh"
          label="Neighbourhood"
          placeholder="e.g. Neukölln"
          value={draft.neighborhood}
          onChange={(e) => update('neighborhood', e.target.value)}
          error={errors.neighborhood} />
        
      </div>
      <Input
        id="w-street"
        label="Street address"
        placeholder="Street and house number"
        value={draft.street}
        onChange={(e) => update('street', e.target.value)}
        error={errors.street}
        startAdornment={<LockIcon size={14} className="text-navy-400" />}
        helperText="Kept private. Renters only see an approximate area until you share it." />
      

      <div className="h-56 overflow-hidden rounded-2xl border border-navy-100 bg-navy-50">
        {center ?
        <LocationMap lat={center[0]} lng={center[1]} zoom={12} radius={1200} /> :

        <div className="grid h-full place-items-center text-sm text-navy-400">Select a city to preview the map</div>
        }
      </div>

      <fieldset>
        <legend className={fieldStyles.label}>Nearby transit</legend>
        {draft.transit.length > 0 &&
        <ul className="mb-3 space-y-2">
            {draft.transit.map((t, i) =>
          <li key={`${t.name}-${i}`} className="flex items-center gap-3 rounded-xl border border-navy-100 px-4 py-2.5 text-sm">
                <span className="rounded-md bg-navy-900 px-2 py-0.5 text-xs font-semibold capitalize text-white">{t.type}</span>
                <span className="flex-1 text-navy-800">{t.name}</span>
                <span className="font-semibold text-navy-900">{t.minutes} min</span>
                <button
              type="button"
              onClick={() => update('transit', draft.transit.filter((_, idx) => idx !== i))}
              className="grid h-8 w-8 place-items-center rounded-lg text-navy-400 transition hover:bg-coral-50 hover:text-coral-700"
              aria-label={`Remove ${t.name}`}>
              
                  <Trash2Icon size={15} />
                </button>
              </li>
          )}
          </ul>
        }
        <div className="grid gap-3 rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 p-4 sm:grid-cols-[1fr_120px_100px_auto] sm:items-end">
          <Input id="tr-name" label="Station or line" size="small" value={name} onChange={(e) => setName(e.target.value)} placeholder="U7 Rathaus Neukölln" />
          <div>
            <label htmlFor="tr-type" className="mb-1.5 block text-sm font-medium text-navy-800">
              Type
            </label>
            <select id="tr-type" value={type} onChange={(e) => setType(e.target.value as TransitType)} className={`${fieldStyles.control} !py-2 capitalize`}>
              {transitTypes.map((t) =>
              <option key={t} value={t}>
                  {t}
                </option>
              )}
            </select>
          </div>
          <Input id="tr-min" label="Minutes" size="small" type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
          <Button
            type="button"
            size="small"
            leftIcon={<PlusIcon size={15} />}
            disabled={!name.trim() || !Number(minutes)}
            className={`${buttonStyles.navy} disabled:!opacity-50`}
            onClick={addTransit}>
            
            Add
          </Button>
        </div>
      </fieldset>
    </div>);

}