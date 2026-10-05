import React from 'react';
import type { LegalSection } from '../data/legal';
import { ui, cx } from '../utils/styles';

export function LegalPage({ title, updated, sections }: {title: string;updated: string;sections: LegalSection[];}) {
  return (
    <div className={cx(ui.container, 'grid gap-10 py-14 lg:grid-cols-[220px_minmax(0,1fr)]')}>
      <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">On this page</p>
        <ul className="mt-3 space-y-2">
          {sections.map((s) =>
          <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-stone-600 hover:text-brand-700">{s.title}</a>
            </li>
          )}
        </ul>
      </nav>
      <article className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">{title}</h1>
        <p className="mt-2 text-sm text-stone-500">Last updated {updated}</p>
        <div className="mt-10 space-y-10">
          {sections.map((s) =>
          <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-stone-900">{s.title}</h2>
              {s.body.map((p, i) =>
            <p key={i} className="mt-3 leading-relaxed text-stone-700">{p}</p>
            )}
            </section>
          )}
        </div>
      </article>
    </div>);

}