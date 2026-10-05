import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleCheckIcon, HeartHandshakeIcon, UsersIcon, WalletIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { aboutValues, team } from '../data/legal';
import { howItWorks, stats } from '../data/discover';
import { buttonStyles } from '../utils/styles';

const valueIcons = [<UsersIcon key="a" size={22} />, <HeartHandshakeIcon key="b" size={22} />, <WalletIcon key="c" size={22} />];

export function About() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">About {brand.name}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Making the move abroad feel like coming home.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              {brand.name} started when two former Erasmus students spent their first month abroad sleeping on sofas.
              Today we help thousands of students, interns and remote workers find a room they love — and the people
              they'll share it with.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-6">
              {stats.map((s) =>
              <div key={s.label}>
                  <dd className="text-3xl font-bold text-navy-900">{s.value}</dd>
                  <dt className="text-sm text-navy-500">{s.label}</dt>
                </div>
              )}
            </dl>
          </div>
          <img src={images.kitchen} alt="Shared kitchen in a flatshare" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-navy-900">What we believe</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {aboutValues.map((v, i) =>
          <div key={v.title} className="rounded-2xl border border-navy-100 bg-white p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-primary-800">{valueIcons[i]}</span>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{v.title}</h3>
              <p className="mt-2 text-navy-600">{v.text}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s, i) =>
            <li key={s.title} className="rounded-2xl bg-navy-800 p-6">
                <span className="text-sm font-bold text-primary-300">Step {i + 1}</span>
                <h3 className="mt-2 font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-200">{s.text}</p>
              </li>
            )}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-navy-900">The team</h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {team.map((m) =>
          <li key={m.name} className="flex flex-col items-center rounded-2xl border border-navy-100 bg-white p-6 text-center">
              <Avatar name={m.name} alt={m.name} size="xl" />
              <p className="mt-4 font-semibold text-navy-900">{m.name}</p>
              <p className="text-sm text-navy-500">{m.role}</p>
            </li>
          )}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary-400 p-8 sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Ready to find your next room?</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-navy-800">
              {['Free for renters', 'Verified landlords', 'No booking fees'].map((t) =>
              <li key={t} className="flex items-center gap-1.5">
                  <CircleCheckIcon size={16} /> {t}
                </li>
              )}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="large" className={buttonStyles.navy} onClick={() => navigate('/s')}>
              Browse rooms
            </Button>
            <Button size="large" className={buttonStyles.outline} onClick={() => navigate('/listings/new')}>
              List a room
            </Button>
          </div>
        </div>
      </section>
    </div>);

}