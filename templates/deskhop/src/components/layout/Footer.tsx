import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';
import { cities } from '../../data/cities';
import { spaceTypes } from '../../data/spaceTypes';
import { Logo } from './Logo';

export function Footer() {
  const columns = [
  {
    title: 'Cities',
    links: cities.map((c) => ({ to: `/s?city=${encodeURIComponent(c.name)}`, label: c.name }))
  },
  {
    title: 'Spaces',
    links: spaceTypes.map((t) => ({ to: `/s?type=${t.id}`, label: t.label }))
  },
  {
    title: 'Hosts',
    links: [
    { to: '/listings/new', label: 'List your space' },
    { to: '/inbox', label: 'Manage bookings' },
    { to: '/account/payouts', label: 'Payouts' }]

  },
  {
    title: 'Company',
    links: [
    { to: '/about', label: 'About' },
    { to: '/terms', label: 'Terms of service' },
    { to: '/privacy', label: 'Privacy policy' }]

  }];


  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{brand.description}</p>
            <ul className="mt-5 flex gap-4">
              {brand.social.map((s) =>
              <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-ink-muted hover:text-ink">
                    {s.label}
                  </a>
                </li>
              )}
            </ul>
          </div>
          {columns.map((col) =>
          <nav key={col.title} aria-label={col.title}>
              <h2 className="font-sans text-sm font-semibold text-ink">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
              <li key={l.to + l.label}>
                    <Link to={l.to} className="text-sm text-ink-muted transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </nav>
          )}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. {brand.address}
          </p>
          <p>
            Questions? <a className="link" href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
          </p>
        </div>
      </div>
    </footer>);

}