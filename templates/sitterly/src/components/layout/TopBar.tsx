import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MenuIcon, MessageCircleIcon, SearchIcon, UserIcon, SettingsIcon, PlusCircleIcon, LogOutIcon, WalletIcon } from 'lucide-react';
import { DropdownMenu } from '../DropdownMenu';
import { Avatar } from '../Avatar';
import { useSession } from '../../contexts/SessionContext';
import { buttonLinkClass } from '../ui/BrandButton';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

export function TopBar() {
  const { user, logout } = useSession();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/s?location=${encodeURIComponent(query.trim())}` : '/s');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <form onSubmit={submit} role="search" className="hidden flex-1 md:block md:max-w-sm lg:max-w-md">
          <label htmlFor="topbar-search" className="sr-only">
            Search sitters by neighborhood
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a neighborhood, e.g. Hyde Park"
              className="h-11 w-full rounded-full border border-ink-200 bg-ink-50 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-500 transition-colors hover:border-ink-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200" />
            
          </div>
        </form>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-1 sm:gap-2">
          <NavLink to="/s" className={({ isActive }) => `hidden rounded-full px-3 py-2 text-sm font-semibold lg:inline-flex ${isActive ? 'text-primary-700' : 'text-ink-700 hover:bg-ink-100'}`}>
            Find a sitter
          </NavLink>
          <Link to="/listings/new" className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100 sm:inline-flex">
            Become a sitter
          </Link>

          {user ?
          <>
              <Link to="/inbox" aria-label="Inbox, 2 unread" className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100">
                <MessageCircleIcon className="h-5 w-5" aria-hidden />
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-white" aria-hidden />
              </Link>
              <div className="hidden sm:block">
                <DropdownMenu
                trigger={
                <button type="button" aria-label="Account menu" className="flex items-center rounded-full p-0.5 ring-primary-300 hover:ring-2">
                      <Avatar name={`${user.firstName} ${user.lastName}`} alt="" src={user.photo} size="sm" />
                    </button>
                }>
                
                  <DropdownMenu.Item label="Inbox" icon={<MessageCircleIcon size={16} />} onClick={() => navigate('/inbox')} />
                  <DropdownMenu.Item label="Profile" icon={<UserIcon size={16} />} onClick={() => navigate('/u/emma-larsen')} />
                  <DropdownMenu.Item label="Create listing" icon={<PlusCircleIcon size={16} />} onClick={() => navigate('/listings/new')} />
                  <DropdownMenu.Item label="Account settings" icon={<SettingsIcon size={16} />} onClick={() => navigate('/account/contact')} />
                  <DropdownMenu.Item label="Payouts" icon={<WalletIcon size={16} />} onClick={() => navigate('/account/payouts')} />
                  <DropdownMenu.Divider />
                  <DropdownMenu.Item label="Log out" icon={<LogOutIcon size={16} />} onClick={() => {logout();navigate('/');}} />
                </DropdownMenu>
              </div>
            </> :

          <>
              <Link to="/signup" className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100 sm:inline-flex">
                Sign up
              </Link>
              <Link to="/login" className={buttonLinkClass('primary', 'sm', 'hidden sm:inline-flex')}>
                Log in
              </Link>
            </>
          }

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:bg-ink-100">
            
            <MenuIcon className="h-5 w-5" aria-hidden />
          </button>
        </nav>
      </div>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}