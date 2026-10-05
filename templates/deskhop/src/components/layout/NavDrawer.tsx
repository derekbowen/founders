import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BuildingIcon,
  FileTextIcon,
  InboxIcon,
  InfoIcon,
  LogInIcon,
  LogOutIcon,
  PlusCircleIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  UserIcon,
  UserPlusIcon } from
'lucide-react';
import { Drawer } from '../Drawer';
import { Avatar } from '../Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from './Logo';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const groups = [
  {
    title: 'Explore',
    links: [
    { to: '/s', label: 'Find a space', icon: SearchIcon },
    { to: '/listings/new', label: 'List your space', icon: PlusCircleIcon }]

  },
  {
    title: 'Your account',
    links: [
    { to: '/inbox', label: 'Inbox', icon: InboxIcon },
    { to: user ? `/u/${user.id}` : '/u/u-me', label: 'Profile', icon: UserIcon },
    { to: '/account/contact', label: 'Account settings', icon: SettingsIcon }]

  },
  {
    title: 'Company',
    links: [
    { to: '/about', label: 'About', icon: InfoIcon },
    { to: '/terms', label: 'Terms of service', icon: FileTextIcon },
    { to: '/privacy', label: 'Privacy policy', icon: ShieldCheckIcon }]

  }];


  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" size="sm">
      <nav aria-label="Main menu" className="flex h-full flex-col overflow-y-auto bg-white p-6">
        <div className="mb-6">
          <Logo />
        </div>

        {user ?
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-mist p-3">
            <Avatar name={user.name} alt={user.name} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-ink-muted">{user.email}</p>
            </div>
          </div> :

        <div className="mb-6 grid grid-cols-2 gap-2">
            <NavLink to="/signup" onClick={onClose} className="btn-primary">
              <UserPlusIcon size={16} aria-hidden="true" /> Sign up
            </NavLink>
            <NavLink to="/login" onClick={onClose} className="btn-secondary">
              <LogInIcon size={16} aria-hidden="true" /> Log in
            </NavLink>
          </div>
        }

        <div className="space-y-6">
          {groups.map((group) =>
          <div key={group.title}>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.links.map((link) =>
              <li key={link.to}>
                    <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                  `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-800' : 'text-ink hover:bg-mist'}`

                  }>
                  
                      <link.icon size={18} aria-hidden="true" />
                      {link.label}
                    </NavLink>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          {user &&
          <button
            type="button"
            onClick={() => {
              logout();
              onClose();
              navigate('/');
            }}
            className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-mist hover:text-ink">
            
              <LogOutIcon size={18} aria-hidden="true" /> Log out
            </button>
          }
          <p className="mt-4 flex items-center gap-2 px-3 text-xs text-ink-subtle">
            <BuildingIcon size={14} aria-hidden="true" /> 1,200+ spaces in 5 cities
          </p>
        </div>
      </nav>
    </Drawer>);

}