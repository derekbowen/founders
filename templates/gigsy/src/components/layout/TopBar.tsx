import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MailIcon, SearchIcon } from 'lucide-react';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { SearchBar } from '../SearchBar';
import { ButtonLink } from '../ui/ButtonLink';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionsContext';

export function TopBar() {
  const { isSignedIn } = useAuth();
  const { unreadCount } = useTransactions();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden flex-1 md:block md:max-w-md lg:ml-4">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/s"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Search services">
            
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <NavLink
            to="/create-listing"
            className={({ isActive }) =>
            `hidden rounded-xl px-3 py-2 text-sm font-semibold transition-colors lg:block ${isActive ? 'text-primary-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`
            }>
            
            Offer your services
          </NavLink>
          {isSignedIn ?
          <NavLink
            to="/inbox"
            className={({ isActive }) =>
            `relative flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'}`
            }>
            
              <MailIcon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Inbox</span>
              {unreadCount > 0 &&
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-[11px] font-bold text-white ring-2 ring-white sm:static sm:ring-0">
                  {unreadCount}
                  <span className="sr-only"> unread</span>
                </span>
            }
            </NavLink> :

          <div className="hidden items-center gap-1.5 sm:flex">
              <ButtonLink to="/login" variant="ghost" size="sm">Log in</ButtonLink>
              <ButtonLink to="/signup" size="sm">Sign up</ButtonLink>
            </div>
          }
          <NavMenu />
        </div>
      </div>
    </header>);

}