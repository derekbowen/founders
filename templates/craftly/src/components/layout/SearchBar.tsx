import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';

export function SearchBar({ className = '', onSubmitted }: {className?: string;onSubmitted?: () => void;}) {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(params.get('q') ?? '');

  useEffect(() => {
    if (location.pathname === '/s') setValue(params.get('q') ?? '');
  }, [params, location.pathname]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(location.pathname === '/s' ? params : undefined);
    if (value.trim()) next.set('q', value.trim());else
    next.delete('q');
    navigate(`/s?${next.toString()}`);
    onSubmitted?.();
  };

  return (
    <form role="search" onSubmit={submit} className={`relative ${className}`}>
      <label htmlFor="global-search" className="sr-only">
        Search handmade goods
      </label>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      <input
        id="global-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search mugs, rings, linocuts…"
        className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-24 text-sm text-ink placeholder:text-muted/80 transition-colors hover:border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden" />
      
      {value &&
      <button
        type="button"
        onClick={() => setValue('')}
        className="absolute right-[4.75rem] top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-subtle hover:text-ink"
        aria-label="Clear search">
        
          <XIcon className="h-3.5 w-3.5" />
        </button>
      }
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-full bg-primary px-4 text-xs font-semibold text-white transition-colors hover:bg-primary-hover">
        
        Search
      </button>
    </form>);

}