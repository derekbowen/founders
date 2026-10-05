import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { subjects } from '../../data/subjects';
import { tutors } from '../../data/tutors';

export function SubjectsGrid() {
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20" aria-labelledby="subjects-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="subjects-heading" className="text-3xl font-semibold tracking-tight text-ink-900">
            Explore subjects
          </h2>
          <p className="mt-2 text-ink-600">From first fractions to final exams — and every language in between.</p>
        </div>
        <Link to="/search" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800">
          Browse all tutors <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {subjects.map((s) => {
          const count = tutors.filter((t) => t.subjects.some((x) => x.subject === s.id)).length;
          return (
            <li key={s.id}>
              <Link
                to={`/search?subject=${s.id}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card">
                
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition group-hover:bg-primary-600 group-hover:text-white">
                  <s.icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">{s.name}</p>
                  <p className="mt-0.5 text-sm text-ink-600">{s.description}</p>
                </div>
                <p className="mt-auto text-xs font-medium text-ink-500">{count} tutors available</p>
              </Link>
            </li>);

        })}
        <li>
          <Link
            to="/search"
            className="flex h-full flex-col justify-between gap-3 rounded-2xl bg-accent-300 p-5 transition hover:bg-accent-200">
            
            <p className="text-lg font-semibold leading-snug text-ink-900">Not sure where to start?</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-ink-900">
              See every tutor <ArrowRightIcon size={16} aria-hidden="true" />
            </span>
          </Link>
        </li>
      </ul>
    </section>);

}