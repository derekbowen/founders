import React from 'react';
import { Link } from 'react-router-dom';
import { GiftIcon } from 'lucide-react';
import { giftGuides } from '../../data/giftGuides';

export function GiftGuides() {
  return (
    <section className="bg-accent-soft py-16">
      <div className="container-page">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-ink text-white">
            <GiftIcon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-ink">Gift guides</h2>
            <p className="text-sm text-accent-ink">Hand-picked by our team, made by hand by our makers.</p>
          </div>
        </div>
        <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {giftGuides.map((g) =>
          <li key={g.id} className="w-64 shrink-0 snap-start sm:w-auto">
              <Link to={g.to} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
                <img src={g.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-x-0 bottom-0 bg-ink/55 p-4 backdrop-blur-[2px]">
                  <h3 className="text-xl font-medium text-white">{g.title}</h3>
                  <p className="text-xs text-white/85">{g.subtitle}</p>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>);

}