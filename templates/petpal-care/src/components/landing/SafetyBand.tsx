import React from 'react';
import { CameraIcon, ShieldCheckIcon, UserCheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { safetyFeatures } from '../../data/landing';

const icons = [UserCheckIcon, CameraIcon, ShieldCheckIcon];

export function SafetyBand() {
  return (
    <section className="bg-accent-800 py-16 text-white lg:py-20" aria-labelledby="safety-heading">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-accent-200">The {brand.name} guarantee</p>
          <h2 id="safety-heading" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Peace of mind on every booking
          </h2>
          <p className="mt-4 text-accent-100">Safety isn’t an add-on. Every stay booked here includes these protections at no extra cost.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {safetyFeatures.map((f, i) => {
            const Icon = icons[i];
            return (
              <li key={f.title} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500 text-ink-900">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-accent-100">{f.text}</p>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}