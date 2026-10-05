import React from 'react';
import { Link } from 'react-router-dom';
import { AtSignIcon, BriefcaseIcon, CameraIcon } from 'lucide-react';
import { Logo } from './Logo';
import { brand } from '../../data/brand';
import { popularCities } from '../../data/discover';

const columns = [
{
  title: 'Renters',
  links: [
  { to: '/s', label: 'Browse rooms' },
  { to: '/signup', label: 'Create an account' },
  { to: '/inbox', label: 'My inquiries' },
  { to: '/about', label: 'How it works' }]

},
{
  title: 'Landlords',
  links: [
  { to: '/listings/new', label: 'List a room' },
  { to: '/inbox', label: 'Room leads' },
  { to: '/signup', label: 'Become a landlord' }]

},
{
  title: 'Company',
  links: [
  { to: '/about', label: 'About us' },
  { to: '/terms', label: 'Terms of service' },
  { to: '/privacy', label: 'Privacy policy' }]

}];


export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-300">{brand.tagline}.</p>
            <div className="mt-6 flex gap-2">
              {[
              { href: brand.social.instagram, label: 'Instagram', icon: <CameraIcon size={16} /> },
              { href: brand.social.linkedin, label: 'LinkedIn', icon: <BriefcaseIcon size={16} /> },
              { href: brand.social.twitter, label: 'X (Twitter)', icon: <AtSignIcon size={16} /> }].
              map((s) =>
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full bg-navy-800 text-navy-200 transition hover:bg-primary-400 hover:text-navy-900">
                
                  {s.icon}
                </a>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Cities</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {popularCities.map((c) =>
              <li key={c.name}>
                  <Link to={`/s?city=${c.name}`} className="transition hover:text-primary-300">
                    Rooms in {c.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {columns.map((col) =>
          <div key={col.title}>
              <h2 className="text-sm font-semibold text-white">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) =>
              <li key={l.label}>
                    <Link to={l.to} className="transition hover:text-primary-300">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-navy-800 pt-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.companyName}. All rights reserved.
          </p>
          <a href={`mailto:${brand.supportEmail}`} className="transition hover:text-primary-300">
            {brand.supportEmail}
          </a>
        </div>
      </div>
    </footer>);

}