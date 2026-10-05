import { useState } from 'react';
import type { CategoryId, FileType, LicenseType, Listing, ListingFile } from '../types/marketplace';
import { slugify } from '../utils/format';

export interface ListingDraft {
  title: string;
  subtitle: string;
  description: string;
  included: string;
  category: CategoryId | '';
  files: ListingFile[];
  fileType: FileType;
  price: string;
  payWhatYouWant: boolean;
  minPrice: string;
  license: LicenseType;
  cover: string;
}

export type DraftErrors = Partial<Record<keyof ListingDraft, string>>;

export const wizardSteps = [
{ id: 'details', label: 'Product details' },
{ id: 'category', label: 'Category' },
{ id: 'files', label: 'Upload files' },
{ id: 'pricing', label: 'Pricing' },
{ id: 'cover', label: 'Cover & previews' }] as
const;

const emptyDraft: ListingDraft = {
  title: '',
  subtitle: '',
  description: '',
  included: '',
  category: '',
  files: [],
  fileType: 'PDF',
  price: '',
  payWhatYouWant: false,
  minPrice: '0',
  license: 'personal',
  cover: ''
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(0.1, bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

export function fileTypeFromName(name: string): FileType | null {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf' || ext === 'epub') return 'PDF';
  if (ext === 'zip') return 'ZIP';
  if (ext === 'mp3' || ext === 'wav') return 'MP3';
  if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') return 'XLSX';
  return null;
}

function validate(step: number, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  if (step === 0) {
    if (d.title.trim().length < 4) e.title = 'Give your product a title (at least 4 characters).';
    if (!d.subtitle.trim()) e.subtitle = 'Add a one-line summary.';
    if (d.description.trim().length < 20) e.description = 'Describe your product in at least 20 characters.';
  }
  if (step === 1 && !d.category) e.category = 'Choose a category so buyers can find it.';
  if (step === 2 && d.files.length === 0) e.files = 'Upload at least one file buyers will download.';
  if (step === 3) {
    const price = Number(d.price);
    if (d.price === '' || Number.isNaN(price) || price < 0) e.price = 'Enter a valid price.';
    if (d.payWhatYouWant) {
      const min = Number(d.minPrice);
      if (d.minPrice === '' || Number.isNaN(min) || min < 0) e.minPrice = 'Enter a minimum (0 for free).';else
      if (min > price) e.minPrice = 'Minimum can’t be higher than the suggested price.';
    } else if (price === 0) {
      e.price = 'Fixed-price products must cost more than $0. Turn on pay-what-you-want to offer it free.';
    }
  }
  if (step === 4 && !d.cover) e.cover = 'Choose or upload a cover image.';
  return e;
}

export function useListingDraft() {
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<DraftErrors>({});

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      Object.keys(patch).forEach((k) => delete next[k as keyof ListingDraft]);
      return next;
    });
  };

  const next = (): boolean => {
    const e = validate(step, draft);
    setErrors(e);
    if (Object.keys(e).length) return false;
    if (step < wizardSteps.length - 1) {
      setStep(step + 1);
      setMaxStep((m) => Math.max(m, step + 1));
    }
    return true;
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const goTo = (s: number) => {
    if (s <= maxStep) setStep(s);
  };

  const toListing = (creatorId: string): Listing => {
    const price = Number(draft.price);
    const min = draft.payWhatYouWant ? Number(draft.minPrice) : price;
    const totalMb = draft.files.reduce((sum, f) => sum + parseFloat(f.size) * (f.size.includes('GB') ? 1024 : 1), 0);
    const included = draft.included.
    split('\n').
    map((s) => s.trim()).
    filter(Boolean);
    return {
      id: `l-${Date.now()}`,
      slug: `${slugify(draft.title)}-${Date.now().toString(36).slice(-4)}`,
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      creatorId,
      category: draft.category || 'ebooks',
      price,
      payWhatYouWant: draft.payWhatYouWant,
      minPrice: min,
      fileType: draft.fileType,
      fileSize: totalMb >= 1024 ? `${(totalMb / 1024).toFixed(1)} GB` : `${totalMb.toFixed(1)} MB`,
      format: `${draft.files.length} file${draft.files.length > 1 ? 's' : ''} · ${draft.fileType}`,
      files: draft.files,
      cover: draft.cover,
      included: included.length ? included : draft.files.map((f) => f.name),
      description: draft.description.split('\n').filter((p) => p.trim()),
      rating: 0,
      reviewCount: 0,
      sales: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      tags: [],
      license: draft.license
    };
  };

  return { draft, update, step, maxStep, errors, next, back, goTo, toListing };
}