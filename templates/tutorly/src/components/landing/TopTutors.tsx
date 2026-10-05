import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { TutorCard } from '../tutors/TutorCard';
import { tutors } from '../../data/tutors';

export function TopTutors() {
  const featured = tutors.filter((t) => t.featured).slice(0, 8);
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20" aria-labelledby="top-tutors-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="top-tutors-heading" className="text-3xl font-semibold tracking-tight text-ink-900">
            Top-rated tutors this month
          </h2>
          <p className="mt-2 text-ink-600">Loved by students and parents for results and reliability.</p>
        </div>
        <Link to="/search?sort=rating" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800">
          See all tutors <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((t) =>
        <TutorCard key={t.id} tutor={t} />
        )}
      </div>
    </section>);

}