import React, { useEffect } from 'react';
import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet';
import { brand } from '../../data/brand';

interface ServiceAreaMapProps {
  lat: number;
  lng: number;
  radiusMiles: number;
  className?: string;
}

function Recenter({ lat, lng, radiusMiles }: {lat: number;lng: number;radiusMiles: number;}) {
  const map = useMap();
  useEffect(() => {
    const zoom = radiusMiles <= 3 ? 13 : radiusMiles <= 6 ? 12 : 11;
    map.setView([lat, lng], zoom);
  }, [lat, lng, radiusMiles, map]);
  return null;
}

export function ServiceAreaMap({ lat, lng, radiusMiles, className = 'h-72' }: ServiceAreaMapProps) {
  const primary = brand.colors.primary[600];
  return (
    <div className={`relative z-0 overflow-hidden rounded-3xl border border-ink-200 ${className}`}>
      <MapContainer center={[lat, lng]} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        
        <Recenter lat={lat} lng={lng} radiusMiles={radiusMiles} />
        <Circle center={[lat, lng]} radius={radiusMiles * 1609} pathOptions={{ color: primary, fillColor: primary, fillOpacity: 0.15, weight: 2 }} />
      </MapContainer>
    </div>);

}