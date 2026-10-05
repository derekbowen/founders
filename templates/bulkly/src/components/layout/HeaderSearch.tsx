import React, { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function HeaderSearch({ className = '' }: {className?: string;}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (location.pathname === '/search') {
      setQuery(new URLSearchParams(location.search).get('q') ?? '');
    }
  }, [location.pathname, location.search]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(location.pathname === '/search' ? location.search : '');
    if (query.trim()) params.set('q', query.trim());else
    params.delete('q');
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form role="search" onSubmit={onSubmit} className={`relative ${className}`}>
      <label htmlFor="header-search" className="sr-only">
        Search wholesale products and brands
      </label>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        id="header-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, brands, categories…"
        className="h-10 w-full rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-500 transition-colors hover:border-slate-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
      
    </form>);

}