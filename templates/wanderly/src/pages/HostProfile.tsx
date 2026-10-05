import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AwardIcon, BadgeCheckIcon, CalendarIcon, ClockIcon, LanguagesIcon, MapPinIcon, MessageCircleIcon, PlusCircleIcon, UserXIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { ExperienceCard } from '../components/ExperienceCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Stars } from '../components/ui/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { reviews } from '../data/reviews';
import type { Host } from '../types/marketplace';
import { getDestination, getExperiencesByHost, getHost } from '../utils/lookup';
import { formatDate } from '../utils/format';

export function HostProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const isMe = id === 'me';

  if (isMe && !user) return <Navigate to="/login?redirect=/u/me" replace />;

  const host: Host | undefined = isMe && user ?
  {
    id: 'me',
    name: `${user.firstName} ${user.lastName}`,
    destinationId: 'lisbon',
    headline: 'Traveler & aspiring host',
    bio: 'Add a bio in your account settings to tell guests what makes your experiences special.',
    languages: ['English'],
    joined: '2025-04-02',
    responseRate: 100,
    responseTime: 'within an hour',
    verified: true,
    localLegend: false,
    guestsHosted: 0
  } :
  getHost(id);

  if (!host) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState icon={UserXIcon} title="Host not found" description="This profile doesn't exist or is no longer active." action={<Button to="/s">Browse experiences</Button>} />
      </div>);

  }

  const listings = isMe ? [] : getExperiencesByHost(host.id);
  const hostReviews = reviews.filter((r) => listings.some((l) => l.id === r.experienceId));
  const destination = getDestination(host.destinationId);

  const facts = [
  { icon: MapPinIcon, text: `Lives in ${destination?.city}, ${destination?.country}` },
  { icon: LanguagesIcon, text: `Speaks ${host.languages.join(', ')}` },
  { icon: ClockIcon, text: `Responds ${host.responseTime}` },
  { icon: CalendarIcon, text: `Hosting since ${formatDate(host.joined, 'MMMM yyyy')}` }];


  return (
    <div className="bg-sand-50">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8 lg:py-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-8 text-center shadow-card">
            <div className="flex justify-center">
              <Avatar name={host.name} alt={host.name} src={host.avatar} size="xl" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">{host.name}</h1>
            <p className="mt-1 text-sm text-slate-600">{host.headline}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {host.verified &&
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-800">
                  <BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden />Verified
                </span>
              }
              {host.localLegend &&
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-800">
                  <AwardIcon className="h-3.5 w-3.5" aria-hidden />Local Legend
                </span>
              }
            </div>
            <dl className="mt-6 grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100 py-4">
              <div><dt className="text-xs text-slate-500">Guests</dt><dd className="font-display text-lg font-semibold text-slate-900">{host.guestsHosted.toLocaleString()}</dd></div>
              <div><dt className="text-xs text-slate-500">Response</dt><dd className="font-display text-lg font-semibold text-slate-900">{host.responseRate}%</dd></div>
              <div><dt className="text-xs text-slate-500">Listings</dt><dd className="font-display text-lg font-semibold text-slate-900">{listings.length}</dd></div>
            </dl>
            {isMe ?
            <Button to="/account/contact" variant="outline" fullWidth className="mt-6">Edit profile</Button> :

            <Button to="/inbox/trips" fullWidth className="mt-6" leftIcon={<MessageCircleIcon className="h-4 w-4" />}>Message {host.name.split(' ')[0]}</Button>
            }
          </div>
        </aside>

        <div className="space-y-12">
          <section aria-labelledby="about-host">
            <h2 id="about-host" className="text-2xl font-bold text-slate-900">About {host.name.split(' ')[0]}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-700">{host.bio}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {facts.map(({ icon: Icon, text }) =>
              <li key={text} className="flex items-center gap-3 text-sm text-slate-700">
                  <Icon className="h-5 w-5 text-primary-600" aria-hidden />{text}
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="host-listings">
            <h2 id="host-listings" className="mb-6 text-2xl font-bold text-slate-900">{isMe ? 'Your experiences' : `Experiences hosted by ${host.name.split(' ')[0]}`}</h2>
            {listings.length === 0 ?
            <EmptyState
              icon={PlusCircleIcon}
              title="No published experiences yet"
              description="Create your first listing — it only takes about 10 minutes."
              action={<Button to="/host/new/details">Create a listing</Button>} /> :


            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {listings.map((e) => <ExperienceCard key={e.id} experience={e} />)}
              </div>
            }
          </section>

          {hostReviews.length > 0 &&
          <section aria-labelledby="host-reviews">
              <h2 id="host-reviews" className="mb-6 text-2xl font-bold text-slate-900">What guests say</h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {hostReviews.map((r) =>
              <li key={r.id} className="rounded-2xl bg-white p-5 shadow-card">
                    <Stars rating={r.rating} />
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">“{r.text}”</p>
                    <p className="mt-3 text-xs font-semibold text-slate-900">{r.author} <span className="font-normal text-slate-500">· {r.country}</span></p>
                  </li>
              )}
              </ul>
            </section>
          }
        </div>
      </div>
    </div>);

}