import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { brand } from '../../data/brand';
import { footerColumns } from '../../data/footerLinks';

export function Footer() {
  return (
    <footer className="border-t border-primary-900 bg-primary-950 text-primary-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <BrandLogo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-200">{brand.metaDescription}</p>
            <p className="mt-4 text-sm text-primary-200">
              Questions?{' '}
              <a href={`mailto:${brand.supportEmail}`} className="font-medium text-accent-300 hover:text-accent-200">
                {brand.supportEmail}
              </a>
            </p>
          </div>
          {footerColumns.map((col) =>
          <div key={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
              <li key={l.label}>
                    <Link to={l.to} className="text-sm text-primary-200 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-primary-800 pt-6 text-xs text-primary-300 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
          <p>Payments processed securely. Prices shown in USD, excluding tax.</p>
        </div>
      </div>
    </footer>);

}