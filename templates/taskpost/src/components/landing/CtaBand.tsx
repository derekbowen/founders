import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-primary-600 p-8 text-white sm:p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Got a job on your list?</h2>
          <p className="mt-3 max-w-md text-primary-50">
            Post it in two minutes and get your first offers today. No fees until you hire.
          </p>
          <ButtonLink
            to="/post-job"
            variant="secondary"
            className="mt-6 border-transparent"
            rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
            
            Post a job
          </ButtonLink>
        </div>
        <div className="rounded-3xl border border-ink-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">Are you a local pro?</h2>
          <p className="mt-3 max-w-md text-ink-600">
            Skip the bidding wars on lead sites. Pick the jobs you want and set your own price.
          </p>
          <ButtonLink to="/signup" variant="dark" className="mt-6" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
            Join as a pro
          </ButtonLink>
        </div>
      </div>
    </section>);

}