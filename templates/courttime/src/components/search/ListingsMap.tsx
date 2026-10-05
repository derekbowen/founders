import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { brand } from '../../data/brand';
import { Listing } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';

interface ListingsMapProps {
  listings: Listing[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  showPopups?: boolean;
}

function markerIcon(label: string, active: boolean) {
  return L.divIcon({
    className: 'ct-marker-wrap',
    html: `<span class="ct-marker${active ? ' is-active' : ''}">${label}</span>`,
    iconSize: [0, 0],
    popupAnchor: [0, -36]
  });
}

function FitToListings({ listings }: {listings: Listing[];}) {
  const map = useMap();
  useEffect(() => {
    if (!listings.length) return;
    if (listings.length === 1) {
      map.setView([listings[0].location.lat, listings[0].location.lng], 14);
      return;
    }
    const bounds = L.latLngBounds(listings.map((l) => [l.location.lat, l.location.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }, [listings, map]);
  return null;
}

export function ListingsMap({ listings, activeId = null, onHover, showPopups = true }: ListingsMapProps) {
  return (
    <MapContainer
      center={[brand.mapCenter.lat, brand.mapCenter.lng]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full">
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <FitToListings listings={listings} />
      {listings.map((l) => {
        const active = l.id === activeId;
        return (
          <Marker
            key={l.id}
            position={[l.location.lat, l.location.lng]}
            icon={markerIcon(showPopups ? formatMoney(l.pricePerHour) : l.clubName, active)}
            zIndexOffset={active ? 1000 : 0}
            eventHandlers={{ mouseover: () => onHover?.(l.id), mouseout: () => onHover?.(null) }}>
            
            {showPopups &&
            <Popup>
                <div className="w-48">
                  <img src={l.images[0]} alt="" className="h-24 w-full rounded-lg object-cover" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{l.clubName}</p>
                  <p className="text-sm font-semibold leading-snug text-ink">{l.title}</p>
                  <p className="mt-1 text-sm text-ink">
                    <strong>{formatMoney(l.pricePerHour)}</strong> /hour
                  </p>
                  <Link to={`/listing/${l.id}`} className="mt-2 inline-block text-sm font-semibold !text-brand hover:underline">
                    View court →
                  </Link>
                </div>
              </Popup>
            }
          </Marker>);

      })}
    </MapContainer>);

}