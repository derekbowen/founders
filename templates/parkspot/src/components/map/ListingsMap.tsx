import React, { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { XIcon } from 'lucide-react';
import { ListingCard } from '../listing/ListingCard';
import { formatMoney } from '../../utils/format';
import type { Listing } from '../../types/listing';

interface ListingsMapProps {
  listings: Listing[];
  activeId: string | null;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  search?: string;
}

const SF_CENTER: [number, number] = [37.7749, -122.4194];

export function ListingsMap({ listings, activeId, selectedId, onSelect, search }: ListingsMapProps) {
  const selected = listings.find((l) => l.id === selectedId);

  return (
    <div className="relative h-full w-full">
      <MapContainer center={SF_CENTER} zoom={13} className="h-full w-full" zoomControl={false} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        
        <FitBounds listings={listings} />
        <ZoomControlTopRight />
        {listings.map((l) =>
        <PricePin
          key={l.id}
          listing={l}
          active={l.id === activeId || l.id === selectedId}
          onClick={() => onSelect(l.id)} />

        )}
      </MapContainer>

      {selected &&
      <div className="absolute inset-x-3 bottom-3 z-[500] mx-auto max-w-sm">
          <div className="relative rounded-2xl shadow-pop">
            <ListingCard listing={selected} search={search} layout="horizontal" />
            <button
            type="button"
            onClick={() => onSelect(null)}
            aria-label="Close preview"
            className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-line bg-surface text-ink shadow-card hover:bg-canvas">
            
              <XIcon size={14} aria-hidden />
            </button>
          </div>
        </div>
      }

      {listings.length === 0 &&
      <div className="pointer-events-none absolute inset-0 z-[500] grid place-items-center">
          <p className="rounded-full bg-surface px-4 py-2 text-sm font-medium shadow-card">No spots in this area</p>
        </div>
      }
    </div>);

}

function PricePin({ listing, active, onClick }: {listing: Listing;active: boolean;onClick: () => void;}) {
  const icon = useMemo(
    () =>
    L.divIcon({
      className: 'price-pin-icon',
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      html: `<div style="transform:translate(-50%,-100%)" class="flex flex-col items-center">
          <span class="whitespace-nowrap rounded-full border-2 px-2.5 py-1 text-xs font-bold shadow-pop transition-transform ${
      active ? 'scale-110 border-ink bg-accent text-ink' : 'border-white bg-navy text-white'}">${
      formatMoney(listing.hourlyPrice)}/hr</span>
          <span class="-mt-1 h-2 w-2 rotate-45 ${active ? 'bg-ink' : 'bg-navy'}"></span>
        </div>`
    }),
    [active, listing.hourlyPrice]
  );
  return (
    <Marker
      position={[listing.lat, listing.lng]}
      icon={icon}
      zIndexOffset={active ? 1000 : 0}
      eventHandlers={{ click: onClick }}
      keyboard
      title={`${listing.title}, ${formatMoney(listing.hourlyPrice)} per hour`} />);


}

function FitBounds({ listings }: {listings: Listing[];}) {
  const map = useMap();
  const key = listings.map((l) => l.id).join(',');
  useEffect(() => {
    if (listings.length === 0) return;
    if (listings.length === 1) {
      map.setView([listings[0].lat, listings[0].lng], 15);
      return;
    }
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function ZoomControlTopRight() {
  const map = useMap();
  useEffect(() => {
    const control = L.control.zoom({ position: 'topright' });
    control.addTo(map);
    return () => {
      control.remove();
    };
  }, [map]);
  return null;
}