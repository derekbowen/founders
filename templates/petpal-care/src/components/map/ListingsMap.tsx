import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { brand } from '../../data/brand';
import { getStartingPrice } from '../../utils/listing';
import { formatMoney } from '../../utils/format';
import type { Listing } from '../../types/listing';

interface ListingsMapProps {
  listings: Listing[];
  activeId: string | null;
  serviceId?: string;
  onSelect?: (id: string | null) => void;
}

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; OpenStreetMap contributors &copy; CARTO';

function FitBounds({ listings }: {listings: Listing[];}) {
  const map = useMap();
  useEffect(() => {
    if (!listings.length) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }, [listings, map]);
  return null;
}

export function ListingsMap({ listings, activeId, serviceId, onSelect }: ListingsMapProps) {
  const icons = useMemo(
    () =>
    Object.fromEntries(
      listings.map((l) => {
        const price = formatMoney(getStartingPrice(l, serviceId).price);
        const make = (active: boolean) =>
        L.divIcon({ className: '', iconSize: [0, 0], html: `<span class="price-pin ${active ? 'is-active' : ''}">${price}</span>` });
        return [l.id, { normal: make(false), active: make(true) }];
      })
    ),
    [listings, serviceId]
  );

  return (
    <MapContainer center={brand.marketplace.mapCenter} zoom={12} scrollWheelZoom className="h-full w-full">
      <TileLayer url={TILE_URL} attribution={ATTRIBUTION} />
      <FitBounds listings={listings} />
      {listings.map((l) =>
      <Marker
        key={l.id}
        position={[l.lat, l.lng]}
        icon={activeId === l.id ? icons[l.id].active : icons[l.id].normal}
        zIndexOffset={activeId === l.id ? 1000 : 0}
        eventHandlers={{ mouseover: () => onSelect?.(l.id), mouseout: () => onSelect?.(null) }}>
        
          <Popup>
            <Link to={`/l/${l.id}`} className="block w-48 text-ink-900 no-underline">
              <img src={l.photos[0]} alt="" className="mb-2 h-24 w-full rounded-lg object-cover" />
              <span className="block text-sm font-extrabold">{l.sitter.name}</span>
              <span className="block text-xs text-ink-600">{l.neighborhood}</span>
            </Link>
          </Popup>
        </Marker>
      )}
    </MapContainer>);

}