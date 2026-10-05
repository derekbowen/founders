import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CameraIcon, ShieldCheckIcon, UserCheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { safetyPoints } from '../../data/content';

const icons = [UserCheckIcon, CameraIcon, ShieldCheckIcon];

export function SafetyBand() {
  return (
    <section className="bg-accent-800 text-white" aria-labelledby="safety-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-700 px-3 py-1.5 text-sm font-extrabold text-accent-100">
            <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" /> The {brand.guaranteeName}
          </span>
          <h2 id="safety-heading" className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Safety and peace of mind, built in
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-accent-100">
            Every booking is covered from request to pick-up, so you can focus on your trip — not on worrying.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-extrabold text-primary-300 hover:text-primary-200">
            Learn how we keep pets safe <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-2">
          {safetyPoints.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={point.title} className="rounded-3xl bg-accent-700/60 p-6 ring-1 ring-white/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-400 text-stone-900">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">{point.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-accent-100">{point.text}</p>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}