import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, MinusIcon, PawPrintIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { services } from '../../data/services';
import { ServiceIcon } from '../common/ServiceIcon';
import type { ServiceId } from '../../types/listing';

export function HeroSearch() {
  const navigate = useNavigate();
  const today = format(new Date(), 'yyyy-MM-dd');
  const [service, setService] = useState<ServiceId>('boarding');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
  const [end, setEnd] = useState(format(addDays(new Date(), 10), 'yyyy-MM-dd'));
  const [pets, setPets] = useState(1);
  const isNightly = services.find((s) => s.id === service)?.unitType === 'night';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams({ service, pets: String(pets) });
    if (location.trim()) p.set('location', location.trim());
    if (start) p.set('start', start);
    if (isNightly && end) p.set('end', end);
    navigate(`/search?${p.toString()}`);
  };

  return (
    <form onSubmit={submit} className="card p-3 sm:p-4" aria-label="Find a sitter">
      <div role="radiogroup" aria-label="Service" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
        {services.map((s) => {
          const active = s.id === service;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setService(s.id)}
              className={`chip shrink-0 ${active ? 'chip-active' : ''}`}>
              
              <ServiceIcon serviceId={s.id} />
              {s.name}
            </button>);

        })}
      </div>

      <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_1fr_auto_auto] md:items-end">
        <label className="block rounded-2xl bg-ink-50 px-4 py-2.5 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-300">
          <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-ink-600">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" /> Location
          </span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Neighborhood or address"
            className="mt-0.5 w-full bg-transparent text-sm font-bold text-ink-900 placeholder:font-semibold placeholder:text-ink-400 focus:outline-none" />
          
        </label>
        <label className="block rounded-2xl bg-ink-50 px-4 py-2.5 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-300">
          <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-ink-600">
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" /> {isNightly ? 'Drop off' : 'Date'}
          </span>
          <input
            type="date"
            min={today}
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-sm font-bold text-ink-900 focus:outline-none" />
          
        </label>
        <label className={`block rounded-2xl bg-ink-50 px-4 py-2.5 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-300 ${isNightly ? '' : 'opacity-50'}`}>
          <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-ink-600">
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" /> Pick up
          </span>
          <input
            type="date"
            min={start || today}
            value={isNightly ? end : ''}
            disabled={!isNightly}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-sm font-bold text-ink-900 focus:outline-none disabled:cursor-not-allowed" />
          
        </label>
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-ink-50 px-4 py-2.5">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-ink-600">
              <PawPrintIcon className="h-3.5 w-3.5" aria-hidden="true" /> Pets
            </span>
            <span className="text-sm font-bold text-ink-900" aria-live="polite">
              {pets} {pets === 1 ? 'pet' : 'pets'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setPets((p) => Math.max(1, p - 1))} disabled={pets <= 1} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 hover:border-ink-400 disabled:opacity-40" aria-label="Fewer pets">
              <MinusIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setPets((p) => Math.min(5, p + 1))} disabled={pets >= 5} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 hover:border-ink-400 disabled:opacity-40" aria-label="More pets">
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-lg btn-primary h-14 md:h-[60px]">
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
          Search
        </button>
      </div>
    </form>);

}