import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, InstagramIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { footerColumns } from '../../data/content';
import { Logo } from './Logo';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo inverted className="text-3xl" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
              {brand.tagline}. Rent designer dresses from real closets for 4 or 8 days — cleaning included.
            </p>
            <form
              className="mt-8 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes('@')) setSubscribed(true);
              }}>
              
              <label htmlFor="footer-email" className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">
                The Edit — weekly newsletter
              </label>
              {subscribed ?
              <p className="mt-3 flex items-center gap-2 text-sm text-paper">
                  <CheckIcon size={16} aria-hidden="true" /> You’re on the list.
                </p> :

              <div className="mt-3 flex border-b border-paper/30 focus-within:border-paper">
                  <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="h-11 flex-1 bg-transparent text-sm text-paper placeholder:text-paper/50 focus:outline-none" />
                
                  <button type="submit" className="text-xs font-semibold uppercase tracking-[0.14em] text-paper hover:text-accent">
                    Subscribe
                  </button>
                </div>
              }
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((col) =>
            <div key={col.title}>
                <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-paper/60">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) =>
                <li key={l.label}>
                      <Link to={l.to} className="text-sm text-paper/85 transition hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-paper/15 pt-6 text-xs text-paper/60 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {brand.legalEntity}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href={brand.social.instagram} aria-label="Instagram" className="transition hover:text-paper">
              <InstagramIcon size={16} aria-hidden="true" />
            </a>
            <a href={brand.social.pinterest} className="transition hover:text-paper">Pinterest</a>
            <a href={brand.social.tiktok} className="transition hover:text-paper">TikTok</a>
            <a href={`mailto:${brand.supportEmail}`} className="transition hover:text-paper">
              {brand.supportEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>);

}