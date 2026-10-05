import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';

interface MenuLink {
  to: string;
  label: string;
}

export function NavMenu() {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const groups: {title: string;links: MenuLink[];}[] = [
  {
    title: 'Explore',
    links: [
    { to: '/s', label: 'Find parking' },
    { to: '/listings/new', label: 'List your space' }]

  },
  {
    title: 'Your account',
    links: [
    { to: '/inbox', label: 'Inbox' },
    { to: currentUser ? `/u/${currentUser.id}` : '/u/u-jordan', label: 'Profile' },
    { to: '/account/contact', label: 'Account settings' }]

  },
  {
    title: 'Company',
    links: [
    { to: '/about', label: 'About' },
    { to: '/terms', label: 'Terms of service' },
    { to: '/privacy', label: 'Privacy policy' }]

  }];


  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Open menu"
        className="flex h-10 items-center gap-2 rounded-full border border-white/20 pl-2 pr-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        
        <MenuIcon size={18} className="ml-1" aria-hidden />
        {currentUser ?
        <Avatar name={currentUser.name} alt={currentUser.name} src={currentUser.avatar} size="sm" /> :

        <ChevronDownIcon size={16} className="mr-1 opacity-70" aria-hidden />
        }
      </button>

      <AnimatePresence>
        {open &&
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          aria-label="Main menu"
          className="absolute right-0 top-12 w-64 overflow-hidden rounded-xl border border-line bg-surface py-2 text-ink shadow-pop">
          
            {currentUser &&
          <div className="border-b border-line px-4 pb-3 pt-1">
                <p className="text-sm font-semibold">{currentUser.name}</p>
                <p className="truncate text-xs text-muted">{currentUser.email}</p>
              </div>
          }
            {!currentUser &&
          <div className="flex gap-2 border-b border-line px-4 pb-3 pt-1">
                <Link to="/login" className="flex-1 rounded-lg bg-navy py-2 text-center text-sm font-semibold text-white hover:bg-navy-soft">
                  Log in
                </Link>
                <Link to="/signup" className="flex-1 rounded-lg border border-line py-2 text-center text-sm font-semibold hover:bg-canvas">
                  Sign up
                </Link>
              </div>
          }
            {groups.map((group) =>
          <div key={group.title} className="border-b border-line py-2 last:border-b-0">
                <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{group.title}</p>
                {group.links.map((link) =>
            <Link
              key={link.to + link.label}
              to={link.to}
              className="block px-4 py-2 text-sm hover:bg-canvas focus-visible:bg-canvas focus-visible:outline-none">
              
                    {link.label}
                  </Link>
            )}
              </div>
          )}
            {currentUser &&
          <button
            type="button"
            onClick={logout}
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-danger hover:bg-danger/5">
            
                Log out
              </button>
          }
          </motion.nav>
        }
      </AnimatePresence>
    </div>);

}