import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, HeartIcon, StarIcon, VideoIcon } from 'lucide-react';
import { TutorPhoto } from './TutorPhoto';
import { formatMoney } from '../../utils/format';
import { getTutorSubjectNames, getTutorTopics } from '../../utils/tutors';
import type { Tutor } from '../../types/marketplace';

export function TutorCard({ tutor }: {tutor: Tutor;}) {
  const [saved, setSaved] = useState(false);
  const topics = getTutorTopics(tutor).slice(0, 3);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lift">
      <div className="relative">
        <TutorPhoto name={tutor.name} src={tutor.photo} className="aspect-[4/3] w-full" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-ink-800 shadow-card">
          <VideoIcon size={12} aria-hidden="true" /> Intro video
        </span>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${tutor.name} from saved` : `Save ${tutor.name}`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink-700 shadow-card transition hover:scale-105">
          
          <HeartIcon size={16} className={saved ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="flex items-center gap-1.5 font-semibold text-ink-900">
              <Link to={`/tutors/${tutor.id}`} className="truncate after:absolute after:inset-0 focus-visible:outline-none">
                {tutor.name}
              </Link>
              {tutor.verified && <BadgeCheckIcon size={16} className="shrink-0 text-primary-600" aria-label="Verified tutor" />}
            </h3>
            <p className="text-xs text-ink-500">
              {getTutorSubjectNames(tutor).join(' · ')} · {tutor.country}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ink-900">
            <StarIcon size={14} className="fill-accent-400 text-accent-500" aria-hidden="true" />
            {tutor.rating.toFixed(1)}
            <span className="font-normal text-ink-500">({tutor.reviewCount})</span>
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-700">{tutor.headline}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
          {topics.map((t) =>
          <li key={t} className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-800">
              {t}
            </li>
          )}
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-ink-100 pt-3">
          <p className="text-xs text-ink-500">{tutor.lessonsTaught.toLocaleString()} lessons taught</p>
          <p className="text-ink-900">
            <span className="text-lg font-semibold">{formatMoney(tutor.hourlyRate)}</span>
            <span className="text-sm text-ink-500"> /hour</span>
          </p>
        </div>
      </div>
    </article>);

}