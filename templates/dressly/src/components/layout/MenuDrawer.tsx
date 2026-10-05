import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { occasions } from '../../data/taxonomy';
import { btn } from '../../utils/styles';
import { Logo } from './Logo';

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const { user, logout } = useAuth();
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

  const groups = [
  {
    title: 'Rent',
    links: [
    { label: 'Browse all dresses', to: '/s' },
    ...occasions.map((o) => ({ label: o.label, to: `/s?occasion=${o.slug}` }))]

  },
  {
    title: 'Your account',
    links: [
    { label: 'Inbox', to: '/inbox' },
    { label: 'Your closet', to: '/closet/me' },
    { label: 'Lend your wardrobe', to: '/l/new' },
    { label: 'Account settings', to: '/account/contact' }]

  },
  {
    title: 'Company',
    links: [
    { label: 'About', to: '/about' },
    { label: 'Terms of service', to: '/terms' },
    { label: 'Privacy policy', to: '/privacy' }]

  }];


  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Site menu">
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper">
          
            <div className="flex h-16 items-center justify-between border-b border-line px-6">
              <Logo />
              <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-cream">
              
                <XIcon size={20} aria-hidden="true" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6" onClick={onClose}>
              {groups.map((g) =>
            <div key={g.title} className="mb-8">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-muted">
                    {g.title}
                  </p>
                  <ul className="space-y-1">
                    {g.links.map((l) =>
                <li key={l.label}>
                        <Link
                    to={l.to}
                    className="block py-1.5 font-display text-xl text-ink transition hover:text-accent-dark">
                    
                          {l.label}
                        </Link>
                      </li>
                )}
                  </ul>
                </div>
            )}
            </nav>
            <div className="border-t border-line p-6">
              {user ?
            <button
              type="button"
              className={btn('outline', 'md', 'w-full')}
              onClick={() => {
                logout();
                onClose();
                navigate('/');
              }}>
              
                  Log out
                </button> :

            <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" onClick={onClose} className={btn('outline', 'md')}>
                    Log in
                  </Link>
                  <Link to="/signup" onClick={onClose} className={btn('primary', 'md')}>
                    Sign up
                  </Link>
                </div>
            }
            </div>
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}