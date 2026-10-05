import React from 'react';

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: {title: string;body: string;}[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden self-start lg:sticky lg:top-24 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">On this page</p>
          <ul className="mt-3 space-y-1.5">
            {sections.map((s, i) =>
            <li key={s.title}>
                <a href={`#section-${i}`} className="block text-sm text-ink-600 hover:text-primary-700">{s.title}</a>
              </li>
            )}
          </ul>
        </nav>
        <article className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-ink-900">{title}</h1>
          <p className="mt-2 text-sm text-ink-600">Last updated {updated}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">{intro}</p>
          {sections.map((s, i) =>
          <section key={s.title} id={`section-${i}`} className="scroll-mt-24 border-t border-ink-200 py-6 first-of-type:mt-8">
              <h2 className="font-heading text-xl font-bold text-ink-900">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-700">{s.body}</p>
            </section>
          )}
        </article>
      </div>
    </div>);

}