import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { brand } from '../../data/brand';
import { categories } from '../../data/categories';

const columns = [
{
  title: 'For customers',
  links: [
  { to: '/post-job', label: 'Post a job' },
  { to: '/about', label: 'How it works' },
  { to: '/inbox?tab=jobs', label: 'My jobs' },
  { to: '/signup', label: 'Create an account' }]

},
{
  title: 'For pros',
  links: [
  { to: '/search', label: 'Find work near you' },
  { to: '/inbox?tab=offers', label: 'My offers' },
  { to: '/account/payouts', label: 'Payout settings' },
  { to: '/signup', label: 'Become a pro' }]

},
{
  title: 'Company',
  links: [
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/privacy', label: 'Privacy Policy' }]

}];


export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">{brand.description}</p>
            <p className="mt-4 text-sm text-ink-400">
              Questions?{' '}
              <a href={`mailto:${brand.supportEmail}`} className="font-bold text-white hover:text-primary-300">
                {brand.supportEmail}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white">Popular categories</h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) =>
              <li key={c.id}>
                  <Link to={`/search?category=${c.id}`} className="text-sm hover:text-white">
                    {c.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {columns.map((col) =>
          <div key={col.title}>
              <h2 className="text-sm font-extrabold text-white">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
              <li key={l.label}>
                    <Link to={l.to} className="text-sm hover:text-white">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-ink-800 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name}, Inc. Serving {brand.city}.</p>
          <p>Payments held securely until you confirm the job is done.</p>
        </div>
      </div>
    </footer>);

}