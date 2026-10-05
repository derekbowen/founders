import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import { brand } from '../../data/brand';
import type { Listing, ServiceId } from '../../types/marketplace';
import { getStartingPrice } from '../../utils/pricing';

interface MapViewProps {
  listings: Listing[];
  serviceId?: ServiceId | null;
  activeId?: string | null;
  onSelect?: (id: string) => void;
  /** Render an approximate-location circle for a single listing instead of price markers */
  approximate?: boolean;
  className?: string;
}

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export function MapView({ listings, serviceId, activeId, onSelect, approximate = false, className }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView(brand.map.center, brand.map.zoom);
    L.tileLayer(TILE_URL, {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const idsKey = listings.map((l) => l.id).join(',');

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    markersRef.current = {};

    if (approximate && listings[0]) {
      const l = listings[0];
      L.circle([l.lat, l.lng], {
        radius: 450,
        color: brand.colors.accent[600],
        weight: 2,
        fillOpacity: 0.18
      }).addTo(layer);
      map.setView([l.lat, l.lng], 14);
      return;
    }

    listings.forEach((l) => {
      const price = getStartingPrice(l, serviceId).price;
      const icon = L.divIcon({
        className: 'pp-marker-wrap',
        html: `<div class="pp-marker" role="button" aria-label="${l.sitter.name}, $${price}">$${price}</div>`,
        iconSize: [0, 0]
      });
      const marker = L.marker([l.lat, l.lng], { icon, keyboard: true, title: l.sitter.name }).addTo(layer);
      marker.on('click', () => onSelectRef.current?.(l.id));
      markersRef.current[l.id] = marker;
    });

    if (listings.length > 0) {
      const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, serviceId, approximate]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = marker.getElement()?.querySelector('.pp-marker');
      if (!el) return;
      const isActive = id === activeId;
      el.classList.toggle('is-active', isActive);
      marker.setZIndexOffset(isActive ? 1000 : 0);
    });
  }, [activeId, idsKey]);

  return <div ref={containerRef} className={className ?? 'h-full w-full'} role="region" aria-label="Map of sitter locations" />;
}