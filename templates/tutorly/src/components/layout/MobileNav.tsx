import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer } from '../Drawer';
import { Avatar } from '../Avatar';
import { Logo } from './Logo';
import { useAuth } from '../../contexts/AuthContext';
import { linkButton } from '../../utils/buttonStyles';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pendingCount: number;
}

export function MobileNav({ isOpen, onClose, pendingCount }: MobileNavProps) {
  const { isSignedIn, user, signOut } = useAuth();
  const navigate = useNavigate();
  const fullName = `${user.firstName} ${user.lastName}`;

  const primaryLinks = [
  { to: '/search', label: 'Find tutors' },
  { to: '/listings/new', label: 'Become a tutor' },
  ...(isSignedIn ?
  [
  { to: '/inbox', label: pendingCount ? `Inbox (${pendingCount} pending)` : 'Inbox' },
  { to: '/u/me', label: 'Your profile' },
  { to: '/tutors/me', label: 'Your tutor listing' },
  { to: '/account/contact', label: 'Account settings' }] :

  [])];

  const secondaryLinks = [
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/privacy', label: 'Privacy Policy' }];


  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="sm">
      <nav aria-label="Mobile" className="flex h-full flex-col gap-6 p-6">
        <div onClick={onClose}>
          <Logo />
        </div>
        {isSignedIn &&
        <div className="flex items-center gap-3 rounded-2xl bg-primary-50 p-3">
            <Avatar name={fullName} alt={fullName} size="md" />
            <div>
              <p className="font-medium text-ink-900">{fullName}</p>
              <p className="text-sm text-ink-600">{user.email}</p>
            </div>
          </div>
        }
        <ul className="space-y-1">
          {primaryLinks.map((l) =>
          <li key={l.to}>
              <Link to={l.to} onClick={onClose} className="block rounded-xl px-3 py-2.5 text-base font-medium text-ink-900 hover:bg-ink-100">
                {l.label}
              </Link>
            </li>
          )}
        </ul>
        <ul className="space-y-1 border-t border-ink-200 pt-4">
          {secondaryLinks.map((l) =>
          <li key={l.to}>
              <Link to={l.to} onClick={onClose} className="block rounded-xl px-3 py-2 text-sm text-ink-600 hover:bg-ink-100">
                {l.label}
              </Link>
            </li>
          )}
        </ul>
        <div className="mt-auto grid gap-2">
          {isSignedIn ?
          <button
            type="button"
            onClick={() => {
              signOut();
              onClose();
              navigate('/');
            }}
            className={`${linkButton.base} ${linkButton.secondary}`}>
            
              Log out
            </button> :

          <>
              <Link to="/signup" onClick={onClose} className={`${linkButton.base} ${linkButton.primary}`}>
                Sign up
              </Link>
              <Link to="/login" onClick={onClose} className={`${linkButton.base} ${linkButton.secondary}`}>
                Log in
              </Link>
            </>
          }
        </div>
      </nav>
    </Drawer>);

}