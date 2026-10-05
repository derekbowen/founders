import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { AlertCircleIcon, CalendarCheckIcon, MinusIcon, PlusIcon, ShieldCheckIcon } from 'lucide-react';
import { Input } from '../Input';
import { SelectField } from '../ui/SelectField';
import { BrandButton } from '../ui/BrandButton';
import { Rating } from '../ui/Rating';
import { Sitter, DayKey } from '../../types/sitter';
import { brand } from '../../data/brand';
import { priceBreakdown } from '../../utils/pricing';
import { addHours, crossesMidnight, timeOptions, todayIso } from '../../utils/time';
import { formatCurrency } from '../../utils/format';

export function BookingPanel({ sitter }: {sitter: Sitter;}) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initialStart = params.get('start') ?? '18:00';
  const [date, setDate] = useState(params.get('date') ?? todayIso());
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(addHours(initialStart, 4));
  const [kids, setKids] = useState(Math.min(Math.max(Number(params.get('kids') ?? 1) || 1, 1), sitter.maxKids));
  const [submitted, setSubmitted] = useState(false);

  const b = priceBreakdown(sitter.hourlyRate, sitter.extraChildRate, start, end, kids);
  const dayKey = useMemo(() => date ? format(parseISO(date), 'EEE') as DayKey : null, [date]);
  const daySlots = dayKey ? sitter.availability[dayKey] : [];

  const errors: string[] = [];
  if (!date) errors.push('Choose a date.');
  if (date && date < todayIso()) errors.push('Date can’t be in the past.');
  if (b.hours < brand.minimumBookingHours) errors.push(`Minimum booking is ${brand.minimumBookingHours} hours.`);
  if (b.hours > 14) errors.push('Bookings can be at most 14 hours.');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.length) return;
    navigate(`/checkout/${sitter.id}?${new URLSearchParams({ date, start, end, kids: String(kids) }).toString()}`);
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-ink-200 bg-white p-6 shadow-lift" aria-labelledby="booking-heading">
      <div className="flex items-baseline justify-between">
        <h2 id="booking-heading" className="text-ink-900">
          <span className="font-heading text-3xl font-bold">${sitter.hourlyRate}</span>
          <span className="text-sm text-ink-600"> /hour</span>
        </h2>
        <Rating value={sitter.rating} count={sitter.reviewCount} />
      </div>
      <p className="mt-1 text-xs text-ink-600">+${sitter.extraChildRate}/hr per additional child · up to {sitter.maxKids} kids</p>

      <div className="mt-5 space-y-4">
        <Input id="booking-date" label="Date" type="date" value={date} min={todayIso()} onChange={(e) => setDate(e.target.value)} />
        {dayKey &&
        <p className={`-mt-2 flex items-start gap-1.5 text-xs ${daySlots.length ? 'text-emerald-700' : 'text-accent-800'}`}>
            <CalendarCheckIcon className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden />
            {daySlots.length ?
          `${sitter.name.split(' ')[0]} is usually free ${dayKey}: ${daySlots.join(', ').toLowerCase()}` :
          `${sitter.name.split(' ')[0]} isn’t usually available ${dayKey}s — you can still send a request.`}
          </p>
        }
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Start time" value={start} onChange={(e) => setStart(e.target.value)} options={timeOptions} />
          <SelectField label="End time" value={end} onChange={(e) => setEnd(e.target.value)} options={timeOptions} />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-ink-200 px-3.5 py-2.5">
          <div>
            <p id="kids-label" className="text-sm font-medium text-ink-800">Number of kids</p>
            <p className="text-xs text-ink-500">Max {sitter.maxKids}</p>
          </div>
          <div className="flex items-center gap-3" role="group" aria-labelledby="kids-label">
            <button type="button" aria-label="Fewer kids" disabled={kids <= 1} onClick={() => setKids((k) => k - 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-300 text-ink-700 hover:border-ink-500 disabled:opacity-40">
              <MinusIcon className="h-4 w-4" aria-hidden />
            </button>
            <span className="w-4 text-center font-semibold" aria-live="polite">{kids}</span>
            <button type="button" aria-label="More kids" disabled={kids >= sitter.maxKids} onClick={() => setKids((k) => k + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-300 text-ink-700 hover:border-ink-500 disabled:opacity-40">
              <PlusIcon className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <dl className="mt-5 space-y-2 border-t border-ink-200 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-600">
            ${sitter.hourlyRate} × {b.hours} {b.hours === 1 ? 'hour' : 'hours'}
            {crossesMidnight(start, end) && <span className="text-ink-500"> (ends next day)</span>}
          </dt>
          <dd className="text-ink-900">{formatCurrency(b.base)}</dd>
        </div>
        {b.extraChildren > 0 &&
        <div className="flex justify-between">
            <dt className="text-ink-600">
              Extra {b.extraChildren === 1 ? 'child' : 'children'} (${sitter.extraChildRate} × {b.extraChildren} × {b.hours}h)
            </dt>
            <dd className="text-ink-900">{formatCurrency(b.extraCharge)}</dd>
          </div>
        }
        <div className="flex justify-between">
          <dt className="text-ink-600">Booking & safety fee</dt>
          <dd className="text-ink-900">{formatCurrency(b.fee)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink-200 pt-3 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatCurrency(b.total)}</dd>
        </div>
      </dl>

      {submitted && errors.length > 0 &&
      <div role="alert" className="mt-4 flex gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{errors[0]}</span>
        </div>
      }

      <BrandButton type="submit" size="lg" fullWidth className="mt-5">
        Request sitter
      </BrandButton>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-600">
        <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
        You won’t be charged until {sitter.name.split(' ')[0]} accepts
      </p>
    </form>);

}