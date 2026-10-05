import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '../Drawer';
import { Avatar } from '../Avatar';
import { menuGroups } from '../../data/navigation';
import { useSession } from '../../contexts/SessionContext';
import { buttonLinkClass } from '../ui/BrandButton';
import { Logo } from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logout } = useSession();
  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="sm">
      <nav aria-label="Main menu" className="flex h-full flex-col overflow-y-auto bg-white p-6">
        <div onClick={onClose}>
          <Logo />
        </div>
        {user ?
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-primary-50 p-3">
            <Avatar name={`${user.firstName} ${user.lastName}`} alt="" src={user.photo} size="md" />
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs capitalize text-ink-600">{user.type} account</p>
            </div>
          </div> :

        <div className="mt-6 grid grid-cols-2 gap-2">
            <Link to="/signup" onClick={onClose} className={buttonLinkClass('primary', 'md')}>
              Sign up
            </Link>
            <Link to="/login" onClick={onClose} className={buttonLinkClass('outline', 'md')}>
              Log in
            </Link>
          </div>
        }
        <div className="mt-6 space-y-6">
          {menuGroups.map((group) =>
          <div key={group.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">{group.title}</p>
              <ul className="space-y-0.5">
                {group.links.map((l) =>
              <li key={l.to}>
                    <Link to={l.to} onClick={onClose} className="block rounded-xl px-3 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        {user &&
        <button
          type="button"
          onClick={() => {
            logout();
            onClose();
          }}
          className="mt-6 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-700 hover:bg-red-50">
          
            Log out
          </button>
        }
      </nav>
    </Drawer>);

}