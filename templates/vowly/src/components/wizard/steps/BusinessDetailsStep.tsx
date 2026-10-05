import React from "react";
import { languages } from "../../../data/filters";
import { chipClasses } from "../../../utils/chipClasses";
import { TextField } from "../../ui/TextField";
import { TextAreaField } from "../../ui/TextAreaField";
import type { ListingWizard } from "../useListingDraft";

export function BusinessDetailsStep({ wizard }: {wizard: ListingWizard;}) {
  const { draft, update, toggle, errors } = wizard;
  return (
    <div className="space-y-5">
      <TextField id="lw-businessName" label="Business name" placeholder="e.g. Golden Hour Atelier" value={draft.businessName} onChange={(e) => update({ businessName: e.target.value })} error={errors.businessName} />
      <TextField id="lw-tagline" label="Tagline" placeholder="One line that captures what makes you special" maxLength={80} value={draft.tagline} onChange={(e) => update({ tagline: e.target.value })} error={errors.tagline} hint={errors.tagline ? undefined : `${draft.tagline.length}/80`} />
      <TextAreaField
        id="lw-description"
        label="About your business"
        rows={6}
        placeholder="Share your story, your approach, and what couples can expect working with you."
        value={draft.description}
        onChange={(e) => update({ description: e.target.value })}
        error={errors.description}
        hint={errors.description ? undefined : `${draft.description.trim().length} characters · 40 minimum`} />
      
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Years in business" type="number" min={0} inputMode="numeric" optional value={draft.yearsInBusiness} onChange={(e) => update({ yearsInBusiness: e.target.value })} />
        <TextField label="Website" type="url" optional placeholder="https://" value={draft.website} onChange={(e) => update({ website: e.target.value })} />
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Languages you work in</legend>
        <div id="lw-languages" tabIndex={-1} className="flex flex-wrap gap-2 focus:outline-none">
          {languages.map((lang) =>
          <button key={lang} type="button" aria-pressed={draft.languages.includes(lang)} onClick={() => toggle("languages", lang)} className={chipClasses(draft.languages.includes(lang))}>
              {lang}
            </button>
          )}
        </div>
        {errors.languages && <p className="mt-1.5 text-xs text-danger">{errors.languages}</p>}
      </fieldset>
    </div>);

}