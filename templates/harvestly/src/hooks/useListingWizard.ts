import { useState } from "react";
import { CategoryId, FulfillmentType, Practice, Unit } from "../types/marketplace";

export interface ListingDraft {
  title: string;
  description: string;
  category: CategoryId | "";
  practices: Practice[];
  organic: boolean;
  unit: Unit;
  stock: string;
  harvestNote: string;
  price: string;
  fulfillment: FulfillmentType[];
  pickupDays: string[];
  deliveryZones: string[];
  images: string[];
}

export const wizardSteps = [
{ id: "product", label: "Product" },
{ id: "category", label: "Category & practices" },
{ id: "unit", label: "Unit & stock" },
{ id: "price", label: "Price" },
{ id: "fulfillment", label: "Pickup & delivery" },
{ id: "photos", label: "Photos" }] as
const;

export type StepId = (typeof wizardSteps)[number]["id"];
export type DraftErrors = Partial<Record<keyof ListingDraft, string>>;

const initialDraft: ListingDraft = {
  title: "",
  description: "",
  category: "",
  practices: [],
  organic: false,
  unit: "lb",
  stock: "",
  harvestNote: "",
  price: "",
  fulfillment: ["pickup"],
  pickupDays: [],
  deliveryZones: [],
  images: []
};

function validate(step: StepId, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  if (step === "product") {
    if (d.title.trim().length < 3) e.title = "Give your product a name (3+ characters)";
    if (d.description.trim().length < 20) e.description = "Tell buyers a bit more (20+ characters)";
  }
  if (step === "category" && !d.category) e.category = "Choose a category";
  if (step === "unit" && (!d.stock || Number(d.stock) < 0)) e.stock = "Enter how many are available";
  if (step === "price" && (!d.price || Number(d.price) <= 0)) e.price = "Enter a price above $0";
  if (step === "fulfillment") {
    if (d.fulfillment.length === 0) e.fulfillment = "Offer pickup, delivery, or both";else
    if (d.fulfillment.includes("pickup") && d.pickupDays.length === 0) e.pickupDays = "Choose at least one pickup day";else
    if (d.fulfillment.includes("delivery") && d.deliveryZones.length === 0) e.deliveryZones = "Choose at least one delivery zone";
  }
  if (step === "photos" && d.images.length === 0) e.images = "Add at least one photo";
  return e;
}

export function useListingWizard() {
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<StepId>>(new Set());
  const [errors, setErrors] = useState<DraftErrors>({});

  const step = wizardSteps[stepIndex].id;
  const isLast = stepIndex === wizardSteps.length - 1;

  function patch(p: Partial<ListingDraft>) {
    setDraft((d) => ({ ...d, ...p }));
    setErrors((e) => {
      const next = { ...e };
      (Object.keys(p) as (keyof ListingDraft)[]).forEach((k) => delete next[k]);
      return next;
    });
  }

  function next(): boolean {
    const e = validate(step, draft);
    setErrors(e);
    if (Object.keys(e).length) return false;
    setCompleted((c) => new Set(c).add(step));
    if (!isLast) setStepIndex((i) => i + 1);
    return true;
  }

  function back() {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function goTo(index: number) {
    const target = wizardSteps[index].id;
    const prevDone = wizardSteps.slice(0, index).every((s) => completed.has(s.id));
    if (prevDone || completed.has(target)) {
      setErrors({});
      setStepIndex(index);
    }
  }

  return { draft, patch, step, stepIndex, completed, errors, next, back, goTo, isLast };
}