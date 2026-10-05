import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  SearchIcon,
  MenuIcon,
  InboxIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  BookOpenIcon,
  ChevronDownIcon } from
'lucide-react';
import { DropdownMenu } from '../DropdownMenu';
import { Avatar } from '../Avatar';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { useAuth } from '../../contexts/AuthContext';
import { useLessons } from '../../contexts/LessonsContext';
import { linkButton } from '../../utils/buttonStyles';

export function TopBar() {
  const { isSignedIn, user, signOut } = useAuth();
  const { lessons } = useLessons();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const fullName = `${user.firstName} ${user.lastName}`;
  const pendingCount = lessons.filter((l) => l.status === 'requested').length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
  };

  const navClass = ({ isActive }: {isActive: boolean;}) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
  isActive ? 'text-primary-700 bg-primary-50' : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900'}`;


  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center gap-4 px-4 sm:px-6">
        <Logo />

        <form onSubmit={handleSearch} role="search" className="hidden flex-1 md:block md:max-w-sm lg:max-w-md">
          <label htmlFor="topbar-search" className="sr-only">
            Search tutors
          </label>
          <div className="relative">
            <SearchIcon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
            <input
              id="topbar-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subjects, exams or tutors"
              className="h-10 w-full rounded-full border border-ink-200 bg-ink-50 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-100" />
            
          </div>
        </form>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          <NavLink to="/search" className={navClass}>
            Find tutors
          </NavLink>
          <NavLink to="/listings/new" className={navClass}>
            Become a tutor
          </NavLink>
          {isSignedIn &&
          <NavLink to="/inbox" className={navClass}>
              <span className="inline-flex items-center gap-1.5">
                <InboxIcon size={16} aria-hidden="true" />
                Inbox
                {pendingCount > 0 &&
              <span className="rounded-full bg-accent-400 px-1.5 text-xs font-semibold text-ink-900" aria-label={`${pendingCount} pending`}>
                    {pendingCount}
                  </span>
              }
              </span>
            </NavLink>
          }
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link to="/search" className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 md:hidden" aria-label="Search tutors">
            <SearchIcon size={20} />
          </Link>
          {isSignedIn ?
          <div className="hidden lg:block">
              <DropdownMenu
              trigger={
              <button type="button" className="flex items-center gap-1.5 rounded-full p-1 pr-2 hover:bg-ink-100" aria-label="Account menu">
                    <Avatar name={fullName} alt={fullName} size="sm" />
                    <ChevronDownIcon size={16} className="text-ink-500" aria-hidden="true" />
                  </button>
              }>
              
                <DropdownMenu.Group label={fullName}>
                  <DropdownMenu.Item label="Inbox" icon={<InboxIcon size={16} />} onClick={() => navigate('/inbox')} />
                  <DropdownMenu.Item label="Your profile" icon={<UserIcon size={16} />} onClick={() => navigate('/u/me')} />
                  <DropdownMenu.Item label="Your tutor listing" icon={<BookOpenIcon size={16} />} onClick={() => navigate('/tutors/me')} />
                  <DropdownMenu.Item label="Account settings" icon={<SettingsIcon size={16} />} onClick={() => navigate('/account/contact')} />
                </DropdownMenu.Group>
                <DropdownMenu.Divider />
                <DropdownMenu.Item label="About" onClick={() => navigate('/about')} />
                <DropdownMenu.Item label="Terms of Service" onClick={() => navigate('/terms')} />
                <DropdownMenu.Item label="Privacy Policy" onClick={() => navigate('/privacy')} />
                <DropdownMenu.Divider />
                <DropdownMenu.Item
                label="Log out"
                icon={<LogOutIcon size={16} />}
                onClick={() => {
                  signOut();
                  navigate('/');
                }} />
              
              </DropdownMenu>
            </div> :

          <div className="hidden items-center gap-1 lg:flex">
              <Link
              to="/login"
              state={{ from: location.pathname + location.search }}
              className={`${linkButton.base} ${linkButton.ghost} !px-4 !py-2`}>
              
                Log in
              </Link>
              <Link to="/signup" className={`${linkButton.base} ${linkButton.primary} !px-4 !py-2`}>
                Sign up
              </Link>
            </div>
          }
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 lg:hidden"
            aria-label="Open menu">
            
            <MenuIcon size={22} />
          </button>
        </div>
      </div>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} pendingCount={pendingCount} />
    </header>);

}