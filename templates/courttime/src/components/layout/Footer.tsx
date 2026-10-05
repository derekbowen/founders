import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';
import { footerGroups } from '../../data/navigation';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo inverted />
          <p className="mt-4 text-sm leading-relaxed">{brand.description}</p>
          <p className="mt-4 text-sm">
            Questions?{' '}
            <a href={`mailto:${brand.supportEmail}`} className="font-medium text-accent hover:underline">
              {brand.supportEmail}
            </a>
          </p>
        </div>
        {footerGroups.map((group) =>
        <div key={group.title}>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) =>
            <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-accent">
                    {link.label}
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalEntity}. All rights reserved.
          </p>
          <p>Prices in {brand.currency} · {brand.city}</p>
        </div>
      </div>
    </footer>);

}