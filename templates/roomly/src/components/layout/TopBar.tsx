import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquareIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { Button } from '../Button';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { useApp } from '../../contexts/AppContext';
import { buttonStyles } from '../../utils/styles';

export function TopBar() {
  const { currentUser, unreadCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const isLanding = location.pathname === '/';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/s?city=${encodeURIComponent(q)}` : '/s');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Logo />

        {!isLanding &&
        <form onSubmit={handleSearch} className="hidden flex-1 md:block md:max-w-sm" role="search">
            <label htmlFor="topbar-search" className="sr-only">
              Search by city or university
            </label>
            <div className="flex items-center gap-2 rounded-full border border-navy-200 bg-white py-1.5 pl-4 pr-1.5 transition focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100">
              <SearchIcon size={16} className="text-navy-400" aria-hidden />
              <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City or university"
              className="w-full bg-transparent text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none" />
            
              <button
              type="submit"
              className="rounded-full bg-primary-400 px-3 py-1.5 text-xs font-semibold text-navy-900 transition hover:bg-primary-500">
              
                Search
              </button>
            </div>
          </form>
        }

        <nav className="ml-auto flex items-center gap-1 sm:gap-2" aria-label="Main">
          <NavLink
            to="/s"
            className={({ isActive }) =>
            `hidden rounded-xl px-3 py-2 text-sm font-medium transition lg:inline-flex ${
            isActive ? 'bg-navy-50 text-navy-900' : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'}`

            }>
            
            Browse rooms
          </NavLink>
          <Link
            to="/listings/new"
            className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900 sm:inline-flex">
            
            <PlusIcon size={16} aria-hidden />
            List a room
          </Link>

          {currentUser ?
          <Link
            to="/inbox"
            className="relative grid h-10 w-10 place-items-center rounded-full text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
            aria-label={`Inbox${unreadCount ? `, ${unreadCount} unread` : ''}`}>
            
              <MessageSquareIcon size={20} />
              {unreadCount > 0 &&
            <span className="absolute right-1 top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-coral-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
            }
            </Link> :

          <div className="hidden items-center gap-2 md:flex">
              <Button
              variant="tertiary"
              size="small"
              className={buttonStyles.ghost}
              onClick={() => navigate('/login')}>
              
                Log in
              </Button>
              <Button size="small" className={buttonStyles.primary} onClick={() => navigate('/signup')}>
                Sign up
              </Button>
            </div>
          }
          <NavMenu />
        </nav>
      </div>
    </header>);

}