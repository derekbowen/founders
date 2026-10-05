import React from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon, HeartHandshakeIcon, PercentIcon, ZapIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { creators } from '../data/creators';

const stats = [
{ value: '4,800+', label: 'Independent creators' },
{ value: '240k', label: 'Files downloaded' },
{ value: `${Math.round(brand.commissionRate * 100)}%`, label: 'Flat fee, nothing else' },
{ value: '2 sec', label: 'Average time to download' }];


const values = [
{ icon: ZapIcon, title: 'Instant, always', body: 'Pay once and your files unlock immediately. No waiting, no shipping, no subscriptions.' },
{ icon: HeartHandshakeIcon, title: 'Creators first', body: 'Creators own their work, set their prices and keep 90% of every sale.' },
{ icon: DownloadIcon, title: 'Yours forever', body: 'Everything you buy lives in your library. Re-download on any device, any time.' },
{ icon: PercentIcon, title: 'Honest pricing', body: 'Fixed prices or pay-what-you-want. Free products are welcome too.' }];


export function About() {
  return (
    <div>
      <section className="border-b border-ink">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-3">About {brand.name}</p>
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              A shop for the things people <span className="bg-brand px-2">make</span>.
            </h1>
          </div>
          <p className="text-lg text-muted">
            {brand.name} started in 2024 as a weekend project between a planner designer and a spreadsheet nerd who were tired of clunky storefronts.
            Today it’s where thousands of independent creators sell e-books, printables, templates, photos and sounds — and where buyers get them in seconds.
          </p>
        </div>
      </section>

      <section className="border-b border-ink bg-brand">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) =>
          <div key={s.label}>
              <p className="font-display text-4xl font-bold md:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-ink/80">{s.label}</p>
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">What we believe</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, body }) =>
          <div key={title} className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-ink bg-brand-soft">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{body}</p>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-ink bg-paper py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">For buyers</p>
              <ol className="mt-4 space-y-3 text-sm">
                {['Search or browse by category.', 'Preview pages and check the license.', 'Pay once — or name your price.', 'Download instantly. Find it again in your library.'].map((t, i) =>
                <li key={t} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">{i + 1}</span>
                    {t}
                  </li>
                )}
              </ol>
            </div>
            <div className="card p-6 md:p-8">
              <p className="eyebrow">For creators</p>
              <ol className="mt-4 space-y-3 text-sm">
                {['Create a listing and upload your files.', 'Set a price, license and cover.', 'Share your link — we handle checkout & delivery.', 'Get paid weekly to your bank.'].map((t, i) =>
                <li key={t} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold">{i + 1}</span>
                    {t}
                  </li>
                )}
              </ol>
              <Link to="/listings/new" className="btn btn-accent mt-6">
                Start selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Some of our creators</h2>
        <div className="flex flex-wrap gap-3">
          {creators.map((c) =>
          <Link key={c.id} to={`/u/${c.id}`} className="card card-hover flex items-center gap-3 py-2 pl-2 pr-4">
              <img src={c.avatar} alt="" className="h-10 w-10 rounded-full border border-ink object-cover" />
              <span>
                <span className="block text-sm font-semibold">{c.name}</span>
                <span className="block text-xs text-muted">{c.headline}</span>
              </span>
            </Link>
          )}
        </div>
      </section>
    </div>);

}