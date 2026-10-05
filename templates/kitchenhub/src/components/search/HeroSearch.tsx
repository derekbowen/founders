import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { cities } from '../../data/catalog';
import { daysFromTodayISO, todayISO } from '../../utils/format';
import { Button } from '../ui/Button';

const fieldWrap =
'block rounded-xl px-4 py-2.5 transition-colors hover:bg-steel-50 focus-within:bg-steel-50 focus-within:ring-2 focus-within:ring-primary/20';
const fieldLabel = 'block text-[11px] font-semibold uppercase tracking-wider text-steel-500';
const fieldControl = 'mt-0.5 w-full bg-transparent text-sm font-medium text-steel-900 focus:outline-none';

export function HeroSearch() {
  const navigate = useNavigate();
  const [city, setCity] = useState('all');
  const [date, setDate] = useState(daysFromTodayISO(1));
  const [hours, setHours] = useState(4);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city !== 'all') params.set('city', city);
    if (date) params.set('date', date);
    params.set('hours', String(hours));
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Find a kitchen"
      className="grid gap-1 rounded-2xl bg-white p-2 shadow-lift md:grid-cols-[1.3fr_1fr_0.9fr_auto] md:items-center md:divide-x md:divide-steel-200">
      
      <label className={fieldWrap}>
        <span className={fieldLabel}>City</span>
        <select value={city} onChange={(e) => setCity(e.target.value)} className={fieldControl}>
          <option value="all">All cities</option>
          {cities.map((c) =>
          <option key={c} value={c}>{c}</option>
          )}
        </select>
      </label>
      <label className={fieldWrap}>
        <span className={fieldLabel}>Date</span>
        <input type="date" value={date} min={todayISO()} onChange={(e) => setDate(e.target.value)} className={fieldControl} />
      </label>
      <label className={fieldWrap}>
        <span className={fieldLabel}>Hours</span>
        <select value={hours} onChange={(e) => setHours(Number(e.target.value))} className={fieldControl}>
          {[2, 3, 4, 5, 6, 8, 10, 12].map((h) =>
          <option key={h} value={h}>{h} hours</option>
          )}
        </select>
      </label>
      <div className="p-1 md:border-0 md:pl-2">
        <Button type="submit" size="lg" fullWidth className="md:w-auto">
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
          Search kitchens
        </Button>
      </div>
    </form>);

}