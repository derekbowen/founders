import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon, XIcon, InboxIcon, UserIcon, SettingsIcon, LogOutIcon, PlusIcon } from 'lucide-react';
import { Logo } from './Logo';
import { Avatar } from '../Avatar';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { ui, cx } from '../../utils/styles';

const navLinks = [
{ to: '/s', label: 'Browse spaces' },
{ to: '/inbox/storing', label: 'Inbox' },
{ to: '/about', label: 'How it works' }];


export function TopBar() {
  const { user, logout, transactions } = useMarketplace();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const unread = transactions.filter((t) => t.unread).length;

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/s${query ? `?location=${encodeURIComponent(query)}` : ''}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className={cx(ui.container, 'flex h-16 items-center gap-4')}>
        <Logo />

        <form onSubmit={submit} role="search" className="hidden max-w-sm flex-1 md:block">
          <label htmlFor="topbar-search" className="sr-only">
            Search by neighborhood or city
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search neighborhoods…"
              className="w-full rounded-full border border-stone-300 bg-stone-50 py-2 pl-9 pr-4 text-sm placeholder:text-stone-500 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200" />
            
          </div>
        </form>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
            cx(
              'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive ? 'text-brand-700' : 'text-stone-700 hover:bg-stone-100'
            )
            }>
            
              {l.label}
              {l.label === 'Inbox' && unread > 0 && user &&
            <span className="ml-1.5 inline-grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-sand-500 px-1.5 text-[11px] font-bold text-white">
                  {unread}
                </span>
            }
            </NavLink>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link to="/listings/new" className={cx(ui.linkOutline, 'hidden !py-2 sm:inline-flex')}>
            Rent out your space
          </Link>
          {user ?
          <div className="relative hidden lg:block" ref={menuRef}>
              <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center rounded-full p-0.5 ring-offset-2 hover:ring-2 hover:ring-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300">
              
                <Avatar name={user.name} alt={user.name} size="sm" />
                <span className="sr-only">Open account menu</span>
              </button>
              {menuOpen &&
            <div role="menu" className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lift">
                  <div className="border-b border-stone-100 px-4 py-3">
                    <p className="text-sm font-semibold text-stone-900">{user.name}</p>
                    <p className="truncate text-xs text-stone-500">{user.email}</p>
                  </div>
                  <MenuLink to="/inbox/storing" icon={<InboxIcon className="h-4 w-4" />} label="Inbox" />
                  <MenuLink to="/u/me" icon={<UserIcon className="h-4 w-4" />} label="Profile" />
                  <MenuLink to="/listings/new" icon={<PlusIcon className="h-4 w-4" />} label="New listing" />
                  <MenuLink to="/account/contact" icon={<SettingsIcon className="h-4 w-4" />} label="Account settings" />
                  <button
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50">
                
                    <LogOutIcon className="h-4 w-4" /> Log out
                  </button>
                </div>
            }
            </div> :

          <div className="hidden items-center gap-1 lg:flex">
              <Link to="/signup" className="rounded-md px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100">
                Sign up
              </Link>
              <Link to="/login" className={cx(ui.linkBrand, '!py-2')}>
                Log in
              </Link>
            </div>
          }
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-stone-700 hover:bg-stone-100 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}>
            
            {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen &&
      <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className={cx(ui.container, 'space-y-4 py-4')}>
            <form onSubmit={submit} role="search" className="md:hidden">
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <input
              id="mobile-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search neighborhoods…"
              className={ui.field} />
            
            </form>
            <nav aria-label="Mobile" className="grid gap-1">
              {[
            ...navLinks,
            { to: '/listings/new', label: 'Rent out your space' },
            { to: '/u/me', label: 'Profile' },
            { to: '/account/contact', label: 'Account settings' }].
            map((l) =>
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
              cx('rounded-lg px-3 py-2.5 text-sm font-medium', isActive ? 'bg-brand-50 text-brand-800' : 'text-stone-800 hover:bg-stone-50')
              }>
              
                  {l.label}
                </NavLink>
            )}
            </nav>
            <div className="flex gap-2 border-t border-stone-100 pt-4">
              {user ?
            <button onClick={handleLogout} className={cx(ui.linkOutline, 'w-full')}>
                  Log out
                </button> :

            <>
                  <Link to="/signup" className={cx(ui.linkOutline, 'flex-1')}>Sign up</Link>
                  <Link to="/login" className={cx(ui.linkBrand, 'flex-1')}>Log in</Link>
                </>
            }
            </div>
          </div>
        </div>
      }
    </header>);

}

function MenuLink({ to, icon, label }: {to: string;icon: React.ReactNode;label: string;}) {
  return (
    <Link role="menuitem" to={to} className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50">
      {icon}
      {label}
    </Link>);

}