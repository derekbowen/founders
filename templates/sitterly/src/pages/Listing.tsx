import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon, AwardIcon, BabyIcon, CarIcon, CigaretteOffIcon, ClockIcon, HeartPulseIcon, LanguagesIcon,
  MapPinIcon, RepeatIcon, ShieldCheckIcon, SparklesIcon, StethoscopeIcon, GraduationCapIcon, HeartHandshakeIcon } from
'lucide-react';
import { sitters } from '../data/sitters';
import { reviews as allReviews } from '../data/reviews';
import { ageGroupOptions } from '../data/filterOptions';
import { careTypes } from '../data/careTypes';
import { brand } from '../data/brand';
import { Certification } from '../types/sitter';
import { Rating } from '../components/ui/Rating';
import { Chip } from '../components/ui/Chip';
import { ListingSection } from '../components/listing/ListingSection';
import { AvailabilityGrid } from '../components/listing/AvailabilityGrid';
import { ReviewList } from '../components/listing/ReviewList';
import { BookingPanel } from '../components/listing/BookingPanel';
import { ServiceAreaMap } from '../components/maps/ServiceAreaMap';
import { buttonLinkClass } from '../components/ui/BrandButton';
import { formatDate } from '../utils/format';
import { NotFound } from './NotFound';

const certIcons: Record<Certification, React.ElementType> = {
  CPR: HeartPulseIcon,
  'First aid': StethoscopeIcon,
  'Newborn care': BabyIcon,
  'Special needs': HeartHandshakeIcon,
  'Early childhood ed': GraduationCapIcon
};

export function Listing() {
  const { id } = useParams();
  const sitter = sitters.find((s) => s.id === id);
  if (!sitter) return <NotFound />;
  const first = sitter.name.split(' ')[0];
  const reviews = allReviews.filter((r) => r.sitterId === sitter.id);

  const stats = [
  { icon: AwardIcon, label: `${sitter.experienceYears} years`, sub: 'experience' },
  { icon: RepeatIcon, label: `${sitter.repeatFamilies} families`, sub: 'booked again' },
  { icon: ClockIcon, label: sitter.responseTime.replace('within ', ''), sub: 'response time' },
  { icon: SparklesIcon, label: `Since ${sitter.memberSince}`, sub: `on ${brand.name}` }];


  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-16">
      <Link to="/s" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-primary-700">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Back to search
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <header className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <img src={sitter.photo} alt={`Portrait of ${sitter.name}`} className="h-44 w-44 shrink-0 rounded-[2rem] object-cover shadow-soft sm:h-52 sm:w-52" />
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Chip tone="success" icon={<ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden />}>
                  Background check · {formatDate(sitter.backgroundCheckDate, 'MMM yyyy')}
                </Chip>
                {sitter.availableTonight && <Chip tone="accent">Available tonight</Chip>}
              </div>
              <h1 className="mt-3 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">{sitter.name}</h1>
              <p className="mt-2 text-lg text-ink-700">{sitter.headline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-600">
                <Rating value={sitter.rating} count={sitter.reviewCount} />
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" aria-hidden /> {sitter.neighborhood}, {brand.city}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {sitter.certifications.map((c) =>
                <Chip key={c} tone="primary">{c}</Chip>
                )}
              </div>
            </div>
          </header>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) =>
            <div key={s.sub} className="rounded-2xl bg-white p-4 ring-1 ring-ink-200">
                <s.icon className="h-5 w-5 text-primary-600" aria-hidden />
                <dt className="sr-only">{s.sub}</dt>
                <dd className="mt-2 font-semibold text-ink-900">{s.label}</dd>
                <dd className="text-xs text-ink-600">{s.sub}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            <ListingSection id="about-heading" title={`About ${first}`} action={<Link to={`/u/${sitter.id}`} className="text-sm font-semibold text-primary-700 hover:underline">View profile</Link>}>
              <p className="max-w-3xl leading-relaxed text-ink-700">{sitter.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-700">
                <li className="flex items-center gap-2"><LanguagesIcon className="h-4 w-4 text-primary-600" aria-hidden /> {sitter.languages.join(', ')}</li>
                <li className="flex items-center gap-2"><CarIcon className="h-4 w-4 text-primary-600" aria-hidden /> {sitter.hasCar ? 'Has a car for pickups' : 'No car'}</li>
                {sitter.nonSmoker && <li className="flex items-center gap-2"><CigaretteOffIcon className="h-4 w-4 text-primary-600" aria-hidden /> Non-smoker</li>}
              </ul>
            </ListingSection>

            <ListingSection id="exp-heading" title="Experience & age groups">
              <ul className="grid gap-2 sm:grid-cols-5">
                {ageGroupOptions.map((a) => {
                  const on = sitter.ageGroups.includes(a.value);
                  return (
                    <li key={a.value} className={`rounded-2xl p-3 text-center ring-1 ${on ? 'bg-primary-50 ring-primary-200' : 'bg-white ring-ink-200 opacity-60'}`}>
                      <p className={`text-sm font-semibold ${on ? 'text-primary-800' : 'text-ink-600 line-through'}`}>{a.value}</p>
                      <p className="text-xs text-ink-600">{a.hint}</p>
                      <span className="sr-only">{on ? 'Comfortable with this age group' : 'Not offered'}</span>
                    </li>);

                })}
              </ul>
              <p className="mt-4 text-sm text-ink-600">
                Care types: {careTypes.filter((c) => sitter.careTypes.includes(c.id)).map((c) => c.title).join(' · ')}
              </p>
            </ListingSection>

            <ListingSection id="cert-heading" title="Certifications & safety">
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
                  <ShieldCheckIcon className="h-6 w-6 shrink-0 text-emerald-700" aria-hidden />
                  <div>
                    <p className="font-semibold text-emerald-900">Background check passed</p>
                    <p className="text-sm text-emerald-800">Identity, criminal & sex-offender registry · {formatDate(sitter.backgroundCheckDate, 'MMM d, yyyy')}</p>
                  </div>
                </li>
                {sitter.certifications.map((c) => {
                  const Icon = certIcons[c];
                  return (
                    <li key={c} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink-200">
                      <Icon className="h-6 w-6 shrink-0 text-primary-600" aria-hidden />
                      <div>
                        <p className="font-semibold text-ink-900">{c} certified</p>
                        <p className="text-sm text-ink-600">Verified by {brand.name}</p>
                      </div>
                    </li>);

                })}
              </ul>
            </ListingSection>

            <ListingSection id="avail-heading" title="Weekly availability">
              <AvailabilityGrid availability={sitter.availability} />
              <p className="mt-3 text-sm text-ink-600">Need a different time? Send a request — {first} often makes it work.</p>
            </ListingSection>

            <ListingSection id="rates-heading" title="Rates">
              <dl className="divide-y divide-ink-200 overflow-hidden rounded-3xl border border-ink-200 bg-white text-sm">
                {[
                ['Hourly rate (1 child)', `$${sitter.hourlyRate}/hour`],
                ['Each additional child', `+$${sitter.extraChildRate}/hour`],
                ['Maximum kids per sit', `${sitter.maxKids}`],
                ['Minimum booking', `${brand.minimumBookingHours} hours`],
                ['Booking & safety fee', `${Math.round(brand.bookingFeePercent * 100)}% at checkout`]].
                map(([k, v]) =>
                <div key={k} className="flex justify-between px-5 py-3.5">
                    <dt className="text-ink-600">{k}</dt>
                    <dd className="font-semibold text-ink-900">{v}</dd>
                  </div>
                )}
              </dl>
            </ListingSection>

            <ListingSection id="reviews-heading" title={`Reviews from parents (${sitter.reviewCount})`} action={<Rating value={sitter.rating} size="md" />}>
              <ReviewList reviews={reviews} />
            </ListingSection>

            <ListingSection id="area-heading" title="Service area">
              <p className="mb-4 text-sm text-ink-600">
                Travels up to {sitter.serviceRadiusMiles} miles from {sitter.neighborhood}. Exact address shared after booking.
              </p>
              <ServiceAreaMap lat={sitter.lat} lng={sitter.lng} radiusMiles={sitter.serviceRadiusMiles} />
            </ListingSection>
          </div>
        </div>

        <aside id="booking" className="scroll-mt-24 self-start lg:sticky lg:top-24">
          <BookingPanel sitter={sitter} />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-ink-200 bg-white px-4 py-3 lg:hidden">
        <p className="text-sm text-ink-600">
          <span className="text-lg font-bold text-ink-900">${sitter.hourlyRate}</span> /hour
        </p>
        <a href="#booking" className={buttonLinkClass('primary', 'md')}>
          Request sitter
        </a>
      </div>
    </div>);

}