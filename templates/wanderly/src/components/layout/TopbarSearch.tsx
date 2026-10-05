import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

export function TopbarSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (location.pathname === '/s') setQuery(params.get('dest') ?? '');
  }, [location.pathname, params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(location.pathname === '/s' ? params : undefined);
    if (query.trim()) next.set('dest', query.trim());else
    next.delete('dest');
    navigate(`/s?${next.toString()}`);
  };

  return (
    <form onSubmit={submit} role="search" className="relative w-full max-w-sm">
      <label htmlFor="topbar-search" className="sr-only">
        Search destinations or experiences
      </label>
      <input
        id="topbar-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Where to? Try “Lisbon”"
        className="h-11 w-full rounded-full border border-slate-300 bg-white pl-4 pr-12 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30" />
      
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        aria-label="Search">
        
        <SearchIcon className="h-4 w-4" />
      </button>
    </form>);

}