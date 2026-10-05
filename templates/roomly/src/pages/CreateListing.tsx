import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, RocketIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { LoginRequired } from '../components/LoginRequired';
import { StepRoomDetails } from '../components/wizard/StepRoomDetails';
import { StepFlat } from '../components/wizard/StepFlat';
import { StepRent } from '../components/wizard/StepRent';
import { StepAvailability } from '../components/wizard/StepAvailability';
import { StepLocation } from '../components/wizard/StepLocation';
import { StepPhotos } from '../components/wizard/StepPhotos';
import { useApp } from '../contexts/AppContext';
import { useListingWizard, wizardSteps } from '../hooks/useListingWizard';
import { buttonStyles, cardStyles } from '../utils/styles';

const stepComponents = [StepRoomDetails, StepFlat, StepRent, StepAvailability, StepLocation, StepPhotos];

export function CreateListing() {
  const { currentUser } = useApp();
  if (!currentUser) {
    return <LoginRequired title="Log in to list your room" text="Create a free account to publish a listing and receive inquiries." />;
  }
  return <Wizard />;
}

function Wizard() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const wizard = useListingWizard();
  const { step, maxReached } = wizard;
  const StepComponent = stepComponents[step];
  const isLast = step === wizardSteps.length - 1;

  const handleNext = () => {
    if (isLast) {
      wizard.publish((id) => {
        addToast({ type: 'success', message: 'Your listing is live!' });
        navigate(`/l/${id}`);
      });
    } else if (wizard.next()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">New listing</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900">List your room</h1>

      {/* Mobile progress */}
      <div className="mt-6 lg:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-navy-900">{wizardSteps[step].label}</span>
          <span className="text-navy-500">
            Step {step + 1} of {wizardSteps.length}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full rounded-full bg-primary-400 transition-all"
            style={{ width: `${(step + 1) / wizardSteps.length * 100}%` }} />
          
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label="Listing steps" className="hidden lg:block">
          <ol className="sticky top-28 space-y-1">
            {wizardSteps.map((s, i) => {
              const done = i < step || i <= maxReached && i !== step;
              const active = i === step;
              const reachable = i <= maxReached;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => wizard.goTo(i)}
                    disabled={!reachable}
                    aria-current={active ? 'step' : undefined}
                    className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                    active ? 'bg-white shadow-card' : reachable ? 'hover:bg-white' : 'cursor-not-allowed opacity-60'}`
                    }>
                    
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      active ?
                      'bg-navy-900 text-white' :
                      done ?
                      'bg-primary-400 text-navy-900' :
                      'border-2 border-navy-200 text-navy-400'}`
                      }>
                      
                      {done && !active ? <CheckIcon size={14} strokeWidth={3} /> : i + 1}
                    </span>
                    <span>
                      <span className={`block text-sm font-semibold ${active ? 'text-navy-900' : 'text-navy-700'}`}>{s.label}</span>
                      <span className="block text-xs text-navy-500">{s.hint}</span>
                    </span>
                  </button>
                </li>);

            })}
          </ol>
        </nav>

        <div className={`${cardStyles} p-5 sm:p-8`}>
          <h2 className="text-xl font-semibold text-navy-900">{wizardSteps[step].label}</h2>
          <p className="mt-1 text-sm text-navy-500">{wizardSteps[step].hint}</p>
          <div className="mt-6">
            <StepComponent draft={wizard.draft} update={wizard.update} errors={wizard.errors} />
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6">
            <Button
              className={buttonStyles.ghost}
              leftIcon={<ArrowLeftIcon size={16} />}
              onClick={wizard.back}
              disabled={step === 0}>
              
              Back
            </Button>
            <Button
              size="large"
              loading={wizard.publishing}
              className={isLast ? buttonStyles.primary : buttonStyles.navy}
              rightIcon={isLast ? <RocketIcon size={17} /> : <ArrowRightIcon size={17} />}
              onClick={handleNext}>
              
              {isLast ? 'Publish listing' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>);

}