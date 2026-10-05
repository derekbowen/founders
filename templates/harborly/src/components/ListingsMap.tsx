import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../utils/pricing';
import type { Listing } from '../types/marketplace';

interface ListingsMapProps {
  listings: Listing[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  zoom?: number;
  interactive?: boolean;
}

function FitBounds({ points, zoom }: {points: [number, number][];zoom: number;}) {
  const map = useMap();
  const key = points.map((p) => p.join(',')).join('|');
  useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) map.setView(points[0], zoom);else
    map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 12 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key, zoom]);
  return null;
}

export function ListingsMap({ listings, activeId, onHover, zoom = 13, interactive = true }: ListingsMapProps) {
  const navigate = useNavigate();
  const points = useMemo<[number, number][]>(() => listings.map((l) => [l.marina.lat, l.marina.lng]), [listings]);
  const center: [number, number] = points[0] ?? [33, -98];

  return (
    <div className="relative z-0 h-full w-full overflow-hidden">
      <MapContainer center={center} zoom={4} scrollWheelZoom={interactive} className="h-full w-full" attributionControl>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        
        <FitBounds points={points} zoom={zoom} />
        {listings.map((l) =>
        <Marker
          key={l.id}
          position={[l.marina.lat, l.marina.lng]}
          zIndexOffset={activeId === l.id ? 1000 : 0}
          icon={L.divIcon({
            className: `price-marker${activeId === l.id ? ' is-active' : ''}`,
            html: `<span>${interactive ? formatMoney(l.pricing.fullDay) : l.marina.name}</span>`,
            iconSize: [0, 0]
          })}
          eventHandlers={
          interactive ?
          {
            click: () => navigate(`/l/${l.id}`),
            mouseover: () => onHover?.(l.id),
            mouseout: () => onHover?.(null)
          } :
          undefined
          }
          title={l.title} />

        )}
      </MapContainer>
    </div>);

}