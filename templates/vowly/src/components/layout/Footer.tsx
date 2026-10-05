import React from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";
import { brand } from "../../data/brand";
import { categories } from "../../data/categories";
import { Logo } from "./Logo";

export function Footer() {
  const linkClass = "text-sm text-muted transition-colors hover:text-primary";
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{brand.description}</p>
          <div className="mt-6 flex gap-2">
            <a href={brand.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink hover:border-primary hover:text-primary">
              <InstagramIcon aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href={brand.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink hover:border-primary hover:text-primary">
              <FacebookIcon aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href={`mailto:${brand.supportEmail}`} aria-label="Email us" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink hover:border-primary hover:text-primary">
              <MailIcon aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Vendor categories" className="lg:col-span-3">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {categories.map((c) =>
            <li key={c.id}>
                <Link to={`/search?category=${c.id}`} className={linkClass}>{c.label}</Link>
              </li>
            )}
          </ul>
        </nav>

        <nav aria-label={brand.name} className="lg:col-span-2">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">{brand.name}</h2>
          <ul className="space-y-2.5">
            <li><Link to="/about" className={linkClass}>About us</Link></li>
            <li><Link to="/listings/new" className={linkClass}>List your business</Link></li>
            <li><Link to="/search" className={linkClass}>Browse vendors</Link></li>
            <li><Link to="/inbox" className={linkClass}>Inbox</Link></li>
          </ul>
        </nav>

        <nav aria-label="Legal" className="lg:col-span-3">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">Legal</h2>
          <ul className="space-y-2.5">
            <li><Link to="/terms" className={linkClass}>Terms of service</Link></li>
            <li><Link to="/privacy" className={linkClass}>Privacy policy</Link></li>
            <li><a href={`mailto:${brand.supportEmail}`} className={linkClass}>{brand.supportEmail}</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 {brand.legalEntity}. All rights reserved.</p>
          <p>Made with love for couples in {brand.region}.</p>
        </div>
      </div>
    </footer>);

}