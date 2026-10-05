import React from 'react';
import { CameraIcon, MessageCircleHeartIcon, SearchIcon } from 'lucide-react';
import { howItWorks } from '../../data/landing';

const icons = [SearchIcon, MessageCircleHeartIcon, CameraIcon];

export function HowItWorks() {
  return (
    <section className="container-page py-16 lg:py-24" aria-labelledby="how-heading">
      <div className="max-w-2xl">
        <p className="eyebrow">How it works</p>
        <h2 id="how-heading" className="mt-2 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">
          Book a sitter in three easy steps
        </h2>
      </div>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {howItWorks.map((step, i) => {
          const Icon = icons[i];
          return (
            <li key={step.title} className="card relative p-6">
              <span className="absolute right-5 top-5 text-5xl font-black text-ink-100" aria-hidden="true">
                {i + 1}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
            </li>);

        })}
      </ol>
    </section>);

}