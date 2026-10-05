import React from "react";
import { CheckIcon } from "lucide-react";
import { wizardSteps } from "../../data/wizardSteps";
import type { ListingWizard } from "./useListingDraft";

export function WizardNav({ wizard }: {wizard: ListingWizard;}) {
  const { stepIndex, completed, goTo } = wizard;
  const progress = (stepIndex + 1) / wizardSteps.length * 100;

  return (
    <>
      <div className="lg:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">{wizardSteps[stepIndex].label}</span>
          <span className="text-muted">Step {stepIndex + 1} of {wizardSteps.length}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={stepIndex + 1} aria-valuemin={1} aria-valuemax={wizardSteps.length} aria-label="Listing progress">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <nav aria-label="Listing steps" className="hidden lg:block">
        <ol className="space-y-1">
          {wizardSteps.map((s, i) => {
            const done = completed.includes(s.id);
            const current = i === stepIndex;
            const reachable = i <= completed.length;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  disabled={!reachable}
                  aria-current={current ? "step" : undefined}
                  className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors disabled:cursor-not-allowed ${
                  current ? "bg-surface shadow-soft" : reachable ? "hover:bg-blush/40" : ""}`
                  }>
                  
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    done && !current ? "bg-success text-white" : current ? "bg-primary text-white" : "border border-line bg-surface text-muted"}`
                    }>
                    
                    {done && !current ? <CheckIcon aria-hidden="true" className="h-4 w-4" /> : i + 1}
                  </span>
                  <span>
                    <span className={`block text-sm font-medium ${reachable ? "text-ink" : "text-muted"}`}>{s.label}</span>
                    <span className="block text-xs text-muted">{s.description}</span>
                  </span>
                </button>
              </li>);

          })}
        </ol>
      </nav>
    </>);

}