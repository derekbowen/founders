import React from 'react';
import { brand } from '../../data/brand';
import { LegalSection } from '../../types/marketplace';

interface LegalPageProps {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, intro, updated, sections }: LegalPageProps) {
  return (
    <div className="container-page py-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="eyebrow mb-3">On this page</p>
            <ul className="space-y-2 text-sm">
              {sections.map((s, i) =>
              <li key={s.heading}>
                  <a href={`#section-${i}`} className="text-slate-600 hover:text-brand">{s.heading}</a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <article className="card max-w-3xl p-6 sm:p-10">
          <p className="eyebrow">Legal</p>
          <h1 className="heading-lg mt-2">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated {updated}</p>
          <p className="mt-6 leading-relaxed text-slate-700">{intro}</p>
          {sections.map((s, i) =>
          <section key={s.heading} id={`section-${i}`} className="mt-8 scroll-mt-24">
              <h2 className="font-display text-2xl font-bold uppercase">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-slate-700">{s.body}</p>
            </section>
          )}
          <p className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-600">
            Questions? Contact <a href={`mailto:${brand.supportEmail}`} className="font-semibold text-brand hover:underline">{brand.supportEmail}</a>.
          </p>
        </article>
      </div>
    </div>);

}