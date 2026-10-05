import React from 'react';
import { brand } from '../../data/brand';
import type { LegalSection } from '../../data/legal';

interface LegalDocumentProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">Legal</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated {updated}</p>
      </header>
      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-32">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {sections.map((s) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="text-slate-600 hover:text-primary-700">
                    {s.title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <article className="max-w-3xl">
          <p className="text-base leading-relaxed text-slate-700">{intro}</p>
          {sections.map((s) =>
          <section key={s.id} id={s.id} className="mt-8 scroll-mt-32">
              <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>
              {s.paragraphs.map((p, i) =>
            <p key={i} className="mt-3 text-sm leading-relaxed text-slate-700">
                  {p}
                </p>
            )}
            </section>
          )}
          <p className="mt-10 rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
            Questions about this document? Contact{' '}
            <a href={`mailto:${brand.supportEmail}`} className="font-medium text-primary-700 hover:underline">
              {brand.supportEmail}
            </a>
            .
          </p>
        </article>
      </div>
    </div>);

}