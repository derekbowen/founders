import React, { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { formatPrice } from "../../utils/format";
import type { Vendor } from "../../types/marketplace";

interface VendorMapProps {
  vendors: Vendor[];
  activeId?: string | null;
  onMarkerClick?: (vendor: Vendor) => void;
  /** Draws a service-area circle around a single vendor */
  radiusMiles?: number;
  className?: string;
  label?: string;
}

const DEFAULT_CENTER: L.LatLngExpression = [38.0, -122.4];

export function VendorMap({ vendors, activeId, onMarkerClick, radiusMiles, className = "", label = "Map of vendors" }: VendorMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const clickRef = useRef(onMarkerClick);
  clickRef.current = onMarkerClick;

  const vendorsKey = useMemo(() => vendors.map((v) => v.id).join(","), [vendors]);
  const single = vendors.length === 1 && radiusMiles !== undefined;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView(DEFAULT_CENTER, 8);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
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

  // Markers
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();
    vendors.forEach((v) => {
      if (single) {
        const radius = Math.max(radiusMiles ?? 0, 3) * 1609;
        L.circle([v.lat, v.lng], {
          radius,
          color: "rgb(140,67,82)",
          weight: 1.5,
          fillColor: "rgb(140,67,82)",
          fillOpacity: 0.08
        }).addTo(layer);
        L.marker([v.lat, v.lng], {
          icon: L.divIcon({ className: "", html: '<div class="vowly-dot"></div>', iconSize: [0, 0] }),
          title: v.name,
          keyboard: false
        }).addTo(layer);
        return;
      }
      const icon = L.divIcon({
        className: "",
        html: `<div class="vowly-pin ${v.id === activeId ? "is-active" : ""}">${formatPrice(v.startingPrice)}</div>`,
        iconSize: [0, 0]
      });
      const marker = L.marker([v.lat, v.lng], { icon, title: v.name, riseOnHover: true, zIndexOffset: v.id === activeId ? 1000 : 0 });
      marker.on("click", () => clickRef.current?.(v));
      marker.addTo(layer);
    });
  }, [vendors, activeId, single, radiusMiles]);

  // Fit bounds when the result set changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || vendors.length === 0) return;
    if (single) {
      const v = vendors[0];
      const radius = Math.max(radiusMiles ?? 0, 3) * 1609;
      map.fitBounds(L.latLng(v.lat, v.lng).toBounds(radius * 2), { padding: [20, 20] });
      return;
    }
    const bounds = L.latLngBounds(vendors.map((v) => [v.lat, v.lng] as L.LatLngTuple));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorsKey, single]);

  return <div ref={containerRef} role="region" aria-label={label} className={`z-0 h-full w-full ${className}`} />;
}