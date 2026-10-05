import React, { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  active?: boolean;
}

interface MapViewProps {
  markers: MapMarker[];
  variant?: 'price' | 'dot';
  zoom?: number;
  onMarkerClick?: (id: string) => void;
  className?: string;
  ariaLabel: string;
}

function FitToMarkers({ markers, zoom }: {markers: MapMarker[];zoom: number;}) {
  const map = useMap();
  const key = markers.map((m) => m.id).join('|');
  useEffect(() => {
    if (!markers.length) return;
    if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], zoom);
      return;
    }
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map, zoom]);
  return null;
}

function InvalidateOnResize() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  return null;
}

export function MapView({
  markers,
  variant = 'price',
  zoom = 14,
  onMarkerClick,
  className,
  ariaLabel
}: MapViewProps) {
  const center: [number, number] = markers.length ? [markers[0].lat, markers[0].lng] : [30, 0];

  const icons = useMemo(
    () =>
    markers.map((m) =>
    variant === 'dot' ?
    L.divIcon({ className: 'price-marker', html: '<div class="meeting-marker__dot"></div>', iconSize: [0, 0] }) :
    L.divIcon({
      className: 'price-marker',
      html: `<div class="price-marker__pill${m.active ? ' price-marker__pill--active' : ''}">${m.label ?? ''}</div>`,
      iconSize: [0, 0]
    })
    ),
    [markers, variant]
  );

  return (
    <div className={className} role="region" aria-label={ariaLabel}>
      <MapContainer
        center={center}
        zoom={markers.length ? zoom : 2}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ zIndex: 0 }}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        
        <FitToMarkers markers={markers} zoom={zoom} />
        <InvalidateOnResize />
        {markers.map((m, i) =>
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={icons[i]}
          zIndexOffset={m.active ? 1000 : 0}
          eventHandlers={onMarkerClick ? { click: () => onMarkerClick(m.id) } : undefined} />

        )}
      </MapContainer>
    </div>);

}