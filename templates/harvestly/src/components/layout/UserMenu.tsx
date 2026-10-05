import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, InboxIcon, LogOutIcon, PlusCircleIcon, SettingsIcon, TractorIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar } from "../ui/Avatar";

export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!user) return null;

  const items = [
  { to: "/inbox/orders", label: "Inbox", icon: InboxIcon },
  ...(user.farmId ? [{ to: `/farms/${user.farmId}`, label: "My farm profile", icon: TractorIcon }] : []),
  { to: "/listings/new", label: "New listing", icon: PlusCircleIcon },
  { to: "/account/contact", label: "Account settings", icon: SettingsIcon }];


  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded-full p-1 pr-2 transition hover:bg-ink/5">
        
        <Avatar name={user.name} size="sm" />
        <ChevronDownIcon className="h-4 w-4 text-muted" aria-hidden="true" />
        <span className="sr-only">Open account menu</span>
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift">
          
            <div className="px-3 py-2.5">
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="my-1 h-px bg-line" />
            {items.map((item) =>
          <Link
            key={item.to}
            to={item.to}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink transition hover:bg-primary-soft/60">
            
                <item.icon className="h-4 w-4 text-muted" aria-hidden="true" />
                {item.label}
              </Link>
          )}
            <div className="my-1 h-px bg-line" />
            <button
            type="button"
            role="menuitem"
            onClick={() => {
              logout();
              setOpen(false);
              navigate("/");
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink transition hover:bg-primary-soft/60">
            
              <LogOutIcon className="h-4 w-4 text-muted" aria-hidden="true" />
              Log out
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}