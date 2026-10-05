import React from 'react';
import { HandshakeIcon, PackageIcon, ShieldCheckIcon, TrendingUpIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { brand } from '../data/brand';
import { sellerSteps } from '../data/landing';

const principles = [
{ icon: HandshakeIcon, title: 'Independent first', body: 'Every brand is independently owned. No mass-market conglomerates, no private labels competing with our sellers.' },
{ icon: PackageIcon, title: 'Built around the case', body: 'Case packs, minimums and tiered pricing are first-class — the way wholesale actually works.' },
{ icon: ShieldCheckIcon, title: 'Risk off small shops', body: 'Free first-order returns and buyer protection so trying a new line never sinks your month.' },
{ icon: TrendingUpIcon, title: 'Fair economics', body: `Brands keep ${100 - parseInt(brand.sellerCommission, 10)}% of every order. No listing fees, no monthly subscriptions.` }];


const retailerSteps = [
{ id: 'find', title: 'Discover brands', body: 'Search by category, margin, minimum order and values like organic or women-owned.' },
{ id: 'order', title: 'Order by the case', body: 'Mix brands in one checkout. Tier discounts apply automatically as you add cases.' },
{ id: 'receive', title: 'Receive & restock', body: 'Track every shipment in your inbox and reorder in two clicks.' }];


export function About() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">About {brand.name}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              We help independent brands and shops grow together.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {brand.name} started in 2023 when a café owner and a granola maker got tired of spreadsheets, PDF line sheets and
              chasing invoices. Today {brand.stats.retailers} retailers buy from {brand.stats.brands} brands on a marketplace built
              for how wholesale actually works.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/search">Start buying</ButtonLink>
              <ButtonLink to="/sell/new" variant="secondary">
                Sell on {brand.name}
              </ButtonLink>
            </div>
          </div>
          <img
            src="/9fda55a7-0d10-4065-bd4d-9231d69384b5.jpg"
            alt="Two small business owners unpacking a wholesale case in their studio"
            className="aspect-video w-full rounded-2xl object-cover" />
          
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What we believe</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) =>
          <div key={p.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
          {[
          { title: 'How it works for retailers', steps: retailerSteps },
          { title: 'How it works for brands', steps: sellerSteps }].
          map((group) =>
          <div key={group.title}>
              <h2 className="text-xl font-semibold">{group.title}</h2>
              <ol className="mt-6 space-y-5">
                {group.steps.map((s, i) =>
              <li key={s.id} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-400 text-sm font-bold text-primary-950">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="mt-0.5 text-sm text-primary-200">{s.body}</p>
                    </div>
                  </li>
              )}
              </ol>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <dl className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
          {[
          { label: 'Retailers ordering', value: brand.stats.retailers },
          { label: 'Independent brands', value: brand.stats.brands },
          { label: 'Average retailer margin', value: brand.stats.averageMargin }].
          map((s) =>
          <div key={s.label} className="bg-white p-6 text-center">
              <dt className="text-sm text-slate-500">{s.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums text-primary-900">{s.value}</dd>
            </div>
          )}
        </dl>
      </section>
    </div>);

}