import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { CheckIcon, ChevronLeftIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { AuthGate } from '../components/AuthGate';
import { StepSpaceType, StepSize, StepAccess } from '../components/wizard/StepsSpace';
import { StepLocation, StepPricing, StepAvailability, StepPhotos } from '../components/wizard/StepsDetails';
import { useMarketplace } from '../contexts/MarketplaceContext';
import type { DraftErrors, ListingDraft, StepProps } from '../types/listingDraft';
import type { Listing } from '../types/marketplace';
import { brand } from '../data/brand';
import { ui, cx } from '../utils/styles';

const steps: Array<{id: string;title: string;text: string;Component: React.ComponentType<StepProps>;}> = [
{ id: 'type', title: 'Space type', text: 'What kind of space are you renting out?', Component: StepSpaceType },
{ id: 'size', title: 'Size & dimensions', text: 'Accurate measurements help storers pick the right fit.', Component: StepSize },
{ id: 'access', title: 'Access & features', text: 'When can storers visit, and what’s included?', Component: StepAccess },
{ id: 'location', title: 'Location', text: 'Where is the space?', Component: StepLocation },
{ id: 'pricing', title: 'Pricing', text: 'Set a monthly price. Bookings are charged by the day.', Component: StepPricing },
{ id: 'availability', title: 'Availability', text: 'When can storers move in?', Component: StepAvailability },
{ id: 'photos', title: 'Photos', text: 'Great photos are the #1 driver of bookings.', Component: StepPhotos }];


const initialDraft: ListingDraft = {
  type: null,
  title: '',
  width: '',
  length: '',
  height: '',
  accessHours: 'Daily, 8am–8pm',
  accessFrequency: 'weekly',
  climateControlled: false,
  access247: false,
  groundFloor: true,
  vehicleStorage: false,
  security: ['Lockable door'],
  neighborhood: '',
  address: '',
  zip: '',
  monthlyPrice: '',
  deposit: '50',
  availableFrom: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
  minDays: '30',
  photos: [],
  description: ''
};

function validate(stepId: string, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  if (stepId === 'type') {
    if (!d.type) e.type = 'Choose a space type';
    if (d.title.trim().length < 8) e.title = 'Add a title of at least 8 characters';
  }
  if (stepId === 'size') {
    if (!(Number(d.width) > 0)) e.width = 'Required';
    if (!(Number(d.length) > 0)) e.length = 'Required';
  }
  if (stepId === 'location') {
    if (!d.address.trim()) e.address = 'Enter the street address';
    if (!d.neighborhood) e.neighborhood = 'Choose a neighborhood';
    if (d.zip.length !== 5) e.zip = 'Enter a 5-digit ZIP';
  }
  if (stepId === 'pricing' && !(Number(d.monthlyPrice) >= 10)) e.monthlyPrice = 'Set a price of at least $10';
  if (stepId === 'availability' && !d.availableFrom) e.availableFrom = 'Choose a date';
  if (stepId === 'photos' && d.photos.length < 2) e.photos = 'Add at least 2 photos';
  return e;
}

export function CreateListing() {
  return (
    <AuthGate title="listing editor">
      <Wizard />
    </AuthGate>);

}

function Wizard() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { addListing, user } = useMarketplace();
  const [index, setIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [publishing, setPublishing] = useState(false);

  const step = steps[index];
  const set: StepProps['set'] = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const next = () => {
    const e = validate(step.id, draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (index === steps.length - 1) return publish();
    setIndex(index + 1);
    setMaxReached(Math.max(maxReached, index + 1));
    window.scrollTo({ top: 0 });
  };

  const publish = () => {
    setPublishing(true);
    setTimeout(() => {
      const hood = draft.neighborhood;
      const id = `${draft.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString(36)}`;
      const listing: Listing = {
        id,
        title: draft.title.trim(),
        type: draft.type ?? 'garage',
        neighborhood: hood,
        city: 'Portland, OR',
        lat: brand.marketplace.mapCenter[0] + (Math.random() - 0.5) * 0.06,
        lng: brand.marketplace.mapCenter[1] + (Math.random() - 0.5) * 0.08,
        monthlyPrice: Number(draft.monthlyPrice),
        deposit: Number(draft.deposit) || 0,
        width: Number(draft.width),
        length: Number(draft.length),
        height: Number(draft.height) || undefined,
        images: draft.photos,
        rating: 5,
        reviewCount: 0,
        hostId: user?.id ?? 'me',
        climateControlled: draft.climateControlled,
        access247: draft.access247,
        groundFloor: draft.groundFloor,
        vehicleStorage: draft.vehicleStorage,
        security: draft.security,
        accessHours: draft.accessHours,
        accessFrequency: draft.accessFrequency,
        accessNotes: 'Details shared after booking is accepted.',
        prohibited: ['Food or perishables', 'Flammable liquids, fuel or propane', 'Firearms or ammunition', 'Live animals or plants', 'Illegal or stolen items'],
        description: draft.description || 'A clean, secure storage space hosted by a verified neighbor.',
        minDays: Number(draft.minDays)
      };
      addListing(listing);
      addToast({ type: 'success', message: 'Your space is live! Requests will appear in your Hosting inbox.' });
      navigate(`/l/${id}`);
    }, 900);
  };

  const StepComponent = step.Component;

  return (
    <div className="bg-stone-50 pb-16">
      <div className={cx(ui.container, 'grid gap-8 pt-8 lg:grid-cols-[260px_minmax(0,1fr)]')}>
        <nav aria-label="Listing steps" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold text-stone-500">New listing</p>
          <p className="mt-1 text-xs text-stone-500">Step {index + 1} of {steps.length}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-stone-200 lg:hidden">
            <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${(index + 1) / steps.length * 100}%` }} />
          </div>
          <ol className="mt-4 hidden space-y-1 lg:block">
            {steps.map((s, i) => {
              const done = i < index || i <= maxReached && i !== index && i < maxReached;
              const reachable = i <= maxReached;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? 'step' : undefined}
                    className={cx(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      i === index ? 'bg-white font-semibold text-stone-900 shadow-soft' : reachable ? 'text-stone-700 hover:bg-white' : 'cursor-not-allowed text-stone-400'
                    )}>
                    
                    <span className={cx('grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold', done ? 'bg-brand-600 text-white' : i === index ? 'border-2 border-brand-600 text-brand-700' : 'border border-stone-300 text-stone-500')}>
                      {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    {s.title}
                  </button>
                </li>);

            })}
          </ol>
        </nav>

        <div className="rounded-2xl border border-stone-200 bg-white">
          <div className="border-b border-stone-200 p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-stone-900">{step.title}</h1>
            <p className="mt-1 text-stone-600">{step.text}</p>
          </div>
          <div className="p-6 sm:p-8">
            <StepComponent draft={draft} set={set} errors={errors} />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-stone-200 p-6 sm:px-8">
            <Button
              variant="tertiary"
              leftIcon={<ChevronLeftIcon className="h-4 w-4" />}
              onClick={() => setIndex(Math.max(0, index - 1))}
              disabled={index === 0}>
              
              Back
            </Button>
            <Button onClick={next} loading={publishing} size="large" className={ui.btnBrand}>
              {index === steps.length - 1 ? 'Publish listing' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>);

}