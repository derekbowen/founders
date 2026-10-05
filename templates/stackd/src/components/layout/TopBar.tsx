import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { SearchBar } from '../common/SearchBar';
import { useStore } from '../../contexts/StoreContext';

const primaryLinks = [
{ to: '/s', label: 'Explore' },
{ to: '/inbox', label: 'Library' },
{ to: '/about', label: 'About' }];


export function TopBar() {
  const { user, signOut } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  const navClass = ({ isActive }: {isActive: boolean;}) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-paper ${isActive ? 'text-ink underline decoration-brand decoration-[3px] underline-offset-[10px]' : 'text-ink/80'}`;

  const mobileLinks = [
  { to: '/s', label: 'Explore all products' },
  { to: '/listings/new', label: 'Start selling' },
  ...(user ?
  [
  { to: '/inbox', label: 'My library' },
  { to: '/inbox?tab=sales', label: 'Sales' },
  { to: `/u/${user.creatorId}`, label: 'My profile' },
  { to: '/account/contact', label: 'Account settings' }] :

  []),
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms of service' },
  { to: '/privacy', label: 'Privacy policy' }];


  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-white">
      <div className="container-page flex h-16 items-center gap-4">
        <Logo />
        <div className="hidden max-w-md flex-1 md:block">
          <SearchBar />
        </div>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {primaryLinks.map((l) =>
          <NavLink key={l.to} to={l.to} className={navClass}>
              {l.label}
            </NavLink>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link to="/listings/new" className="btn btn-accent btn-sm hidden sm:inline-flex">
            Start selling
          </Link>
          {user ?
          <div className="hidden lg:block">
              <UserMenu />
            </div> :

          <div className="hidden items-center gap-1 lg:flex">
              <Link to="/login" className="btn btn-quiet btn-sm">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-ink btn-sm">
                Sign up
              </Link>
            </div>
          }
          <button
            type="button"
            className="btn btn-outline btn-sm w-9 px-0 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}>
            
            {mobileOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border-t border-ink bg-white lg:hidden">
          
            <div className="container-page space-y-4 py-5">
              <SearchBar onSubmitted={() => setMobileOpen(false)} />
              <nav aria-label="Mobile" className="grid gap-1">
                {mobileLinks.map((l) =>
              <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2.5 font-display text-lg font-semibold hover:bg-paper">
                    {l.label}
                  </Link>
              )}
              </nav>
              <div className="flex gap-2 border-t border-line pt-4">
                {user ?
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => {
                  signOut();
                  navigate('/');
                }}>
                
                    Log out
                  </button> :

              <>
                    <Link to="/login" className="btn btn-outline flex-1">
                      Log in
                    </Link>
                    <Link to="/signup" className="btn btn-ink flex-1">
                      Sign up
                    </Link>
                  </>
              }
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}