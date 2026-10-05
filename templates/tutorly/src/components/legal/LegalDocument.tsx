import React from 'react';
import { Link } from 'react-router-dom';

interface LegalDocumentProps {
  title: string;
  updated: string;
  intro: string;
  sections: {heading: string;body: string;}[];
}

export function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className="bg-white">
      <div className="border-b border-ink-200 bg-primary-50">
        <div className="mx-auto max-w-page px-4 py-12 sm:px-6">
          <p className="text-sm font-medium text-primary-700">Legal</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight text-ink-900">{title}</h1>
          <p className="mt-2 text-sm text-ink-600">Last updated {updated}</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">On this page</p>
            <ul className="mt-3 space-y-2 text-sm">
              {sections.map((s) =>
              <li key={s.heading}>
                  <a href={`#${slug(s.heading)}`} className="text-ink-600 hover:text-primary-700">{s.heading}</a>
                </li>
              )}
            </ul>
            <p className="mt-6 text-sm text-ink-600">
              See also: <Link to={title.includes('Terms') ? '/privacy' : '/terms'} className="font-medium text-primary-700">{title.includes('Terms') ? 'Privacy Policy' : 'Terms of Service'}</Link>
            </p>
          </div>
        </nav>
        <article className="max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-700">{intro}</p>
          {sections.map((s) =>
          <section key={s.heading} id={slug(s.heading)} className="scroll-mt-24 pt-8">
              <h2 className="text-xl font-semibold text-ink-900">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-ink-700">{s.body}</p>
            </section>
          )}
        </article>
      </div>
    </div>);

}