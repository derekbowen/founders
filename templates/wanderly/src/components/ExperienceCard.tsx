import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, HeartIcon, UsersIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { StarRating } from './ui/StarRating';
import type { Experience } from '../types/marketplace';
import { getCategory, getDestination } from '../utils/lookup';
import { formatDuration, formatPrice } from '../utils/format';

interface ExperienceCardProps {
  experience: Experience;
  active?: boolean;
  onHover?: (id: string | null) => void;
}

export function ExperienceCard({ experience, active = false, onHover }: ExperienceCardProps) {
  const [saved, setSaved] = useState(false);
  const destination = getDestination(experience.destinationId);
  const category = getCategory(experience.categoryId);

  return (
    <article
      className="group relative"
      onMouseEnter={() => onHover?.(experience.id)}
      onMouseLeave={() => onHover?.(null)}>
      
      <div
        className={twMerge(
          'relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-200 ring-2 ring-transparent transition',
          active && 'ring-primary-500'
        )}>
        
        <img
          src={experience.image}
          alt={experience.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        {category &&
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            {category.label}
          </span>
        }
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${experience.title} from wishlist` : `Save ${experience.title} to wishlist`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          
          <HeartIcon className={twMerge('h-4 w-4', saved ? 'fill-primary-600 text-primary-600' : 'text-slate-700')} />
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-700">
            {destination?.city}, {destination?.country}
          </p>
          <StarRating rating={experience.rating} count={experience.reviewCount} />
        </div>
        <h3 className="font-display text-base font-semibold leading-snug text-slate-900">
          <Link to={`/l/${experience.id}`} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-primary-700">
            {experience.title}
          </Link>
        </h3>
        <p className="flex items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden />
            {formatDuration(experience.durationHours)}
          </span>
          <span className="inline-flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" aria-hidden />
            Up to {experience.maxGuests}
          </span>
        </p>
        <p className="pt-0.5 text-sm text-slate-900">
          From <span className="font-semibold">{formatPrice(experience.pricePerPerson)}</span>
          <span className="text-slate-600"> / person</span>
        </p>
      </div>
    </article>);

}