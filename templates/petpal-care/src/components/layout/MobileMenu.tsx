import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { accountMenuLinks, infoMenuLinks } from '../../data/navigation';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const linkClass = 'block rounded-2xl px-4 py-3 text-base font-bold text-ink-800 hover:bg-ink-100';

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div
          className="absolute inset-0 bg-ink-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.nav
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-4 shadow-lift">
          
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink-100" aria-label="Close menu">
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {!isAuthenticated &&
          <div className="mb-4 grid grid-cols-2 gap-2">
                <Link to="/signup" onClick={onClose} className="btn btn-md btn-secondary">
                  Sign up
                </Link>
                <Link to="/login" onClick={onClose} className="btn btn-md btn-primary">
                  Log in
                </Link>
              </div>
          }
            <Link to="/create-listing" onClick={onClose} className={linkClass}>
              Become a sitter
            </Link>
            {isAuthenticated &&
          accountMenuLinks.map((l) =>
          <Link key={l.to} to={l.to} onClick={onClose} className={linkClass}>
                  {l.label}
                </Link>
          )}
            <div className="my-3 h-px bg-ink-100" />
            {infoMenuLinks.map((l) =>
          <Link key={l.to} to={l.to} onClick={onClose} className={linkClass}>
                {l.label}
              </Link>
          )}
            {isAuthenticated &&
          <button
            type="button"
            className={`${linkClass} mt-auto text-left`}
            onClick={() => {
              logout();
              onClose();
              navigate('/');
            }}>
            
                Log out
              </button>
          }
          </motion.nav>
        </div>
      }
    </AnimatePresence>);

}