import React from 'react';
import { BikeIcon, BusIcon, MapPinIcon, TrainFrontIcon, TrainFrontTunnelIcon, TramFrontIcon } from 'lucide-react';
import { LocationMap } from '../map/LocationMap';
import type { Listing, TransitType } from '../../types/listing';

const transitIcons: Record<TransitType, React.ReactNode> = {
  metro: <TrainFrontTunnelIcon size={16} />,
  tram: <TramFrontIcon size={16} />,
  bus: <BusIcon size={16} />,
  train: <TrainFrontIcon size={16} />,
  bike: <BikeIcon size={16} />
};

export function NeighborhoodSection({ listing }: {listing: Listing;}) {
  return (
    <div className="space-y-5">
      <p className="flex items-start gap-2 text-navy-700">
        <MapPinIcon size={18} className="mt-0.5 shrink-0 text-primary-700" aria-hidden />
        <span>
          <span className="font-semibold text-navy-900">
            {listing.neighborhood}, {listing.city}.
          </span>{' '}
          {listing.neighborhoodInfo}
        </span>
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {listing.transit.map((t) =>
        <li key={t.name} className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-900 text-primary-300">
              {transitIcons[t.type]}
            </span>
            <span className="flex-1 text-sm text-navy-800">{t.name}</span>
            <span className="text-sm font-semibold text-navy-900">{t.minutes} min</span>
          </li>
        )}
      </ul>
      <div className="h-72 overflow-hidden rounded-2xl border border-navy-100">
        <LocationMap lat={listing.lat} lng={listing.lng} />
      </div>
      <p className="text-xs text-navy-500">Exact address is shared by the landlord after you connect.</p>
    </div>);

}