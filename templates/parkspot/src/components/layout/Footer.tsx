import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { Logo } from './Logo';
import { brand } from '../../data/brand';

const columns = [
{
  title: 'Drivers',
  links: [
  { to: '/s', label: 'Find parking' },
  { to: '/s?useCase=events', label: 'Event parking' },
  { to: '/s?useCase=airports', label: 'Airport parking' },
  { to: '/s?useCase=monthly', label: 'Monthly parking' }]

},
{
  title: 'Hosts',
  links: [
  { to: '/listings/new', label: 'List your space' },
  { to: '/account/payouts', label: 'Payouts' },
  { to: '/inbox?tab=hosting', label: 'Manage bookings' }]

},
{
  title: 'Company',
  links: [
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms of service' },
  { to: '/privacy', label: 'Privacy policy' }]

}];


export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{brand.description}</p>
          <div className="mt-5 flex gap-2">
            {[
            { href: brand.social.instagram, label: 'Instagram', Icon: InstagramIcon },
            { href: brand.social.x, label: 'X', Icon: TwitterIcon },
            { href: brand.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon }].
            map(({ href, label, Icon }) =>
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-accent hover:text-accent">
              
                <Icon size={16} aria-hidden />
              </a>
            )}
          </div>
        </div>
        {columns.map((col) =>
        <div key={col.title}>
            <h2 className="text-sm font-semibold text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) =>
            <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-accent">
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © 2026 {brand.legalEntity} · {brand.marketCity}
          </p>
          <a href={`mailto:${brand.supportEmail}`} className="hover:text-accent">
            {brand.supportEmail}
          </a>
        </div>
      </div>
    </footer>);

}