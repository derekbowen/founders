import { useCallback, useState } from "react";
import { MAX_PACKAGES, MIN_PHOTOS, wizardSteps } from "../../data/wizardSteps";
import { samplePortfolio } from "../../data/images";
import type { DraftPackage, ListingDraft, WizardStepId } from "../../types/listingDraft";

type DraftErrors = Record<string, string>;
type ListKey = "languages" | "styles" | "serviceRegions";

const newPackage = (): DraftPackage => ({ id: `p-${Math.random().toString(36).slice(2, 8)}`, name: "", price: "", description: "" });

const initialDraft: ListingDraft = {
  businessName: "",
  tagline: "",
  description: "",
  yearsInBusiness: "",
  website: "",
  languages: ["English"],
  category: "",
  styles: [],
  startingPrice: "",
  priceUnit: "per event",
  minGuests: "",
  maxGuests: "",
  packages: [newPackage()],
  baseCity: "",
  travelRadius: 50,
  serviceRegions: [],
  photos: []
};

function validate(step: WizardStepId, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  if (step === "details") {
    if (d.businessName.trim().length < 2) e.businessName = "Enter your business name.";
    if (!d.tagline.trim()) e.tagline = "Add a short tagline couples will see first.";
    if (d.description.trim().length < 40) e.description = "Tell couples a bit more (at least 40 characters).";
    if (d.languages.length === 0) e.languages = "Choose at least one language.";
  }
  if (step === "category") {
    if (!d.category) e.category = "Choose the category that best fits your business.";
    if (d.styles.length === 0) e.styles = "Pick at least one style.";
  }
  if (step === "packages") {
    if (!d.startingPrice || Number(d.startingPrice) <= 0) e.startingPrice = "Enter your starting price.";
    if (d.minGuests && d.maxGuests && Number(d.maxGuests) < Number(d.minGuests)) e.maxGuests = "Must be greater than the minimum.";
    d.packages.forEach((p) => {
      if (!p.name.trim()) e[`pkg-${p.id}-name`] = "Name this package.";
      if (p.price === "" || Number(p.price) < 0) e[`pkg-${p.id}-price`] = "Add a starting price.";
    });
  }
  if (step === "area") {
    if (!d.baseCity.trim()) e.baseCity = "Where is your business based?";
    if (d.serviceRegions.length === 0) e.serviceRegions = "Select at least one region you serve.";
  }
  if (step === "photos") {
    if (d.photos.length < MIN_PHOTOS) e.photos = `Add at least ${MIN_PHOTOS} photos (${d.photos.length} added).`;
  }
  return e;
}

export function useListingDraft() {
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [completed, setCompleted] = useState<WizardStepId[]>([]);
  const [published, setPublished] = useState(false);
  const step = wizardSteps[stepIndex];
  const isLast = stepIndex === wizardSteps.length - 1;

  const clearError = (key: string) => setErrors((er) => er[key] ? { ...er, [key]: "" } : er);

  const update = useCallback((patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    Object.keys(patch).forEach(clearError);
  }, []);

  const toggle = useCallback((key: ListKey, value: string, max?: number) => {
    setDraft((d) => {
      const list = d[key];
      if (list.includes(value)) return { ...d, [key]: list.filter((x) => x !== value) };
      if (max && list.length >= max) return d;
      return { ...d, [key]: [...list, value] };
    });
    clearError(key);
  }, []);

  const addPackage = () => setDraft((d) => d.packages.length >= MAX_PACKAGES ? d : { ...d, packages: [...d.packages, newPackage()] });
  const removePackage = (id: string) => setDraft((d) => ({ ...d, packages: d.packages.filter((p) => p.id !== id) }));
  const updatePackage = (id: string, patch: Partial<DraftPackage>) => {
    setDraft((d) => ({ ...d, packages: d.packages.map((p) => p.id === id ? { ...p, ...patch } : p) }));
    Object.keys(patch).forEach((k) => clearError(`pkg-${id}-${k}`));
  };

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).
    filter((f) => f.type.startsWith("image/")).
    map((f) => URL.createObjectURL(f));
    setDraft((d) => ({ ...d, photos: [...d.photos, ...urls].slice(0, 12) }));
    clearError("photos");
  };
  const addSamples = () => {
    setDraft((d) => ({ ...d, photos: Array.from(new Set([...d.photos, ...samplePortfolio])).slice(0, 12) }));
    clearError("photos");
  };
  const removePhoto = (index: number) => setDraft((d) => ({ ...d, photos: d.photos.filter((_, i) => i !== index) }));
  const makeCover = (index: number) =>
  setDraft((d) => {
    const photos = [...d.photos];
    const [picked] = photos.splice(index, 1);
    return { ...d, photos: [picked, ...photos] };
  });

  const next = () => {
    const errs = validate(step.id, draft);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      window.setTimeout(() => document.getElementById(`lw-${first}`)?.focus(), 0);
      return;
    }
    setCompleted((c) => c.includes(step.id) ? c : [...c, step.id]);
    if (isLast) setPublished(true);else
    setStepIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const goTo = (index: number) => {
    const reachable = index <= completed.length;
    if (!reachable) return;
    setErrors({});
    setStepIndex(index);
  };

  const reset = () => {
    setDraft({ ...initialDraft, packages: [newPackage()] });
    setStepIndex(0);
    setCompleted([]);
    setErrors({});
    setPublished(false);
  };

  return {
    draft, step, stepIndex, isLast, errors, completed, published,
    update, toggle, addPackage, removePackage, updatePackage,
    addFiles, addSamples, removePhoto, makeCover,
    next, back, goTo, reset
  };
}

export type ListingWizard = ReturnType<typeof useListingDraft>;