import React from 'react';
import { brand } from '../data/brand';
import { privacySections, privacyUpdated, termsSections, termsUpdated } from '../data/legal';

interface LegalPageProps {
  kind: 'terms' | 'privacy';
}

export function LegalPage({ kind }: LegalPageProps) {
  const isTerms = kind === 'terms';
  const sections = isTerms ? termsSections : privacySections;
  const title = isTerms ? 'Terms of service' : 'Privacy policy';
  const updated = isTerms ? termsUpdated : privacyUpdated;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-extrabold uppercase tracking-wider text-primary-700">{brand.name} legal</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-stone-900">{title}</h1>
      <p className="mt-2 text-[15px] text-stone-500">Last updated {updated}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-extrabold uppercase tracking-wider text-stone-500">On this page</p>
          <ul className="mt-3 space-y-1 border-l-2 border-stone-200">
            {sections.map((s) =>
            <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-sm font-semibold text-stone-600 hover:border-primary-500 hover:text-stone-900">
                  {s.title}
                </a>
              </li>
            )}
          </ul>
        </nav>
        <article className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-stone-100 sm:p-10">
          {sections.map((s) =>
          <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-stone-100 py-6 first:pt-0 last:border-0 last:pb-0">
              <h2 className="text-xl font-extrabold text-stone-900">{s.title}</h2>
              {s.body.map((p) =>
            <p key={p} className="mt-3 text-[16px] leading-relaxed text-stone-700">
                  {p}
                </p>
            )}
            </section>
          )}
        </article>
      </div>
    </div>);

}