import React from 'react';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { ServiceIcon } from '../ui/ServiceIcon';
import { services } from '../../data/services';
import type { ListingWizard } from '../../hooks/useListingWizard';
import { cn } from '../../utils/cn';

export function StepServices({ wizard }: {wizard: ListingWizard;}) {
  const { state, updateService, errors } = wizard;
  const input =
  'h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-[15px] font-semibold text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100';

  return (
    <div className="space-y-4">
      {errors.services &&
      <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">
          {errors.services}
        </p>
      }
      {services.map((s) => {
        const draft = state.services[s.id];
        return (
          <div key={s.id} className={cn('rounded-2xl border-2 bg-white transition-colors', draft.enabled ? 'border-primary-400' : 'border-stone-200')}>
            <div className="flex items-center gap-4 p-5">
              <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', draft.enabled ? 'bg-primary-100 text-primary-700' : 'bg-stone-100 text-stone-500')}>
                <ServiceIcon id={s.id} />
              </span>
              <div className="flex-1">
                <p className="font-extrabold text-stone-900">{s.label}</p>
                <p className="text-sm text-stone-500">
                  {s.description} · priced per {s.unitLabel}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.enabled}
                aria-label={`Offer ${s.label}`}
                onClick={() => updateService(s.id, { enabled: !draft.enabled })}
                className={cn(
                  'relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200',
                  draft.enabled ? 'bg-primary-500' : 'bg-stone-300'
                )}>
                
                <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', draft.enabled ? 'left-6' : 'left-1')} />
              </button>
            </div>
            {draft.enabled &&
            <div className="border-t border-stone-100 p-5">
                <p className="text-sm font-bold text-stone-800">Options & prices</p>
                <ul className="mt-3 space-y-2">
                  {draft.variations.map((v, i) =>
                <li key={v.id} className="flex items-center gap-2">
                      <label className="sr-only" htmlFor={`${s.id}-${v.id}-label`}>
                        Option name
                      </label>
                      <input
                    id={`${s.id}-${v.id}-label`}
                    value={v.label}
                    onChange={(e) =>
                    updateService(s.id, { variations: draft.variations.map((x) => x.id === v.id ? { ...x, label: e.target.value } : x) })
                    }
                    placeholder="Option name"
                    className={input} />
                  
                      <div className="relative w-32 shrink-0">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                        <label className="sr-only" htmlFor={`${s.id}-${v.id}-price`}>
                          Price per {s.unitLabel}
                        </label>
                        <input
                      id={`${s.id}-${v.id}-price`}
                      inputMode="decimal"
                      value={v.price}
                      onChange={(e) =>
                      updateService(s.id, {
                        variations: draft.variations.map((x) => x.id === v.id ? { ...x, price: e.target.value.replace(/[^\d.]/g, '') } : x)
                      })
                      }
                      className={cn(input, 'pl-7')} />
                    
                      </div>
                      <button
                    type="button"
                    disabled={draft.variations.length === 1}
                    onClick={() => updateService(s.id, { variations: draft.variations.filter((x) => x.id !== v.id) })}
                    aria-label={`Remove option ${i + 1}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-stone-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30">
                    
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </li>
                )}
                </ul>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <button
                  type="button"
                  onClick={() => updateService(s.id, { variations: [...draft.variations, { id: `v${Date.now()}`, label: '', price: '' }] })}
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold text-primary-700 hover:underline">
                  
                    <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add a price option
                  </button>
                  <label className="flex items-center gap-2 text-sm font-semibold text-stone-600">
                    Each additional pet
                    <span className="relative w-24">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">+$</span>
                      <input
                      inputMode="decimal"
                      value={draft.extraPetPrice}
                      onChange={(e) => updateService(s.id, { extraPetPrice: e.target.value.replace(/[^\d.]/g, '') })}
                      className={cn(input, 'h-10 pl-8')} />
                    
                    </span>
                  </label>
                </div>
                {errors[`service-${s.id}`] && <p className="mt-2 text-sm font-semibold text-red-600">{errors[`service-${s.id}`]}</p>}
              </div>
            }
          </div>);

      })}
    </div>);

}