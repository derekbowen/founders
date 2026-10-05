import React from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { KeyRoundIcon, MailIcon, WalletIcon, BoxIcon } from "lucide-react";
import { ContactForm } from "../components/account/ContactForm";
import { PasswordForm } from "../components/account/PasswordForm";
import { PayoutsPanel } from "../components/account/PayoutsPanel";
import { cn, containerClass, focusRing } from "../utils/styles";
const tabs: {
  key: string;
  label: string;
  description: string;
  icon: BoxIcon;
}[] = [{
  key: 'contact',
  label: 'Contact details',
  description: 'Email, phone and notifications',
  icon: MailIcon
}, {
  key: 'password',
  label: 'Password',
  description: 'Keep your account secure',
  icon: KeyRoundIcon
}, {
  key: 'payouts',
  label: 'Payouts',
  description: 'Bank account and payout history',
  icon: WalletIcon
}];
export function AccountSettingsPage() {
  const {
    tab
  } = useParams();
  const current = tabs.find((t) => t.key === tab);
  if (!current) return <Navigate to="/account/contact" replace />;
  return <div className={cn(containerClass, 'py-10 lg:py-14')}>
      <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-steel-900">Account settings</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label="Account sections" className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:space-y-1 lg:px-0">
          {tabs.map((t) => <NavLink key={t.key} to={`/account/${t.key}`} className={({
          isActive
        }) => cn('flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors', focusRing, isActive ? 'bg-steel-900 text-white' : 'text-steel-700 hover:bg-steel-100')}>
              <t.icon className="h-4 w-4" aria-hidden="true" />
              {t.label}
            </NavLink>)}
        </nav>
        <section className="rounded-2xl border border-steel-200 bg-white p-6 shadow-card sm:p-8" aria-labelledby="settings-heading">
          <h2 id="settings-heading" className="font-heading text-2xl font-semibold uppercase tracking-wide text-steel-900">{current.label}</h2>
          <p className="mb-8 text-sm text-steel-500">{current.description}</p>
          {current.key === 'contact' && <ContactForm />}
          {current.key === 'password' && <PasswordForm />}
          {current.key === 'payouts' && <PayoutsPanel />}
        </section>
      </div>
    </div>;
}