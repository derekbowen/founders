import React from 'react';
import { NavLink } from 'react-router-dom';
import { brand } from '../../data/brand';
import { legalLastUpdated, type LegalSection } from '../../data/legal';

export function LegalPage({ title, intro, sections }: {title: string;intro: string;sections: LegalSection[];}) {
  return (
    <div className="w-full bg-canvas pb-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:px-8">
        <nav aria-label="Legal" className="flex gap-2 lg:sticky lg:top-24 lg:flex-col lg:self-start">
          {[
          { to: '/terms', label: 'Terms of service' },
          { to: '/privacy', label: 'Privacy policy' }].
          map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
            `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-navy text-white' : 'hover:bg-surface'}`
            }>
            
              {l.label}
            </NavLink>
          )}
        </nav>
        <article className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
          <p className="text-sm text-muted">Last updated {legalLastUpdated}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 leading-relaxed text-ink/85">{intro}</p>
          <div className="mt-10 space-y-8">
            {sections.map((s) =>
            <section key={s.heading}>
                <h2 className="text-lg font-bold">{s.heading}</h2>
                {s.paragraphs.map((p) =>
              <p key={p} className="mt-2 leading-relaxed text-ink/85">
                    {p}
                  </p>
              )}
              </section>
            )}
          </div>
          <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
            {brand.legalEntity} · <a href={`mailto:${brand.supportEmail}`} className="underline hover:text-ink">{brand.supportEmail}</a>
          </p>
        </article>
      </div>
    </div>);

}