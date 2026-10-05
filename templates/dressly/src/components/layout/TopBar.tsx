import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MailIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { transactions } from '../../data/transactions';
import { btn, cx } from '../../utils/styles';
import { Logo } from './Logo';
import { MenuDrawer } from './MenuDrawer';
import { UserMenu } from './UserMenu';

function SearchForm({ className }: {className?: string;}) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  return (
    <form
      role="search"
      className={cx('relative', className)}
      onSubmit={(e) => {
        e.preventDefault();
        navigate(q.trim() ? `/s?q=${encodeURIComponent(q.trim())}` : '/s');
      }}>
      
      <label htmlFor="topbar-search" className="sr-only">
        Search dresses
      </label>
      <SearchIcon
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        aria-hidden="true" />
      
      <input
        id="topbar-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search designers, styles, occasions"
        className="h-10 w-full rounded-full border border-line bg-cream/60 pl-10 pr-4 text-sm text-ink placeholder:text-muted transition focus:border-ink focus:bg-paper focus:outline-none" />
      
    </form>);

}

const navLinkClass = ({ isActive }: {isActive: boolean;}) =>
cx(
  'text-sm transition-colors hover:text-accent-dark',
  isActive ? 'text-ink underline decoration-accent decoration-2 underline-offset-8' : 'text-ink/80'
);

export function TopBar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pending = transactions.filter((t) => t.status === 'requested').length;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 md:h-[72px] md:px-8">
        <Logo className="shrink-0" />
        <SearchForm className="hidden w-full max-w-md md:block lg:ml-6" />
        <nav aria-label="Primary" className="ml-auto flex items-center gap-5">
          <div className="hidden items-center gap-6 lg:flex">
            <NavLink to="/s" className={navLinkClass}>
              Browse
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/l/new" className={navLinkClass}>
              Lend your wardrobe
            </NavLink>
          </div>
          {user ?
          <div className="flex items-center gap-2">
              <Link
              to="/inbox"
              aria-label={`Inbox, ${pending} pending`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream">
              
                <MailIcon size={19} aria-hidden="true" />
                {pending > 0 &&
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-dark px-1 text-[10px] font-semibold text-paper">
                    {pending}
                  </span>
              }
              </Link>
              <div className="hidden sm:block">
                <UserMenu />
              </div>
            </div> :

          <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className={btn('ghost', 'sm')}>
                Log in
              </Link>
              <Link to="/signup" className={btn('primary', 'sm')}>
                Sign up
              </Link>
            </div>
          }
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream">
            
            <MenuIcon size={20} aria-hidden="true" />
          </button>
        </nav>
      </div>
      <div className="border-t border-line px-4 py-2.5 md:hidden">
        <SearchForm />
      </div>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>);

}