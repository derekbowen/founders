import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  variant?: 'compact' | 'hero';
  className?: string;
}

export function SearchBar({ variant = 'compact', className = '' }: SearchBarProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get('q') ?? '');

  useEffect(() => {
    setValue(params.get('q') ?? '');
  }, [params]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams();
    if (value.trim()) next.set('q', value.trim());
    navigate(`/s${next.toString() ? `?${next}` : ''}`);
  };

  if (variant === 'hero') {
    return (
      <form role="search" onSubmit={onSubmit} className={`flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-pop ring-1 ring-slate-200 ${className}`}>
        <label htmlFor="hero-search" className="sr-only">Search for a service</label>
        <SearchIcon className="ml-3 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          id="hero-search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Try “brand identity” or “Shopify store”"
          className="h-12 min-w-0 flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none" />
        
        <button type="submit" className="h-12 shrink-0 rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:px-7">
          Search
        </button>
      </form>);

  }

  return (
    <form role="search" onSubmit={onSubmit} className={`relative w-full ${className}`}>
      <label htmlFor="top-search" className="sr-only">Search services</label>
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        id="top-search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search services or skills"
        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 transition-colors hover:border-slate-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100" />
      
    </form>);

}