import React from 'react';
import { BedDoubleIcon, Building2Icon, SofaIcon, UsersIcon } from 'lucide-react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { ChipMultiSelect } from './ChipMultiSelect';
import { roomTypes } from '../../data/discover';
import { roomFeatureOptions } from '../../data/features';
import { fieldStyles } from '../../utils/styles';
import type { WizardStepProps } from '../../hooks/useListingWizard';
import type { RoomType } from '../../types/listing';

const icons: Record<RoomType, React.ReactNode> = {
  private: <BedDoubleIcon size={20} />,
  studio: <SofaIcon size={20} />,
  shared: <UsersIcon size={20} />,
  whole: <Building2Icon size={20} />
};

export function StepRoomDetails({ draft, update, errors }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <Input
        id="w-title"
        label="Listing title"
        placeholder="e.g. Sunny private room in a friendly Neukölln flatshare"
        value={draft.title}
        maxLength={80}
        showCharacterCount
        onChange={(e) => update('title', e.target.value)}
        error={errors.title} />
      
      <fieldset>
        <legend className={fieldStyles.label}>Room type</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup">
          {roomTypes.map((t) => {
            const active = draft.roomType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update('roomType', t.id)}
                className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-100 ${
                active ? 'border-primary-500 bg-primary-50' : 'border-navy-100 hover:border-navy-200'}`
                }>
                
                <span className={active ? 'text-primary-700' : 'text-navy-500'}>{icons[t.id]}</span>
                <span className="text-sm font-semibold text-navy-900">{t.label}</span>
                <span className="text-xs text-navy-500">{t.description}</span>
              </button>);

          })}
        </div>
        {errors.roomType && <p className={fieldStyles.error}>{errors.roomType}</p>}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="w-size"
          label="Room size"
          type="number"
          min={1}
          endAdornment={<span className="text-sm text-navy-400">m²</span>}
          value={draft.roomSize}
          onChange={(e) => update('roomSize', e.target.value)}
          error={errors.roomSize} />
        
        <div className="flex items-end pb-2">
          <Toggle checked={draft.furnished} onChange={(v) => update('furnished', v)} label="The room is furnished" />
        </div>
      </div>
      <ChipMultiSelect
        label="Room features"
        options={roomFeatureOptions}
        value={draft.roomFeatures}
        onChange={(v) => update('roomFeatures', v)} />
      
      <div>
        <label htmlFor="w-desc" className={fieldStyles.label}>
          Description
        </label>
        <textarea
          id="w-desc"
          rows={5}
          value={draft.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="What makes the room and flat special? Light, views, the vibe of the flatshare…"
          className={`${fieldStyles.control} resize-y`}
          aria-invalid={!!errors.description} />
        
        {errors.description ?
        <p className={fieldStyles.error}>{errors.description}</p> :

        <p className={fieldStyles.help}>{draft.description.trim().length}/40 characters minimum</p>
        }
      </div>
    </div>);

}