import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../data/brand';
import { listings } from '../data/listings';
import { btn, eyebrow } from '../utils/styles';

const values = [
{ title: 'Circular by design', text: 'The average occasion dress is worn 1.7 times. On Dressly, it’s worn 20+. Every rental keeps a dress out of landfill.' },
{ title: 'Real closets, real people', text: 'Every dress belongs to a member — a stylist in Brooklyn, a lawyer in Austin, a costume designer in LA.' },
{ title: 'Care built in', text: 'Professional cleaning and damage protection on every rental, so lenders lend with confidence and renters relax.' }];


export function About() {
  return (
    <div>
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <p className={eyebrow}>About {brand.name}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] md:text-7xl">
          The world’s most beautiful closet is <em className="text-accent-dark">shared.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {brand.name} started with a simple frustration: a closet full of gowns worn once, and a calendar full of
          weddings asking for something new. So we built a place where the two could meet.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-1 md:grid-cols-4" aria-hidden="true">
        {listings.slice(0, 4).map((l) =>
        <img key={l.id} src={l.image} alt="" className="aspect-[3/4] w-full object-cover" />
        )}
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-3 md:px-8 md:py-24">
        {values.map((v, i) =>
        <div key={v.title} className="border-t border-ink pt-6">
            <span className="font-display text-4xl italic text-accent">0{i + 1}</span>
            <h2 className="mt-4 font-display text-3xl">{v.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
          </div>
        )}
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-16 text-center md:grid-cols-4 md:px-8">
          {[
          ['48k', 'Members'],
          ['12k+', 'Designer pieces'],
          ['$3.1M', 'Earned by lenders'],
          ['210t', 'CO₂ saved']].
          map(([v, k]) =>
          <div key={k}>
              <p className="font-display text-5xl">{v}</p>
              <p className="mt-2 text-xs uppercase tracking-eyebrow text-muted">{k}</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:py-28">
        <h2 className="font-display text-4xl md:text-5xl">Ready for your next RSVP?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/s" className={btn('primary', 'lg')}>Browse dresses</Link>
          <Link to="/l/new" className={btn('outline', 'lg')}>Lend your wardrobe</Link>
        </div>
        <p className="mt-8 text-sm text-muted">
          Press & partnerships: <a href={`mailto:${brand.supportEmail}`} className="text-ink underline">{brand.supportEmail}</a>
        </p>
      </section>
    </div>);

}