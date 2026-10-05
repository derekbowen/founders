import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, SearchIcon, XIcon, InboxIcon, UserIcon, SettingsIcon, LogOutIcon, PlusCircleIcon, ChevronDownIcon } from 'lucide-react';
import { Logo } from './Logo';
import { Avatar } from '../ui/Avatar';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { buttonClasses, cn } from '../../utils/ui';

const navLinks = [
{ to: '/s', label: 'Browse boats' },
{ to: '/about', label: 'About' }];


export function Topbar() {
  const { isAuthenticated, currentUser, logout, transactions } = useMarketplace();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pendingCount = transactions.filter((t) => t.providerId === currentUser.id && t.status === 'requested').length;

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setMenuOpen(false), setMobileOpen(false));
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/s?location=${encodeURIComponent(query.trim())}` : '/s');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userLinks = [
  { to: `/u/${currentUser.id}`, label: 'Profile', icon: UserIcon },
  { to: '/inbox/trips', label: 'Inbox', icon: InboxIcon },
  { to: '/listings/new', label: 'List your boat', icon: PlusCircleIcon },
  { to: '/account/contact', label: 'Account settings', icon: SettingsIcon }];


  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Logo />

        <form onSubmit={submit} role="search" className="ml-4 hidden max-w-sm flex-1 md:block">
          <label htmlFor="topbar-search" className="sr-only">
            Search by marina or city
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="topbar-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search marina or city"
              className="h-10 w-full rounded-full border border-line bg-sand-light pl-10 pr-4 text-sm placeholder:text-muted focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/15" />
            
          </div>
        </form>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => cn('rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-sand-light', isActive ? 'text-navy' : 'text-muted hover:text-navy')}>
            
              {l.label}
            </NavLink>
          )}
          <Link to="/listings/new" className="rounded-full px-3.5 py-2 text-sm font-semibold text-coral-dark transition-colors hover:bg-sand-light">
            List your boat
          </Link>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex lg:ml-2">
          {isAuthenticated ?
          <>
              <Link to="/inbox/trips" className="relative rounded-full p-2.5 text-navy transition-colors hover:bg-sand-light" aria-label={`Inbox${pendingCount ? `, ${pendingCount} pending requests` : ''}`}>
                <InboxIcon className="h-5 w-5" />
                {pendingCount > 0 &&
              <span className="absolute right-1 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-coral-dark px-1 text-[10px] font-bold text-white">{pendingCount}</span>
              }
              </Link>
              <div className="relative" ref={menuRef}>
                <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-1.5 rounded-full border border-line py-1 pl-1 pr-2.5 transition-colors hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral">
                
                  <Avatar initials={currentUser.initials} seed={currentUser.id} size="xs" />
                  <ChevronDownIcon className="h-4 w-4 text-muted" aria-hidden="true" />
                  <span className="sr-only">Open account menu</span>
                </button>
                <AnimatePresence>
                  {menuOpen &&
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white py-2 shadow-lift">
                  
                      <div className="border-b border-line px-4 pb-3 pt-1">
                        <p className="text-sm font-semibold text-ink">{currentUser.name}</p>
                        <p className="truncate text-xs text-muted">{currentUser.email}</p>
                      </div>
                      {userLinks.map(({ to, label, icon: Icon }) =>
                  <Link key={to} to={to} role="menuitem" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-sand-light">
                          <Icon className="h-4 w-4 text-muted" aria-hidden="true" />
                          {label}
                        </Link>
                  )}
                      <button type="button" role="menuitem" onClick={handleLogout} className="flex w-full items-center gap-3 border-t border-line px-4 py-2.5 text-left text-sm text-ink hover:bg-sand-light">
                        <LogOutIcon className="h-4 w-4 text-muted" aria-hidden="true" />
                        Log out
                      </button>
                    </motion.div>
                }
                </AnimatePresence>
              </div>
            </> :

          <>
              <Link to="/signup" className={buttonClasses('ghost', 'sm')}>
                Sign up
              </Link>
              <Link to="/login" className={buttonClasses('primary', 'sm')}>
                Log in
              </Link>
            </>
          }
        </div>

        <button
          type="button"
          className="ml-auto rounded-full p-2 text-navy hover:bg-sand-light md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
          
          {mobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen &&
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t border-line bg-white md:hidden">
          
            <div className="space-y-1 px-4 py-4">
              <form onSubmit={submit} role="search" className="mb-3">
                <label htmlFor="mobile-search" className="sr-only">
                  Search by marina or city
                </label>
                <input id="mobile-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search marina or city" className="h-11 w-full rounded-full border border-line bg-sand-light px-4 text-sm" />
              </form>
              {[...navLinks, { to: '/listings/new', label: 'List your boat' }, ...(isAuthenticated ? userLinks.filter((l) => l.to !== '/listings/new') : []), { to: '/terms', label: 'Terms' }, { to: '/privacy', label: 'Privacy' }].map((l) =>
            <Link key={l.to + l.label} to={l.to} className="block rounded-xl px-3 py-2.5 text-base font-medium text-ink hover:bg-sand-light">
                  {l.label}
                </Link>
            )}
              <div className="flex gap-2 pt-3">
                {isAuthenticated ?
              <button type="button" onClick={handleLogout} className={buttonClasses('outline', 'md', 'flex-1')}>
                    Log out
                  </button> :

              <>
                    <Link to="/signup" className={buttonClasses('outline', 'md', 'flex-1')}>
                      Sign up
                    </Link>
                    <Link to="/login" className={buttonClasses('primary', 'md', 'flex-1')}>
                      Log in
                    </Link>
                  </>
              }
              </div>
            </div>
          </motion.nav>
        }
      </AnimatePresence>
    </header>);

}