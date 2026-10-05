import React from 'react';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';
import { brand } from '../../data/brand';

interface LocationMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  radius?: number;
}

export function LocationMap({ lat, lng, zoom = 14, radius = 350 }: LocationMapProps) {
  return (
    <MapContainer
      key={`${lat}-${lng}`}
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full">
      
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>' />
      
      <Circle
        center={[lat, lng]}
        radius={radius}
        pathOptions={{
          color: brand.colors.primary[600],
          fillColor: brand.colors.primary[400],
          fillOpacity: 0.25,
          weight: 2
        }} />
      
    </MapContainer>);

}