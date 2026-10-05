import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, PawPrintIcon, SearchIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ServiceIcon } from '../ui/ServiceIcon';
import { brand } from '../../data/brand';
import { services } from '../../data/services';
import type { ServiceId } from '../../types/marketplace';
import { cn } from '../../utils/cn';
import { toInputDate } from '../../utils/format';

export function HeroSearch() {
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceId>('boarding');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [pets, setPets] = useState(1);
  const [error, setError] = useState('');
  const isNight = services.find((s) => s.id === service)?.unitType === 'night';
  const today = toInputDate(new Date());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNight && start && end && end <= start) {
      setError('Drop-off must be before pick-up.');
      return;
    }
    setError('');
    const params = new URLSearchParams({ service, pets: String(pets) });
    if (location.trim()) params.set('location', location.trim());
    if (start) params.set('start', start);
    if (isNight && end) params.set('end', end);
    navigate(`/s?${params.toString()}`);
  };

  const fieldWrap = 'rounded-2xl border border-stone-200 bg-white px-4 py-2.5 transition-colors focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100 hover:border-stone-300';
  const labelCls = 'flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-stone-500';
  const inputCls = 'mt-0.5 w-full bg-transparent text-[15px] font-bold text-stone-900 placeholder:font-medium placeholder:text-stone-400 focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="rounded-4xl bg-white p-4 shadow-lift ring-1 ring-stone-100 sm:p-5" aria-label="Find a sitter">
      <fieldset>
        <legend className="mb-3 text-sm font-extrabold text-stone-800">I’m looking for</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {services.map((s) => {
            const selected = s.id === service;
            return (
              <label
                key={s.id}
                className={cn(
                  'flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-3 text-center transition-colors',
                  selected ? 'border-primary-500 bg-primary-50 text-stone-900' : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                )}>
                
                <input type="radio" name="service" value={s.id} checked={selected} onChange={() => setService(s.id)} className="sr-only" />
                <ServiceIcon id={s.id} className={cn('h-6 w-6', selected ? 'text-primary-700' : 'text-stone-500')} />
                <span className="text-sm font-extrabold leading-tight">{s.label}</span>
                <span className="hidden text-[11px] font-semibold leading-tight text-stone-500 lg:block">{s.unitType === 'night' ? 'Per night' : `Per ${s.unitLabel}`}</span>
              </label>);

          })}
        </div>
      </fieldset>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className={cn(fieldWrap, 'sm:col-span-2')}>
          <label htmlFor="hero-location" className={labelCls}>
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" /> Location
          </label>
          <input id="hero-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={`Neighborhood or ZIP in ${brand.defaultCity}`} className={inputCls} />
        </div>
        <div className={fieldWrap}>
          <label htmlFor="hero-start" className={labelCls}>
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" /> {isNight ? 'Drop-off' : 'Date'}
          </label>
          <input id="hero-start" type="date" min={today} value={start} onChange={(e) => setStart(e.target.value)} className={inputCls} />
        </div>
        {isNight ?
        <div className={fieldWrap}>
            <label htmlFor="hero-end" className={labelCls}>
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" /> Pick-up
            </label>
            <input id="hero-end" type="date" min={start || today} value={end} onChange={(e) => setEnd(e.target.value)} className={inputCls} />
          </div> :

        <div className={fieldWrap}>
            <label htmlFor="hero-pets-alt" className={labelCls}>
              <PawPrintIcon className="h-3.5 w-3.5" aria-hidden="true" /> Pets
            </label>
            <select id="hero-pets-alt" value={pets} onChange={(e) => setPets(Number(e.target.value))} className={inputCls}>
              {[1, 2, 3].map((n) =>
            <option key={n} value={n}>
                  {n} {n === 1 ? 'pet' : 'pets'}
                </option>
            )}
            </select>
          </div>
        }
      </div>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        {isNight &&
        <div className={cn(fieldWrap, 'sm:w-44')}>
            <label htmlFor="hero-pets" className={labelCls}>
              <PawPrintIcon className="h-3.5 w-3.5" aria-hidden="true" /> Pets
            </label>
            <select id="hero-pets" value={pets} onChange={(e) => setPets(Number(e.target.value))} className={inputCls}>
              {[1, 2, 3].map((n) =>
            <option key={n} value={n}>
                  {n} {n === 1 ? 'pet' : 'pets'}
                </option>
            )}
            </select>
          </div>
        }
        <Button type="submit" size="lg" className="flex-1 sm:h-auto" leftIcon={<SearchIcon className="h-5 w-5" strokeWidth={2.5} />}>
          Search sitters
        </Button>
      </div>
      {error &&
      <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
          {error}
        </p>
      }
    </form>);

}