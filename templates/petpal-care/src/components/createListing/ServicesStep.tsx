import React from 'react';
import { Toggle } from '../Toggle';
import { ServiceIcon } from '../common/ServiceIcon';
import { services } from '../../data/services';
import type { ServiceId } from '../../types/listing';
import type { DraftService, StepProps } from '../../types/wizard';

export function ServicesStep({ draft, update, errors }: StepProps) {
  const setService = (id: ServiceId, patch: Partial<DraftService>) =>
  update({ services: { ...draft.services, [id]: { ...draft.services[id], ...patch } } });

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-600">
        Nightly services are priced per night; visits and walks are priced per session. Add price variations for different pet sizes or durations.
      </p>
      {errors.services &&
      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">
          {errors.services}
        </p>
      }
      {services.map((meta) => {
        const s = draft.services[meta.id];
        return (
          <div key={meta.id} className={`rounded-3xl border p-5 transition ${s.enabled ? 'border-primary-300 bg-white' : 'border-ink-200 bg-ink-50'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${s.enabled ? 'bg-primary-100 text-primary-800' : 'bg-ink-100 text-ink-500'}`}>
                <ServiceIcon serviceId={meta.id} className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="font-extrabold text-ink-900">{meta.name}</p>
                <p className="text-xs text-ink-600">
                  {meta.shortDescription} · priced per {meta.unitLabel}
                </p>
              </div>
              <Toggle checked={s.enabled} onChange={(v) => setService(meta.id, { enabled: v })} aria-label={`Offer ${meta.name}`} />
            </div>
            {s.enabled &&
            <div className="mt-4 space-y-3 border-t border-ink-100 pt-4">
                {s.variants.map((v, i) =>
              <div key={v.id} className="grid grid-cols-[1fr_120px] gap-3">
                    <div>
                      <label htmlFor={`${meta.id}-${v.id}-label`} className="sr-only">
                        Option name
                      </label>
                      <input
                    id={`${meta.id}-${v.id}-label`}
                    value={v.label}
                    onChange={(e) => setService(meta.id, { variants: s.variants.map((x, j) => j === i ? { ...x, label: e.target.value } : x) })}
                    className="field" />
                  
                    </div>
                    <div className="relative">
                      <label htmlFor={`${meta.id}-${v.id}-price`} className="sr-only">
                        Price for {v.label}
                      </label>
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-500">$</span>
                      <input
                    id={`${meta.id}-${v.id}-price`}
                    type="number"
                    min={5}
                    value={v.price || ''}
                    onChange={(e) => setService(meta.id, { variants: s.variants.map((x, j) => j === i ? { ...x, price: Number(e.target.value) } : x) })}
                    className="field pl-7 font-bold" />
                  
                    </div>
                  </div>
              )}
                <div className="grid grid-cols-[1fr_120px] items-center gap-3">
                  <label htmlFor={`${meta.id}-extra`} className="text-sm font-semibold text-ink-700">
                    Each additional pet
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-500">$</span>
                    <input id={`${meta.id}-extra`} type="number" min={0} value={s.extraPetFee} onChange={(e) => setService(meta.id, { extraPetFee: Number(e.target.value) })} className="field pl-7 font-bold" />
                  </div>
                </div>
              </div>
            }
          </div>);

      })}
    </div>);

}