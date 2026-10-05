import React from 'react';
import { CalendarIcon, PawPrintIcon } from 'lucide-react';
import { ServiceIcon } from '../ui/ServiceIcon';
import type { ServiceId } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';
import type { PriceBreakdown } from '../../utils/pricing';

interface BookingSummaryProps {
  photo?: string;
  title: string;
  subtitle: string;
  serviceId: ServiceId;
  serviceLabel: string;
  variationLabel: string;
  dateText: string;
  petsText: string;
  breakdown: PriceBreakdown;
  view?: 'customer' | 'provider';
}

export function BookingSummary({ photo, title, subtitle, serviceId, serviceLabel, variationLabel, dateText, petsText, breakdown, view = 'customer' }: BookingSummaryProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-stone-100">
      {photo && <img src={photo} alt="" className="h-40 w-full object-cover" />}
      <div className="p-6">
        <h2 className="text-lg font-extrabold leading-snug text-stone-900">{title}</h2>
        <p className="mt-0.5 text-sm text-stone-500">{subtitle}</p>
        <ul className="mt-5 space-y-3 border-t border-stone-100 pt-5 text-[15px]">
          <li className="flex items-start gap-3">
            <ServiceIcon id={serviceId} className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
            <span>
              <span className="font-bold text-stone-900">{serviceLabel}</span>
              <span className="text-stone-500"> · {variationLabel}</span>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
            <span className="font-semibold text-stone-800">{dateText}</span>
          </li>
          <li className="flex items-start gap-3">
            <PawPrintIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
            <span className="font-semibold text-stone-800">{petsText}</span>
          </li>
        </ul>
        <dl className="mt-5 space-y-2.5 border-t border-stone-100 pt-5 text-[15px]">
          {breakdown.lines.map((line) =>
          <div key={line.label} className="flex justify-between gap-3">
              <dt className="text-stone-600">{line.label}</dt>
              <dd className="font-semibold text-stone-900">{formatMoney(line.amount)}</dd>
            </div>
          )}
          {view === 'customer' ?
          <>
              <div className="flex justify-between gap-3">
                <dt className="text-stone-600">Service fee</dt>
                <dd className="font-semibold text-stone-900">{formatMoney(breakdown.serviceFee)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-stone-100 pt-3 text-base">
                <dt className="font-extrabold text-stone-900">Total</dt>
                <dd className="font-black text-stone-900">{formatMoney(breakdown.total)}</dd>
              </div>
            </> :

          <>
              <div className="flex justify-between gap-3">
                <dt className="text-stone-600">Marketplace commission</dt>
                <dd className="font-semibold text-red-700">−{formatMoney(breakdown.commission)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-stone-100 pt-3 text-base">
                <dt className="font-extrabold text-stone-900">You’ll earn</dt>
                <dd className="font-black text-accent-700">{formatMoney(breakdown.payout)}</dd>
              </div>
            </>
          }
        </dl>
      </div>
    </div>);

}