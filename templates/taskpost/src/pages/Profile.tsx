import React from 'react';
import { useParams } from 'react-router-dom';
import { BadgeCheckIcon, BriefcaseIcon, CalendarIcon, ClockIcon, MapPinIcon, MessageSquareIcon, PencilIcon, StarIcon, UserXIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { JobCard } from '../components/jobs/JobCard';
import { ReviewList } from '../components/profile/ReviewList';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CategoryIcon } from '../components/ui/CategoryIcon';
import { EmptyState } from '../components/ui/EmptyState';
import { categories } from '../data/categories';
import { useApp } from '../hooks/useApp';
import { formatDate } from '../utils/format';

export function Profile() {
  const { id } = useParams();
  const { user, getUser, jobs } = useApp();
  const profileId = id ?? user?.id;
  const profile = profileId ? getUser(profileId) : undefined;

  if (!profile) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <EmptyState
          icon={<UserXIcon className="h-5 w-5" />}
          title="Profile not found"
          description={id ? 'This member may have closed their account.' : 'Log in to see your profile.'}
          action={<ButtonLink to={id ? '/search' : '/login'}>{id ? 'Browse jobs' : 'Log in'}</ButtonLink>} />
        
      </div>);

  }

  const isMe = user?.id === profile.id;
  const isPro = profile.roles.includes('pro');
  const openJobs = jobs.filter((j) => j.customerId === profile.id && j.status === 'open');

  const stats = isPro ?
  [
  { icon: StarIcon, label: 'Rating', value: profile.rating?.toFixed(1) ?? '—', sub: `${profile.reviewCount ?? 0} reviews` },
  { icon: BriefcaseIcon, label: 'Jobs completed', value: String(profile.completedJobs ?? 0), sub: 'on the platform' },
  { icon: ClockIcon, label: 'Responds', value: profile.responseTime?.replace('within ', '') ?? '—', sub: 'typical reply time' }] :

  [
  { icon: BriefcaseIcon, label: 'Jobs posted', value: String(profile.jobsPosted ?? openJobs.length), sub: 'all time' },
  { icon: StarIcon, label: 'Rating from pros', value: profile.rating?.toFixed(1) ?? '—', sub: `${profile.reviewCount ?? 0} reviews` }];


  return (
    <div className="bg-ink-50">
      <div className="border-b border-ink-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <Avatar name={profile.name} alt={profile.name} size="xl" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">{profile.name}</h1>
                  {profile.verified &&
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary-800 ring-1 ring-inset ring-primary-200">
                      <BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      ID verified
                    </span>
                  }
                </div>
                {profile.headline && <p className="mt-1 font-semibold text-ink-700">{profile.headline}</p>}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                    {profile.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                    Member since {formatDate(profile.memberSince, 'MMMM yyyy')}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {profile.roles.map((r) =>
                  <span key={r} className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-700">
                      {r === 'pro' ? 'Pro' : 'Customer'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {isMe ?
              <ButtonLink to="/account/contact" variant="secondary" leftIcon={<PencilIcon className="h-4 w-4" />}>
                  Edit account
                </ButtonLink> :

              <ButtonLink to="/inbox" variant="secondary" leftIcon={<MessageSquareIcon className="h-4 w-4" />}>
                  Message
                </ButtonLink>
              }
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map(({ icon: Icon, label, value, sub }) =>
            <div key={label} className="rounded-2xl border border-ink-200 bg-ink-50 p-5">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-500">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 text-2xl font-extrabold capitalize text-ink-900">{value}</dd>
                <dd className="text-xs text-ink-500">{sub}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-8">
          <section aria-labelledby="about-heading" className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <h2 id="about-heading" className="text-lg font-extrabold text-ink-900">
              About {profile.name.split(' ')[0]}
            </h2>
            <p className="mt-2 leading-relaxed text-ink-700">{profile.bio}</p>
          </section>

          {openJobs.length > 0 &&
          <section aria-labelledby="open-jobs-heading">
              <h2 id="open-jobs-heading" className="mb-4 text-lg font-extrabold text-ink-900">
                Open jobs from {profile.name.split(' ')[0]}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {openJobs.map((j) =>
              <JobCard key={j.id} job={j} />
              )}
              </div>
            </section>
          }

          <section aria-labelledby="reviews-heading" className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
            <h2 id="reviews-heading" className="mb-5 text-lg font-extrabold text-ink-900">
              Reviews {profile.reviews.length > 0 && <span className="text-ink-500">({profile.reviews.length})</span>}
            </h2>
            {profile.reviews.length ?
            <ReviewList reviews={profile.reviews} /> :

            <p className="text-sm text-ink-600">No reviews yet.</p>
            }
          </section>
        </div>

        {isPro &&
        <aside className="space-y-6">
            {profile.categories && profile.categories.length > 0 &&
          <section aria-labelledby="services-heading" className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                <h2 id="services-heading" className="text-sm font-extrabold uppercase tracking-wide text-ink-500">
                  Services
                </h2>
                <ul className="mt-3 space-y-2">
                  {profile.categories.map((cid) =>
              <li key={cid} className="flex items-center gap-2.5 text-sm font-bold text-ink-900">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                        <CategoryIcon id={cid} />
                      </span>
                      {categories.find((c) => c.id === cid)?.name}
                    </li>
              )}
                </ul>
              </section>
          }
            {profile.skills &&
          <section aria-labelledby="skills-heading" className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                <h2 id="skills-heading" className="text-sm font-extrabold uppercase tracking-wide text-ink-500">
                  Skills
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {profile.skills.map((s) =>
              <li key={s} className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-bold text-ink-800">
                      {s}
                    </li>
              )}
                </ul>
              </section>
          }
          </aside>
        }
      </div>
    </div>);

}