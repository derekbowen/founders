import React from 'react';
import { brand } from '../../data/brand';

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: {id: string;title: string;body: string;}[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="container-page py-12 lg:py-16">
      <header className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-ink-900">{title}</h1>
        <p className="mt-2 text-sm font-semibold text-ink-600">Last updated {updated}</p>
        <p className="mt-5 leading-relaxed text-ink-700">{intro.replace('{brand}', brand.name)}</p>
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-extrabold uppercase tracking-wider text-ink-500">On this page</p>
            <ul className="mt-3 space-y-1">
              {sections.map((s) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded-xl px-3 py-1.5 text-sm font-semibold text-ink-600 transition hover:bg-white hover:text-ink-900">
                    {s.title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div className="card max-w-3xl divide-y divide-ink-100 p-6 sm:p-10">
          {sections.map((s) =>
          <section key={s.id} id={s.id} className="scroll-mt-24 py-6 first:pt-0 last:pb-0">
              <h2 className="text-lg font-extrabold text-ink-900">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-700">{s.body}</p>
            </section>
          )}
        </div>
      </div>
    </div>);

}