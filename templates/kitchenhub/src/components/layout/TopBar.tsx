import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MessageSquareIcon, SearchIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn, focusRing } from '../../utils/styles';
import { ButtonLink } from '../ui/ButtonLink';
import { AccountMenu } from './AccountMenu';
import { Logo } from './Logo';

const navLink = ({ isActive }: {isActive: boolean;}) =>
cn(
  'inline-flex h-10 items-center rounded-lg px-3 text-sm font-semibold transition-colors',
  focusRing,
  isActive ? 'text-primary' : 'text-steel-700 hover:bg-steel-100 hover:text-steel-900'
);

export function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
    <header className="sticky top-0 z-[500] border-b border-steel-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8">
        <Logo />
        <form onSubmit={submit} role="search" className="hidden flex-1 md:block md:max-w-sm lg:max-w-md">
          <label htmlFor="topbar-search" className="sr-only">Search kitchens</label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-400" aria-hidden="true" />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, neighborhood or kitchen"
              className="h-10 w-full rounded-full border border-steel-200 bg-steel-50 pl-10 pr-4 text-sm text-steel-900 placeholder:text-steel-500 transition-colors hover:border-steel-300 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" />
            
          </div>
        </form>
        <nav className="ml-auto flex items-center gap-1" aria-label="Main">
          <Link to="/search" aria-label="Search kitchens" className={cn('grid h-10 w-10 place-items-center rounded-full text-steel-700 hover:bg-steel-100 md:hidden', focusRing)}>
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <NavLink to="/search" end className={(p) => cn(navLink(p), 'hidden xl:inline-flex')}>
            Browse kitchens
          </NavLink>
          <NavLink to="/listings/new" className={(p) => cn(navLink(p), 'hidden sm:inline-flex')}>
            List your kitchen
          </NavLink>
          {user ?
          <NavLink to="/inbox" aria-label="Inbox, 2 unread" className={(p) => cn(navLink(p), 'relative w-10 justify-center px-0')}>
              <MessageSquareIcon className="h-5 w-5" aria-hidden="true" />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary" />
            </NavLink> :

          <>
              <NavLink to="/signup" className={(p) => cn(navLink(p), 'hidden md:inline-flex')}>
                Sign up
              </NavLink>
              <ButtonLink to="/login" size="sm" className="mr-1 hidden md:inline-flex">
                Log in
              </ButtonLink>
            </>
          }
          <AccountMenu />
        </nav>
      </div>
    </header>);

}