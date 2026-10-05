import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, InboxIcon, LogOutIcon, PlusCircleIcon, SettingsIcon, StoreIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from '../ui/Avatar';

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
  const name = `${user.firstName} ${user.lastName}`;

  const items = [
  { to: '/inbox/purchases', label: 'Inbox', icon: InboxIcon },
  { to: `/shop/${user.shopId}`, label: 'My shop', icon: StoreIcon },
  { to: '/listings/new', label: 'New listing', icon: PlusCircleIcon },
  { to: '/account/contact', label: 'Account settings', icon: SettingsIcon }];


  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full p-0.5 pr-2 transition-colors hover:bg-subtle">
        
        <Avatar name={name} size="sm" />
        <ChevronDownIcon className={`h-4 w-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        <span className="sr-only">Open account menu</span>
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-surface shadow-lift">
          
            <div className="border-b border-line px-4 py-3">
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="py-1.5">
              {items.map(({ to, label, icon: Icon }) =>
            <Link
              key={to}
              to={to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-ink hover:bg-subtle">
              
                  <Icon className="h-4 w-4 text-muted" aria-hidden />
                  {label}
                </Link>
            )}
            </div>
            <button
            type="button"
            role="menuitem"
            onClick={() => {
              logout();
              setOpen(false);
              navigate('/');
            }}
            className="flex w-full items-center gap-3 border-t border-line px-4 py-2.5 text-sm text-ink hover:bg-subtle">
            
              <LogOutIcon className="h-4 w-4 text-muted" aria-hidden />
              Log out
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}