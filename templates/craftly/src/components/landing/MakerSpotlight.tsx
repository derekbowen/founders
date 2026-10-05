import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { stories } from '../../data/stories';
import { useListings } from '../../contexts/ListingsContext';
import { SectionHeader } from '../ui/SectionHeader';

export function MakerSpotlight() {
  const { getMaker } = useListings();
  return (
    <section className="border-y border-line bg-surface py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="Maker spotlight"
          title="The hands behind the goods"
          description="Stories from the studios, kilns and workshops that make this marketplace." />
        
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((s, i) => {
            const maker = getMaker(s.makerId);
            if (!maker) return null;
            return (
              <article key={s.id} className={`group ${i === 0 ? 'md:col-span-1' : ''}`}>
                <Link to={`/shop/${maker.id}`} className="block rounded-2xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-subtle">
                    <img src={maker.portrait} alt={`${maker.ownerName} at work in the ${maker.shopName} studio`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-surface/95 px-3 py-1.5 text-xs font-medium text-ink">
                      {maker.shopName} · {maker.location}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-medium text-muted">{s.readTime}</p>
                  <h3 className="mt-1 flex items-start justify-between gap-3 text-2xl font-medium leading-snug text-ink group-hover:text-primary-ink">
                    {s.title}
                    <ArrowUpRightIcon className="mt-1.5 h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.excerpt}</p>
                </Link>
              </article>);

          })}
        </div>
      </div>
    </section>);

}