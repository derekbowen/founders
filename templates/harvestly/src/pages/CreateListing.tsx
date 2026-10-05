import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, RocketIcon } from "lucide-react";
import { CategoryStep } from "../components/listing-wizard/CategoryStep";
import { FulfillmentStep } from "../components/listing-wizard/FulfillmentStep";
import { PhotosStep } from "../components/listing-wizard/PhotosStep";
import { PriceStep } from "../components/listing-wizard/PriceStep";
import { ProductStep } from "../components/listing-wizard/ProductStep";
import { UnitStockStep } from "../components/listing-wizard/UnitStockStep";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useCatalog } from "../contexts/CatalogContext";
import { wizardSteps, useListingWizard } from "../hooks/useListingWizard";

const descriptions: Record<string, string> = {
  product: "Name your product and describe what makes it special.",
  category: "Help buyers find it and show how it's grown.",
  unit: "How you sell it and how much you have this week.",
  price: "Set a fair price — you'll see exactly what you earn.",
  fulfillment: "Choose when and where buyers can get it.",
  photos: "Great photos sell. The first one becomes your cover."
};

export function CreateListing() {
  const w = useListingWizard();
  const { user } = useAuth();
  const { getFarm, farms, addProduct } = useCatalog();
  const navigate = useNavigate();
  const farm = getFarm(user?.farmId ?? "") ?? farms[0];
  const current = wizardSteps[w.stepIndex];

  function publish() {
    if (!w.next()) return;
    const id = `${w.draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
    const d = w.draft;
    addProduct({
      id,
      title: d.title.trim(),
      farmId: farm.id,
      category: d.category || "vegetables",
      price: Number(d.price),
      unit: d.unit,
      stock: Number(d.stock),
      images: d.images,
      description: d.description.trim(),
      practices: d.practices,
      organic: d.organic,
      fulfillment: d.fulfillment,
      inSeason: true,
      harvestNote: d.harvestNote || "Freshly harvested",
      rating: 0,
      reviewCount: 0
    });
    toast.success("Your listing is live! 🌱");
    navigate(`/listings/${id}`);
  }

  const stepProps = { draft: w.draft, errors: w.errors, patch: w.patch };

  return (
    <div className="container-site py-8 lg:py-12">
      <p className="text-sm font-semibold text-primary">{farm.name}</p>
      <h1 className="mt-1 font-display text-4xl font-semibold text-ink">New listing</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <nav aria-label="Listing steps">
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-line lg:hidden" aria-hidden="true">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(w.stepIndex + 1) / wizardSteps.length * 100}%` }} />
          </div>
          <p className="mb-2 text-sm text-muted lg:hidden">
            Step {w.stepIndex + 1} of {wizardSteps.length}
          </p>
          <ol className="hidden space-y-1 lg:block">
            {wizardSteps.map((s, i) => {
              const active = i === w.stepIndex;
              const done = w.completed.has(s.id);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => w.goTo(i)}
                    aria-current={active ? "step" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active ? "bg-paper font-semibold text-ink shadow-card" : "text-muted hover:bg-paper/60"}`
                    }>
                    
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      done ? "bg-primary text-white" : active ? "bg-accent text-white" : "border border-line bg-white text-muted"}`
                      }>
                      
                      {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                </li>);

            })}
          </ol>
        </nav>

        <section className="rounded-2xl border border-line bg-white/60 p-5 sm:p-8" aria-labelledby="step-title">
          <h2 id="step-title" className="font-display text-2xl font-semibold text-ink">
            {current.label}
          </h2>
          <p className="mb-6 mt-1 text-sm text-muted">{descriptions[current.id]}</p>

          {w.step === "product" && <ProductStep {...stepProps} />}
          {w.step === "category" && <CategoryStep {...stepProps} />}
          {w.step === "unit" && <UnitStockStep {...stepProps} />}
          {w.step === "price" && <PriceStep {...stepProps} />}
          {w.step === "fulfillment" && <FulfillmentStep {...stepProps} farm={farm} />}
          {w.step === "photos" && <PhotosStep {...stepProps} />}

          <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
            <Button variant="ghost" onClick={w.back} disabled={w.stepIndex === 0}>
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back
            </Button>
            {w.isLast ?
            <Button variant="accent" onClick={publish}>
                <RocketIcon className="h-4 w-4" aria-hidden="true" /> Publish listing
              </Button> :

            <Button onClick={w.next}>
                Next <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            }
          </div>
        </section>
      </div>
    </div>);

}