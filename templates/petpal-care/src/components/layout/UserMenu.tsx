import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { currentUser } from '../../data/currentUser';
import { accountMenuLinks, infoMenuLinks } from '../../data/navigation';

export function UserMenu() {
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const itemClass =
  'block rounded-xl px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 hover:text-ink-900 focus-visible:bg-ink-100 focus-visible:outline-none';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={isAuthenticated ? 'Account menu' : 'More pages'}
        className="flex h-10 items-center gap-1.5 rounded-full border border-ink-200 bg-white pl-2 pr-2.5 transition hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
        
        {isAuthenticated ?
        <>
            <Avatar name={currentUser.name} alt={currentUser.name} size="sm" />
            <ChevronDownIcon className="h-4 w-4 text-ink-600" aria-hidden="true" />
          </> :

        <MenuIcon className="mx-0.5 h-4 w-4 text-ink-700" aria-hidden="true" />
        }
      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.14 }}
          className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-ink-200 bg-white p-2 shadow-lift">
          
            {isAuthenticated &&
          <>
                <div className="px-3 pb-2 pt-1">
                  <p className="text-sm font-extrabold text-ink-900">{currentUser.name}</p>
                  <p className="truncate text-xs text-ink-600">{currentUser.email}</p>
                </div>
                {accountMenuLinks.map((l) =>
            <Link key={l.to} to={l.to} role="menuitem" className={itemClass} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
            )}
                <div className="my-2 h-px bg-ink-100" />
              </>
          }
            {!isAuthenticated &&
          <>
                <Link to="/signup" role="menuitem" className={`${itemClass} font-extrabold text-ink-900`} onClick={() => setOpen(false)}>
                  Sign up
                </Link>
                <Link to="/login" role="menuitem" className={itemClass} onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <div className="my-2 h-px bg-ink-100" />
              </>
          }
            {infoMenuLinks.map((l) =>
          <Link key={l.to} to={l.to} role="menuitem" className={itemClass} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
          )}
            {isAuthenticated &&
          <>
                <div className="my-2 h-px bg-ink-100" />
                <button
              type="button"
              role="menuitem"
              className={`${itemClass} w-full text-left`}
              onClick={() => {
                logout();
                setOpen(false);
                navigate('/');
              }}>
              
                  Log out
                </button>
              </>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}