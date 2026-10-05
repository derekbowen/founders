import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { footerGroups } from '../../data/navigation';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">{brand.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-ink-700">
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-primary-600" aria-hidden />
              <a href={`mailto:${brand.supportEmail}`} className="hover:text-primary-700 hover:underline">
                {brand.supportEmail}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-primary-600" aria-hidden />
              {brand.supportPhone} · 24/7 safety line
            </li>
          </ul>
        </div>
        {footerGroups.map((g) =>
        <div key={g.title}>
            <h2 className="text-sm font-bold text-ink-900">{g.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) =>
            <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink-600 hover:text-primary-700 hover:underline">
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-ink-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-ink-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 {brand.name}, Inc. All rights reserved.</p>
          <p>Serving families across {brand.city}</p>
        </div>
      </div>
    </footer>);

}