import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClockIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { defaultArriveLeave } from '../../utils/format';
import { getHours } from '../../utils/pricing';

export function SpotSearchForm() {
  const navigate = useNavigate();
  const defaults = defaultArriveLeave();
  const [address, setAddress] = useState('');
  const [arrive, setArrive] = useState(defaults.arrive);
  const [leave, setLeave] = useState(defaults.leave);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (getHours(arrive, leave) <= 0) {
      setError('Leave time must be after your arrival time.');
      return;
    }
    setError('');
    const params = new URLSearchParams({ arrive, leave });
    if (address.trim()) params.set('address', address.trim());
    navigate(`/s?${params.toString()}`);
  };

  const fieldWrap = 'flex flex-col gap-1 rounded-xl px-4 py-2.5 focus-within:bg-canvas transition-colors';
  const inputCls = 'w-full bg-transparent text-sm font-medium text-ink placeholder:text-muted focus:outline-none';

  return (
    <form onSubmit={submit} className="rounded-2xl bg-surface p-2 shadow-pop" role="search" aria-label="Find parking">
      <div className="grid gap-1 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center md:divide-x md:divide-line">
        <label className={fieldWrap}>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            <MapPinIcon size={12} aria-hidden /> Where to?
          </span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address, venue or airport"
            className={inputCls} />
          
        </label>
        <label className={fieldWrap}>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            <CalendarClockIcon size={12} aria-hidden /> Arrive
          </span>
          <input type="datetime-local" value={arrive} onChange={(e) => setArrive(e.target.value)} className={inputCls} required />
        </label>
        <label className={fieldWrap}>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            <CalendarClockIcon size={12} aria-hidden /> Leave
          </span>
          <input type="datetime-local" value={leave} onChange={(e) => setLeave(e.target.value)} className={inputCls} required />
        </label>
        <div className="p-1 md:pl-2">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-ink transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2">
            
            <SearchIcon size={16} aria-hidden /> Find parking
          </button>
        </div>
      </div>
      {error &&
      <p role="alert" className="px-4 pb-2 pt-1 text-sm font-medium text-danger">
          {error}
        </p>
      }
    </form>);

}