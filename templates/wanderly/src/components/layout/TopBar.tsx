import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { InboxIcon, MenuIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Logo } from './Logo';
import { TopbarSearch } from './TopbarSearch';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '../../contexts/AuthContext';

const navLink = ({ isActive }: {isActive: boolean;}) =>
twMerge(
  'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-sand-100',
  isActive ? 'text-primary-700' : 'text-slate-700'
);

export function TopBar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-float">
        
        Skip to content
      </a>
      <div className="mx-auto flex h-[72px] max-w-page items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden flex-1 justify-center md:flex">
          <TopbarSearch />
        </div>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/s" className={navLink}>
            Explore
          </NavLink>
          <NavLink to="/host/new/details" className={navLink}>
            Host an experience
          </NavLink>
          {user ?
          <>
              <Link
              to="/inbox/trips"
              className="relative mx-1 flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-sand-100"
              aria-label="Inbox, 2 unread">
              
                <InboxIcon className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary-600" />
              </Link>
              <UserMenu />
            </> :

          <>
              <NavLink to="/signup" className={navLink}>
                Sign up
              </NavLink>
              <Link
              to="/login"
              className="ml-1 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
              
                Log in
              </Link>
            </>
          }
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-sand-100 lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}>
          
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}