import React from 'react';
import { brand } from '../../data/brand';

interface LegalPageProps {
  title: string;
  updated: string;
  sections: {id: string;title: string;body: string;}[];
}

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <div className="container-page py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-subtle">On this page</p>
            <ul className="space-y-2 text-sm">
              {sections.map((s) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-muted hover:text-ink">{s.title}</a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <article className="max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-ink-muted">Last updated {updated} · {brand.legalName}</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) =>
            <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-sans text-xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
              </section>
            )}
          </div>
          <p className="mt-12 rounded-xl bg-mist p-5 text-sm text-ink-muted">
            Questions about this policy? Email <a className="link" href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.
          </p>
        </article>
      </div>
    </div>);

}