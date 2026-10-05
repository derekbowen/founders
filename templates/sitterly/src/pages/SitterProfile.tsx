import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarHeartIcon, LanguagesIcon, MapPinIcon, ShieldCheckIcon } from 'lucide-react';
import { sitters } from '../data/sitters';
import { reviews as allReviews } from '../data/reviews';
import { brand } from '../data/brand';
import { SitterCard } from '../components/SitterCard';
import { ReviewList } from '../components/listing/ReviewList';
import { Rating } from '../components/ui/Rating';
import { Chip } from '../components/ui/Chip';
import { buttonLinkClass } from '../components/ui/BrandButton';
import { formatDate } from '../utils/format';
import { NotFound } from './NotFound';

export function SitterProfile() {
  const { id } = useParams();
  const sitter = sitters.find((s) => s.id === id);
  if (!sitter) return <NotFound />;
  const first = sitter.name.split(' ')[0];
  const reviews = allReviews.filter((r) => r.sitterId === sitter.id);

  return (
    <div>
      <div className="h-36 bg-primary-100 sm:h-44" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="-mt-16 grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="self-start rounded-[2rem] border border-ink-200 bg-white p-6 text-center shadow-soft">
            <img src={sitter.photo} alt={`Portrait of ${sitter.name}`} className="mx-auto h-32 w-32 rounded-full object-cover ring-4 ring-white" />
            <h1 className="mt-4 font-heading text-2xl font-bold text-ink-900">{sitter.name}</h1>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-ink-600">
              <MapPinIcon className="h-4 w-4" aria-hidden /> {sitter.neighborhood}
            </p>
            <div className="mt-3 flex justify-center"><Rating value={sitter.rating} count={sitter.reviewCount} /></div>
            <ul className="mt-5 space-y-2.5 border-t border-ink-200 pt-5 text-left text-sm text-ink-700">
              <li className="flex items-center gap-2"><ShieldCheckIcon className="h-4 w-4 text-emerald-600" aria-hidden />Background checked {formatDate(sitter.backgroundCheckDate, 'MMM yyyy')}</li>
              <li className="flex items-center gap-2"><CalendarHeartIcon className="h-4 w-4 text-primary-600" aria-hidden />On {brand.name} since {sitter.memberSince}</li>
              <li className="flex items-center gap-2"><LanguagesIcon className="h-4 w-4 text-primary-600" aria-hidden />{sitter.languages.join(', ')}</li>
            </ul>
            <Link to={`/l/${sitter.id}#booking`} className={buttonLinkClass('primary', 'md', 'mt-6 w-full')}>
              Request {first}
            </Link>
          </aside>

          <div className="pt-4 lg:pt-20">
            <h2 className="font-heading text-2xl font-bold text-ink-900">Hi, I’m {first}!</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-700">{sitter.bio}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {sitter.certifications.map((c) => <Chip key={c} tone="primary">{c}</Chip>)}
              {sitter.ageGroups.map((a) => <Chip key={a} tone="accent">{a}</Chip>)}
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-3">
              {[
              [`${sitter.experienceYears}`, 'years experience'],
              [`${sitter.repeatFamilies}`, 'repeat families'],
              [`${sitter.reviewCount}`, 'reviews']].
              map(([v, l]) =>
              <div key={l} className="rounded-2xl bg-white p-4 text-center ring-1 ring-ink-200">
                  <dd className="font-heading text-2xl font-bold text-ink-900">{v}</dd>
                  <dt className="text-xs text-ink-600">{l}</dt>
                </div>
              )}
            </dl>

            <section className="mt-10" aria-labelledby="listings-heading">
              <h2 id="listings-heading" className="font-heading text-xl font-bold text-ink-900">{first}’s listing</h2>
              <div className="mt-4 max-w-sm"><SitterCard sitter={sitter} /></div>
            </section>

            <section className="mt-10" aria-labelledby="profile-reviews">
              <h2 id="profile-reviews" className="mb-4 font-heading text-xl font-bold text-ink-900">Reviews from parents</h2>
              <ReviewList reviews={reviews} />
            </section>
          </div>
        </div>
      </div>
    </div>);

}