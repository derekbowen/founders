import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, InboxIcon, LogOutIcon, PlusCircleIcon, SettingsIcon, StoreIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar } from "../ui/Avatar";

export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;
  const fullName = `${user.firstName} ${user.lastName}`;

  const items = [
  { to: "/inbox", label: "Inbox", icon: InboxIcon },
  ...(user.ownerId ? [{ to: `/profile/${user.ownerId}`, label: "Your vendor profile", icon: StoreIcon }] : []),
  { to: "/listings/new", label: "Create a listing", icon: PlusCircleIcon },
  { to: "/account/contact", label: "Account settings", icon: SettingsIcon }];


  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full p-1 pr-2 transition-colors hover:bg-blush/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        
        <Avatar name={fullName} size="sm" />
        <ChevronDownIcon aria-hidden="true" className="h-4 w-4 text-muted" />
        <span className="sr-only">Open account menu</span>
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-line bg-surface py-2 shadow-lift">
          
            <div className="border-b border-line px-4 pb-3 pt-1">
              <p className="text-sm font-semibold text-ink">{fullName}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="py-1">
              {items.map((item) =>
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-blush/50">
              
                  <item.icon aria-hidden="true" className="h-4 w-4 text-muted" />
                  {item.label}
                </Link>
            )}
            </div>
            <div className="border-t border-line pt-1">
              <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                logout();
                navigate("/");
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-blush/50">
              
                <LogOutIcon aria-hidden="true" className="h-4 w-4 text-muted" />
                Log out
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}