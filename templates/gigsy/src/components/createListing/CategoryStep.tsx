import React, { useState } from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { CategoryIcon } from '../CategoryIcon';
import { StepProps } from '../../types/listingWizard';

export function CategoryStep({ draft, update, errors }: StepProps) {
  const [custom, setCustom] = useState('');
  const category = categories.find((c) => c.id === draft.category);
  const suggestions = category ? Array.from(new Set([...category.skills, ...draft.skills])) : draft.skills;

  const toggleSkill = (s: string) =>
  update({ skills: draft.skills.includes(s) ? draft.skills.filter((x) => x !== s) : [...draft.skills, s].slice(0, 8) });

  const addCustom = () => {
    const v = custom.trim();
    if (!v || draft.skills.includes(v)) return;
    update({ skills: [...draft.skills, v].slice(0, 8) });
    setCustom('');
  };

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-slate-800">Category</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((c) => {
            const selected = draft.category === c.id;
            return (
              <label
                key={c.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-primary-500 ${
                selected ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white hover:border-slate-300'}`
                }>
                
                <input
                  type="radio"
                  name="category"
                  className="sr-only"
                  checked={selected}
                  onChange={() => update({ category: c.id, skills: draft.skills.filter((s) => c.skills.includes(s)) })} />
                
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <CategoryIcon id={c.id} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900">{c.name}</span>
                  <span className="block text-xs text-slate-500">{c.description}</span>
                </span>
                {selected && <CheckIcon className="h-4 w-4 text-primary-600" aria-hidden="true" />}
              </label>);

          })}
        </div>
        {errors.category && <p className="mt-2 text-xs font-medium text-rose-600">{errors.category}</p>}
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-slate-800">Skills <span className="font-normal text-slate-500">({draft.skills.length}/8)</span></legend>
        <p className="mb-3 text-xs text-slate-500">{category ? 'Pick the skills that best describe this service.' : 'Choose a category to see suggested skills.'}</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => {
            const on = draft.skills.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggleSkill(s)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
                on ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-slate-700 ring-slate-300 hover:ring-slate-400'}`
                }>
                
                {on && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                {s}
              </button>);

          })}
        </div>
        <div className="mt-4 flex max-w-sm gap-2">
          <label htmlFor="custom-skill" className="sr-only">Add a custom skill</label>
          <input
            id="custom-skill"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustom();
              }
            }}
            placeholder="Add a custom skill"
            className="h-10 flex-1 rounded-xl border border-slate-300 px-3.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
          
          <button type="button" onClick={addCustom} className="flex h-10 items-center gap-1 rounded-xl bg-slate-900 px-3.5 text-sm font-semibold text-white hover:bg-slate-800">
            <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add
          </button>
        </div>
        {errors.skills && <p className="mt-2 text-xs font-medium text-rose-600">{errors.skills}</p>}
      </fieldset>
    </div>);

}