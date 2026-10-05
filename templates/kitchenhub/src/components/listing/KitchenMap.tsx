import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { brand } from '../../data/brand';
import type { Listing } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';
import { cn } from '../../utils/styles';

interface KitchenMapProps {
  listings: Listing[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  approximate?: boolean;
  className?: string;
}

function FitBounds({ points, zoom }: {points: [number, number][];zoom: number;}) {
  const map = useMap();
  const key = points.map((p) => p.join(',')).join('|');

  useEffect(() => {
    const t = window.setTimeout(() => {
      map.invalidateSize();
      if (points.length === 1) map.setView(points[0], zoom);else
      if (points.length > 1) map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 13 });
    }, 50);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key, zoom]);

  return null;
}

export function KitchenMap({ listings, activeId, onHover, approximate = false, className }: KitchenMapProps) {
  const points = listings.map((l) => [l.lat, l.lng] as [number, number]);
  const center: [number, number] = points[0] ?? [39.5, -98.35];

  return (
    <div className={cn('relative isolate z-0 h-full w-full overflow-hidden', className)}>
      <MapContainer center={center} zoom={points.length ? 12 : 4} scrollWheelZoom={!approximate} className="h-full w-full" attributionControl>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        
        <FitBounds points={points} zoom={approximate ? 14 : 13} />
        {approximate ?
        listings.map((l) =>
        <Circle
          key={l.id}
          center={[l.lat, l.lng]}
          radius={350}
          pathOptions={{ color: brand.colors.primary, fillColor: brand.colors.primary, fillOpacity: 0.18, weight: 2 }} />

        ) :
        listings.map((l) =>
        <Marker
          key={l.id}
          position={[l.lat, l.lng]}
          zIndexOffset={activeId === l.id ? 1000 : 0}
          eventHandlers={{
            mouseover: () => onHover?.(l.id),
            mouseout: () => onHover?.(null)
          }}
          icon={L.divIcon({
            className: 'price-marker-wrap',
            html: `<div class="price-marker${activeId === l.id ? ' is-active' : ''}">${formatMoney(l.pricePerHour)}</div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 0]
          })}>
          
                <Popup closeButton={false} offset={[0, -10]}>
                  <Link to={`/kitchens/${l.id}`} className="block text-steel-900 no-underline">
                    <img src={l.images[0]} alt="" className="h-28 w-full object-cover" />
                    <span className="block p-3">
                      <span className="block text-sm font-semibold">{l.title}</span>
                      <span className="block text-xs text-steel-500">
                        {l.neighborhood} · {formatMoney(l.pricePerHour)}/hr
                      </span>
                    </span>
                  </Link>
                </Popup>
              </Marker>
        )}
      </MapContainer>
    </div>);

}