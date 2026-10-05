import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InboxIcon, MenuIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionsContext';
import { Logo } from './Logo';
import { NavDrawer } from './NavDrawer';

export function TopBar() {
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const pending = user ?
  transactions.filter((t) => t.providerId === user.id && t.status === 'requested').length :
  0;

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/s?q=${encodeURIComponent(q)}` : '/s');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-page flex h-16 items-center gap-3 sm:gap-4">
        <Logo />

        <form onSubmit={onSearch} role="search" className="ml-2 hidden max-w-md flex-1 md:flex">
          <label htmlFor="topbar-search" className="sr-only">
            Search spaces
          </label>
          <div className="relative w-full">
            <SearchIcon
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle"
              aria-hidden="true" />
            
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, neighbourhood or space"
              className="h-10 w-full rounded-full border border-line bg-mist pl-10 pr-4 text-sm placeholder:text-ink-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/25" />
            
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/s"
            className="focus-ring grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-mist md:hidden"
            aria-label="Search spaces">
            
            <SearchIcon size={18} />
          </Link>
          <Link
            to="/listings/new"
            className="focus-ring hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-mist lg:inline-flex">
            
            <PlusIcon size={16} aria-hidden="true" /> List your space
          </Link>

          {user ?
          <>
              <Link
              to="/inbox"
              className="focus-ring relative grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-mist"
              aria-label={pending ? `Inbox, ${pending} requests need a reply` : 'Inbox'}>
              
                <InboxIcon size={19} />
                {pending > 0 &&
              <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-700 px-1 text-[10px] font-bold text-white">
                    {pending}
                  </span>
              }
              </Link>
              <Link to={`/u/${user.id}`} className="focus-ring hidden rounded-full sm:block" aria-label="Your profile">
                <Avatar name={user.name} alt={user.name} size="sm" />
              </Link>
            </> :

          <>
              <Link
              to="/login"
              className="focus-ring hidden rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-mist sm:inline-flex">
              
                Log in
              </Link>
              <Link to="/signup" className="btn-primary !rounded-full !py-2">
                Sign up
              </Link>
            </>
          }

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-line text-ink hover:bg-mist"
            aria-label="Open menu"
            aria-expanded={menuOpen}>
            
            <MenuIcon size={18} />
          </button>
        </div>
      </div>
      <NavDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}