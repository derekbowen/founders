import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LeafIcon, HandshakeIcon, PiggyBankIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { howItWorks } from '../data/content';
import { ui, cx } from '../utils/styles';

const values = [
{ icon: PiggyBankIcon, title: 'Cheaper by design', text: 'No warehouses, no climate-controlled concrete to amortize. Neighbors set fair prices — usually 30–50% below facilities.' },
{ icon: LeafIcon, title: 'Use what already exists', text: 'Millions of square feet sit empty in garages and basements. We help it get used instead of building more.' },
{ icon: HandshakeIcon, title: 'Built on trust', text: 'Verified identities, two-way reviews, protection on every booking, and payments held until move-in.' }];


const stats = [
{ value: '12,400+', label: 'Storers' },
{ value: '2,100', label: 'Spaces listed' },
{ value: '$3.1M', label: 'Paid to hosts' },
{ value: '4.9★', label: 'Average rating' }];


export function About() {
  return (
    <>
      <section className="bg-sand-50">
        <div className={cx(ui.container, 'grid gap-10 py-16 lg:grid-cols-2 lg:items-center')}>
          <div>
            <p className={ui.eyebrow}>About {brand.name}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">Storage should be as close as your neighbor’s garage</h1>
            <p className="mt-5 max-w-lg text-lg text-stone-700">{brand.description} Founded in {brand.homeCity} in 2022.</p>
          </div>
          <img src={images.detail} alt="Labeled boxes neatly stacked on shelving" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section className="border-b border-stone-200 py-12">
        <dl className={cx(ui.container, 'grid grid-cols-2 gap-6 md:grid-cols-4')}>
          {stats.map((s) =>
          <div key={s.label}>
              <dt className="text-sm text-stone-600">{s.label}</dt>
              <dd className="text-3xl font-bold text-brand-700">{s.value}</dd>
            </div>
          )}
        </dl>
      </section>

      <section className="py-20">
        <div className={ui.container}>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">What we believe</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) =>
            <div key={v.title} className={cx(ui.card, 'p-6')}>
                <v.icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-stone-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{v.text}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20">
        <div className={ui.container}>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">How it works</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorks.map((s, i) =>
            <li key={s.title} className="rounded-2xl bg-white p-6 shadow-soft">
                <span className="text-sm font-bold text-sand-600">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-stone-900">{s.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{s.text}</p>
              </li>
            )}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/s" className={ui.linkBrand}>Find storage</Link>
            <Link to="/listings/new" className={ui.linkOutline}>Rent out your space</Link>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-20">
        <div className={cx(ui.container, 'max-w-3xl text-center')}>
          <MailIcon className="mx-auto h-8 w-8 text-brand-600" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">Get in touch</h2>
          <p className="mt-3 text-stone-600">Questions about a booking, hosting, or partnerships? We reply within one business day.</p>
          <a href={`mailto:${brand.supportEmail}`} className={cx(ui.linkBrand, 'mt-6')}>{brand.supportEmail}</a>
        </div>
      </section>
    </>);

}