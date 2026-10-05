import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, StarIcon, VideoIcon } from 'lucide-react';
import { Select } from '../Select';
import { Button } from '../Button';
import { AvatarGroup } from '../Avatar';
import { brand } from '../../data/brand';
import { levels, subjects } from '../../data/subjects';
import { tutors } from '../../data/tutors';
import { brandButton } from '../../utils/buttonStyles';

const HERO_IMAGE = "/94bcca52-c51e-4377-aa55-5b80f63d0722.jpg";


const popularSearches = ['SAT Math', 'Spanish', 'Calculus', 'Python', 'Chemistry'];

export function HeroSection() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (level) params.set('level', level);
    navigate(`/search${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <section className="relative overflow-hidden bg-primary-50">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-200/60" aria-hidden="true" />
      <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-primary-800 shadow-card">
            <span className="h-2 w-2 rounded-full bg-accent-400" aria-hidden="true" /> 1-on-1 online lessons, by the hour
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Learn faster with the{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">right tutor</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-accent-300 sm:h-4" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">
            Vetted experts for school subjects, test prep and languages. Book an hour that fits your week and meet over
            video in minutes.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 rounded-2xl bg-white p-3 shadow-lift sm:p-4" aria-label="Find a tutor">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Select
                label="Subject"
                placeholder="Any subject"
                options={subjects.map((s) => ({ value: s.id, label: s.name }))}
                onChange={(v) => setSubject(v as string)} />
              
              <Select
                label="Level"
                placeholder="Any level"
                options={levels.map((l) => ({ value: l.id, label: l.name }))}
                onChange={(v) => setLevel(v as string)} />
              
              <Button type="submit" size="large" leftIcon={<SearchIcon size={18} />} className={brandButton.primary}>
                Find tutors
              </Button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-ink-500">Popular:</span>
            {popularSearches.map((q) =>
            <Link
              key={q}
              to={`/search?q=${encodeURIComponent(q)}`}
              className="rounded-full border border-primary-200 bg-white px-3 py-1 text-ink-700 transition hover:border-primary-400 hover:text-primary-700">
              
                {q}
              </Link>
            )}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <AvatarGroup
              max={4}
              size="sm"
              avatars={tutors.slice(0, 5).map((t) => ({ name: t.name, alt: t.name, src: t.photo }))} />
            
            <p className="text-sm text-ink-600">
              <span className="font-semibold text-ink-900">4.9/5</span> from 38,000+ parents & students on {brand.name}
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-lift">
            <img src={HERO_IMAGE} alt="Student smiling during an online tutoring lesson" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -left-4 bottom-6 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-lift sm:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
              <VideoIcon size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-ink-500">Next lesson · Today, 4:00 PM</p>
              <p className="text-sm font-semibold text-ink-900">AP Calculus with Maya</p>
            </div>
          </div>
          <div className="absolute -top-4 right-4 flex items-center gap-2 rounded-2xl bg-accent-300 px-3 py-2 shadow-lift">
            <StarIcon size={16} className="fill-ink-900 text-ink-900" aria-hidden="true" />
            <p className="text-sm font-semibold text-ink-900">+200 pts avg. SAT gain</p>
          </div>
        </div>
      </div>
    </section>);

}