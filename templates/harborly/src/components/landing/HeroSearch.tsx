import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, UsersIcon, SearchIcon } from 'lucide-react';
import { destinations } from '../../data/destinations';
import { todayIso } from '../../utils/format';

export function HeroSearch() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (date) params.set('date', date);
    if (Number(guests) > 1) params.set('guests', guests);
    navigate(`/s?${params.toString()}`);
  };

  const cell = 'flex flex-1 items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-sand-light focus-within:bg-sand-light';
  const labelCls = 'block text-[11px] font-semibold uppercase tracking-wider text-navy';
  const inputCls = 'w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none';

  return (
    <form onSubmit={submit} role="search" aria-label="Find a boat" className="flex w-full flex-col gap-1 rounded-2xl bg-white p-2 shadow-lift md:flex-row md:items-center md:rounded-full md:pl-3">
      <div className={cell + ' md:rounded-full'}>
        <MapPinIcon className="h-5 w-5 shrink-0 text-coral-dark" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <label htmlFor="hero-location" className={labelCls}>
            Marina or location
          </label>
          <select id="hero-location" value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls + ' -ml-1 cursor-pointer appearance-none'}>
            <option value="">Anywhere</option>
            {destinations.map((d) =>
            <option key={d.id} value={d.id}>
                {d.name}, {d.region}
              </option>
            )}
          </select>
        </div>
      </div>
      <div className="hidden h-8 w-px bg-line md:block" aria-hidden="true" />
      <div className={cell + ' md:rounded-full'}>
        <CalendarIcon className="h-5 w-5 shrink-0 text-coral-dark" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <label htmlFor="hero-date" className={labelCls}>
            Date
          </label>
          <input id="hero-date" type="date" min={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
      </div>
      <div className="hidden h-8 w-px bg-line md:block" aria-hidden="true" />
      <div className={cell + ' md:max-w-[180px] md:rounded-full'}>
        <UsersIcon className="h-5 w-5 shrink-0 text-coral-dark" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <label htmlFor="hero-guests" className={labelCls}>
            Guests
          </label>
          <select id="hero-guests" value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls + ' -ml-1 cursor-pointer appearance-none'}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) =>
            <option key={n} value={n}>
                {n} {n === 1 ? 'guest' : 'guests'}
              </option>
            )}
          </select>
        </div>
      </div>
      <button type="submit" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-coral-dark px-6 text-sm font-semibold text-white transition-colors hover:bg-coral-dark/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 md:h-14 md:rounded-full md:px-7">
        <SearchIcon className="h-4 w-4" aria-hidden="true" />
        Search boats
      </button>
    </form>);

}