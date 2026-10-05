import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InboxIcon, InfoIcon, LogOutIcon, PlusSquareIcon, SettingsIcon, StoreIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

  const links = [
  { to: '/inbox/purchases', label: 'Inbox & orders', icon: InboxIcon },
  { to: `/brands/${user.ownedBrandId}`, label: 'My brand profile', icon: StoreIcon },
  { to: '/sell/new', label: 'Create listing', icon: PlusSquareIcon },
  { to: '/account/contact', label: 'Account settings', icon: SettingsIcon },
  { to: '/about', label: `About`, icon: InfoIcon }];


  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
        
        <span className="sr-only">Open account menu</span>
        <Avatar name={fullName} alt={fullName} size="sm" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lift">
          
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">{fullName}</p>
              <p className="truncate text-xs text-slate-500">{user.businessName}</p>
            </div>
            <div className="py-1">
              {links.map(({ to, label, icon: Icon }) =>
            <Link
              key={to}
              to={to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900">
              
                  <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {label}
                </Link>
            )}
            </div>
            <div className="border-t border-slate-100 py-1">
              <button
              type="button"
              role="menuitem"
              onClick={() => {
                signOut();
                setOpen(false);
                navigate('/');
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
              
                <LogOutIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                Log out
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}