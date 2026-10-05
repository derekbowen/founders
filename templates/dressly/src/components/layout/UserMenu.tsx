import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserAvatar } from '../UserAvatar';

const items = [
{ label: 'Your closet', to: '/closet/me' },
{ label: 'Inbox', to: '/inbox' },
{ label: 'Lend a dress', to: '/l/new' },
{ label: 'Account settings', to: '/account/contact' }];


export function UserMenu() {
  const { user, logout } = useAuth();
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

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full p-0.5 pr-2 transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark">
        
        <UserAvatar user={user} size="sm" />
        <ChevronDownIcon size={14} aria-hidden="true" />
        <span className="sr-only">Open account menu</span>
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-50 mt-2 w-60 border border-line bg-paper py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]">
          
            <div className="border-b border-line px-4 pb-3 pt-1">
              <p className="text-sm font-medium text-ink">{user.name}</p>
              <p className="text-xs text-muted">{user.city}</p>
            </div>
            <div className="py-1">
              {items.map((item) =>
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-ink transition hover:bg-cream">
              
                  {item.label}
                </Link>
            )}
            </div>
            <div className="border-t border-line pt-1">
              <button
              type="button"
              role="menuitem"
              onClick={() => {
                logout();
                setOpen(false);
                navigate('/');
              }}
              className="block w-full px-4 py-2 text-left text-sm text-muted transition hover:bg-cream hover:text-ink">
              
                Log out
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}