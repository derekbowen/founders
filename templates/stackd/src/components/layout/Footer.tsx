import React from 'react';
import { Link } from 'react-router-dom';
import { AtSignIcon as TwitterIcon, CameraIcon as InstagramIcon, PlayIcon as YoutubeIcon } from 'lucide-react';
import { Logo } from './Logo';
import { brand } from '../../data/brand';
import { categories } from '../../data/categories';

export function Footer() {
  const columns = [
  {
    title: 'Shop',
    links: categories.map((c) => ({ to: `/s?category=${c.id}`, label: c.name }))
  },
  {
    title: 'Sell',
    links: [
    { to: '/listings/new', label: 'Start selling' },
    { to: '/inbox?tab=sales', label: 'Your sales' },
    { to: '/account/payouts', label: 'Payouts' },
    { to: '/about', label: 'How it works' }]

  },
  {
    title: 'Company',
    links: [
    { to: '/about', label: 'About' },
    { to: '/terms', label: 'Terms of service' },
    { to: '/privacy', label: 'Privacy policy' }]

  }];


  const socials = [
  { href: brand.social.twitter, label: 'Twitter', icon: TwitterIcon },
  { href: brand.social.instagram, label: 'Instagram', icon: InstagramIcon },
  { href: brand.social.youtube, label: 'YouTube', icon: YoutubeIcon }];


  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">{brand.description}</p>
          <div className="flex gap-2">
            {socials.map(({ href, label, icon: Icon }) =>
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/25 transition hover:border-brand hover:text-brand">
              
                <Icon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        {columns.map((col) =>
        <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-widest text-brand">{col.title}</h2>
            <ul className="space-y-2">
              {col.links.map((l) =>
            <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/75 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
          </nav>
        )}
      </div>
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {brand.name}. All rights reserved.
          </p>
          <p>
            Questions?{' '}
            <a href={`mailto:${brand.supportEmail}`} className="text-white underline-offset-4 hover:underline">
              {brand.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>);

}