import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import type { Job } from '../../types/marketplace';
import { cn } from '../../utils/styles';

interface JobMapProps {
  jobs: Job[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onHover?: (id: string | null) => void;
  className?: string;
}

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; OpenStreetMap contributors &copy; CARTO';

function pinLabel(job: Job): string {
  return `$${job.budgetMin}–${job.budgetMax}`;
}

export function JobMap({ jobs, activeId, onSelect, onHover, className }: JobMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const selectRef = useRef(onSelect);
  const hoverRef = useRef(onHover);
  selectRef.current = onSelect;
  hoverRef.current = onHover;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false, zoomControl: true }).setView(
      [45.525, -122.65],
      11
    );
    L.tileLayer(TILE_URL, { attribution: ATTRIBUTION, maxZoom: 18 }).addTo(map);
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

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();
    jobs.forEach((job) => {
      const active = job.id === activeId;
      const marker = L.marker([job.lat, job.lng], {
        icon: L.divIcon({
          className: 'tp-pin-icon',
          html: `<span class="tp-pin ${active ? 'tp-pin-active' : ''}">${pinLabel(job)}</span>`,
          iconSize: [0, 0]
        }),
        zIndexOffset: active ? 1000 : 0,
        keyboard: true,
        title: job.title,
        alt: `${job.title}, ${pinLabel(job)}`
      });
      marker.bindTooltip(job.title, { direction: 'top', offset: [0, -14] });
      marker.on('click', () => selectRef.current(job.id));
      marker.on('mouseover', () => hoverRef.current?.(job.id));
      marker.on('mouseout', () => hoverRef.current?.(null));
      marker.addTo(layer);
    });
  }, [jobs, activeId]);

  const idsKey = jobs.map((j) => j.id).join(',');
  useEffect(() => {
    const map = mapRef.current;
    if (!map || jobs.length === 0) return;
    const bounds = L.latLngBounds(jobs.map((j) => [j.lat, j.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return (
    <div
      ref={containerRef}
      className={cn('h-full w-full overflow-hidden', className)}
      role="region"
      aria-label="Map of job locations" />);


}