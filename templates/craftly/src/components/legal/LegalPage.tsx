import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-32">
            <p className="eyebrow">On this page</p>
            <ul className="mt-4 space-y-2 border-l border-line">
              {sections.map((s) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted hover:border-primary hover:text-ink">
                    {s.title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <article className="max-w-2xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
          <p className="mt-8 text-lg leading-relaxed text-ink/90">{intro}</p>
          {sections.map((s, i) =>
          <section key={s.id} id={s.id} className="scroll-mt-32 border-t border-line pt-8 mt-8">
              <h2 className="text-2xl font-medium">
                <span className="mr-2 font-sans text-sm text-muted">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">{s.body}</p>
            </section>
          )}
          <p className="mt-12 rounded-2xl bg-subtle p-5 text-sm text-muted">
            Have a question? Contact <a href={`mailto:${brand.supportEmail}`} className="font-medium text-primary-ink hover:underline">{brand.supportEmail}</a> or read our{' '}
            <Link to={title.includes('Privacy') ? '/terms' : '/privacy'} className="font-medium text-primary-ink hover:underline">
              {title.includes('Privacy') ? 'Terms of Service' : 'Privacy Policy'}
            </Link>
            .
          </p>
        </article>
      </div>
    </div>);

}