import React from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon as InstagramIcon, PlayCircleIcon as YoutubeIcon, BriefcaseIcon as LinkedinIcon } from 'lucide-react';
import { Logo } from './Logo';
import { brand } from '../../data/brand';
import { subjects } from '../../data/subjects';

export function Footer() {
  const columns = [
  {
    title: 'Learn',
    links: [
    { to: '/search', label: 'Find a tutor' },
    ...subjects.slice(0, 5).map((s) => ({ to: `/search?subject=${s.id}`, label: `${s.name} tutors` }))]

  },
  {
    title: 'Teach',
    links: [
    { to: '/listings/new', label: 'Become a tutor' },
    { to: '/inbox', label: 'Tutor inbox' },
    { to: '/account/payouts', label: 'Payouts' }]

  },
  {
    title: 'Company',
    links: [
    { to: '/about', label: 'About us' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/privacy', label: 'Privacy Policy' }]

  }];


  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-600">{brand.description}</p>
          <div className="flex gap-2">
            {[
            { href: brand.social.instagram, label: 'Instagram', Icon: InstagramIcon },
            { href: brand.social.youtube, label: 'YouTube', Icon: YoutubeIcon },
            { href: brand.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon }].
            map(({ href, label, Icon }) =>
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition hover:border-primary-300 hover:text-primary-700">
              
                <Icon size={16} />
              </a>
            )}
          </div>
        </div>
        {columns.map((col) =>
        <div key={col.title}>
            <h2 className="text-sm font-semibold text-ink-900">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) =>
            <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ink-600 transition hover:text-primary-700">
                    {l.label}
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-ink-200">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 {brand.name}, Inc. All rights reserved.</p>
          <a href={`mailto:${brand.supportEmail}`} className="hover:text-primary-700">
            {brand.supportEmail}
          </a>
        </div>
      </div>
    </footer>);

}