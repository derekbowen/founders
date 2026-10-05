import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShieldCheckIcon, MapPinIcon, ZapIcon } from 'lucide-react';
import { Sitter } from '../types/sitter';
import { Rating } from './ui/Rating';
import { Chip } from './ui/Chip';

interface SitterCardProps {
  sitter: Sitter;
  active?: boolean;
  onHover?: (id: string | null) => void;
  /** Query string (e.g. "?date=...&kids=2") carried into the listing to prefill booking */
  linkSearch?: string;
}

export function SitterCard({ sitter, active, onHover, linkSearch = '' }: SitterCardProps) {
  const [saved, setSaved] = useState(false);
  return (
    <article
      className="relative"
      onMouseEnter={() => onHover?.(sitter.id)}
      onMouseLeave={() => onHover?.(null)}>
      
      <Link
        to={`/l/${sitter.id}${linkSearch}`}
        onFocus={() => onHover?.(sitter.id)}
        className={`group block h-full overflow-hidden rounded-3xl border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
        active ? 'border-primary-400 shadow-lift' : 'border-ink-200/80 shadow-soft'}`
        }>
        
        <div className="relative aspect-[5/4] overflow-hidden bg-primary-100">
          <img src={sitter.photo} alt={`Portrait of ${sitter.name}`} loading="lazy" className="h-full w-full object-cover object-[center_30%] transition duration-300 group-hover:scale-[1.03]" />
          {sitter.availableTonight &&
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink-900 shadow-sm">
              <ZapIcon className="h-3.5 w-3.5 fill-accent-500 text-accent-500" aria-hidden />
              Available tonight
            </span>
          }
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-bold leading-tight text-ink-900">{sitter.name}</h3>
            <Rating value={sitter.rating} count={sitter.reviewCount} />
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-600">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
            {sitter.neighborhood} · {sitter.experienceYears} yrs experience
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip tone="success" icon={<ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden />}>
              Background checked
            </Chip>
            {sitter.certifications.slice(0, 2).map((c) =>
            <Chip key={c} tone="primary">
                {c}
              </Chip>
            )}
          </div>
          <p className="mt-4 text-sm text-ink-600">
            <span className="text-lg font-bold text-ink-900">${sitter.hourlyRate}</span> /hour
            <span className="text-ink-500"> · +${sitter.extraChildRate} per extra child</span>
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${sitter.name} from favorites` : `Save ${sitter.name} to favorites`}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink-700 shadow-sm transition hover:scale-105 hover:text-accent-600">
        
        <HeartIcon className={`h-4 w-4 ${saved ? 'fill-accent-500 text-accent-500' : ''}`} aria-hidden />
      </button>
    </article>);

}