import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, UserIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { appLinks, companyLinks } from '../../data/navigation';

export function UserMenu() {
  const { isSignedIn, user, signOut } = useAuth();
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

  const itemClass = 'block rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-sand-100 hover:text-ink-900';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open menu"
        className="flex items-center gap-2 rounded-full border border-sand-300 bg-white py-1 pl-3 pr-1 transition hover:shadow-card">
        
        <MenuIcon size={16} className="text-ink-700" aria-hidden="true" />
        {isSignedIn ?
        <Avatar name={user.name} alt={user.name} size="sm" /> :

        <span className="grid h-8 w-8 place-items-center rounded-full bg-sand-200 text-ink-600">
            <UserIcon size={16} aria-hidden="true" />
          </span>
        }
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-sand-200 bg-white p-2 shadow-lift">
          
            {isSignedIn ?
          <div className="mb-1 border-b border-sand-200 px-3 pb-3 pt-1">
                <p className="text-sm font-semibold text-ink-900">{user.name}</p>
                <p className="text-xs text-ink-500">{user.email}</p>
              </div> :

          <div className="mb-1 border-b border-sand-200 pb-2">
                <Link to="/signup" role="menuitem" className={`${itemClass} font-semibold text-ink-900`}>
                  Sign up
                </Link>
                <Link to="/login" role="menuitem" className={itemClass}>
                  Log in
                </Link>
              </div>
          }
            {appLinks.map((l) =>
          <Link key={l.to} to={l.to} role="menuitem" className={itemClass}>
                {l.label}
              </Link>
          )}
            <div className="my-1 border-t border-sand-200" />
            {companyLinks.map((l) =>
          <Link key={l.to} to={l.to} role="menuitem" className={itemClass}>
                {l.label}
              </Link>
          )}
            {isSignedIn &&
          <>
                <div className="my-1 border-t border-sand-200" />
                <button type="button" role="menuitem" onClick={signOut} className={`${itemClass} w-full text-left`}>
                  Log out
                </button>
              </>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}