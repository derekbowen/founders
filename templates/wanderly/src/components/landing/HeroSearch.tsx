import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, SearchIcon, UsersIcon } from 'lucide-react';
import { destinations } from '../../data/destinations';
import { todayISO } from '../../utils/availability';

export function HeroSearch() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    const match = destinations.find((d) => d.city.toLowerCase() === destination.trim().toLowerCase());
    if (destination.trim()) p.set('dest', match ? match.id : destination.trim());
    if (date) p.set('date', date);
    if (guests > 1) p.set('guests', String(guests));
    navigate(`/s?${p.toString()}`);
  };

  const cell = 'flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-sand-100 focus-within:bg-sand-100';
  const lbl = 'block text-xs font-semibold uppercase tracking-wider text-slate-700';
  const input = 'w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none';

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Find experiences"
      className="flex w-full flex-col gap-1 rounded-3xl bg-white p-2 shadow-float md:flex-row md:items-center md:rounded-full">
      
      <div className={cell}>
        <MapPinIcon className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
        <div className="flex-1">
          <label htmlFor="hero-dest" className={lbl}>Where</label>
          <input
            id="hero-dest"
            list="hero-destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destinations"
            className={input} />
          
          <datalist id="hero-destinations">
            {destinations.map((d) =>
            <option key={d.id} value={d.city}>{d.country}</option>
            )}
          </datalist>
        </div>
      </div>
      <div className="hidden h-8 w-px bg-slate-200 md:block" aria-hidden />
      <div className={cell}>
        <CalendarIcon className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
        <div className="flex-1">
          <label htmlFor="hero-date" className={lbl}>When</label>
          <input id="hero-date" type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} className={input} />
        </div>
      </div>
      <div className="hidden h-8 w-px bg-slate-200 md:block" aria-hidden />
      <div className={cell}>
        <UsersIcon className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
        <div className="flex-1">
          <label htmlFor="hero-guests" className={lbl}>Guests</label>
          <select id="hero-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={input}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) =>
            <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            )}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 md:h-14 md:rounded-full">
        
        <SearchIcon className="h-5 w-5" aria-hidden />
        Search
      </button>
    </form>);

}