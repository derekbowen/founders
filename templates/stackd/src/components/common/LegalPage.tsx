import React from 'react';
import { Link } from 'react-router-dom';
import type { LegalSection } from '../../types/marketplace';
import { brand } from '../../data/brand';
import { legalUpdatedAt } from '../../data/legal';
import { slugify } from '../../utils/format';

interface LegalPageProps {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">On this page</p>
            <ul className="space-y-2 text-sm">
              {sections.map((s) =>
              <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="text-ink/80 hover:text-brand-ink">
                    {s.heading}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-6 flex gap-3 border-t border-line pt-4 text-sm">
              <Link to="/terms" className="font-semibold hover:text-brand-ink">Terms</Link>
              <Link to="/privacy" className="font-semibold hover:text-brand-ink">Privacy</Link>
            </div>
          </nav>
        </aside>
        <article className="max-w-3xl">
          <p className="eyebrow mb-2">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated {legalUpdatedAt}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">{intro}</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) =>
            <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
                <h2 className="text-2xl font-bold">{s.heading}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-ink/85">
                  {s.body.map((p, i) =>
                <p key={i}>{p}</p>
                )}
                </div>
              </section>
            )}
          </div>
          <p className="mt-12 rounded-xl border border-ink bg-brand-soft p-5 text-sm">
            Questions about this policy? Email{' '}
            <a href={`mailto:${brand.supportEmail}`} className="link">
              {brand.supportEmail}
            </a>
            .
          </p>
        </article>
      </div>
    </div>);

}