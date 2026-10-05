import React from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { BanknoteIcon, KeyRoundIcon, MapPinIcon, UserIcon } from "lucide-react";
import { AddressesForm } from "../components/account/AddressesForm";
import { ContactForm } from "../components/account/ContactForm";
import { PasswordForm } from "../components/account/PasswordForm";
import { PayoutsForm } from "../components/account/PayoutsForm";

const tabs = [
{ id: "contact", label: "Contact details", icon: UserIcon, text: "How buyers and farms reach you." },
{ id: "password", label: "Password", icon: KeyRoundIcon, text: "Keep your account secure." },
{ id: "payouts", label: "Payouts", icon: BanknoteIcon, text: "Where your farm sales are deposited." },
{ id: "addresses", label: "Addresses", icon: MapPinIcon, text: "Saved delivery addresses." }] as
const;

export function AccountSettings() {
  const { tab = "contact" } = useParams();
  const current = tabs.find((t) => t.id === tab);
  if (!current) return <Navigate to="/account/contact" replace />;

  return (
    <div className="container-site py-8 lg:py-12">
      <h1 className="mb-8 font-display text-4xl font-semibold text-ink">Account settings</h1>
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Account sections" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
          {tabs.map((t) =>
          <NavLink
            key={t.id}
            to={`/account/${t.id}`}
            className={({ isActive }) =>
            `flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium transition lg:rounded-xl ${
            isActive ? "bg-paper text-ink shadow-card" : "text-muted hover:bg-paper/60 hover:text-ink"}`

            }>
            
              <t.icon className="h-4 w-4" aria-hidden="true" />
              {t.label}
            </NavLink>
          )}
        </nav>
        <section className="rounded-2xl border border-line bg-white/60 p-5 sm:p-8" aria-labelledby="acct-h">
          <h2 id="acct-h" className="font-display text-2xl font-semibold text-ink">
            {current.label}
          </h2>
          <p className="mb-6 mt-1 text-sm text-muted">{current.text}</p>
          {current.id === "contact" && <ContactForm />}
          {current.id === "password" && <PasswordForm />}
          {current.id === "payouts" && <PayoutsForm />}
          {current.id === "addresses" && <AddressesForm />}
        </section>
      </div>
    </div>);

}