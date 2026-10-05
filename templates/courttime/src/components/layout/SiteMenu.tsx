import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { siteMenuGroups } from '../../data/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from './Logo';

interface SiteMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SiteMenu({ open, onClose }: SiteMenuProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Site menu">
          <motion.button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute inset-0 bg-ink/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} />
        
          <motion.nav
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl">
          
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <Logo />
              <button type="button" onClick={onClose} className="btn btn-ghost btn-sm" aria-label="Close menu">
                <XIcon size={20} />
              </button>
            </div>
            <div className="flex-1 space-y-6 px-5 py-6">
              {siteMenuGroups.map((group) =>
            <div key={group.title}>
                  <p className="eyebrow mb-2">{group.title}</p>
                  <ul className="space-y-0.5">
                    {group.links.
                filter((link) => !(user && (link.to === '/login' || link.to === '/signup'))).
                map((link) =>
                <li key={link.to}>
                          <Link
                    to={link.to}
                    className="block rounded-lg px-2 py-2 text-[15px] font-medium text-slate-800 hover:bg-brand-soft hover:text-brand-dark">
                    
                            {link.label}
                          </Link>
                        </li>
                )}
                  </ul>
                </div>
            )}
            </div>
            {user &&
          <div className="border-t border-slate-100 p-5">
                <button type="button" onClick={logout} className="btn btn-outline btn-md w-full">
                  Log out
                </button>
              </div>
          }
          </motion.nav>
        </div>
      }
    </AnimatePresence>);

}