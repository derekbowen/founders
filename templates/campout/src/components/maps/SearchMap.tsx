import React, { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Listing } from '../../types/listing';
import { formatMoney } from '../../utils/currency';

interface SearchMapProps {
  listings: Listing[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const TILE_ATTRIBUTION = '&copy; OpenStreetMap contributors &copy; CARTO';

export function SearchMap({ listings, activeId, onSelect }: SearchMapProps) {
  return (
    <div className="relative z-0 h-full w-full">
      <MapContainer center={[40, -100]} zoom={4} scrollWheelZoom className="h-full w-full" zoomControl>
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        <FitToListings listings={listings} />
        {listings.map((l) =>
        <PricePin key={l.id} listing={l} active={l.id === activeId} onSelect={onSelect} />
        )}
      </MapContainer>
    </div>);

}

function PricePin({ listing, active, onSelect }: {listing: Listing;active: boolean;onSelect: (id: string) => void;}) {
  const icon = useMemo(
    () =>
    L.divIcon({
      className: '',
      iconSize: [0, 0],
      html: `<span class="price-pin${active ? ' is-active' : ''}" aria-label="${listing.title}">${formatMoney(listing.price)}</span>`
    }),
    [active, listing.price, listing.title]
  );
  return (
    <Marker
      position={[listing.location.lat, listing.location.lng]}
      icon={icon}
      zIndexOffset={active ? 1000 : 0}
      eventHandlers={{ click: () => onSelect(listing.id) }}
      keyboard
      title={listing.title} />);


}

function FitToListings({ listings }: {listings: Listing[];}) {
  const map = useMap();
  const key = listings.map((l) => l.id).join(',');
  useEffect(() => {
    if (!listings.length) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.location.lat, l.location.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}