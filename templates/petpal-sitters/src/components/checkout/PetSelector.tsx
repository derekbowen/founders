import React, { useState } from 'react';
import { CatIcon, CheckIcon, DogIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { SelectField } from '../ui/SelectField';
import { TextArea } from '../ui/TextArea';
import { TextField } from '../ui/TextField';
import { petSizeOptions } from '../../data/services';
import type { Pet, PetSize } from '../../types/marketplace';
import { cn } from '../../utils/cn';

interface PetSelectorProps {
  pets: Pet[];
  selected: string[];
  onToggle: (id: string) => void;
  notes: Record<string, string>;
  onNoteChange: (id: string, value: string) => void;
  onAddPet: (pet: Omit<Pet, 'id'>) => void;
  maxPets: number;
  error?: string;
}

const emptyPet = { name: '', species: 'Dog' as Pet['species'], breed: '', age: '', size: 'medium' as PetSize, careNotes: '' };

export function PetSelector({ pets, selected, onToggle, notes, onNoteChange, onAddPet, maxPets, error }: PetSelectorProps) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(emptyPet);
  const [draftError, setDraftError] = useState('');

  const saveDraft = () => {
    if (!draft.name.trim() || !draft.breed.trim() || !draft.age.trim()) {
      setDraftError('Name, breed and age are required.');
      return;
    }
    onAddPet({ ...draft, name: draft.name.trim(), breed: draft.breed.trim(), age: draft.age.trim() });
    setDraft(emptyPet);
    setDraftError('');
    setAdding(false);
  };

  return (
    <div>
      <p className="text-sm text-stone-500">Select up to {maxPets}. Care notes are shared with your sitter.</p>
      <ul className="mt-4 space-y-3">
        {pets.map((pet) => {
          const isSelected = selected.includes(pet.id);
          return (
            <li key={pet.id} className={cn('rounded-2xl border-2 transition-colors', isSelected ? 'border-primary-500 bg-primary-50/50' : 'border-stone-200 bg-white')}>
              <label className="flex cursor-pointer items-center gap-4 p-4">
                <input type="checkbox" className="sr-only" checked={isSelected} onChange={() => onToggle(pet.id)} />
                {pet.photo ?
                <img src={pet.photo} alt="" className="h-14 w-14 rounded-2xl object-cover" /> :

                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                    {pet.species === 'Cat' ? <CatIcon className="h-6 w-6" /> : <DogIcon className="h-6 w-6" />}
                  </span>
                }
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-stone-900">{pet.name}</span>
                  <span className="block text-sm text-stone-500">
                    {pet.breed} · {pet.age} · {petSizeOptions.find((s) => s.id === pet.size)?.label}
                  </span>
                </span>
                <span
                  className={cn('flex h-6 w-6 items-center justify-center rounded-full border-2', isSelected ? 'border-primary-500 bg-primary-500' : 'border-stone-300')}
                  aria-hidden="true">
                  
                  {isSelected && <CheckIcon className="h-3.5 w-3.5 text-stone-900" strokeWidth={3.5} />}
                </span>
              </label>
              {isSelected &&
              <div className="px-4 pb-4">
                  <TextArea
                  id={`notes-${pet.id}`}
                  label={`Care notes for ${pet.name}`}
                  rows={2}
                  value={notes[pet.id] ?? pet.careNotes}
                  onChange={(e) => onNoteChange(pet.id, e.target.value)} />
                
                </div>
              }
            </li>);

        })}
      </ul>
      {error &&
      <p className="mt-3 text-sm font-semibold text-red-600" role="alert">
          {error}
        </p>
      }

      {adding ?
      <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-5">
          <h3 className="font-extrabold text-stone-900">Add a pet profile</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField id="new-pet-name" label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <SelectField
            id="new-pet-species"
            label="Species"
            value={draft.species}
            onChange={(e) => setDraft({ ...draft, species: e.target.value as Pet['species'] })}
            options={[
            { value: 'Dog', label: 'Dog' },
            { value: 'Cat', label: 'Cat' }]
            } />
          
            <TextField id="new-pet-breed" label="Breed" value={draft.breed} onChange={(e) => setDraft({ ...draft, breed: e.target.value })} />
            <TextField id="new-pet-age" label="Age" placeholder="e.g. 2 years" value={draft.age} onChange={(e) => setDraft({ ...draft, age: e.target.value })} />
            <SelectField
            id="new-pet-size"
            label="Size"
            containerClassName="sm:col-span-2"
            value={draft.size}
            onChange={(e) => setDraft({ ...draft, size: e.target.value as PetSize })}
            options={petSizeOptions.map((s) => ({ value: s.id, label: `${s.label} (${s.range})` }))} />
          
            <TextArea
            id="new-pet-notes"
            label="Care notes"
            containerClassName="sm:col-span-2"
            rows={3}
            placeholder="Feeding schedule, medications, quirks…"
            value={draft.careNotes}
            onChange={(e) => setDraft({ ...draft, careNotes: e.target.value })} />
          
          </div>
          {draftError && <p className="mt-3 text-sm font-semibold text-red-600">{draftError}</p>}
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={saveDraft}>
              Save pet
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </div> :

      <button
        type="button"
        onClick={() => setAdding(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-stone-300 py-4 text-sm font-extrabold text-stone-600 transition-colors hover:border-primary-400 hover:bg-primary-50 hover:text-stone-900">
        
          <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add another pet
        </button>
      }
    </div>);

}