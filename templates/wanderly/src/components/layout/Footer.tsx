import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import { Logo } from './Logo';
import { brand } from '../../data/brand';
import { categories } from '../../data/categories';
import { destinations } from '../../data/destinations';

export function Footer() {
  const linkCls = 'text-sm text-slate-300 transition-colors hover:text-white';
  return (
    <footer className="bg-accent-900 text-slate-300">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">{brand.description}</p>
          <div className="mt-6 flex gap-2">
            {[
            { href: brand.social.instagram, label: 'Instagram', icon: InstagramIcon },
            { href: brand.social.facebook, label: 'Facebook', icon: FacebookIcon },
            { href: brand.social.twitter, label: 'X (Twitter)', icon: TwitterIcon }].
            map(({ href, label, icon: Icon }) =>
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
              
                <Icon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Destinations</h2>
          <ul className="mt-4 space-y-2.5">
            {destinations.map((d) =>
            <li key={d.id}>
                <Link to={`/s?dest=${d.id}`} className={linkCls}>
                  {d.city}
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) =>
            <li key={c.id}>
                <Link to={`/s?cat=${c.id}`} className={linkCls}>
                  {c.label}
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{brand.name}</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/about" className={linkCls}>About us</Link></li>
            <li><Link to="/host/new/details" className={linkCls}>Become a host</Link></li>
            <li><Link to="/terms" className={linkCls}>Terms of service</Link></li>
            <li><Link to="/privacy" className={linkCls}>Privacy policy</Link></li>
            <li><a href={`mailto:${brand.supportEmail}`} className={linkCls}>{brand.supportEmail}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>Prices shown in {brand.currency}. Hosted by locals in 6 cities.</p>
        </div>
      </div>
    </footer>);

}