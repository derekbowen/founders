import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheckIcon, CalendarIcon, GlobeIcon, MapPinIcon, MailCheckIcon, ShieldCheckIcon, UserXIcon, PencilIcon } from 'lucide-react';
import { TutorPhoto } from '../components/tutors/TutorPhoto';
import { TutorCard } from '../components/tutors/TutorCard';
import { ReviewsList } from '../components/listing/ReviewsList';
import { EmptyState } from '../components/common/EmptyState';
import { reviews } from '../data/reviews';
import { getTutorById } from '../utils/tutors';
import { linkButton } from '../utils/buttonStyles';

export function ProfilePage() {
  const { tutorId } = useParams();
  const tutor = getTutorById(tutorId);

  if (!tutor) {
    return (
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6">
        <EmptyState
          icon={UserXIcon}
          title="Profile not found"
          description="This user may have closed their account."
          action={<Link to="/search" className={`${linkButton.base} ${linkButton.primary}`}>Browse tutors</Link>} />
        
      </div>);

  }

  const isMe = tutor.id === 'me';
  const tutorReviews = reviews.filter((r) => r.tutorId === tutor.id);
  const verifications = [
  { icon: BadgeCheckIcon, label: 'Identity verified' },
  { icon: MailCheckIcon, label: 'Email & phone verified' },
  { icon: ShieldCheckIcon, label: 'Background check passed' }];

  const stats = [
  { label: 'Rating', value: tutor.rating.toFixed(2) },
  { label: 'Lessons', value: tutor.lessonsTaught.toLocaleString() },
  { label: 'Students', value: String(tutor.studentsCount) }];


  return (
    <div>
      <div className="relative h-32 overflow-hidden bg-primary-600 sm:h-40" aria-hidden="true">
        <div className="absolute -top-10 right-[10%] h-40 w-40 rounded-full bg-accent-300" />
        <div className="absolute -bottom-16 right-[24%] h-28 w-28 rounded-full bg-primary-400" />
      </div>
      <div className="mx-auto max-w-page px-4 pb-16 sm:px-6">
        <div className="-mt-14 grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-5">
            <div className="rounded-3xl border border-ink-200 bg-white p-6 text-center shadow-card">
              <TutorPhoto name={tutor.name} src={tutor.photo} className="mx-auto h-28 w-28 rounded-full border-4 border-white shadow-card" />
              <h1 className="mt-4 text-2xl font-semibold text-ink-900">{tutor.name}</h1>
              <p className="mt-1 text-sm text-ink-600">{tutor.headline}</p>
              <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-200 pt-5">
                {stats.map((s) =>
                <div key={s.label}>
                    <dd className="text-lg font-semibold text-ink-900">{s.value}</dd>
                    <dt className="text-xs text-ink-500">{s.label}</dt>
                  </div>
                )}
              </dl>
              {isMe &&
              <Link to="/account/contact" className={`${linkButton.base} ${linkButton.secondary} mt-5 w-full !py-2`}>
                  <PencilIcon size={14} aria-hidden="true" /> Edit profile
                </Link>
              }
            </div>
            <div className="rounded-3xl border border-ink-200 bg-white p-6">
              <ul className="space-y-3 text-sm text-ink-700">
                <li className="flex items-center gap-2.5"><MapPinIcon size={16} className="text-primary-600" aria-hidden="true" /> {tutor.city}, {tutor.country}</li>
                <li className="flex items-center gap-2.5"><GlobeIcon size={16} className="text-primary-600" aria-hidden="true" /> {tutor.languages.join(', ')}</li>
                <li className="flex items-center gap-2.5"><CalendarIcon size={16} className="text-primary-600" aria-hidden="true" /> Member since {tutor.memberSince}</li>
              </ul>
              <ul className="mt-5 space-y-2 border-t border-ink-200 pt-5">
                {verifications.map((v) =>
                <li key={v.label} className="flex items-center gap-2.5 text-sm text-ink-800">
                    <v.icon size={16} className="text-green-700" aria-hidden="true" /> {v.label}
                  </li>
                )}
              </ul>
            </div>
          </aside>

          <div className="space-y-10 pt-4 lg:pt-20">
            <section aria-labelledby="bio-heading">
              <h2 id="bio-heading" className="text-xl font-semibold text-ink-900">About {tutor.firstName}</h2>
              <p className="mt-3 leading-relaxed text-ink-700">{tutor.bio}</p>
            </section>
            <section aria-labelledby="listing-heading">
              <h2 id="listing-heading" className="text-xl font-semibold text-ink-900">
                {isMe ? 'Your listing' : `${tutor.firstName}'s listing`}
              </h2>
              <div className="mt-4 max-w-sm">
                <TutorCard tutor={tutor} />
              </div>
            </section>
            <section aria-labelledby="profile-reviews-heading">
              <h2 id="profile-reviews-heading" className="text-xl font-semibold text-ink-900">Reviews</h2>
              <div className="mt-4">
                <ReviewsList reviews={tutorReviews} rating={tutor.rating} reviewCount={tutor.reviewCount} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>);

}