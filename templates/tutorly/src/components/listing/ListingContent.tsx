import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BadgeCheckIcon,
  ClockIcon,
  GlobeIcon,
  MapPinIcon,
  MessageCircleIcon,
  UsersIcon,
  CheckIcon,
  PencilIcon } from
'lucide-react';
import { TutorPhoto } from '../tutors/TutorPhoto';
import { RatingStars } from '../tutors/RatingStars';
import { IntroVideo } from './IntroVideo';
import { ListingSection } from './ListingSection';
import { SubjectsLevels } from './SubjectsLevels';
import { CredentialsList } from './CredentialsList';
import { AvailabilityGrid } from './AvailabilityGrid';
import { ReviewsList } from './ReviewsList';
import { BookingPanel } from './BookingPanel';
import { useBooking } from '../../hooks/useBooking';
import { useAuth } from '../../contexts/AuthContext';
import { reviews } from '../../data/reviews';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/format';
import { getWeeklyHours } from '../../utils/availability';
import { linkButton } from '../../utils/buttonStyles';
import type { Tutor } from '../../types/marketplace';

export function ListingContent({ tutor }: {tutor: Tutor;}) {
  const booking = useBooking(tutor);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const isOwnListing = tutor.id === 'me';
  const tutorReviews = reviews.filter((r) => r.tutorId === tutor.id);

  const handleBook = () => {
    if (!booking.draft) return;
    const state = { booking: booking.draft };
    if (!isSignedIn) navigate('/login', { state: { from: '/checkout', fromState: state } });else
    navigate('/checkout', { state });
  };

  const facts = [
  { icon: UsersIcon, label: `${tutor.studentsCount} students · ${tutor.lessonsTaught.toLocaleString()} lessons` },
  { icon: MessageCircleIcon, label: `Responds ${tutor.responseTime}` },
  { icon: GlobeIcon, label: `Speaks ${tutor.languages.join(', ')}` },
  { icon: ClockIcon, label: `${getWeeklyHours(tutor)} open hours / week` }];


  return (
    <div className="mx-auto max-w-page px-4 pb-28 pt-6 sm:px-6 lg:pb-16">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-500">
        <Link to="/search" className="hover:text-primary-700">Tutors</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-800">{tutor.name}</span>
      </nav>

      {isOwnListing &&
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-accent-300 bg-accent-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-800">This is how learners see your listing.</p>
          <Link to="/listings/new" className={`${linkButton.base} ${linkButton.secondary} !py-2`}>
            <PencilIcon size={14} aria-hidden="true" /> Edit listing
          </Link>
        </div>
      }

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <header className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <TutorPhoto name={tutor.name} src={tutor.photo} className="h-24 w-24 shrink-0 rounded-3xl sm:h-28 sm:w-28" />
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight text-ink-900">
                {tutor.name}
                {tutor.verified && <BadgeCheckIcon size={24} className="text-primary-600" aria-label="Verified tutor" />}
              </h1>
              <p className="mt-1 text-lg text-ink-700">{tutor.headline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-600">
                <RatingStars rating={tutor.rating} showValue reviewCount={tutor.reviewCount} />
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon size={14} aria-hidden="true" /> {tutor.city}, {tutor.country}
                </span>
                <Link to={`/u/${tutor.id}`} className="font-medium text-primary-700 hover:text-primary-800">View profile</Link>
              </div>
            </div>
          </header>

          <div className="mt-6">
            <IntroVideo tutorName={tutor.firstName} photo={tutor.photo} />
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {facts.map((f) =>
            <li key={f.label} className="flex items-center gap-2.5 text-sm text-ink-700">
                <f.icon size={18} className="text-primary-600" aria-hidden="true" /> {f.label}
              </li>
            )}
          </ul>

          <div className="mt-8">
            <ListingSection id="about" title={`About ${tutor.firstName}`}>
              <p className="leading-relaxed text-ink-700">{tutor.bio}</p>
            </ListingSection>
            <ListingSection id="subjects" title="Subjects & levels">
              <SubjectsLevels items={tutor.subjects} />
            </ListingSection>
            <ListingSection id="credentials" title="Education & credentials" description={`Checked by the ${brand.name} trust team.`}>
              <CredentialsList items={tutor.education} />
            </ListingSection>
            <ListingSection id="style" title="Teaching style">
              <p className="leading-relaxed text-ink-700">{tutor.teachingStyle}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tutor.teachingHighlights.map((h) =>
                <li key={h} className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-sm font-medium text-ink-900">
                    <CheckIcon size={14} aria-hidden="true" /> {h}
                  </li>
                )}
              </ul>
            </ListingSection>
            <ListingSection id="availability" title="Weekly availability" description="Pick an open hour to start your booking.">
              <AvailabilityGrid
                tutor={tutor}
                selectedDateKey={booking.dateKey}
                selectedHour={booking.startHour}
                selectedHours={booking.hours}
                onSelect={booking.selectSlot} />
              
            </ListingSection>
            <ListingSection id="reviews" title="Reviews from students & parents">
              <ReviewsList reviews={tutorReviews} rating={tutor.rating} reviewCount={tutor.reviewCount} />
            </ListingSection>
          </div>
        </div>

        <aside aria-label="Book a lesson" className="lg:sticky lg:top-24 lg:self-start">
          <BookingPanel tutor={tutor} booking={booking} onBook={handleBook} isOwnListing={isOwnListing} />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-ink-200 bg-white px-4 py-3 lg:hidden">
        <p>
          <span className="text-lg font-semibold text-ink-900">{formatMoney(tutor.hourlyRate)}</span>
          <span className="text-sm text-ink-500"> / hour</span>
        </p>
        <a href="#booking-panel" className={`${linkButton.base} ${linkButton.primary} !py-2.5`}>
          Book lesson
        </a>
      </div>
    </div>);

}