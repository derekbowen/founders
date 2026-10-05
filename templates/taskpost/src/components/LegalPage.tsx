import React from 'react';
import type { LegalSection } from '../data/legal';

interface LegalPageProps {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, intro, updated, sections }: LegalPageProps) {
  return (
    <div className="bg-ink-50">
      <div className="border-b border-ink-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-ink-500">Last updated {updated}</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink-900">{title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-600">{intro}</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-500">On this page</p>
            <ul className="mt-3 space-y-2 border-l border-ink-200">
              {sections.map((s) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent pl-3 text-sm font-semibold text-ink-600 hover:border-primary-600 hover:text-ink-900">
                    {s.title.replace(/^\d+\.\s/, '')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <article className="max-w-3xl rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-10">
          {sections.map((s) =>
          <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-ink-100 py-6 first:pt-0 last:border-0 last:pb-0">
              <h2 className="text-xl font-extrabold text-ink-900">{s.title}</h2>
              {s.body.map((p) =>
            <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-ink-700">
                  {p}
                </p>
            )}
            </section>
          )}
        </article>
      </div>
    </div>);

}