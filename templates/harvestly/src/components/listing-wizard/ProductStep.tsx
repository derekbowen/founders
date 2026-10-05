import React from "react";
import { DraftErrors, ListingDraft } from "../../hooks/useListingWizard";
import { TextField } from "../ui/TextField";

interface Props {
  draft: ListingDraft;
  errors: DraftErrors;
  patch: (p: Partial<ListingDraft>) => void;
}

export function ProductStep({ draft, errors, patch }: Props) {
  return (
    <div className="space-y-5">
      <TextField
        label="Product name"
        value={draft.title}
        onChange={(e) => patch({ title: e.target.value })}
        placeholder="e.g. Heirloom tomato mix"
        error={errors.title}
        maxLength={60}
        hint={`${draft.title.length}/60 · Keep it short and specific`} />
      
      <div>
        <label htmlFor="desc" className="field-label">
          Description
        </label>
        <textarea
          id="desc"
          rows={5}
          value={draft.description}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder="Varieties, flavor, how it's grown and how to enjoy it…"
          className={`field-input resize-y ${errors.description ? "border-danger" : ""}`}
          aria-invalid={!!errors.description}
          aria-describedby="desc-help" />
        
        <p id="desc-help" className={`mt-1.5 text-xs ${errors.description ? "font-medium text-danger" : "text-muted"}`}>
          {errors.description ?? "Buyers love knowing the variety and when it was picked."}
        </p>
      </div>
    </div>);

}