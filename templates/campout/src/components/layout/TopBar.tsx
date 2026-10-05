import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { MessageCircleIcon, SearchIcon, XIcon } from 'lucide-react';
import { Logo } from '../Logo';
import { UserMenu } from './UserMenu';
import { useAuth } from '../../contexts/AuthContext';
import { brand } from '../../data/brand';

export function TopBar() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    setQuery(location.pathname === '/s' ? params.get('location') ?? '' : '');
    setMobileSearch(false);
  }, [location.pathname, params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(location.pathname === '/s' ? params : undefined);
    if (query.trim()) next.set('location', query.trim());else
    next.delete('location');
    navigate(`/s?${next.toString()}`);
  };

  const searchForm =
  <form onSubmit={submit} role="search" className="relative w-full">
      <label htmlFor="topbar-search" className="sr-only">
        Search destinations
      </label>
      <SearchIcon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
      <input
      id="topbar-search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search a park, town or region"
      className="w-full rounded-full border border-sand-300 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
    
    </form>;


  const navClass = ({ isActive }: {isActive: boolean;}) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
  isActive ? 'text-primary-700' : 'text-ink-700 hover:bg-sand-100 hover:text-ink-900'}`;


  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Logo />
        <div className="mx-auto hidden w-full max-w-md md:block">{searchForm}</div>
        <nav aria-label="Main" className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            type="button"
            onClick={() => setMobileSearch((s) => !s)}
            className="btn-ghost px-2.5 md:hidden"
            aria-label={mobileSearch ? 'Close search' : 'Open search'}>
            
            {mobileSearch ? <XIcon size={18} /> : <SearchIcon size={18} />}
          </button>
          <NavLink to="/s" end className={(s) => `${navClass(s)} hidden lg:inline-flex`}>
            Explore
          </NavLink>
          <NavLink to="/l/new" className={(s) => `${navClass(s)} hidden sm:inline-flex`}>
            {brand.hostCta}
          </NavLink>
          <NavLink to="/inbox" className={(s) => `${navClass(s)} hidden items-center gap-1.5 lg:inline-flex`}>
            <MessageCircleIcon size={16} aria-hidden="true" />
            Inbox
            {isSignedIn && <span className="h-2 w-2 rounded-full bg-accent-500" aria-label="New messages" />}
          </NavLink>
          {!isSignedIn &&
          <div className="hidden items-center gap-1 md:flex">
              <Link to="/signup" className="btn-ghost">
                Sign up
              </Link>
              <Link to="/login" className="btn-primary">
                Log in
              </Link>
            </div>
          }
          <div className="ml-1">
            <UserMenu />
          </div>
        </nav>
      </div>
      {mobileSearch && <div className="container-page pb-3 md:hidden">{searchForm}</div>}
    </header>);

}