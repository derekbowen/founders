import React from 'react';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';
import { TILE_ATTRIBUTION, TILE_URL } from './SearchMap';
import { brand } from '../../data/brand';

export function LocationMap({ lat, lng, label }: {lat: number;lng: number;label: string;}) {
  const color = brand.colors.primary[700];
  return (
    <div className="relative z-0 h-80 w-full overflow-hidden rounded-2xl border border-sand-200" aria-label={label} role="img">
      <MapContainer center={[lat, lng]} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        <Circle center={[lat, lng]} radius={1200} pathOptions={{ color, fillColor: color, fillOpacity: 0.15, weight: 2 }} />
      </MapContainer>
    </div>);

}