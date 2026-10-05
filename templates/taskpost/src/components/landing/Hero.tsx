import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, BriefcaseIcon, CheckCircle2Icon, ClipboardListIcon, StarIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';
import { brand } from '../../data/brand';
import { images } from '../../data/images';
import { useApp } from '../../hooks/useApp';
import { inputClass } from '../../utils/styles';

export function Hero() {
  const navigate = useNavigate();
  const { jobs } = useApp();
  const [task, setTask] = useState('');
  const openCount = jobs.filter((j) => j.status === 'open').length;

  function handlePost(e: React.FormEvent) {
    e.preventDefault();
    navigate(task.trim() ? `/post-job?title=${encodeURIComponent(task.trim())}` : '/post-job');
  }

  return (
    <section className="border-b border-ink-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800 ring-1 ring-inset ring-primary-200">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            The reverse marketplace for home jobs in {brand.city}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[56px]">
            Post a job. Get offers from local pros.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
            Describe what needs doing and set your budget. Vetted pros nearby send you offers — you compare,
            counter, and only pay when you’re happy.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <form
              onSubmit={handlePost}
              className="flex flex-col rounded-2xl border-2 border-primary-500 bg-primary-50/40 p-5"
              aria-labelledby="hero-customer">
              
              <div className="flex items-center gap-2">
                <ClipboardListIcon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                <h2 id="hero-customer" className="text-sm font-extrabold uppercase tracking-wide text-ink-900">
                  I need help
                </h2>
              </div>
              <label htmlFor="hero-task" className="sr-only">
                What needs doing?
              </label>
              <input
                id="hero-task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. Mount a TV, move a sofa…"
                className={`${inputClass} mt-3`} />
              
              <Button type="submit" className="mt-3" fullWidth rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
                Post a job — free
              </Button>
            </form>
            <div className="flex flex-col rounded-2xl border border-ink-200 bg-ink-50 p-5" aria-labelledby="hero-pro">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-ink-700" aria-hidden="true" />
                <h2 id="hero-pro" className="text-sm font-extrabold uppercase tracking-wide text-ink-900">
                  I’m a pro
                </h2>
              </div>
              <p className="mt-3 flex-1 text-sm text-ink-600">
                <span className="font-extrabold text-ink-900">{openCount} open jobs</span> posted near you this week.
                Set your price and send an offer in minutes.
              </p>
              <ButtonLink to="/search" variant="dark" className="mt-3" fullWidth rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
                Find work near you
              </ButtonLink>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
            { k: 'vetted local pros', v: brand.stats.pros },
            { k: 'average pro rating', v: `${brand.stats.avgRating} ★` },
            { k: 'median time to first offer', v: brand.stats.firstOffer }].
            map((s) =>
            <li key={s.k} className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-ink-900">{s.v}</span>
                <span className="text-ink-600">{s.k}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-ink-100">
            <img src={images.hero} alt="A pro assembling a shelf while the homeowner looks on" className="aspect-[4/3] w-full object-cover lg:aspect-[4/4.4]" />
          </div>
          <div className="absolute -left-3 top-6 w-64 rounded-2xl border border-ink-200 bg-white p-4 shadow-lift sm:-left-8">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-500">New offer</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-extrabold text-ink-900">Sam D.</p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-ink-700">
                <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                4.9 · 211 jobs
              </span>
            </div>
            <p className="mt-1 text-2xl font-extrabold text-ink-900">$180</p>
            <p className="text-xs text-ink-500">Mount 65" TV · available Sat</p>
          </div>
          <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl border border-ink-200 bg-white px-4 py-3 shadow-lift sm:right-8">
            <CheckCircle2Icon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-extrabold text-ink-900">Payment held safely</p>
              <p className="text-xs text-ink-500">Released when you confirm the job</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}