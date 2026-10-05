import React from 'react';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';

interface ApproxLocationMapProps {
  lat: number;
  lng: number;
}

export function ApproxLocationMap({ lat, lng }: ApproxLocationMapProps) {
  return (
    <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors &copy; CARTO" />
      
      <Circle
        center={[lat, lng]}
        radius={450}
        pathOptions={{ color: 'rgb(31 126 120)', fillColor: 'rgb(42 157 149)', fillOpacity: 0.2, weight: 2 }} />
      
    </MapContainer>);

}