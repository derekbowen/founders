import React from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { KeyRoundIcon, MailIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Avatar } from "../components/ui/Avatar";
import { ContactForm } from "../components/account/ContactForm";
import { PasswordForm } from "../components/account/PasswordForm";

const sections = [
{ id: "contact", label: "Contact details", icon: MailIcon },
{ id: "password", label: "Password", icon: KeyRoundIcon }];


export function AccountSettings() {
  const { section = "contact" } = useParams();
  const { user } = useAuth();
  if (!sections.some((s) => s.id === section)) return <Navigate to="/account/contact" replace />;
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="font-display text-5xl font-semibold text-ink">Account settings</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <Avatar name={fullName} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{fullName}</p>
              <p className="truncate text-xs text-muted">{user?.email}</p>
            </div>
          </div>
          <nav aria-label="Account settings" className="flex gap-2 lg:flex-col">
            {sections.map((s) =>
            <NavLink
              key={s.id}
              to={`/account/${s.id}`}
              className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive ? "bg-blush text-primary" : "text-ink hover:bg-blush/40"}`

              }>
              
                <s.icon aria-hidden="true" className="h-4 w-4" />
                {s.label}
              </NavLink>
            )}
          </nav>
        </aside>
        <div className="max-w-xl rounded-3xl border border-line bg-surface p-6 sm:p-8">
          {section === "contact" ? <ContactForm /> : <PasswordForm />}
        </div>
      </div>
    </div>);

}