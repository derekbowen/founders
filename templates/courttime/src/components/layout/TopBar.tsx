import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InboxIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useBookings } from '../../contexts/BookingContext';
import { Logo } from './Logo';
import { SiteMenu } from './SiteMenu';
import { UserMenu } from './UserMenu';

export function TopBar() {
  const { user } = useAuth();
  const { transactions } = useBookings();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const pending = transactions.filter((t) => t.role === 'provider' && t.status === 'booked').length;

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?location=${encodeURIComponent(query.trim())}` : '/search');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-3 lg:gap-6">
        <Logo />
        <form onSubmit={onSearch} className="hidden max-w-md flex-1 md:block" role="search">
          <label htmlFor="topbar-search" className="sr-only">
            Search courts
          </label>
          <div className="relative">
            <SearchIcon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courts, clubs or neighborhoods"
              className="field rounded-full bg-slate-50 pl-10" />
            
          </div>
        </form>
        <nav className="ml-auto flex items-center gap-1 sm:gap-2" aria-label="Primary">
          <Link to="/search" className="btn btn-ghost btn-sm hidden lg:inline-flex">
            Explore
          </Link>
          <Link to="/create-listing" className="btn btn-ghost btn-sm hidden sm:inline-flex">
            List your court
          </Link>
          <Link to="/search" className="btn btn-ghost btn-sm md:hidden" aria-label="Search courts">
            <SearchIcon size={18} />
          </Link>
          {user ?
          <>
              <Link to="/inbox" className="btn btn-ghost btn-sm relative" aria-label={`Inbox${pending ? `, ${pending} pending` : ''}`}>
                <InboxIcon size={18} />
                <span className="hidden xl:inline">Inbox</span>
                {pending > 0 &&
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-ink">
                    {pending}
                  </span>
              }
              </Link>
              <UserMenu />
            </> :

          <>
              <Link to="/signup" className="btn btn-outline btn-sm hidden sm:inline-flex">
                Sign up
              </Link>
              <Link to="/login" className="btn btn-primary btn-sm">
                Log in
              </Link>
            </>
          }
          <button type="button" onClick={() => setMenuOpen(true)} className="btn btn-ghost btn-sm" aria-label="Open site menu">
            <MenuIcon size={20} />
          </button>
        </nav>
      </div>
      <SiteMenu open={menuOpen} onClose={closeMenu} />
    </header>);

}