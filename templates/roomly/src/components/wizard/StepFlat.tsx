import React, { useState } from 'react';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { ChipMultiSelect } from './ChipMultiSelect';
import { flatFeatureOptions } from '../../data/features';
import { buttonStyles, chipStyles, fieldStyles } from '../../utils/styles';
import type { WizardStepProps } from '../../hooks/useListingWizard';
import type { GenderPreference } from '../../types/listing';

const genderOptions: {id: GenderPreference;label: string;}[] = [
{ id: 'any', label: 'Anyone' },
{ id: 'female', label: 'Women only' },
{ id: 'male', label: 'Men only' }];


export function StepFlat({ draft, update, errors }: WizardStepProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');

  const addFlatmate = () => {
    if (!name.trim() || !Number(age)) return;
    update('flatmates', [...draft.flatmates, { name: name.trim(), age: Number(age), occupation: occupation.trim() || '—' }]);
    setName('');
    setAge('');
    setOccupation('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Input id="w-bed" label="Bedrooms" type="number" min={1} value={draft.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} error={errors.bedrooms} />
        <Input id="w-bath" label="Bathrooms" type="number" min={1} value={draft.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} error={errors.bathrooms} />
        <Input
          id="w-flatsize"
          label="Flat size"
          type="number"
          min={1}
          endAdornment={<span className="text-sm text-navy-400">m²</span>}
          value={draft.flatSize}
          onChange={(e) => update('flatSize', e.target.value)}
          error={errors.flatSize} />
        
      </div>

      <ChipMultiSelect label="Flat features" options={flatFeatureOptions} value={draft.flatFeatures} onChange={(v) => update('flatFeatures', v)} />

      <fieldset>
        <legend className={fieldStyles.label}>Current flatmates</legend>
        {draft.flatmates.length > 0 &&
        <ul className="mb-3 grid gap-2 sm:grid-cols-2">
            {draft.flatmates.map((m, i) =>
          <li key={`${m.name}-${i}`} className="flex items-center gap-3 rounded-xl border border-navy-100 p-3">
                <Avatar name={m.name} alt={m.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy-900">
                    {m.name}, {m.age}
                  </p>
                  <p className="truncate text-xs text-navy-500">{m.occupation}</p>
                </div>
                <button
              type="button"
              onClick={() => update('flatmates', draft.flatmates.filter((_, idx) => idx !== i))}
              className="grid h-8 w-8 place-items-center rounded-lg text-navy-400 transition hover:bg-coral-50 hover:text-coral-700"
              aria-label={`Remove ${m.name}`}>
              
                  <Trash2Icon size={15} />
                </button>
              </li>
          )}
          </ul>
        }
        <div className="grid gap-3 rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 p-4 sm:grid-cols-[1fr_90px_1fr_auto] sm:items-end">
          <Input id="fm-name" label="Name" size="small" value={name} onChange={(e) => setName(e.target.value)} />
          <Input id="fm-age" label="Age" size="small" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <Input id="fm-occ" label="Occupation" size="small" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
          <Button
            type="button"
            size="small"
            leftIcon={<PlusIcon size={15} />}
            disabled={!name.trim() || !Number(age)}
            className={`${buttonStyles.navy} disabled:!opacity-50`}
            onClick={addFlatmate}>
            
            Add
          </Button>
        </div>
        <p className={fieldStyles.help}>Leave empty if the renter will live alone.</p>
      </fieldset>

      <fieldset>
        <legend className={fieldStyles.label}>Who can apply?</legend>
        <div className="flex flex-wrap gap-2">
          {genderOptions.map((g) =>
          <button
            key={g.id}
            type="button"
            aria-pressed={draft.genderPreference === g.id}
            onClick={() => update('genderPreference', g.id)}
            className={`${chipStyles.base} ${draft.genderPreference === g.id ? chipStyles.active : chipStyles.idle}`}>
            
              {g.label}
            </button>
          )}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <Toggle checked={draft.petsAllowed} onChange={(v) => update('petsAllowed', v)} label="Pets allowed" />
        <Toggle checked={draft.smokingAllowed} onChange={(v) => update('smokingAllowed', v)} label="Smoking allowed" />
        <Toggle checked={draft.couplesAllowed} onChange={(v) => update('couplesAllowed', v)} label="Couples welcome" />
      </div>

      <div>
        <label htmlFor="w-rules" className={fieldStyles.label}>
          House rules
        </label>
        <textarea
          id="w-rules"
          rows={4}
          value={draft.houseRules}
          onChange={(e) => update('houseRules', e.target.value)}
          placeholder={'One rule per line, e.g.\nQuiet hours 22:00–07:00\nWeekly cleaning rota'}
          className={`${fieldStyles.control} resize-y`} />
        
      </div>
    </div>);

}