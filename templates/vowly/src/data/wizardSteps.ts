import type { WizardStepId } from "../types/listingDraft";

export const wizardSteps: {id: WizardStepId;label: string;description: string;}[] = [
{ id: "details", label: "Business details", description: "Name, story and languages" },
{ id: "category", label: "Category & styles", description: "What you do and your aesthetic" },
{ id: "packages", label: "Packages & starting price", description: "Pricing overview — no checkout" },
{ id: "area", label: "Service area", description: "Where you work and travel" },
{ id: "photos", label: "Portfolio photos", description: "Show couples your best work" }];


export const priceUnitOptions = [
{ value: "per event", label: "Per event" },
{ value: "per guest", label: "Per guest" },
{ value: "per hour", label: "Per hour" },
{ value: "venue rental", label: "Venue rental" },
{ value: "per slice", label: "Per slice" }];


export const MAX_STYLES = 5;
export const MAX_PACKAGES = 4;
export const MIN_PHOTOS = 3;