import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Logo } from '../common/Logo';
import { brand } from '../../data/brand';
import { companyLinks, exploreLinks, neighborhoodLinks } from '../../data/navigation';

const columns = [
{ title: 'Explore', links: exploreLinks },
{ title: 'Company', links: companyLinks },
{ title: 'Neighborhoods', links: neighborhoodLinks }];


export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">{brand.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-ink-700">
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-accent-600" aria-hidden="true" />
              <a href={`mailto:${brand.contact.email}`} className="hover:text-ink-900 hover:underline">
                {brand.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-accent-600" aria-hidden="true" />
              {brand.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-accent-600" aria-hidden="true" />
              {brand.contact.address}
            </li>
          </ul>
        </div>
        {columns.map((col) =>
        <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-extrabold text-ink-900">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) =>
            <li key={l.to}>
                  <Link to={l.to} className="text-sm font-semibold text-ink-600 transition hover:text-primary-700">
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
          </nav>
        )}
      </div>
      <div className="border-t border-ink-100">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-ink-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}, Inc. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {brand.social.map((s) =>
            <li key={s.label}>
                <a href={s.href} className="font-semibold hover:text-ink-900">
                  {s.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>);

}