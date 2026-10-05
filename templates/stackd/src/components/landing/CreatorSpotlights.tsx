import React from 'react';
import { Link } from 'react-router-dom';
import { creators } from '../../data/creators';
import { useStore } from '../../contexts/StoreContext';
import { formatCompact } from '../../utils/format';

const spotlightIds = ['kai', 'priya', 'theo'];

export function CreatorSpotlights() {
  const { listings } = useStore();
  const spotlight = creators.filter((c) => spotlightIds.includes(c.id));

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {spotlight.map((creator) => {
        const products = listings.filter((l) => l.creatorId === creator.id);
        const sales = products.reduce((sum, l) => sum + l.sales, 0);
        return (
          <Link key={creator.id} to={`/u/${creator.id}`} className="card card-hover group flex flex-col overflow-hidden">
            <div className="relative h-24 border-b border-ink" style={{ backgroundColor: creator.tint }}>
              <img
                src={creator.avatar}
                alt=""
                className="absolute -bottom-8 left-5 h-16 w-16 rounded-full border-2 border-ink object-cover" />
              
            </div>
            <div className="flex flex-1 flex-col p-5 pt-10">
              <p className="font-display text-xl font-bold">{creator.name}</p>
              <p className="text-sm text-muted">{creator.headline}</p>
              <div className="mt-3 flex gap-4 text-sm">
                <span>
                  <strong>{formatCompact(sales)}</strong> <span className="text-muted">sales</span>
                </span>
                <span>
                  <strong>{formatCompact(creator.followers)}</strong> <span className="text-muted">followers</span>
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {products.slice(0, 3).map((p) =>
                <img key={p.id} src={p.cover} alt="" className="aspect-square rounded-lg border border-ink/20 object-cover" />
                )}
              </div>
              <span className="mt-5 text-sm font-semibold group-hover:text-brand-ink">Visit shop →</span>
            </div>
          </Link>);

      })}
    </div>);

}