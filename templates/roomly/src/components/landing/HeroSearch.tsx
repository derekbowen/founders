import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, SearchIcon, ShieldCheckIcon, WalletIcon } from 'lucide-react';
import { Button } from '../Button';
import { brand } from '../../data/brand';
import { images } from '../../data/images';
import { cityOptions } from '../../data/features';
import { stats } from '../../data/discover';
import { universities } from '../../data/discover';
import { buttonStyles } from '../../utils/styles';
import { formatMoney } from '../../utils/format';

const budgetOptions = [500, 750, 1000, 1500];

export function HeroSearch() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [moveIn, setMoveIn] = useState('');
  const [budget, setBudget] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (moveIn) params.set('moveIn', moveIn);
    if (budget) params.set('maxRent', budget);
    navigate(`/s${params.toString() ? `?${params}` : ''}`);
  };

  const fieldWrap =
  'flex flex-1 flex-col gap-0.5 rounded-xl px-4 py-2.5 transition hover:bg-navy-50 focus-within:bg-navy-50';
  const fieldLabel = 'flex items-center gap-1.5 text-xs font-semibold text-navy-900';
  const fieldControl = 'w-full bg-transparent text-sm text-navy-700 focus:outline-none';

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800 ring-1 ring-primary-200">
            <ShieldCheckIcon size={14} aria-hidden /> Verified rooms · No booking fees
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
            {brand.heroTitle}
            <span className="text-primary-600">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-600">{brand.heroSubtitle}</p>

          <form
            onSubmit={submit}
            className="mt-8 flex flex-col gap-1 rounded-2xl border border-navy-100 bg-white p-2 shadow-lift md:flex-row md:items-center"
            role="search"
            aria-label="Find a room">
            
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                <MapPinIcon size={13} aria-hidden /> City
              </span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className={fieldControl}>
                <option value="">Any city</option>
                {cityOptions.map((c) =>
                <option key={c} value={c}>
                    {c}
                  </option>
                )}
              </select>
            </label>
            <div className="hidden h-10 w-px bg-navy-100 md:block" aria-hidden />
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                <CalendarIcon size={13} aria-hidden /> Move-in date
              </span>
              <input
                type="date"
                value={moveIn}
                min="2026-10-01"
                onChange={(e) => setMoveIn(e.target.value)}
                className={fieldControl} />
              
            </label>
            <div className="hidden h-10 w-px bg-navy-100 md:block" aria-hidden />
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                <WalletIcon size={13} aria-hidden /> Monthly budget
              </span>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className={fieldControl}>
                <option value="">Any budget</option>
                {budgetOptions.map((b) =>
                <option key={b} value={b}>
                    Up to {formatMoney(b)}
                  </option>
                )}
              </select>
            </label>
            <Button
              type="submit"
              size="large"
              leftIcon={<SearchIcon size={18} />}
              className={`${buttonStyles.primary} md:ml-1`}>
              
              Search
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-navy-500">
            <span>Popular:</span>
            {universities.slice(0, 4).map((u) =>
            <button
              key={u.short}
              type="button"
              onClick={() => navigate(`/s?city=${u.city}`)}
              className="rounded-full border border-navy-200 px-3 py-1 text-navy-700 transition hover:border-primary-400 hover:bg-primary-50">
              
                Near {u.short}
              </button>
            )}
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {stats.map((s) =>
            <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-navy-900">{s.value}</dd>
                <dd className="text-xs text-navy-500">{s.label}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-10 hidden h-72 w-72 rounded-full bg-primary-100 lg:block" aria-hidden />
          <div className="absolute -bottom-8 -left-8 hidden h-40 w-40 rounded-full bg-coral-100 lg:block" aria-hidden />
          <img
            src={images.hero}
            alt="A renter working on her laptop in a bright shared flat"
            className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lift lg:aspect-[5/6]" />
          
          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lift backdrop-blur sm:right-auto">
            <img src={images.room1} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-navy-900">Private room · Neukölln</p>
              <p className="text-xs text-navy-500">
                <span className="font-semibold text-navy-900">{formatMoney(640)}</span>/mo · bills included
              </p>
            </div>
            <span className="ml-2 rounded-full bg-coral-500 px-2.5 py-1 text-[11px] font-bold text-white">
              New
            </span>
          </div>
        </div>
      </div>
    </section>);

}