import React, { useEffect, useId, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  size?: 'md' | 'lg';
  placeholder?: string;
  onSubmitted?: () => void;
}

export function SearchBar({ size = 'md', placeholder = 'Search planners, loops, templates…', onSubmitted }: SearchBarProps) {
  const id = useId();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const urlQuery = location.pathname === '/s' ? params.get('q') ?? '' : '';
  const [value, setValue] = useState(urlQuery);

  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(location.pathname === '/s' ? params : undefined);
    if (value.trim()) next.set('q', value.trim());else
    next.delete('q');
    navigate(`/s?${next.toString()}`);
    onSubmitted?.();
  };

  const isLarge = size === 'lg';

  return (
    <form role="search" onSubmit={submit} className="relative flex w-full items-center">
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <SearchIcon
        aria-hidden="true"
        className={`pointer-events-none absolute text-muted ${isLarge ? 'left-5 h-5 w-5' : 'left-3.5 h-4 w-4'}`} />
      
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={
        isLarge ?
        'field h-16 rounded-2xl border-2 border-ink pl-12 pr-36 text-base shadow-pop focus:ring-brand/50' :
        'field h-10 rounded-full border-ink/25 pl-10 pr-4'
        } />
      
      {isLarge &&
      <button type="submit" className="btn btn-accent absolute right-2 h-12 px-6">
          Search
        </button>
      }
    </form>);

}