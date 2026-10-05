import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon, EyeOffIcon, FileQuestionIcon, ShieldCheckIcon } from 'lucide-react';
import { AvatarGroup } from '../components/Avatar';
import { AreaMap } from '../components/jobs/AreaMap';
import { CustomerCard } from '../components/listing/CustomerCard';
import { JobFacts } from '../components/listing/JobFacts';
import { OfferPanel } from '../components/listing/OfferPanel';
import { PhotoGallery } from '../components/listing/PhotoGallery';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CategoryIcon } from '../components/ui/CategoryIcon';
import { EmptyState } from '../components/ui/EmptyState';
import { categories } from '../data/categories';
import { useApp } from '../hooks/useApp';
import { formatBudget, pluralize, timeAgo } from '../utils/format';

export function Listing() {
  const { id } = useParams();
  const { getJob, getUser, users, user } = useApp();
  const job = id ? getJob(id) : undefined;

  if (!job) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <EmptyState
          icon={<FileQuestionIcon className="h-5 w-5" />}
          title="This job isn’t available"
          description="It may have been removed or filled. Browse other open jobs nearby."
          action={<ButtonLink to="/search">Browse jobs</ButtonLink>} />
        
      </div>);

  }

  const category = categories.find((c) => c.id === job.categoryId);
  const customer = getUser(job.customerId);
  const offerAvatars = users.
  filter((u) => u.roles.includes('pro') && u.id !== user?.id).
  slice(0, Math.min(job.offerCount, 6)).
  map((u) => ({ name: u.name, alt: u.name }));
  const showMobileBar = job.status === 'open' && user?.id !== job.customerId;

  return (
    <div className="bg-ink-50 pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-600">
            <li>
              <Link to="/search" className="font-semibold hover:text-ink-900">
                Find work
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRightIcon className="h-4 w-4 text-ink-400" />
            </li>
            <li>
              <Link to={`/search?category=${job.categoryId}`} className="font-semibold hover:text-ink-900">
                {category?.name}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRightIcon className="h-4 w-4 text-ink-400" />
            </li>
            <li aria-current="page" className="line-clamp-1 text-ink-500">
              {job.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-8">
            <PhotoGallery photos={job.photos} title={job.title} categoryId={job.categoryId} />

            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-800 ring-1 ring-inset ring-primary-200">
                  <CategoryIcon id={job.categoryId} className="h-3.5 w-3.5" />
                  {category?.name}
                </span>
                {job.status !== 'open' &&
                <span className="rounded-full bg-ink-200 px-2.5 py-1 text-xs font-bold text-ink-700">
                    {job.status === 'completed' ? 'Completed' : 'Hired'}
                  </span>
                }
                <span className="text-ink-500">Posted {timeAgo(job.postedAt)}</span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">{job.title}</h1>
            </div>

            <JobFacts job={job} />

            <section aria-labelledby="desc-heading">
              <h2 id="desc-heading" className="text-xl font-extrabold text-ink-900">
                What needs doing
              </h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-700">{job.description}</p>
              {job.details.length > 0 &&
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {job.details.map((d) =>
                <li key={d} className="flex items-start gap-2.5 text-sm font-semibold text-ink-800">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                        <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {d}
                    </li>
                )}
                </ul>
              }
            </section>

            <section aria-labelledby="loc-heading">
              <h2 id="loc-heading" className="text-xl font-extrabold text-ink-900">
                Location
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-600">
                <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                {job.area} · about {job.distanceMi} mi away. The exact address is shared once an offer is accepted.
              </p>
              <div className="mt-4">
                <AreaMap lat={job.lat} lng={job.lng} label={job.area} />
              </div>
            </section>

            <section aria-labelledby="offers-heading" className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
              <h2 id="offers-heading" className="text-lg font-extrabold text-ink-900">
                {job.offerCount === 0 ? 'No offers yet' : `${pluralize(job.offerCount, 'offer')} so far`}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {offerAvatars.length > 0 && <AvatarGroup avatars={offerAvatars} max={5} size="sm" />}
                <p className="text-sm text-ink-600">
                  Offer amounts are private between each pro and the customer. Budget: {formatBudget(job.budgetMin, job.budgetMax)}.
                </p>
              </div>
            </section>

            {customer && <CustomerCard customer={customer} />}

            <div className="flex items-start gap-3 rounded-2xl bg-ink-100 p-5 text-sm text-ink-700">
              <ShieldCheckIcon className="h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
              <p>
                Payment for this job is collected when the customer accepts an offer and held until they confirm the work is done.
                Never accept payment outside the platform.
              </p>
            </div>
          </div>

          <aside id="offer-panel" className="lg:sticky lg:top-24 lg:self-start">
            <OfferPanel job={job} />
          </aside>
        </div>
      </div>

      {showMobileBar &&
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-ink-200 bg-white px-4 py-3 lg:hidden">
          <div>
            <p className="text-xs text-ink-500">Budget</p>
            <p className="text-lg font-extrabold text-ink-900">{formatBudget(job.budgetMin, job.budgetMax)}</p>
          </div>
          <a
          href="#offer-panel"
          className="inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-bold text-white hover:bg-primary-700">
          
            Make an offer
          </a>
        </div>
      }
    </div>);

}