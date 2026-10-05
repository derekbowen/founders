import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MenuIcon, MessageCircleIcon, SearchIcon } from 'lucide-react';
import { Logo } from '../common/Logo';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '../../contexts/AuthContext';
import { transactions } from '../../data/transactions';

export function TopBar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('location') ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);
  const pendingCount = transactions.filter((t) => t.status === 'requested' && t.role === 'provider').length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?location=${encodeURIComponent(query.trim())}` : '/search');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4 lg:h-[72px]">
        <Logo />

        <form onSubmit={submit} role="search" className="ml-2 hidden max-w-sm flex-1 md:block">
          <label htmlFor="topbar-search" className="sr-only">
            Search sitters by neighborhood
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by neighborhood…"
              className="h-10 w-full rounded-full border border-ink-200 bg-ink-50 pl-10 pr-4 text-sm font-semibold text-ink-900 placeholder:font-medium placeholder:text-ink-500 transition focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200" />
            
          </div>
        </form>

        <nav aria-label="Main" className="ml-auto flex items-center gap-1.5">
          <Link to="/search" className="btn btn-sm btn-ghost hidden lg:inline-flex">
            Browse sitters
          </Link>
          <Link to="/create-listing" className="btn btn-sm btn-ghost hidden md:inline-flex">
            Become a sitter
          </Link>

          {isAuthenticated ?
          <>
              <Link
              to="/inbox/orders"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:inline-flex"
              aria-label={`Inbox${pendingCount ? `, ${pendingCount} pending` : ''}`}>
              
                <MessageCircleIcon className="h-5 w-5" aria-hidden="true" />
                {pendingCount > 0 &&
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-black text-ink-900">
                    {pendingCount}
                  </span>
              }
              </Link>
              <div className="hidden md:block">
                <UserMenu />
              </div>
            </> :

          <div className="hidden items-center gap-2 md:flex">
              <Link to="/signup" className="btn btn-sm btn-secondary">
                Sign up
              </Link>
              <Link to="/login" className="btn btn-sm btn-primary">
                Log in
              </Link>
              <UserMenu />
            </div>
          }

          <Link to="/search" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 md:hidden" aria-label="Search sitters">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}>
            
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>);

}