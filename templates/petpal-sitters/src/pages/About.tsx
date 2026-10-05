import React from 'react';
import { ArrowRightIcon, HeartHandshakeIcon, MapPinIcon, ShieldCheckIcon } from 'lucide-react';
import { SafetyBand } from '../components/home/SafetyBand';
import { ButtonLink } from '../components/ui/ButtonLink';
import { brand } from '../data/brand';
import { aboutStats, aboutValues } from '../data/content';
import { images } from '../data/images';

const valueIcons = [HeartHandshakeIcon, MapPinIcon, ShieldCheckIcon];

export function About() {
  return (
    <div className="w-full">
      <section className="bg-primary-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wider text-primary-700">About {brand.name}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight text-stone-900 sm:text-5xl">Neighbors caring for neighbors’ pets</h1>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              {brand.name} started in {brand.defaultCity} when two friends couldn’t find anyone they trusted to watch their dogs over the holidays. Today we connect thousands of
              pet parents with loving, vetted sitters right in their own neighborhoods.
            </p>
            <ButtonLink to="/s" size="lg" className="mt-8" rightIcon={<ArrowRightIcon className="h-5 w-5" />}>
              Find a sitter
            </ButtonLink>
          </div>
          <img src={images.sitterCta} alt="A sitter walking three dogs in a park" className="aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-lift" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {aboutStats.map((s) =>
          <div key={s.label} className="rounded-3xl bg-white p-6 text-center shadow-card ring-1 ring-stone-100">
              <dd className="text-4xl font-black text-primary-700">{s.value}</dd>
              <dt className="mt-1 text-sm font-bold text-stone-600">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-3xl font-black tracking-tight text-stone-900">
          What we believe
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {aboutValues.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <li key={v.title} className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-stone-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-stone-900">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{v.text}</p>
              </li>);

          })}
        </ul>
      </section>

      <SafetyBand />

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-black tracking-tight text-stone-900">Questions? We’re here to help.</h2>
        <p className="mt-3 text-[17px] text-stone-600">
          Email us at{' '}
          <a href={`mailto:${brand.supportEmail}`} className="font-bold text-primary-700 underline">
            {brand.supportEmail}
          </a>{' '}
          or call {brand.supportPhone}. Our pet-loving support team is available 24/7.
        </p>
      </section>
    </div>);

}