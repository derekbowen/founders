import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../ui/Logo';
import { SearchBar } from './SearchBar';
import { ButtonLink } from '../ui/ButtonLink';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
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

  const link = 'block rounded-lg px-3 py-2.5 text-base text-ink hover:bg-subtle';

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Main menu">
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.nav
          className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-canvas"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 38 }}>
          
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span onClick={onClose}>
                <Logo />
              </span>
              <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-subtle" aria-label="Close menu">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="px-4 py-4">
              <SearchBar onSubmitted={onClose} />
            </div>
            <div className="px-2">
              <p className="eyebrow px-3 pb-1 pt-2">Shop by category</p>
              {categories.map((c) =>
            <Link key={c.id} to={`/s?category=${c.id}`} className={link} onClick={onClose}>
                  {c.name}
                </Link>
            )}
            </div>
            <div className="mt-4 border-t border-line px-2 pt-4">
              {user ?
            <>
                  <Link to="/inbox/purchases" className={link} onClick={onClose}>Inbox</Link>
                  <Link to={`/shop/${user.shopId}`} className={link} onClick={onClose}>My shop</Link>
                  <Link to="/listings/new" className={link} onClick={onClose}>New listing</Link>
                  <Link to="/account/contact" className={link} onClick={onClose}>Account settings</Link>
                </> :

            <Link to="/signup" className={link} onClick={onClose}>Open a shop</Link>
            }
              <Link to="/cart" className={link} onClick={onClose}>Cart</Link>
              <Link to="/about" className={link} onClick={onClose}>About</Link>
            </div>
            <div className="mt-auto border-t border-line p-4">
              {user ?
            <button
              type="button"
              className="w-full rounded-full border border-line py-2.5 text-sm font-medium hover:bg-subtle"
              onClick={() => {
                logout();
                onClose();
                navigate('/');
              }}>
              
                  Log out
                </button> :

            <div className="grid grid-cols-2 gap-3">
                  <ButtonLink to="/login" variant="secondary" onClick={onClose}>Log in</ButtonLink>
                  <ButtonLink to="/signup" onClick={onClose}>Sign up</ButtonLink>
                </div>
            }
            </div>
          </motion.nav>
        </div>
      }
    </AnimatePresence>);

}