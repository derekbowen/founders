import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { formatMoney } from '../../utils/format';
import type { Listing } from '../../types/listing';

interface RoomMapProps {
  listings: Listing[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  /** Change this value to force the map to recalculate its size (e.g. after being shown). */
  resizeKey?: string | number;
}

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

export function RoomMap({ listings, activeId, onHover, resizeKey }: RoomMapProps) {
  const center: [number, number] = listings[0] ? [listings[0].lat, listings[0].lng] : [48.5, 8];

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full" zoomControl>
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FitToListings listings={listings} />
      <Resizer resizeKey={resizeKey} />
      {listings.map((listing) =>
      <RentMarker
        key={listing.id}
        listing={listing}
        active={activeId === listing.id}
        onHover={onHover} />

      )}
    </MapContainer>);

}

function RentMarker({
  listing,
  active,
  onHover




}: {listing: Listing;active: boolean;onHover?: (id: string | null) => void;}) {
  const icon = useMemo(
    () =>
    L.divIcon({
      className: '',
      iconSize: [0, 0],
      html: `<div class="rent-pin${active ? ' is-active' : ''}">${formatMoney(listing.rent)}</div>`
    }),
    [active, listing.rent]
  );

  return (
    <Marker
      position={[listing.lat, listing.lng]}
      icon={icon}
      zIndexOffset={active ? 1000 : 0}
      eventHandlers={{
        mouseover: () => onHover?.(listing.id),
        mouseout: () => onHover?.(null)
      }}>
      
      <Popup closeButton={false}>
        <Link to={`/l/${listing.id}`} className="block text-navy-900 no-underline">
          <img src={listing.images[0]} alt="" className="h-28 w-full object-cover" />
          <div className="p-3">
            <p className="line-clamp-2 text-sm font-semibold leading-snug">{listing.title}</p>
            <p className="mt-1 text-xs text-navy-500">
              {listing.neighborhood} · <span className="font-semibold text-navy-900">{formatMoney(listing.rent)}</span>/mo
            </p>
          </div>
        </Link>
      </Popup>
    </Marker>);

}

function FitToListings({ listings }: {listings: Listing[];}) {
  const map = useMap();
  const key = listings.map((l) => l.id).join(',');
  useEffect(() => {
    if (listings.length === 0) return;
    if (listings.length === 1) {
      map.setView([listings[0].lat, listings[0].lng], 14);
      return;
    }
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);
  return null;
}

function Resizer({ resizeKey }: {resizeKey?: string | number;}) {
  const map = useMap();
  useEffect(() => {
    const t = window.setTimeout(() => map.invalidateSize(), 120);
    return () => window.clearTimeout(t);
  }, [resizeKey, map]);
  return null;
}