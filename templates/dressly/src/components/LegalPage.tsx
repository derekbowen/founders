import React from 'react';
import { Link } from 'react-router-dom';
import type { LegalSection } from '../data/legal';
import { cx, eyebrow } from '../utils/styles';

interface LegalPageProps {
  title: string;
  updated: string;
  sections: LegalSection[];
  current: 'terms' | 'privacy';
}

export function LegalPage({ title, updated, sections, current }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 pt-10 md:px-8 md:pt-16">
      <p className={eyebrow}>Legal</p>
      <h1 className="mt-2 font-display text-4xl md:text-6xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
      <div className="mt-12 grid gap-12 lg:grid-cols-[200px_1fr]">
        <nav aria-label="Legal pages" className="flex gap-4 text-sm lg:flex-col lg:gap-2">
          {[
          { id: 'terms', label: 'Terms of service', to: '/terms' },
          { id: 'privacy', label: 'Privacy policy', to: '/privacy' }].
          map((l) =>
          <Link
            key={l.id}
            to={l.to}
            className={cx('transition', current === l.id ? 'font-medium text-ink underline underline-offset-4' : 'text-muted hover:text-ink')}>
            
              {l.label}
            </Link>
          )}
        </nav>
        <article className="max-w-2xl space-y-10">
          {sections.map((s) =>
          <section key={s.heading}>
              <h2 className="font-display text-2xl text-ink">{s.heading}</h2>
              {s.body.map((p, i) =>
            <p key={i} className="mt-3 text-[15px] leading-relaxed text-ink/80">
                  {p}
                </p>
            )}
            </section>
          )}
        </article>
      </div>
    </div>);

}