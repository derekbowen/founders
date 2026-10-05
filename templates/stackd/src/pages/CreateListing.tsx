import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, RocketIcon, StoreIcon } from 'lucide-react';
import { StepDetails } from '../components/wizard/StepDetails';
import { StepCategory } from '../components/wizard/StepCategory';
import { StepFiles } from '../components/wizard/StepFiles';
import { StepPricing } from '../components/wizard/StepPricing';
import { StepCover } from '../components/wizard/StepCover';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/ToastProvider';
import { useStore } from '../contexts/StoreContext';
import { useListingDraft, wizardSteps } from '../hooks/useListingDraft';

const stepIntro = [
'Tell buyers what they’re getting. Clear titles sell better.',
'Pick where your product lives in the marketplace.',
'Attach the files buyers will download right after paying.',
'Set a fixed price or let buyers pay what they want.',
'Your cover is the first thing buyers see in search.'];


export function CreateListing() {
  const { user, addListing } = useStore();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { draft, update, step, maxStep, errors, next, back, goTo, toListing } = useListingDraft();
  const [publishing, setPublishing] = useState(false);

  if (!user) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={StoreIcon}
          title="Create an account to start selling"
          body="It’s free to list. You only pay a small fee when you make a sale."
          action={
          <div className="flex gap-2">
              <Link to="/signup" className="btn btn-accent">
                Sign up
              </Link>
              <Link to="/login" className="btn btn-outline">
                Log in
              </Link>
            </div>
          } />
        
      </div>);

  }

  const isLast = step === wizardSteps.length - 1;
  const stepProps = { draft, errors, update };

  const handleNext = () => {
    const ok = next();
    if (!ok || !isLast) return;
    setPublishing(true);
    window.setTimeout(() => {
      const listing = toListing(user.creatorId);
      addListing(listing);
      addToast({ type: 'success', message: 'Your product is live! 🎉' });
      navigate(`/l/${listing.slug}`);
    }, 900);
  };

  return (
    <div className="bg-paper py-8 md:py-12">
      <div className="container-page">
        <div className="mb-8">
          <p className="eyebrow mb-1">New listing</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Create a digital product</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <nav aria-label="Listing steps">
            <ol className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
              {wizardSteps.map((s, i) => {
                const active = i === step;
                const done = i < maxStep || i < step;
                const reachable = i <= maxStep;
                return (
                  <li key={s.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      disabled={!reachable}
                      aria-current={active ? 'step' : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      active ? 'border-ink bg-white shadow-pop-sm' : 'border-transparent hover:bg-white'}`
                      }>
                      
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs ${
                        active ? 'border-ink bg-brand' : done && i !== step ? 'border-ink bg-ink text-white' : 'border-ink/30 bg-white'}`
                        }>
                        
                        {done && i !== step ? <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> : i + 1}
                      </span>
                      {s.label}
                    </button>
                  </li>);

              })}
            </ol>
          </nav>

          <div className="card overflow-hidden">
            <div className="border-b border-ink px-6 py-5 md:px-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Step {step + 1} of {wizardSteps.length}
              </p>
              <h2 className="mt-1 text-2xl font-bold">{wizardSteps[step].label}</h2>
              <p className="mt-1 text-sm text-muted">{stepIntro[step]}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${(step + 1) / wizardSteps.length * 100}%` }} />
              </div>
            </div>
            <div className="px-6 py-6 md:px-8 md:py-8">
              {step === 0 && <StepDetails {...stepProps} />}
              {step === 1 && <StepCategory {...stepProps} />}
              {step === 2 && <StepFiles {...stepProps} />}
              {step === 3 && <StepPricing {...stepProps} />}
              {step === 4 && <StepCover {...stepProps} />}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-ink bg-paper px-6 py-4 md:px-8">
              <button type="button" onClick={back} disabled={step === 0} className="btn btn-outline">
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                Back
              </button>
              <button type="button" onClick={handleNext} disabled={publishing} className={`btn ${isLast ? 'btn-accent' : 'btn-ink'}`}>
                {isLast ?
                <>
                    <RocketIcon className="h-4 w-4" aria-hidden="true" />
                    {publishing ? 'Publishing…' : 'Publish listing'}
                  </> :

                <>
                    Continue
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}