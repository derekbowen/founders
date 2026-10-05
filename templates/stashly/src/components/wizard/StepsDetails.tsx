import React from 'react';
import { ImagePlusIcon, XIcon, StarIcon } from 'lucide-react';
import { FieldError } from './FieldError';
import { neighborhoods, earningsRates } from '../../data/content';
import { images } from '../../data/images';
import type { StepProps } from '../../types/listingDraft';
import { formatMoney, hostPayout, dailyRate } from '../../utils/pricing';
import { brand } from '../../data/brand';
import { ui, cx } from '../../utils/styles';

export function StepLocation({ draft, set, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="w-addr" className={ui.label}>Street address</label>
        <input id="w-addr" autoComplete="street-address" value={draft.address} onChange={(e) => set('address', e.target.value)} placeholder="1234 SE Example St" className={cx(ui.field, errors.address && '!border-red-500')} />
        <FieldError message={errors.address} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="w-hood" className={ui.label}>Neighborhood</label>
          <select id="w-hood" value={draft.neighborhood} onChange={(e) => set('neighborhood', e.target.value)} className={cx(ui.field, errors.neighborhood && '!border-red-500')}>
            <option value="">Select…</option>
            {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <FieldError message={errors.neighborhood} />
        </div>
        <div>
          <label htmlFor="w-zip" className={ui.label}>ZIP code</label>
          <input id="w-zip" inputMode="numeric" value={draft.zip} onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} className={cx(ui.field, errors.zip && '!border-red-500')} placeholder="97202" />
          <FieldError message={errors.zip} />
        </div>
      </div>
      <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
        Only the neighborhood is shown publicly. The exact address is shared with storers after you accept their request.
      </p>
    </div>);

}

export function StepPricing({ draft, set, errors }: StepProps) {
  const area = Math.round((Number(draft.width) || 0) * (Number(draft.length) || 0));
  const suggested = draft.type && area ? Math.round(area * earningsRates[draft.type]) : null;
  const price = Number(draft.monthlyPrice) || 0;
  return (
    <div className="space-y-6">
      {suggested &&
      <div className="flex flex-col gap-3 rounded-xl border border-sand-200 bg-sand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-800">
            Similar {area} sq ft spaces nearby book for around <span className="font-semibold">{formatMoney(suggested)}/mo</span>.
          </p>
          <button type="button" onClick={() => set('monthlyPrice', String(suggested))} className="text-sm font-semibold text-brand-700 hover:underline">
            Use suggestion
          </button>
        </div>
      }
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="w-price" className={ui.label}>Monthly price</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-500">$</span>
            <input id="w-price" inputMode="numeric" value={draft.monthlyPrice} onChange={(e) => set('monthlyPrice', e.target.value.replace(/\D/g, ''))} className={cx(ui.field, 'pl-7', errors.monthlyPrice && '!border-red-500')} />
          </div>
          <p className="mt-1 text-xs text-stone-500">Booked by the day: {formatMoney(dailyRate(price), 2)}/day</p>
          <FieldError message={errors.monthlyPrice} />
        </div>
        <div>
          <label htmlFor="w-dep" className={ui.label}>Refundable deposit</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-500">$</span>
            <input id="w-dep" inputMode="numeric" value={draft.deposit} onChange={(e) => set('deposit', e.target.value.replace(/\D/g, ''))} className={cx(ui.field, 'pl-7')} />
          </div>
          <p className="mt-1 text-xs text-stone-500">Returned within 5 days of move-out</p>
        </div>
      </div>
      {price > 0 &&
      <dl className="rounded-xl border border-stone-200 p-4 text-sm">
          <div className="flex justify-between text-stone-700"><dt>Storer pays</dt><dd>{formatMoney(price)}/mo + fees</dd></div>
          <div className="mt-2 flex justify-between text-stone-700"><dt>Host fee ({Math.round(brand.marketplace.hostCommissionRate * 100)}%)</dt><dd>−{formatMoney(price - hostPayout(price))}</dd></div>
          <div className="mt-2 flex justify-between border-t border-stone-200 pt-2 font-semibold text-stone-900"><dt>You earn</dt><dd>{formatMoney(hostPayout(price))}/mo</dd></div>
        </dl>
      }
    </div>);

}

export function StepAvailability({ draft, set, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="w-from" className={ui.label}>Available from</label>
          <input id="w-from" type="date" value={draft.availableFrom} onChange={(e) => set('availableFrom', e.target.value)} className={cx(ui.field, errors.availableFrom && '!border-red-500')} />
          <FieldError message={errors.availableFrom} />
        </div>
        <div>
          <label htmlFor="w-min" className={ui.label}>Minimum stay</label>
          <select id="w-min" value={draft.minDays} onChange={(e) => set('minDays', e.target.value)} className={ui.field}>
            <option value="7">1 week</option>
            <option value="30">1 month</option>
            <option value="90">3 months</option>
            <option value="180">6 months</option>
          </select>
        </div>
      </div>
      <p className="text-sm text-stone-600">
        Bookings use whole days. Storers can choose an end date or an ongoing monthly booking that renews every 30 days.
      </p>
    </div>);

}

const samplePhotos = [images.garage, images.basement, images.attic, images.closet, images.spareRoom, images.shed, images.rv, images.detail];

export function StepPhotos({ draft, set, errors }: StepProps) {
  const add = () => {
    const next = samplePhotos.find((p) => !draft.photos.includes(p));
    if (next) set('photos', [...draft.photos, next]);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {draft.photos.map((p, i) =>
        <div key={p} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100">
            <img src={p} alt={`Uploaded photo ${i + 1}`} className="h-full w-full object-cover" />
            {i === 0 &&
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-stone-800">
                <StarIcon className="h-3 w-3 fill-sand-500 text-sand-500" aria-hidden="true" /> Cover
              </span>
          }
            <button
            type="button"
            onClick={() => set('photos', draft.photos.filter((x) => x !== p))}
            aria-label={`Remove photo ${i + 1}`}
            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-stone-700 shadow-sm hover:text-red-600">
            
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {draft.photos.length < samplePhotos.length &&
        <button
          type="button"
          onClick={add}
          className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 text-sm font-medium text-stone-600 transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700">
          
            <ImagePlusIcon className="h-6 w-6" aria-hidden="true" />
            Add photo
          </button>
        }
      </div>
      <FieldError message={errors.photos} />
      <p className="text-sm text-stone-600">Add at least 2 bright, wide photos. Show the floor, the entrance and any shelving.</p>
    </div>);

}