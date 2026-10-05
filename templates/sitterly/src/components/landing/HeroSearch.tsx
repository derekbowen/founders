import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, SearchIcon, UsersIcon } from 'lucide-react';
import { BrandButton } from '../ui/BrandButton';
import { timeOptions, todayIso } from '../../utils/time';

export function HeroSearch() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(todayIso());
  const [start, setStart] = useState('18:00');
  const [kids, setKids] = useState('2');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ date, start, kids });
    if (location.trim()) params.set('location', location.trim());
    navigate(`/s?${params.toString()}`);
  };

  const fieldBase = 'flex min-w-0 flex-col gap-0.5 rounded-2xl px-4 py-2.5 transition-colors hover:bg-ink-50 focus-within:bg-primary-50';
  const labelBase = 'flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-600';
  const inputBase = 'w-full bg-transparent text-sm font-medium text-ink-900 placeholder:text-ink-500 focus:outline-none';

  return (
    <form onSubmit={submit} role="search" aria-label="Find a sitter" className="mt-8 rounded-3xl border border-ink-200 bg-white p-2 shadow-lift">
      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.9fr_0.8fr_auto] lg:items-center">
        <label className={fieldBase}>
          <span className={labelBase}>
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden /> Location
          </span>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Neighborhood or ZIP" className={inputBase} />
        </label>
        <label className={fieldBase}>
          <span className={labelBase}>
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden /> Date
          </span>
          <input type="date" value={date} min={todayIso()} onChange={(e) => setDate(e.target.value)} className={inputBase} />
        </label>
        <label className={fieldBase}>
          <span className={labelBase}>
            <ClockIcon className="h-3.5 w-3.5" aria-hidden /> Start time
          </span>
          <select value={start} onChange={(e) => setStart(e.target.value)} className={`${inputBase} cursor-pointer`}>
            {timeOptions.map((t) =>
            <option key={t.value} value={t.value}>
                {t.label}
              </option>
            )}
          </select>
        </label>
        <label className={fieldBase}>
          <span className={labelBase}>
            <UsersIcon className="h-3.5 w-3.5" aria-hidden /> Kids
          </span>
          <select value={kids} onChange={(e) => setKids(e.target.value)} className={`${inputBase} cursor-pointer`}>
            {[1, 2, 3, 4].map((n) =>
            <option key={n} value={n}>
                {n} {n === 1 ? 'child' : 'children'}
              </option>
            )}
          </select>
        </label>
        <div className="p-1 sm:col-span-2 lg:col-span-1">
          <BrandButton type="submit" size="lg" fullWidth leftIcon={<SearchIcon size={18} />}>
            Search
          </BrandButton>
        </div>
      </div>
    </form>);

}