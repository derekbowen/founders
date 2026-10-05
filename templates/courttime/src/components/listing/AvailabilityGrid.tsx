import React from 'react';
import { addDays, format } from 'date-fns';
import { CalendarXIcon } from 'lucide-react';
import { BookingForm } from '../../hooks/useBookingForm';
import { SlotStatus } from '../../types/marketplace';
import { formatDateLong, formatHour, fromDateKey, toDateKey, todayKey } from '../../utils/format';

const legend: {status: SlotStatus | 'selected';label: string;swatch: string;}[] = [
{ status: 'available', label: 'Available', swatch: 'border border-slate-300 bg-white' },
{ status: 'selected', label: 'Your booking', swatch: 'bg-brand' },
{ status: 'openplay', label: 'Open play', swatch: 'bg-accent' },
{ status: 'booked', label: 'Booked', swatch: 'bg-slate-200' }];


const statusText: Record<SlotStatus, string> = { available: 'Open', booked: 'Booked', openplay: 'Open play', past: 'Passed' };

export function AvailabilityGrid({ form }: {form: BookingForm;}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  const allUnavailable = form.slots.every((s) => s.status === 'booked' || s.status === 'past');

  const isSelected = (hour: number) => {
    if (form.bookingType === 'private' && form.startHour !== null) return hour >= form.startHour && hour < form.startHour + form.hours;
    if (form.bookingType === 'openplay' && form.selectedSession) {
      const s = form.selectedSession;
      return hour >= s.startHour && hour < s.startHour + s.durationHours;
    }
    return false;
  };

  const onSlotClick = (hour: number, status: SlotStatus) => {
    if (status === 'available') form.selectStart(hour);
    if (status === 'openplay') {
      const session = form.sessions.find((s) => hour >= s.startHour && hour < s.startHour + s.durationHours);
      if (session) form.selectSession(session.id);
    }
  };

  return (
    <section aria-labelledby="availability-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="availability-heading" className="heading-md">Availability</h2>
          <p className="text-sm text-slate-600">{formatDateLong(fromDateKey(form.dateKey))} · tap an hour to start your booking</p>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          {legend.map((item) =>
          <li key={item.status} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded ${item.swatch}`} aria-hidden="true" />
              {item.label}
            </li>
          )}
        </ul>
      </div>
      <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Choose a date">
        {days.map((d) => {
          const key = toDateKey(d);
          const active = key === form.dateKey;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => form.setDateKey(key)}
              className={`flex w-16 shrink-0 flex-col items-center rounded-xl border py-2 transition-colors ${
              active ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white hover:border-brand'}`
              }>
              
              <span className={`text-[11px] font-semibold uppercase ${active ? 'text-white/80' : 'text-slate-500'}`}>{key === todayKey() ? 'Today' : format(d, 'EEE')}</span>
              <span className="font-display text-2xl font-bold leading-none">{format(d, 'd')}</span>
            </button>);

        })}
      </div>
      {allUnavailable ?
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
          <CalendarXIcon size={20} className="text-brand" aria-hidden="true" />
          No open hours left on this day — try another date.
        </div> :

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {form.slots.map((slot) => {
          const selected = isSelected(slot.hour);
          const conflict = selected && form.bookingType === 'private' && slot.status !== 'available';
          const clickable = slot.status === 'available' || slot.status === 'openplay';
          let cls = 'border-slate-200 bg-white hover:border-brand hover:bg-brand-soft';
          if (slot.status === 'booked') cls = 'border-transparent bg-slate-100 text-slate-400';
          if (slot.status === 'past') cls = 'border-transparent bg-slate-50 text-slate-300';
          if (slot.status === 'openplay') cls = 'border-accent-dark bg-accent/50 hover:bg-accent';
          if (selected && !conflict) cls = form.bookingType === 'openplay' ? 'border-ink bg-accent ring-2 ring-ink' : 'border-brand bg-brand text-white';
          if (conflict) cls = 'border-red-400 bg-red-50 text-red-700 ring-2 ring-red-300';
          return (
            <button
              key={slot.hour}
              type="button"
              disabled={!clickable}
              onClick={() => onSlotClick(slot.hour, slot.status)}
              aria-pressed={selected}
              aria-label={`${formatHour(slot.hour)}, ${statusText[slot.status]}`}
              className={`rounded-xl border px-2 py-2.5 text-left transition-colors disabled:cursor-not-allowed ${cls}`}>
              
                <span className="block text-sm font-semibold">{formatHour(slot.hour)}</span>
                <span className={`block text-[11px] ${selected && form.bookingType === 'private' && !conflict ? 'text-white/80' : 'opacity-75'}`}>
                  {conflict ? 'Unavailable' : selected ? 'Selected' : statusText[slot.status]}
                </span>
              </button>);

        })}
        </div>
      }
    </section>);

}