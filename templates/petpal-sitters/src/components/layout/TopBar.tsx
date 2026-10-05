import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { InboxIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { UserMenu } from './UserMenu';
import { useAuth } from '../../contexts/AuthContext';
import { useBookings } from '../../contexts/BookingsContext';

export function TopBar() {
  const { isAuthenticated } = useAuth();
  const { transactions } = useBookings();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const unread = transactions.filter((t) => t.unread).length;

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/s?location=${encodeURIComponent(query.trim())}` : '/s');
  };

  const navLink = ({ isActive }: {isActive: boolean;}) =>
  `hidden rounded-full px-4 py-2.5 text-[15px] font-bold transition-colors lg:inline-flex ${
  isActive ? 'bg-primary-50 text-primary-800' : 'text-stone-700 hover:bg-stone-100'}`;


  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />

        <form onSubmit={onSearch} className="mx-auto hidden w-full max-w-md md:block" role="search">
          <label htmlFor="topbar-search" className="sr-only">
            Search sitters by neighborhood
          </label>
          <div className="relative">
            <MapPinIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sitters near you"
              className="h-11 w-full rounded-full border border-stone-200 bg-stone-50 pl-10 pr-12 text-[15px] font-semibold text-stone-900 placeholder:font-medium placeholder:text-stone-400 transition-colors hover:border-stone-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100" />
            
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-stone-900 transition-colors hover:bg-primary-400">
              
              <SearchIcon className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-1.5 md:ml-0" aria-label="Main">
          <Link
            to="/s"
            aria-label="Search sitters"
            className="flex h-11 w-11 items-center justify-center rounded-full text-stone-700 hover:bg-stone-100 md:hidden">
            
            <SearchIcon className="h-5 w-5" />
          </Link>
          <NavLink to="/listings/new" className={navLink}>
            Become a sitter
          </NavLink>
          {isAuthenticated ?
          <NavLink
            to="/inbox"
            aria-label={`Inbox${unread ? `, ${unread} unread` : ''}`}
            className={({ isActive }) =>
            `relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            isActive ? 'bg-primary-50 text-primary-800' : 'text-stone-700 hover:bg-stone-100'}`

            }>
            
              <InboxIcon className="h-5 w-5" />
              {unread > 0 &&
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-black text-stone-900">
                  {unread}
                </span>
            }
            </NavLink> :

          <>
              <NavLink to="/signup" className={navLink}>
                Sign up
              </NavLink>
              <NavLink to="/login" className={navLink}>
                Log in
              </NavLink>
            </>
          }
          <UserMenu />
        </nav>
      </div>
    </header>);

}