import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, CompassIcon, InboxIcon, InfoIcon, LogOutIcon, PlusCircleIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  if (!user) return null;
  const fullName = `${user.firstName} ${user.lastName}`;

  const items = [
  { to: '/inbox/trips', label: 'Inbox', icon: InboxIcon },
  { to: '/u/me', label: 'Profile', icon: UserIcon },
  { to: '/host/new/details', label: 'Create listing', icon: PlusCircleIcon },
  { to: '/account/contact', label: 'Account settings', icon: SettingsIcon },
  { to: '/s', label: 'Explore experiences', icon: CompassIcon },
  { to: '/about', label: 'About', icon: InfoIcon }];


  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-slate-300 py-1 pl-1 pr-2.5 transition hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
        
        <Avatar name={fullName} alt={fullName} size="sm" />
        <ChevronDownIcon className="h-4 w-4 text-slate-600" aria-hidden />
        <span className="sr-only">Open account menu</span>
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-float">
          
            <div className="border-b border-slate-100 px-4 pb-3 pt-1">
              <p className="text-sm font-semibold text-slate-900">{fullName}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
            {items.map(({ to, label, icon: Icon }) =>
          <Link
            key={to}
            to={to}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sand-100 hover:text-slate-900">
            
                <Icon className="h-4 w-4 text-slate-500" aria-hidden />
                {label}
              </Link>
          )}
            <button
            type="button"
            role="menuitem"
            onClick={() => {
              signOut();
              setOpen(false);
              navigate('/');
            }}
            className="mt-1 flex w-full items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-sand-100">
            
              <LogOutIcon className="h-4 w-4 text-slate-500" aria-hidden />
              Log out
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}