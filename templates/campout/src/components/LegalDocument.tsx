import React from 'react';
import { Link } from 'react-router-dom';
import type { LegalSection } from '../data/legal';
import { companyLinks } from '../data/navigation';

export function LegalDocument({ title, updated, intro, sections }: {title: string;updated: string;intro: string;sections: LegalSection[];}) {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Legal" className="flex gap-2 lg:flex-col">
          {companyLinks.map((l) =>
          <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-sand-100">
              {l.label}
            </Link>
          )}
        </nav>
        <article className="max-w-3xl">
          <p className="eyebrow">Last updated {updated}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-ink-900">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">{intro}</p>
          <div className="mt-10 space-y-8">
            {sections.map((s) =>
            <section key={s.heading}>
                <h2 className="text-xl font-bold text-ink-900">{s.heading}</h2>
                <p className="mt-2 leading-relaxed text-ink-700">{s.body}</p>
              </section>
            )}
          </div>
        </article>
      </div>
    </div>);

}