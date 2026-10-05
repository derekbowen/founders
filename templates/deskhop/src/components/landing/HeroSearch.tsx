import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, LayoutGridIcon, MapPinIcon, SearchIcon, UsersIcon } from 'lucide-react';
import { cities } from '../../data/cities';
import { spaceTypes } from '../../data/spaceTypes';
import { todayISO } from '../../utils/time';

export function HeroSearch() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [date, setDate] = useState(todayISO());
  const [type, setType] = useState('');
  const [people, setPeople] = useState('1');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (date) params.set('date', date);
    if (type) params.set('type', type);
    if (people !== '1') params.set('people', people);
    navigate(`/s?${params.toString()}`);
  }

  const fieldWrap = 'group relative rounded-xl px-4 py-2.5 transition-colors focus-within:bg-mist hover:bg-mist';
  const labelCls = 'flex items-center gap-1.5 text-xs font-semibold text-ink';
  const inputCls = 'mt-0.5 w-full bg-transparent text-sm text-ink-muted focus:outline-none';

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Find a workspace"
      className="rounded-2xl border border-line bg-white p-2 shadow-pop">
      
      <div className="grid gap-1 sm:grid-cols-2">
        <div className={fieldWrap}>
          <label htmlFor="hero-city" className={labelCls}>
            <MapPinIcon size={13} className="text-brand-700" aria-hidden="true" /> City
          </label>
          <select id="hero-city" value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
            <option value="">Anywhere</option>
            {cities.map((c) =>
            <option key={c.name} value={c.name}>
                {c.name}
              </option>
            )}
          </select>
        </div>
        <div className={fieldWrap}>
          <label htmlFor="hero-date" className={labelCls}>
            <CalendarIcon size={13} className="text-brand-700" aria-hidden="true" /> Date
          </label>
          <input
            id="hero-date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCls} />
          
        </div>
        <div className={fieldWrap}>
          <label htmlFor="hero-type" className={labelCls}>
            <LayoutGridIcon size={13} className="text-brand-700" aria-hidden="true" /> Desk or room
          </label>
          <select id="hero-type" value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
            <option value="">Any space type</option>
            {spaceTypes.map((t) =>
            <option key={t.id} value={t.id}>
                {t.label}
              </option>
            )}
          </select>
        </div>
        <div className={fieldWrap}>
          <label htmlFor="hero-people" className={labelCls}>
            <UsersIcon size={13} className="text-brand-700" aria-hidden="true" /> People
          </label>
          <select id="hero-people" value={people} onChange={(e) => setPeople(e.target.value)} className={inputCls}>
            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) =>
            <option key={n} value={n}>
                {n} {n === 1 ? 'person' : 'people'}
              </option>
            )}
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary mt-2 w-full !py-3 !text-base">
        <SearchIcon size={18} aria-hidden="true" /> Search spaces
      </button>
    </form>);

}