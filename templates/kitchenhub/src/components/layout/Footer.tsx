import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { footerColumns } from '../../data/marketing';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-steel-900 text-steel-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-400">{brand.description}</p>
          <a href={`mailto:${brand.supportEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-steel-200">
            <MailIcon className="h-4 w-4" aria-hidden="true" />
            {brand.supportEmail}
          </a>
        </div>
        {footerColumns.map((col) =>
        <nav key={col.title} aria-label={col.title}>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) =>
            <li key={link.to}>
                  <Link to={link.to} className="text-sm text-steel-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
            )}
            </ul>
          </nav>
        )}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {brand.legalEntity}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href={brand.social.instagram} className="hover:text-white">Instagram</a>
            <a href={brand.social.linkedin} className="hover:text-white">LinkedIn</a>
            <a href={brand.social.x} className="hover:text-white">X</a>
          </div>
        </div>
      </div>
    </footer>);

}