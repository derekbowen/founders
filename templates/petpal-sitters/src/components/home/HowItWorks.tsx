import React from 'react';
import { CameraIcon, MessageCircleHeartIcon, SearchIcon } from 'lucide-react';
import { howItWorks } from '../../data/content';

const icons = [SearchIcon, MessageCircleHeartIcon, CameraIcon];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="how-heading">
      <div className="max-w-2xl">
        <p className="text-sm font-extrabold uppercase tracking-wider text-primary-700">How it works</p>
        <h2 id="how-heading" className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
          Book a sitter in three easy steps
        </h2>
      </div>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {howItWorks.map((step, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={step.title} className="relative rounded-3xl bg-white p-7 shadow-card ring-1 ring-stone-100">
              <span className="absolute right-6 top-6 text-5xl font-black text-primary-100" aria-hidden="true">
                {i + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-stone-900">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{step.text}</p>
            </li>);

        })}
      </ol>
    </section>);

}