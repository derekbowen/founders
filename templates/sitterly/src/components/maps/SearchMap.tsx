import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Sitter } from '../../types/sitter';
import { brand } from '../../data/brand';

interface SearchMapProps {
  sitters: Sitter[];
  activeId: string | null;
  onSelect?: (id: string | null) => void;
}

const pin = (label: string, active: boolean) =>
L.divIcon({
  className: '',
  html: `<div class="sitter-pin${active ? ' is-active' : ''}">${label}</div>`,
  iconSize: [56, 30],
  iconAnchor: [28, 15]
});

function FitBounds({ sitters }: {sitters: Sitter[];}) {
  const map = useMap();
  useEffect(() => {
    if (sitters.length === 0) return;
    const bounds = L.latLngBounds(sitters.map((s) => [s.lat, s.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }, [sitters, map]);
  return null;
}

export function SearchMap({ sitters, activeId, onSelect }: SearchMapProps) {
  const icons = useMemo(
    () => Object.fromEntries(sitters.map((s) => [s.id, { normal: pin(`$${s.hourlyRate}`, false), active: pin(`$${s.hourlyRate}`, true) }])),
    [sitters]
  );
  return (
    <MapContainer center={brand.mapCenter} zoom={12} scrollWheelZoom className="relative z-0 h-full w-full" aria-label="Map of sitters">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      
      <FitBounds sitters={sitters} />
      {sitters.map((s) =>
      <Marker
        key={s.id}
        position={[s.lat, s.lng]}
        icon={activeId === s.id ? icons[s.id].active : icons[s.id].normal}
        zIndexOffset={activeId === s.id ? 1000 : 0}
        eventHandlers={{ mouseover: () => onSelect?.(s.id), mouseout: () => onSelect?.(null) }}>
        
          <Popup>
            <Link to={`/l/${s.id}`} className="flex w-56 items-center gap-3 text-ink-900 no-underline">
              <img src={s.photo} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <span className="min-w-0">
                <span className="block truncate font-heading text-sm font-bold">{s.name}</span>
                <span className="block text-xs text-ink-600">
                  ★ {s.rating} · {s.neighborhood}
                </span>
                <span className="block text-xs font-semibold text-primary-700">${s.hourlyRate}/hr · View profile →</span>
              </span>
            </Link>
          </Popup>
        </Marker>
      )}
    </MapContainer>);

}