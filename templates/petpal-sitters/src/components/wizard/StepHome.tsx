import React from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { TextField } from '../ui/TextField';
import { OptionCards } from './OptionCards';
import type { ListingWizard } from '../../hooks/useListingWizard';

export function StepHome({ wizard }: {wizard: ListingWizard;}) {
  const { state, update } = wizard;
  return (
    <div className="space-y-7">
      <OptionCards
        name="homeType"
        legend="Home type"
        value={state.homeType}
        onChange={(homeType) => update({ homeType })}
        options={[
        { value: 'House', label: 'House' },
        { value: 'Apartment', label: 'Apartment' },
        { value: 'Townhouse', label: 'Townhouse' }]
        } />
      
      <OptionCards
        name="yard"
        legend="Outdoor space"
        value={state.yard}
        onChange={(yard) => update({ yard })}
        options={[
        { value: 'fenced', label: 'Fenced yard', description: 'Secure for off-leash play' },
        { value: 'unfenced', label: 'Unfenced yard', description: 'Supervised, on-leash' },
        { value: 'none', label: 'No yard', description: 'Walks only' }]
        } />
      
      <OptionCards
        name="children"
        legend="Children in the home"
        value={state.children}
        onChange={(children) => update({ children })}
        options={[
        { value: 'none', label: 'No children' },
        { value: 'young', label: 'Under 10' },
        { value: 'older', label: '10 and older' }]
        } />
      
      <TextField
        id="w-other-pets"
        label="Other pets in your home"
        placeholder="e.g. One friendly senior cat — leave blank if none"
        value={state.otherPets}
        onChange={(e) => update({ otherPets: e.target.value })} />
      
      <div className="space-y-4 rounded-2xl bg-white p-5 ring-1 ring-stone-200">
        <CheckboxField id="w-smoke" label="Smoke-free home" checked={state.smokeFree} onChange={(smokeFree) => update({ smokeFree })} />
        <CheckboxField
          id="w-fulltime"
          label="I’m home full-time"
          description="Owners can filter for sitters who are home all day."
          checked={state.homeFullTime}
          onChange={(homeFullTime) => update({ homeFullTime })} />
        
      </div>
    </div>);

}