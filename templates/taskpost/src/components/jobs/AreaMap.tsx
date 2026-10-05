import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import { brand } from '../../data/brand';

interface AreaMapProps {
  lat: number;
  lng: number;
  label: string;
}

export function AreaMap({ lat, lng, label }: AreaMapProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, {
      scrollWheelZoom: false,
      dragging: false,
      zoomControl: false,
      doubleClickZoom: false,
      attributionControl: true
    }).setView([lat, lng], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);
    L.circle([lat, lng], {
      radius: 550,
      color: brand.colors.primary[600],
      weight: 2,
      fillColor: brand.colors.primary[500],
      fillOpacity: 0.15
    }).addTo(map);
    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return (
    <div
      ref={ref}
      className="h-56 w-full overflow-hidden rounded-xl border border-ink-200"
      role="img"
      aria-label={`Approximate job area: ${label}`} />);


}