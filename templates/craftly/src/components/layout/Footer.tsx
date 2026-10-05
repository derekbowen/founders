import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { brand } from '../../data/brand';
import { categories } from '../../data/categories';
import { Logo } from '../ui/Logo';

export function Footer() {
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  const columns = [
  { title: 'Shop', links: categories.map((c) => ({ to: `/s?category=${c.id}`, label: c.name })) },
  {
    title: 'Sell',
    links: [
    { to: '/listings/new', label: 'Open a shop' },
    { to: '/inbox/sales', label: 'Manage orders' },
    { to: '/account/payouts', label: 'Payouts' },
    { to: '/about', label: 'Seller standards' }]

  },
  {
    title: brand.name,
    links: [
    { to: '/about', label: 'About us' },
    { to: '/terms', label: 'Terms of service' },
    { to: '/privacy', label: 'Privacy policy' },
    { to: '/s', label: 'Browse all' }]

  }];


  return (
    <footer className="bg-ink text-canvas">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-canvas/70">{brand.description}</p>
          <form
            className="mt-6 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes('@')) {
                toast.error('Please enter a valid email address.');
                return;
              }
              toast.success('You’re on the list — welcome to the studio.');
              setEmail('');
            }}>
            
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for maker stories"
              className="h-11 flex-1 rounded-full border border-canvas/20 bg-canvas/5 px-4 text-sm text-canvas placeholder:text-canvas/50 focus:border-canvas/60 focus:outline-none" />
            
            <button type="submit" className="h-11 rounded-full bg-primary px-5 text-sm font-medium text-white hover:bg-primary-hover">
              Join
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) =>
          <div key={col.title}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-canvas/60">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
              <li key={l.label}>
                    <Link to={l.to} className="text-sm text-canvas/85 transition-colors hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-canvas/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-canvas/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. Every item is handmade by an independent maker.
          </p>
          <div className="flex gap-5">
            <a href={brand.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
            <a href={brand.social.pinterest} target="_blank" rel="noreferrer" className="hover:text-white">Pinterest</a>
            <a href={brand.social.facebook} target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
    </footer>);

}