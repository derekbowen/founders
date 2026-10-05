import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { brand } from '../../data/brand';
import { footerColumns } from '../../data/siteContent';

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{brand.description}</p>
            <p className="mt-4 text-sm text-white/70">
              <a href={`mailto:${brand.supportEmail}`} className="hover:text-white">
                {brand.supportEmail}
              </a>
              <br />
              {brand.phone}
            </p>
          </div>
          {footerColumns.map((col) =>
          <div key={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-sand">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
              <li key={l.label}>
                    <Link to={l.to} className="text-sm text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {brand.social.map((s) =>
            <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>);

}