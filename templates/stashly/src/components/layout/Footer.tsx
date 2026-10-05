import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
import { Logo } from './Logo';
import { brand } from '../../data/brand';
import { footerColumns } from '../../data/content';
import { ui, cx } from '../../utils/styles';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className={cx(ui.container, 'grid gap-10 py-14 md:grid-cols-5')}>
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-600">{brand.description}</p>
          <div className="mt-5 flex gap-2">
            {[
            { href: brand.social.instagram, label: 'Instagram', icon: InstagramIcon },
            { href: brand.social.facebook, label: 'Facebook', icon: FacebookIcon },
            { href: brand.social.x, label: 'X', icon: TwitterIcon }].
            map(({ href, label, icon: Icon }) =>
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-brand-500 hover:text-brand-700">
              
                <Icon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        {footerColumns.map((col) =>
        <div key={col.title}>
            <h2 className="text-sm font-semibold text-stone-900">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) =>
            <li key={l.label}>
                  <Link to={l.to} className="text-sm text-stone-600 hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-stone-200">
        <div className={cx(ui.container, 'flex flex-col gap-2 py-6 text-xs text-stone-500 sm:flex-row sm:justify-between')}>
          <p>© {new Date().getFullYear()} {brand.legalEntity}. All rights reserved.</p>
          <p>{brand.homeCity} · {brand.supportEmail}</p>
        </div>
      </div>
    </footer>);

}