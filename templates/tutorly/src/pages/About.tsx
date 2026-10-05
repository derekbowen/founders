import React from 'react';
import { Link } from 'react-router-dom';
import { TargetIcon, SparklesIcon, HeartIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { platformStats, howItWorksSteps } from '../data/landing';
import { linkButton } from '../utils/buttonStyles';

const ABOUT_IMAGE = "/9e6e115c-e58c-492d-b9ff-a7466cd1e630.jpg";

const values = [
{ icon: TargetIcon, title: 'Outcomes over hours', text: 'We measure success by grades raised, exams passed and confidence gained.' },
{ icon: SparklesIcon, title: 'Great teaching is a craft', text: 'We celebrate tutors, pay them fairly and give them tools to do their best work.' },
{ icon: HeartIcon, title: 'Safety first', text: 'Vetting, background checks and parent controls are non-negotiable.' }];


export function AboutPage() {
  return (
    <div>
      <section className="bg-primary-50">
        <div className="mx-auto grid max-w-page items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-primary-700">About {brand.name}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">Every learner deserves a great teacher</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              {brand.name} started in 2019 when two former teachers saw how much one-on-one attention changed their
              students' lives — and how hard it was for families to find it. Today we connect thousands of learners
              with tutors who make hard things click.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/search" className={`${linkButton.base} ${linkButton.primary}`}>Find a tutor</Link>
              <Link to="/listings/new" className={`${linkButton.base} ${linkButton.secondary}`}>Become a tutor</Link>
            </div>
          </div>
          <img src={ABOUT_IMAGE} alt={`The ${brand.name} team collaborating`} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-16 sm:px-6">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {platformStats.map((s) =>
          <div key={s.label} className="rounded-2xl border border-ink-200 p-6 text-center">
              <dd className="text-3xl font-semibold text-primary-700">{s.value}</dd>
              <dt className="mt-1 text-sm text-ink-600">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>

      <section className="bg-ink-50">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900">What we believe</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map((v) =>
            <li key={v.title} className="rounded-2xl bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-300 text-ink-900">
                  <v.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{v.text}</p>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink-900">How {brand.name} works</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {howItWorksSteps.map((s, i) =>
          <li key={s.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 font-semibold text-white">{i + 1}</span>
              <div>
                <h3 className="font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.text}</p>
              </div>
            </li>
          )}
        </ol>
        <p className="mt-12 text-sm text-ink-600">
          Questions? Email us at <a href={`mailto:${brand.supportEmail}`} className="font-medium text-primary-700">{brand.supportEmail}</a>.
        </p>
      </section>
    </div>);

}