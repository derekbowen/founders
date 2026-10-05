import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, SearchIcon, TentIcon, UsersIcon } from 'lucide-react';
import { siteTypes } from '../../data/siteTypes';
import { TODAY, plusDays, toISODate } from '../../utils/dates';

export function HeroSearch() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [campers, setCampers] = useState(2);
  const [type, setType] = useState('');
  const minDate = toISODate(TODAY);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (location.trim()) p.set('location', location.trim());
    if (start) p.set('start', start);
    if (end) p.set('end', end);
    if (campers > 1) p.set('campers', String(campers));
    if (type) p.set('type', type);
    navigate(`/s?${p.toString()}`);
  };

  const field = 'flex flex-col gap-1 rounded-xl px-4 py-2.5 transition-colors hover:bg-sand-100 focus-within:bg-sand-100';
  const fieldLabel = 'flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600';
  const control = 'w-full bg-transparent text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:outline-none';

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Find a campsite"
      className="grid gap-1 rounded-2xl bg-white p-2 shadow-lift sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_1fr_auto] lg:items-center">
      
      <label className={`${field} sm:col-span-2 lg:col-span-1`}>
        <span className={fieldLabel}>
          <MapPinIcon size={13} aria-hidden="true" /> Destination
        </span>
        <input className={control} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Yosemite, Vermont, Big Sur…" />
      </label>
      <label className={field}>
        <span className={fieldLabel}>
          <CalendarIcon size={13} aria-hidden="true" /> Check in
        </span>
        <input
          type="date"
          className={control}
          value={start}
          min={minDate}
          onChange={(e) => {
            setStart(e.target.value);
            if (!end || e.target.value >= end) setEnd(plusDays(e.target.value, 2));
          }} />
        
      </label>
      <label className={field}>
        <span className={fieldLabel}>
          <CalendarIcon size={13} aria-hidden="true" /> Check out
        </span>
        <input type="date" className={control} value={end} min={start ? plusDays(start, 1) : minDate} onChange={(e) => setEnd(e.target.value)} />
      </label>
      <label className={field}>
        <span className={fieldLabel}>
          <UsersIcon size={13} aria-hidden="true" /> Campers
        </span>
        <select className={control} value={campers} onChange={(e) => setCampers(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) =>
          <option key={n} value={n}>
              {n} {n === 1 ? 'camper' : 'campers'}
            </option>
          )}
        </select>
      </label>
      <label className={field}>
        <span className={fieldLabel}>
          <TentIcon size={13} aria-hidden="true" /> Site type
        </span>
        <select className={control} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Any site</option>
          {siteTypes.map((t) =>
          <option key={t.key} value={t.key}>
              {t.label}
            </option>
          )}
        </select>
      </label>
      <button type="submit" className="btn-accent btn-lg h-full min-h-[52px] rounded-xl sm:col-span-2 lg:col-span-1">
        <SearchIcon size={18} aria-hidden="true" />
        Search
      </button>
    </form>);

}