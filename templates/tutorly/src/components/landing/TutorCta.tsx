import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { linkButton } from '../../utils/buttonStyles';

const perks = ['Set your own hourly rate', 'Teach from anywhere, on your schedule', 'Weekly payouts, zero admin'];

export function TutorCta() {
  return (
    <section className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
      <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-accent-300 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Share what you know. Earn on your terms.
          </h2>
          <p className="mt-3 max-w-xl text-ink-800">
            Join 4,800+ tutors teaching on {brand.name}. Create your profile in about 15 minutes — we'll bring the
            students.
          </p>
          <ul className="mt-6 space-y-2">
            {perks.map((p) =>
            <li key={p} className="flex items-center gap-2 text-ink-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-accent-300">
                  <CheckIcon size={12} aria-hidden="true" />
                </span>
                {p}
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
          <Link to="/listings/new" className={`${linkButton.base} bg-ink-900 text-white hover:bg-ink-800 focus-visible:ring-ink-900`}>
            Become a tutor
          </Link>
          <Link to="/about" className={`${linkButton.base} border border-ink-900/20 bg-white/60 text-ink-900 hover:bg-white`}>
            Learn how it works
          </Link>
        </div>
      </div>
    </section>);

}