import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, LibraryIcon, LogOutIcon, PlusIcon, SettingsIcon, ShieldIcon, ScrollTextIcon, TrendingUpIcon, UserIcon, BoxIcon } from "lucide-react";
import { Avatar } from "../Avatar";
import { useStore } from "../../contexts/StoreContext";
export function UserMenu() {
  const {
    user,
    signOut
  } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  if (!user) return null;
  const groups = [[{
    to: `/u/${user.creatorId}`,
    label: 'My profile',
    icon: UserIcon
  }, {
    to: '/inbox',
    label: 'My library',
    icon: LibraryIcon
  }, {
    to: '/inbox?tab=sales',
    label: 'Sales',
    icon: TrendingUpIcon
  }, {
    to: '/listings/new',
    label: 'New listing',
    icon: PlusIcon
  }, {
    to: '/account/contact',
    label: 'Account settings',
    icon: SettingsIcon
  }], [{
    to: '/about',
    label: 'About',
    icon: BoxIcon
  }, {
    to: '/terms',
    label: 'Terms of service',
    icon: ScrollTextIcon
  }, {
    to: '/privacy',
    label: 'Privacy policy',
    icon: ShieldIcon
  }]];
  return <div ref={ref} className="relative">
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex items-center gap-1.5 rounded-full border border-ink/20 p-0.5 pr-2 transition hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
        <Avatar name={user.name} alt={user.name} src={user.avatar} size="sm" />
        <ChevronDownIcon className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        <span className="sr-only">Open account menu</span>
      </button>
      <AnimatePresence>
        {open && <motion.div role="menu" initial={{
        opacity: 0,
        y: -6
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -6
      }} transition={{
        duration: 0.14
      }} className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-ink bg-white shadow-pop">
            <div className="border-b border-line px-4 py-3">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            {groups.map((group, i) => <div key={i} className={`py-1.5 ${i > 0 ? 'border-t border-line' : ''}`}>
                {group.map(({
            to,
            label,
            icon: Icon
          }) => <Link key={to} to={to} role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-ink transition hover:bg-paper focus-visible:bg-paper focus-visible:outline-none">
                    <Icon className="h-4 w-4 text-muted" aria-hidden="true" />
                    {label}
                  </Link>)}
              </div>)}
            <div className="border-t border-line py-1.5">
              <button type="button" role="menuitem" onClick={() => {
            signOut();
            setOpen(false);
            navigate('/');
          }} className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-danger transition hover:bg-paper">
                <LogOutIcon className="h-4 w-4" aria-hidden="true" />
                Log out
              </button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}