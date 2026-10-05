import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';

const items = [
{ label: 'Profile', to: '/profile/u-me' },
{ label: 'My games', to: '/inbox' },
{ label: 'Hosting inbox', to: '/inbox?tab=hosting' },
{ label: 'List your court', to: '/create-listing' },
{ label: 'Account settings', to: '/account/contact' }];


export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 p-1 pr-2 transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
        
        <Avatar name={user.name} alt={user.name} size="sm" />
        <ChevronDownIcon size={16} className="text-slate-500" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.14 }}
          className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-xl">
          
            <div className="border-b border-slate-100 px-4 pb-2">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-slate-500">{user.location}</p>
            </div>
            {items.map((item) =>
          <Link
            key={item.to}
            to={item.to}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand-dark">
            
                {item.label}
              </Link>
          )}
            <button
            type="button"
            role="menuitem"
            onClick={() => {
              logout();
              setOpen(false);
              navigate('/');
            }}
            className="mt-1 flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50">
            
              <LogOutIcon size={16} aria-hidden="true" /> Log out
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}