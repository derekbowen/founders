import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { Logo } from './Logo';
import { brand } from '../../data/brand';
import { footerColumns } from '../../data/navigation';
import { categories } from '../../data/categories';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">{brand.description}</p>
            <div className="mt-6 flex gap-2">
              {[
              { href: brand.social.twitter, label: 'X (Twitter)', icon: TwitterIcon },
              { href: brand.social.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
              { href: brand.social.instagram, label: 'Instagram', icon: InstagramIcon }].
              map(({ href, label, icon: Icon }) =>
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-400 ring-1 ring-slate-800 transition-colors hover:text-white hover:ring-slate-600">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <nav aria-label="Categories">
            <h2 className="text-sm font-semibold text-white">Categories</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) =>
              <li key={c.id}>
                  <Link to={`/s?category=${c.id}`} className="text-slate-400 transition-colors hover:text-white">{c.name}</Link>
                </li>
              )}
            </ul>
          </nav>
          {footerColumns.map((col) =>
          <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold text-white">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) =>
              <li key={l.label}>
                    <Link to={l.to} className="text-slate-400 transition-colors hover:text-white">{l.label}</Link>
                  </li>
              )}
              </ul>
            </nav>
          )}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.legalEntity}. All rights reserved.</p>
          <p>Questions? <a href={`mailto:${brand.supportEmail}`} className="text-slate-300 hover:text-white">{brand.supportEmail}</a></p>
        </div>
      </div>
    </footer>);

}