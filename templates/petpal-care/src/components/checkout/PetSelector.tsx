import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CatIcon, CheckIcon, DogIcon, PlusIcon } from 'lucide-react';
import { Input } from '../Input';
import { petSizes } from '../../data/services';
import type { Pet } from '../../types/user';

interface PetSelectorProps {
  pets: Pet[];
  selected: string[];
  required: number;
  onToggle: (id: string) => void;
  onAdd: (pet: Pet) => void;
  onNotesChange: (id: string, notes: string) => void;
  error?: string;
}

const emptyPet = { name: '', species: 'Dog' as Pet['species'], breed: '', age: '', size: 'medium' as Pet['size'], careNotes: '' };

export function PetSelector({ pets, selected, required, onToggle, onAdd, onNotesChange, error }: PetSelectorProps) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(emptyPet);
  const [draftError, setDraftError] = useState('');

  const saveDraft = () => {
    if (!draft.name.trim() || !draft.breed.trim()) {
      setDraftError('Add a name and breed for your pet.');
      return;
    }
    onAdd({ ...draft, id: `pet-${Date.now()}` });
    setDraft(emptyPet);
    setDraftError('');
    setAdding(false);
  };

  return (
    <div>
      <p className="text-sm text-ink-600">
        Select {required === 1 ? 'the pet' : `${required} pets`} joining this booking. Care notes are shared with your sitter.
      </p>
      <ul className="mt-4 space-y-3">
        {pets.map((pet) => {
          const isSelected = selected.includes(pet.id);
          const Icon = pet.species === 'Cat' ? CatIcon : DogIcon;
          return (
            <li key={pet.id} className={`rounded-3xl border-2 transition ${isSelected ? 'border-primary-500 bg-primary-50/60' : 'border-ink-200 bg-white hover:border-ink-300'}`}>
              <button type="button" onClick={() => onToggle(pet.id)} aria-pressed={isSelected} className="flex w-full items-center gap-4 p-4 text-left focus-visible:outline-none">
                {pet.photo ?
                <img src={pet.photo} alt="" className="h-14 w-14 rounded-2xl object-cover" /> :

                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                }
                <span className="flex-1">
                  <span className="block font-extrabold text-ink-900">{pet.name}</span>
                  <span className="block text-sm text-ink-600">
                    {pet.breed} · {pet.age} · {petSizes.find((s) => s.id === pet.size)?.label}
                  </span>
                </span>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${isSelected ? 'border-primary-500 bg-primary-500 text-ink-900' : 'border-ink-300'}`}>
                  {isSelected && <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isSelected &&
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4">
                      <label htmlFor={`notes-${pet.id}`} className="field-label">
                        Care notes for {pet.name}
                      </label>
                      <textarea id={`notes-${pet.id}`} value={pet.careNotes} onChange={(e) => onNotesChange(pet.id, e.target.value)} rows={2} className="field resize-none" />
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </li>);

        })}
      </ul>
      {error &&
      <p className="mt-2 text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      }

      {adding ?
      <div className="mt-4 rounded-3xl border border-ink-200 bg-white p-5">
          <h3 className="font-extrabold text-ink-900">Add a pet profile</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Biscuit" />
            <div>
              <label className="field-label" htmlFor="pet-species">
                Species
              </label>
              <select id="pet-species" value={draft.species} onChange={(e) => setDraft({ ...draft, species: e.target.value as Pet['species'] })} className="field">
                <option>Dog</option>
                <option>Cat</option>
              </select>
            </div>
            <Input label="Breed" value={draft.breed} onChange={(e) => setDraft({ ...draft, breed: e.target.value })} placeholder="e.g. Beagle mix" />
            <Input label="Age" value={draft.age} onChange={(e) => setDraft({ ...draft, age: e.target.value })} placeholder="e.g. 2 years" />
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="pet-size">
                Size
              </label>
              <select id="pet-size" value={draft.size} onChange={(e) => setDraft({ ...draft, size: e.target.value as Pet['size'] })} className="field">
                {petSizes.map((s) =>
              <option key={s.id} value={s.id}>
                    {s.label} ({s.range})
                  </option>
              )}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="pet-notes">
                Care notes
              </label>
              <textarea id="pet-notes" rows={3} value={draft.careNotes} onChange={(e) => setDraft({ ...draft, careNotes: e.target.value })} className="field resize-none" placeholder="Feeding schedule, medications, quirks…" />
            </div>
          </div>
          {draftError &&
        <p className="mt-3 text-sm font-semibold text-red-700" role="alert">
              {draftError}
            </p>
        }
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setAdding(false)} className="btn btn-md btn-ghost">
              Cancel
            </button>
            <button type="button" onClick={saveDraft} className="btn btn-md btn-accent">
              Save pet
            </button>
          </div>
        </div> :

      <button type="button" onClick={() => setAdding(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-ink-300 py-4 text-sm font-bold text-ink-700 transition hover:border-primary-500 hover:bg-primary-50 hover:text-ink-900">
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          Add a new pet
        </button>
      }
    </div>);

}