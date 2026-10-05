import React from 'react';
import { brand } from '../../data/brand';
import { cn, containerClass } from '../../utils/styles';

interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

interface LegalDocumentProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <div className={cn(containerClass, 'py-12 lg:py-16')}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">Last updated {updated}</p>
        <h1 className="mt-2 font-heading text-5xl font-bold uppercase tracking-tight text-steel-900">{title}</h1>
        <p className="mt-4 text-lg text-steel-600">{intro}</p>
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-steel-500">On this page</p>
            <ul className="space-y-2 border-l border-steel-200">
              {sections.map((s) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-sm text-steel-600 hover:border-primary hover:text-steel-900">
                    {s.title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <article className="max-w-3xl space-y-10">
          {sections.map((s) =>
          <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-steel-900">{s.title}</h2>
              {s.body.map((p) =>
            <p key={p} className="mt-3 leading-relaxed text-steel-700">{p}</p>
            )}
            </section>
          )}
          <p className="rounded-xl bg-steel-50 p-5 text-sm text-steel-600">
            Questions? Contact <a href={`mailto:${brand.supportEmail}`} className="font-semibold text-primary hover:underline">{brand.supportEmail}</a>. {brand.legalEntity}.
          </p>
        </article>
      </div>
    </div>);

}