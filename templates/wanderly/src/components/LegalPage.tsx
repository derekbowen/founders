import React from 'react';
import type { LegalSection } from '../data/legal';
import { legalUpdated } from '../data/legal';

interface LegalPageProps {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className="bg-sand-50">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">On this page</p>
          <ul className="mt-3 space-y-2">
            {sections.map((s) =>
            <li key={s.heading}><a href={`#${slug(s.heading)}`} className="text-sm text-slate-600 hover:text-primary-700">{s.heading}</a></li>
            )}
          </ul>
        </nav>
        <article className="max-w-3xl rounded-3xl bg-white p-6 sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated {legalUpdated}</p>
          <p className="mt-6 leading-relaxed text-slate-700">{intro}</p>
          {sections.map((s) =>
          <section key={s.heading} id={slug(s.heading)} className="mt-8 scroll-mt-24">
              <h2 className="text-lg font-semibold text-slate-900">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-slate-700">{s.body}</p>
            </section>
          )}
        </article>
      </div>
    </div>);

}