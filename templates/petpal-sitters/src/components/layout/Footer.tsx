import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { brand } from '../../data/brand';
import { footerColumns } from '../../data/content';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-stone-600">{brand.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-stone-600">
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-stone-400" aria-hidden="true" />
              <a href={`mailto:${brand.supportEmail}`} className="hover:text-primary-700 hover:underline">
                {brand.supportEmail}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-stone-400" aria-hidden="true" />
              {brand.supportPhone}
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
              {brand.address}
            </li>
          </ul>
        </div>
        {footerColumns.map((col) =>
        <div key={col.title}>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-900">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) =>
            <li key={link.label}>
                  <Link to={link.to} className="text-[15px] text-stone-600 transition-colors hover:text-primary-700">
                    {link.label}
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-stone-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {brand.companyName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/terms" className="hover:text-stone-800">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-stone-800">
              Privacy
            </Link>
            <Link to="/about" className="hover:text-stone-800">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}