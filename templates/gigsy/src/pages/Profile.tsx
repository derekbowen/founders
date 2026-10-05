import React from 'react';
import { useParams } from 'react-router-dom';
import { BadgeCheckIcon, BriefcaseIcon, CalendarIcon, ClockIcon, GlobeIcon, LayoutGridIcon, MapPinIcon, UserXIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { ListingCard } from '../components/ListingCard';
import { ReviewList } from '../components/listing/ReviewList';
import { StarRating } from '../components/ui/StarRating';
import { EmptyState } from '../components/ui/EmptyState';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/format';
import { getListingsByFreelancer, getReviewsForFreelancer, getUser } from '../utils/lookup';

export function Profile() {
  const { userId = '' } = useParams();
  const { user: me } = useAuth();
  const profile = getUser(userId);

  if (!profile) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState icon={<UserXIcon className="h-6 w-6" />} title="Profile not found" text="This member may have closed their account." action={<ButtonLink to="/s">Browse services</ButtonLink>} />
      </div>);

  }

  const isMe = me?.id === profile.id;
  const services = getListingsByFreelancer(profile.id);
  const reviews = getReviewsForFreelancer(profile.id);
  const facts = [
  { icon: MapPinIcon, label: profile.location },
  { icon: GlobeIcon, label: profile.languages.join(', ') },
  { icon: ClockIcon, label: `Responds in ${profile.responseTime}` },
  { icon: BriefcaseIcon, label: `${profile.completedJobs} jobs completed` },
  { icon: CalendarIcon, label: `Member since ${formatDate(profile.memberSince, 'MMMM yyyy')}` }];


  return (
    <div>
      <div className="h-36 bg-primary-600 sm:h-44" aria-hidden="true">
        <div className="mx-auto flex h-full max-w-7xl items-end justify-end gap-3 px-8 pb-6">
          <span className="h-16 w-16 rounded-full bg-primary-500" />
          <span className="h-10 w-10 rounded-xl bg-accent-400" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="-mt-16">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <Avatar name={profile.name} alt={profile.name} src={profile.avatar} size="xl" hasBorder />
              <h1 className="mt-4 flex items-center gap-1.5 text-2xl font-extrabold tracking-tight text-slate-900">
                {profile.name}
                {profile.verified && <BadgeCheckIcon className="h-5 w-5 text-primary-600" aria-label="Verified" />}
              </h1>
              <p className="mt-1 text-sm text-slate-600">{profile.headline}{profile.company ? ` · ${profile.company}` : ''}</p>
              <div className="mt-3"><StarRating rating={profile.rating} count={profile.reviewCount} size="md" /></div>
              <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                {facts.map(({ icon: Icon, label }) =>
                <li key={label} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" /> {label}
                  </li>
                )}
              </ul>
              {profile.skills.length > 0 &&
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-5">
                  {profile.skills.map((s) =>
                <span key={s} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{s}</span>
                )}
                </div>
              }
              {isMe ?
              <ButtonLink to="/account/contact" variant="secondary" fullWidth className="mt-6">Edit profile</ButtonLink> :
              services[0] ?
              <ButtonLink to={`/l/${services[0].id}#request-quote`} fullWidth className="mt-6">Request a quote</ButtonLink> :
              null}
            </div>
          </aside>

          <div className="space-y-12 pt-8">
            <section aria-labelledby="bio-heading">
              <h2 id="bio-heading" className="text-xl font-bold text-slate-900">About {profile.name.split(' ')[0]}</h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">{profile.bio}</p>
            </section>

            <section aria-labelledby="services-heading">
              <div className="flex items-center justify-between">
                <h2 id="services-heading" className="text-xl font-bold text-slate-900">Services ({services.length})</h2>
                {isMe && <ButtonLink to="/create-listing" size="sm">New listing</ButtonLink>}
              </div>
              {services.length === 0 ?
              <EmptyState
                className="mt-4"
                icon={<LayoutGridIcon className="h-6 w-6" />}
                title={isMe ? 'You have no services yet' : 'No services listed'}
                text={isMe ? 'Create your first listing to start receiving quote requests.' : `${profile.name.split(' ')[0]} hires freelancers on this marketplace.`}
                action={isMe ? <ButtonLink to="/create-listing">Create a listing</ButtonLink> : undefined} /> :


              <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {services.map((l) => <li key={l.id}><ListingCard listing={l} /></li>)}
                </ul>
              }
            </section>

            <section aria-labelledby="profile-reviews-heading">
              <h2 id="profile-reviews-heading" className="mb-4 text-xl font-bold text-slate-900">Reviews ({reviews.length})</h2>
              <ReviewList reviews={reviews} />
            </section>
          </div>
        </div>
      </div>
    </div>);

}