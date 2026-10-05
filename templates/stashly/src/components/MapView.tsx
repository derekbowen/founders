import React, { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import type { Listing } from '../types/marketplace';
import { formatMoney } from '../utils/pricing';
import { brand } from '../data/brand';

interface MapViewProps {
  listings: Listing[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  /** Show an approximate-location circle instead of price pins. */
  approximate?: boolean;
  className?: string;
  zoom?: number;
}

export function MapView({ listings, activeId, onHover, approximate, className, zoom }: MapViewProps) {
  const navigate = useNavigate();
  const center: [number, number] = listings.length ?
  [listings[0].lat, listings[0].lng] :
  brand.marketplace.mapCenter;

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom ?? brand.marketplace.mapZoom}
        scrollWheelZoom={!approximate}
        className="h-full w-full"
        attributionControl>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        
        {approximate ?
        listings.map((l) =>
        <Circle
          key={l.id}
          center={[l.lat, l.lng]}
          radius={350}
          pathOptions={{ color: brand.colors.brand[600], fillColor: brand.colors.brand[400], fillOpacity: 0.2, weight: 2 }} />

        ) :
        listings.map((l) =>
        <PricePin
          key={l.id}
          listing={l}
          active={activeId === l.id}
          onHover={onHover}
          onClick={() => navigate(`/l/${l.id}`)} />

        )}
        {!approximate && <FitBounds listings={listings} />}
      </MapContainer>
    </div>);

}

function PricePin({
  listing,
  active,
  onHover,
  onClick





}: {listing: Listing;active: boolean;onHover?: (id: string | null) => void;onClick: () => void;}) {
  const icon = useMemo(
    () =>
    L.divIcon({
      className: 'price-pin-icon',
      html: `<div class="price-pin${active ? ' is-active' : ''}">${formatMoney(listing.monthlyPrice)}<span style="font-weight:500;opacity:.7">/mo</span></div>`,
      iconSize: [0, 0]
    }),
    [listing.monthlyPrice, active]
  );
  return (
    <Marker
      position={[listing.lat, listing.lng]}
      icon={icon}
      zIndexOffset={active ? 1000 : 0}
      title={listing.title}
      eventHandlers={{
        click: onClick,
        mouseover: () => onHover?.(listing.id),
        mouseout: () => onHover?.(null)
      }} />);


}

function FitBounds({ listings }: {listings: Listing[];}) {
  const map = useMap();
  const key = listings.map((l) => l.id).join(',');
  useEffect(() => {
    if (listings.length < 2) {
      if (listings[0]) map.setView([listings[0].lat, listings[0].lng], 13);
      return;
    }
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}