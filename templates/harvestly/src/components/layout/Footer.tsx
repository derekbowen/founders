import React from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import { brand } from "../../data/brand";
import { categories } from "../../data/categories";
import { Logo } from "./Logo";

export function Footer() {
  const columns = [
  {
    title: "Shop",
    links: categories.slice(0, 5).map((c) => ({ to: `/search?category=${c.id}`, label: c.label }))
  },
  {
    title: "Farmers",
    links: [
    { to: "/listings/new", label: brand.sellerCta },
    { to: "/inbox/sales", label: "Manage sales" },
    { to: "/account/payouts", label: "Payouts" },
    { to: "/farms/willow-creek", label: "Example farm profile" }]

  },
  {
    title: brand.name,
    links: [
    { to: "/about", label: "About us" },
    { to: "/terms", label: "Terms of service" },
    { to: "/privacy", label: "Privacy policy" },
    { to: "/account/contact", label: "Account" }]

  }];


  return (
    <footer className="mt-auto bg-primary-dark text-kraft">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-kraft/80">{brand.description}</p>
          <div className="mt-5 flex gap-2">
            <a
              href={brand.social.instagram}
              aria-label="Instagram"
              className="rounded-full border border-kraft/20 p-2 transition hover:bg-kraft/10">
              
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={brand.social.facebook}
              aria-label="Facebook"
              className="rounded-full border border-kraft/20 p-2 transition hover:bg-kraft/10">
              
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        {columns.map((col) =>
        <div key={col.title}>
            <h2 className="mb-3 text-sm font-semibold text-kraft">{col.title}</h2>
            <ul className="space-y-2">
              {col.links.map((l) =>
            <li key={l.label}>
                  <Link to={l.to} className="text-sm text-kraft/75 transition hover:text-kraft hover:underline">
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-kraft/15">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-kraft/70 sm:flex-row sm:justify-between">
          <p>
            © 2026 {brand.name}. Grown in the {brand.region}.
          </p>
          <a href={`mailto:${brand.supportEmail}`} className="hover:text-kraft">
            {brand.supportEmail}
          </a>
        </div>
      </div>
    </footer>);

}