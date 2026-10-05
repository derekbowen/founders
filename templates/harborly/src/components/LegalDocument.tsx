import React from 'react';
import { brand } from '../data/brand';
import { formatDate } from '../utils/format';

interface LegalDocumentProps {
  title: string;
  updated: string;
  intro: string;
  sections: {id: string;title: string;body: string;}[];
}

export function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-16">
        <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">On this page</p>
          <ul className="mt-4 space-y-2 text-sm">
            {sections.map((s) =>
            <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink/80 hover:text-navy hover:underline">
                  {s.title}
                </a>
              </li>
            )}
          </ul>
        </nav>
        <article className="max-w-3xl">
          <h1 className="font-heading text-4xl text-navy sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Last updated {formatDate(updated, 'MMMM d, yyyy')}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">{intro}</p>
          {sections.map((s) =>
          <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-line pt-8 mt-8">
              <h2 className="font-heading text-2xl text-navy">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-ink/85">{s.body}</p>
            </section>
          )}
          <p className="mt-12 rounded-2xl bg-sand-light p-5 text-sm text-ink/80">
            Questions about this document? Contact {brand.legalName} at{' '}
            <a href={`mailto:${brand.supportEmail}`} className="font-semibold underline underline-offset-2">
              {brand.supportEmail}
            </a>
            .
          </p>
        </article>
      </div>
    </div>);

}