import React from "react";
import { MapPinIcon } from "lucide-react";
import { locationSuggestions, serviceRegions } from "../../../data/filters";
import { chipClasses } from "../../../utils/chipClasses";
import { TextField } from "../../ui/TextField";
import type { ListingWizard } from "../useListingDraft";

export function ServiceAreaStep({ wizard }: {wizard: ListingWizard;}) {
  const { draft, update, toggle, errors } = wizard;
  return (
    <div className="space-y-8">
      <div>
        <TextField id="lw-baseCity" label="Where is your business based?" list="lw-cities" placeholder="City" value={draft.baseCity} onChange={(e) => update({ baseCity: e.target.value })} error={errors.baseCity} />
        <datalist id="lw-cities">
          {locationSuggestions.map((c) =>
          <option key={c} value={c} />
          )}
        </datalist>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="lw-radius" className="text-sm font-medium text-ink">How far will you travel?</label>
          <output htmlFor="lw-radius" className="text-sm font-semibold text-primary">
            {draft.travelRadius === 0 ? "On-site only" : `${draft.travelRadius} miles`}
          </output>
        </div>
        <input
          id="lw-radius"
          type="range"
          min={0}
          max={250}
          step={10}
          value={draft.travelRadius}
          onChange={(e) => update({ travelRadius: Number(e.target.value) })}
          className="mt-3 w-full accent-primary" />
        
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>On-site (venues)</span>
          <span>250 mi</span>
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Regions you serve</legend>
        <div id="lw-serviceRegions" tabIndex={-1} className="flex flex-wrap gap-2 focus:outline-none">
          {serviceRegions.map((r) =>
          <button key={r} type="button" aria-pressed={draft.serviceRegions.includes(r)} onClick={() => toggle("serviceRegions", r)} className={chipClasses(draft.serviceRegions.includes(r))}>
              {r}
            </button>
          )}
        </div>
        {errors.serviceRegions && <p className="mt-2 text-xs text-danger">{errors.serviceRegions}</p>}
      </fieldset>

      {draft.baseCity && draft.serviceRegions.length > 0 &&
      <p className="flex items-start gap-2 rounded-xl border border-line bg-canvas p-4 text-sm text-ink/85">
          <MapPinIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          Couples will see: “Based in {draft.baseCity}
          {draft.travelRadius > 0 ? `, travels up to ${draft.travelRadius} miles` : ""}. Serving {draft.serviceRegions.join(", ")}.”
        </p>
      }
    </div>);

}