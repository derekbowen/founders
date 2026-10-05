import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { brand } from '../../data/brand';
import { companyLinks, hostingLinks } from '../../data/navigation';
import { siteTypes } from '../../data/siteTypes';

export function Footer() {
  const linkClass = 'text-sm text-primary-100 transition-colors hover:text-white';
  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-200">{brand.description}</p>
          <ul className="mt-6 flex gap-4">
            {brand.social.map((s) =>
            <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className={linkClass}>
                  {s.label}
                </a>
              </li>
            )}
          </ul>
        </div>
        <FooterColumn title="Explore">
          {siteTypes.map((t) =>
          <li key={t.key}>
              <Link to={`/s?type=${t.key}`} className={linkClass}>
                {t.plural}
              </Link>
            </li>
          )}
        </FooterColumn>
        <FooterColumn title="Hosting">
          {hostingLinks.map((l) =>
          <li key={l.label}>
              <Link to={l.to} className={linkClass}>
                {l.label}
              </Link>
            </li>
          )}
        </FooterColumn>
        <FooterColumn title="Company">
          {companyLinks.map((l) =>
          <li key={l.to}>
              <Link to={l.to} className={linkClass}>
                {l.label}
              </Link>
            </li>
          )}
          <li>
            <a href={`mailto:${brand.supportEmail}`} className={linkClass}>
              {brand.supportEmail}
            </a>
          </li>
        </FooterColumn>
      </div>
      <div className="border-t border-primary-800">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-primary-200 sm:flex-row sm:justify-between">
          <p>
            © {new Date(2026, 0, 1).getFullYear()} {brand.legalEntity}. All rights reserved.
          </p>
          <p>Leave no trace · Respect private land · Check local fire rules</p>
        </div>
      </div>
    </footer>);

}

function FooterColumn({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent-200">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>);

}