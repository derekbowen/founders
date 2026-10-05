import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FileTextIcon, InfoIcon, LogInIcon, LogOutIcon, MenuIcon, MessageSquareIcon, SearchIcon, SettingsIcon, ShieldIcon, SquarePlusIcon, UserIcon, UserPlusIcon, BoxIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { currentUserId } from "../../data/hosts";
import { useClickOutside } from "../../hooks/useClickOutside";
import { cn, focusRing } from "../../utils/styles";
import { Avatar } from "../ui/Avatar";
interface MenuItem {
  label: string;
  to: string;
  icon: BoxIcon;
}
export function AccountMenu() {
  const {
    user,
    logout
  } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  useEffect(() => setOpen(false), [location.pathname]);
  const groups: {
    label: string;
    items: MenuItem[];
  }[] = [...(!user ? [{
    label: 'Get started',
    items: [{
      label: 'Log in',
      to: '/login',
      icon: LogInIcon
    }, {
      label: 'Sign up',
      to: '/signup',
      icon: UserPlusIcon
    }]
  }] : []), {
    label: 'Marketplace',
    items: [{
      label: 'Browse kitchens',
      to: '/search',
      icon: SearchIcon
    }, {
      label: 'List your kitchen',
      to: '/listings/new',
      icon: SquarePlusIcon
    }, {
      label: 'Inbox',
      to: '/inbox',
      icon: MessageSquareIcon
    }]
  }, {
    label: 'Account',
    items: [{
      label: 'Profile',
      to: `/profile/${user?.id ?? currentUserId}`,
      icon: UserIcon
    }, {
      label: 'Account settings',
      to: '/account/contact',
      icon: SettingsIcon
    }]
  }, {
    label: 'Company',
    items: [{
      label: 'About',
      to: '/about',
      icon: InfoIcon
    }, {
      label: 'Terms of service',
      to: '/terms',
      icon: FileTextIcon
    }, {
      label: 'Privacy policy',
      to: '/privacy',
      icon: ShieldIcon
    }]
  }];
  return <div ref={ref} className="relative">
      <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label="Open menu" onClick={() => setOpen((o) => !o)} className={cn('flex items-center gap-2 rounded-full border border-steel-200 bg-white py-1 pl-3 pr-1 transition-shadow hover:shadow-card', focusRing)}>
        <MenuIcon className="h-4 w-4 text-steel-700" aria-hidden="true" />
        {user ? <Avatar name={user.name} src={user.avatar} size="sm" /> : <span className="grid h-8 w-8 place-items-center rounded-full bg-steel-100 text-steel-600">
            <UserIcon className="h-4 w-4" aria-hidden="true" />
          </span>}
      </button>
      <AnimatePresence>
        {open && <motion.div role="menu" initial={{
        opacity: 0,
        y: -6,
        scale: 0.98
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: -6,
        scale: 0.98
      }} transition={{
        duration: 0.14
      }} className="absolute right-0 z-50 mt-2 max-h-[80vh] w-64 origin-top-right overflow-y-auto rounded-xl border border-steel-200 bg-white py-2 shadow-lift">
            {user && <div className="border-b border-steel-100 px-4 pb-3 pt-1">
                <p className="truncate text-sm font-semibold text-steel-900">{user.name}</p>
                <p className="truncate text-xs text-steel-500">{user.email}</p>
              </div>}
            {groups.map((group) => <div key={group.label} className="border-b border-steel-100 py-1.5 last:border-0">
                <p className="px-4 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-steel-500">{group.label}</p>
                {group.items.map((item) => <Link key={item.to} to={item.to} role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-steel-800 transition-colors hover:bg-steel-50 focus-visible:bg-steel-50 focus-visible:outline-none">
                    <item.icon className="h-4 w-4 text-steel-500" aria-hidden="true" />
                    {item.label}
                  </Link>)}
              </div>)}
            {user && <button type="button" role="menuitem" onClick={() => {
          logout();
          setOpen(false);
          navigate('/');
        }} className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-primary transition-colors hover:bg-primary-soft">
                <LogOutIcon className="h-4 w-4" aria-hidden="true" />
                Log out
              </button>}
          </motion.div>}
      </AnimatePresence>
    </div>;
}