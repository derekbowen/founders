import React from 'react';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';
import { brand } from '../../data/brand';

export function SpotLocationMap({ lat, lng }: {lat: number;lng: number;}) {
  return (
    <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      
      <Circle
        center={[lat, lng]}
        radius={180}
        pathOptions={{ color: brand.colors.navy, fillColor: brand.colors.accent, fillOpacity: 0.35, weight: 2 }} />
      
    </MapContainer>);

}