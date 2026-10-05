import React from "react";
import { DraftErrors, ListingDraft } from "../../hooks/useListingWizard";
import { Unit } from "../../types/marketplace";
import { TextField } from "../ui/TextField";

const units: {value: Unit;hint: string;}[] = [
{ value: "lb", hint: "Tomatoes, apples, meat" },
{ value: "bunch", hint: "Carrots, kale, flowers" },
{ value: "dozen", hint: "Eggs" },
{ value: "half dozen", hint: "Duck eggs, buns" },
{ value: "pint", hint: "Berries" },
{ value: "jar", hint: "Honey, preserves" },
{ value: "loaf", hint: "Bread" },
{ value: "each", hint: "Cheese, comb, squash" }];


interface Props {
  draft: ListingDraft;
  errors: DraftErrors;
  patch: (p: Partial<ListingDraft>) => void;
}

export function UnitStockStep({ draft, errors, patch }: Props) {
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="field-label">Sold by the…</legend>
        <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {units.map((u) => {
            const selected = draft.unit === u.value;
            return (
              <button
                key={u.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => patch({ unit: u.value })}
                className={`rounded-xl border p-3 text-left transition ${
                selected ? "border-primary bg-primary-soft/50 ring-1 ring-primary" : "border-line bg-white hover:border-primary/40"}`
                }>
                
                <span className="block text-sm font-semibold capitalize text-ink">{u.value}</span>
                <span className="block text-xs text-muted">{u.hint}</span>
              </button>);

          })}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Available this week"
          type="number"
          inputMode="numeric"
          min={0}
          value={draft.stock}
          onChange={(e) => patch({ stock: e.target.value })}
          suffix={draft.unit}
          placeholder="40"
          error={errors.stock}
          hint="Stock decreases automatically as orders come in." />
        
        <TextField
          label="Harvest note (optional)"
          value={draft.harvestNote}
          onChange={(e) => patch({ harvestNote: e.target.value })}
          placeholder="Picked the morning of pickup" />
        
      </div>
    </div>);

}