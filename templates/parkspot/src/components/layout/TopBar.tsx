import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { MessageSquareIcon, SearchIcon } from 'lucide-react';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionsContext';

export function TopBar() {
  const { currentUser } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('address') ?? '');

  const pending = currentUser ?
  transactions.filter((t) => t.providerId === currentUser.id && t.status === 'Requested').length :
  0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (query.trim()) next.set('address', query.trim());else
    next.delete('address');
    navigate(`/s?${next.toString()}`);
  };

  const navLinkClass = ({ isActive }: {isActive: boolean;}) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-white'}`;

  return (
    <header className="sticky top-0 z-[1100] border-b border-white/10 bg-navy">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8">
        <Logo />

        <form onSubmit={submit} role="search" className="hidden flex-1 md:block md:max-w-sm lg:max-w-md">
          <label htmlFor="topbar-search" className="sr-only">
            Search address or venue
          </label>
          <div className="relative">
            <SearchIcon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60" aria-hidden />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Address, venue or neighborhood"
              className="h-10 w-full rounded-full border border-white/15 bg-white/10 pl-9 pr-4 text-sm text-white placeholder:text-white/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50" />
            
          </div>
        </form>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/s"
            aria-label="Find parking"
            className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden">
            
            <SearchIcon size={18} aria-hidden />
          </Link>
          <NavLink to="/s" className={(s) => `hidden lg:inline-flex ${navLinkClass(s)}`}>
            Find parking
          </NavLink>
          <NavLink to="/listings/new" className={(s) => `hidden sm:inline-flex ${navLinkClass(s)}`}>
            List your space
          </NavLink>

          {currentUser ?
          <Link
            to="/inbox"
            aria-label={`Inbox${pending ? `, ${pending} pending requests` : ''}`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10">
            
              <MessageSquareIcon size={18} aria-hidden />
              {pending > 0 &&
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-ink">
                  {pending}
                </span>
            }
            </Link> :

          <div className="hidden items-center gap-2 sm:flex">
              <Link to="/signup" className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:text-accent">
                Sign up
              </Link>
              <Link
              to="/login"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-accent-strong">
              
                Log in
              </Link>
            </div>
          }

          <NavMenu />
        </nav>
      </div>
    </header>);

}