import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ChevronLeftIcon, PartyPopperIcon } from 'lucide-react';
import { SiteTypeStep } from '../components/wizard/SiteTypeStep';
import { LocationStep } from '../components/wizard/LocationStep';
import { CapacityStep } from '../components/wizard/CapacityStep';
import { OptionGridStep } from '../components/wizard/OptionGridStep';
import { PricingStep } from '../components/wizard/PricingStep';
import { CalendarStep } from '../components/wizard/CalendarStep';
import { PhotosStep } from '../components/wizard/PhotosStep';
import { activities, amenities } from '../data/amenities';
import { wizardSteps } from '../data/wizardSteps';
import type { ListingDraft } from '../types/listing';
import type { WizardStepKey } from '../types/wizard';
import { formatMoney } from '../utils/currency';
import { getSiteType } from '../utils/lookup';

const initialDraft: ListingDraft = {
  siteType: null,
  title: '',
  address: '',
  town: '',
  region: '',
  directions: '',
  maxCampers: 4,
  maxVehicles: 1,
  maxVehicleLength: 0,
  sites: 1,
  amenities: [],
  activities: [],
  price: 45,
  cleaningFee: 0,
  minNights: 1,
  checkIn: '2:00 PM',
  checkOut: '11:00 AM',
  instantBook: true,
  cancellation: 'Flexible',
  rules: '',
  blockedDates: [],
  photos: []
};

function stepError(key: WizardStepKey, d: ListingDraft): string {
  if (key === 'type' && !d.siteType) return 'Choose a site type to continue.';
  if (key === 'location' && (!d.title.trim() || !d.town.trim() || !d.region.trim())) return 'Add a title, town and region.';
  if (key === 'pricing' && d.price <= 0) return 'Set a nightly price above $0.';
  if (key === 'photos' && d.photos.length < 3) return 'Add at least 3 photos to publish.';
  return '';
}

export function CreateListing() {
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [index, setIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [showError, setShowError] = useState(false);
  const [published, setPublished] = useState(false);
  const step = wizardSteps[index];
  const error = stepError(step.key, draft);
  const isLast = index === wizardSteps.length - 1;

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setShowError(false);
  };

  const goTo = (i: number) => {
    setIndex(i);
    setShowError(false);
    window.scrollTo({ top: 0 });
  };

  const next = () => {
    if (error) {
      setShowError(true);
      return;
    }
    if (isLast) {
      setPublished(true);
      return;
    }
    setMaxReached((m) => Math.max(m, index + 1));
    goTo(index + 1);
  };

  if (published) {
    return (
      <div className="container-page max-w-2xl py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden shadow-card">
          {draft.photos[0] && <img src={draft.photos[0]} alt="" className="h-56 w-full object-cover" />}
          <div className="p-8 text-center md:p-10">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-50 text-accent-600">
              <PartyPopperIcon size={28} aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-3xl font-extrabold text-ink-900">Your land is live!</h1>
            <p className="mt-2 text-ink-600">
              <span className="font-semibold text-ink-900">{draft.title}</span> is now bookable at {formatMoney(draft.price)} / night. We’ll notify you as soon as the first request comes in.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/profile" className="btn-primary btn-lg">
                View your listings
              </Link>
              <Link to="/inbox?tab=hosting" className="btn-outline btn-lg">
                Hosting inbox
              </Link>
            </div>
          </div>
        </motion.div>
      </div>);

  }

  const stepBody: Record<WizardStepKey, React.ReactNode> = {
    type: <SiteTypeStep draft={draft} update={update} />,
    location: <LocationStep draft={draft} update={update} />,
    capacity: <CapacityStep draft={draft} update={update} />,
    amenities: <OptionGridStep label="Amenities" options={amenities} selected={draft.amenities} onChange={(v) => update({ amenities: v })} />,
    activities: <OptionGridStep label="Activities" options={activities} selected={draft.activities} onChange={(v) => update({ activities: v })} />,
    pricing: <PricingStep draft={draft} update={update} />,
    calendar: <CalendarStep draft={draft} update={update} />,
    photos: <PhotosStep draft={draft} update={update} />
  };

  return (
    <div className="container-page py-8 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside>
          <p className="eyebrow">New listing</p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink-900">Host on your land</h1>
          {draft.siteType && <p className="mt-1 text-sm text-ink-500">{getSiteType(draft.siteType).label} · {draft.title || 'Untitled'}</p>}
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-sand-200 lg:hidden" aria-hidden="true">
            <div className="h-full rounded-full bg-primary-700 transition-all" style={{ width: `${(index + 1) / wizardSteps.length * 100}%` }} />
          </div>
          <p className="mt-2 text-sm text-ink-500 lg:hidden">
            Step {index + 1} of {wizardSteps.length} · {step.label}
          </p>
          <nav aria-label="Listing steps" className="mt-6 hidden lg:block">
            <ol className="space-y-1">
              {wizardSteps.map((s, i) => {
                const done = i < index || i <= maxReached && !stepError(s.key, draft) && i !== index;
                const reachable = i <= maxReached;
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      disabled={!reachable}
                      onClick={() => goTo(i)}
                      aria-current={i === index ? 'step' : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      i === index ? 'bg-white font-semibold text-ink-900 shadow-card' : reachable ? 'text-ink-700 hover:bg-sand-100' : 'cursor-not-allowed text-ink-400'}`
                      }>
                      
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        done ? 'bg-primary-700 text-white' : i === index ? 'bg-accent-600 text-white' : 'bg-sand-200 text-ink-500'}`
                        }>
                        
                        {done ? <CheckIcon size={13} aria-hidden="true" /> : i + 1}
                      </span>
                      {s.label}
                    </button>
                  </li>);

              })}
            </ol>
          </nav>
        </aside>

        <section aria-labelledby="step-title" className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={step.key} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
              <h2 id="step-title" className="text-3xl font-bold text-ink-900">
                {step.title}
              </h2>
              <p className="mt-2 text-ink-500">{step.description}</p>
              <div className="mt-8">{stepBody[step.key]}</div>
            </motion.div>
          </AnimatePresence>

          {showError && error &&
          <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          }

          <div className="mt-10 flex items-center justify-between border-t border-sand-200 pt-6">
            <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} className="btn-ghost">
              <ChevronLeftIcon size={16} aria-hidden="true" /> Back
            </button>
            <button type="button" onClick={next} className={isLast ? 'btn-accent btn-lg' : 'btn-primary btn-lg'}>
              {isLast ? 'Publish listing' : 'Continue'}
            </button>
          </div>
        </section>
      </div>
    </div>);

}