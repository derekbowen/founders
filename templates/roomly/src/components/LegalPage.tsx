import React from 'react';
import { brand } from '../data/brand';

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: {title: string;body: string;}[];
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Legal</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-navy-900">{title}</h1>
      <p className="mt-2 text-sm text-navy-500">Last updated {updated}</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 space-y-1 border-l border-navy-100">
            {sections.map((s) =>
            <li key={s.title}>
                <a
                href={`#${slug(s.title)}`}
                className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-navy-600 transition hover:border-primary-500 hover:text-navy-900">
                
                  {s.title}
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-navy-700">{intro}</p>
          {sections.map((s) =>
          <section key={s.title} id={slug(s.title)} className="scroll-mt-28 border-t border-navy-100 py-8 first-of-type:mt-8">
              <h2 className="text-xl font-semibold text-navy-900">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-navy-700">{s.body}</p>
            </section>
          )}
          <p className="mt-4 rounded-2xl bg-primary-50 p-5 text-sm text-navy-700">
            Questions? Contact us at{' '}
            <a href={`mailto:${brand.supportEmail}`} className="font-semibold text-primary-700 underline">
              {brand.supportEmail}
            </a>
            . {brand.companyName}, {brand.companyAddress}.
          </p>
        </div>
      </div>
    </div>);

}