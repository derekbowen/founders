import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, RulerIcon, SearchIcon } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { sizeBuckets } from '../../data/spaceTypes';

export function HeroSearch() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
  const [size, setSize] = useState('any');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (location) p.set('location', location);
    if (date) p.set('date', date);
    if (size !== 'any') p.set('size', size);
    navigate(`/s?${p.toString()}`);
  };

  const cell = 'flex flex-1 items-center gap-3 px-4 py-3 md:py-2';
  const inputCls = 'w-full bg-transparent text-sm font-medium text-stone-900 placeholder:text-stone-500 focus:outline-none';

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Find storage"
      className="flex w-full flex-col divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white p-2 shadow-lift md:flex-row md:items-center md:divide-x md:divide-y-0 md:rounded-full">
      
      <div className={cell}>
        <MapPinIcon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
        <div className="flex-1">
          <label htmlFor="hero-location" className="block text-xs font-semibold text-stone-600">Location</label>
          <input id="hero-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Neighborhood or address" className={inputCls} />
        </div>
      </div>
      <div className={cell}>
        <CalendarIcon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
        <div className="flex-1">
          <label htmlFor="hero-date" className="block text-xs font-semibold text-stone-600">Move-in date</label>
          <input id="hero-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
      </div>
      <div className={cell}>
        <RulerIcon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
        <div className="flex-1">
          <label htmlFor="hero-size" className="block text-xs font-semibold text-stone-600">Size</label>
          <select id="hero-size" value={size} onChange={(e) => setSize(e.target.value)} className={`${inputCls} -ml-1 cursor-pointer`}>
            {sizeBuckets.map((b) =>
            <option key={b.id} value={b.id}>{b.id === 'any' ? 'Any size' : `${b.label} sq ft`.replace('sq ft sq ft', 'sq ft')}</option>
            )}
          </select>
        </div>
      </div>
      <div className="p-1 md:pl-2">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 md:rounded-full">
          
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
          Search
        </button>
      </div>
    </form>);

}