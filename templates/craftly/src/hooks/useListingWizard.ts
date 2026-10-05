import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { useListings } from '../contexts/ListingsContext';
import { processingTimeOptions, samplePhotos, wizardSteps } from '../data/listingWizard';
import type { Listing, ListingDraft } from '../types/marketplace';

export type WizardErrors = Partial<Record<keyof ListingDraft, string>>;

const emptyDraft: ListingDraft = {
  title: '',
  description: '',
  care: '',
  categoryId: '',
  materials: [],
  colors: [],
  madeToOrder: false,
  stock: '1',
  variations: [],
  price: '',
  shipping: true,
  shippingPrice: '8',
  processingTime: processingTimeOptions[1],
  localPickup: true,
  photos: []
};

function validateStep(step: number, d: ListingDraft): WizardErrors {
  const e: WizardErrors = {};
  if (step === 0) {
    if (d.title.trim().length < 4) e.title = 'Give your listing a title of at least 4 characters';
    if (d.description.trim().length < 20) e.description = 'Tell buyers a little more — at least 20 characters';
  }
  if (step === 1) {
    if (!d.categoryId) e.categoryId = 'Choose a category';
    if (d.materials.length === 0) e.materials = 'Pick at least one material';
  }
  if (step === 2) {
    if (!d.madeToOrder && (!Number(d.stock) || Number(d.stock) < 1)) e.stock = 'Enter how many you have in stock';
    if (d.variations.some((v) => !v.name.trim() || v.options.length === 0)) e.variations = 'Each variation needs a name and at least one option';
  }
  if (step === 3) {
    if (!Number(d.price) || Number(d.price) < 1) e.price = 'Enter a price of at least $1';
  }
  if (step === 4) {
    if (!d.shipping && !d.localPickup) e.shipping = 'Offer shipping, local pickup, or both';
    if (d.shipping && (d.shippingPrice === '' || Number(d.shippingPrice) < 0)) e.shippingPrice = 'Enter a shipping price (0 for free)';
  }
  if (step === 5) {
    if (d.photos.length === 0) e.photos = 'Add at least one photo';
  }
  return e;
}

export function useListingWizard() {
  const { user } = useAuth();
  const { getMaker, addListing } = useListings();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [maxVisited, setMaxVisited] = useState(0);
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const [errors, setErrors] = useState<WizardErrors>({});
  const [publishing, setPublishing] = useState(false);

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((k) => delete next[k as keyof ListingDraft]);
      return next;
    });
  };

  const next = () => {
    const e = validateStep(step, draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    const n = Math.min(step + 1, wizardSteps.length - 1);
    setStep(n);
    setMaxVisited((m) => Math.max(m, n));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const goTo = (i: number) => {
    if (i <= maxVisited) {
      setErrors({});
      setStep(i);
    }
  };

  const publish = async () => {
    for (let i = 0; i < wizardSteps.length; i++) {
      const e = validateStep(i, draft);
      if (Object.keys(e).length) {
        setStep(i);
        setErrors(e);
        toast.error('A few details still need attention.');
        return;
      }
    }
    const maker = getMaker(user?.shopId ?? 'm1');
    setPublishing(true);
    await new Promise((r) => setTimeout(r, 900));
    const id = `${draft.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString(36)}`;
    const listing: Listing = {
      id,
      title: draft.title.trim(),
      makerId: maker?.id ?? 'm1',
      categoryId: draft.categoryId || 'ceramics',
      price: Number(draft.price),
      image: draft.photos[0] ?? samplePhotos[0],
      stock: draft.madeToOrder ? 0 : Number(draft.stock),
      materials: draft.materials,
      colors: draft.colors,
      madeToOrder: draft.madeToOrder,
      processingTime: draft.processingTime,
      shipsFrom: maker?.state ?? 'Oregon',
      shippingPrice: draft.shipping ? Number(draft.shippingPrice) : 0,
      shippingDisabled: !draft.shipping,
      localPickup: draft.localPickup,
      description: draft.description.trim(),
      care: draft.care.trim() || 'Care instructions coming soon from the maker.',
      variations: draft.variations,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    addListing(listing);
    setPublishing(false);
    toast.success('Your listing is live!');
    navigate(`/l/${id}`);
  };

  return { step, maxVisited, draft, errors, update, next, back, goTo, publish, publishing, isLast: step === wizardSteps.length - 1 };
}