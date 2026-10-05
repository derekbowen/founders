import React from 'react';
import { Link } from 'react-router-dom';
import { LegalSection } from '../data/legal';
import { brand } from '../data/brand';
import { formatDate } from '../utils/format';

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Legal" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex gap-2 text-sm lg:flex-col lg:gap-1">
            {[
            { to: '/terms', label: 'Terms of service' },
            { to: '/privacy', label: 'Privacy policy' }].
            map((l) =>
            <li key={l.to}>
                <Link to={l.to} className={`block rounded-lg px-3 py-2 font-semibold ${l.label.toLowerCase().startsWith(title.toLowerCase().split(' ')[0]) ? 'bg-white text-primary-700 ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white'}`}>
                  {l.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated {formatDate(updated, 'MMMM d, yyyy')}</p>
          <p className="mt-6 text-[15px] leading-relaxed text-slate-700">{intro}</p>
          <div className="mt-8 space-y-8">
            {sections.map((s) =>
            <section key={s.heading}>
                <h2 className="text-lg font-bold text-slate-900">{s.heading}</h2>
                <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-slate-600">
                  {s.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
                </div>
              </section>
            )}
          </div>
          <p className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-500">
            Questions? Contact <a href={`mailto:${brand.supportEmail}`} className="font-semibold text-primary-700 hover:text-primary-800">{brand.supportEmail}</a>.
          </p>
        </article>
      </div>
    </div>);

}