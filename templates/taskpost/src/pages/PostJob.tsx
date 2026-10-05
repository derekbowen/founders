import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeftIcon, ArrowRightIcon, RocketIcon } from 'lucide-react';
import { JobPreviewCard } from '../components/postjob/JobPreviewCard';
import { StepBudget } from '../components/postjob/StepBudget';
import { StepCategory } from '../components/postjob/StepCategory';
import { StepDetails } from '../components/postjob/StepDetails';
import { StepLocation } from '../components/postjob/StepLocation';
import { StepPhotos } from '../components/postjob/StepPhotos';
import { StepTiming } from '../components/postjob/StepTiming';
import { WizardNav } from '../components/postjob/WizardNav';
import { AuthPrompt } from '../components/ui/AuthPrompt';
import { Button } from '../components/ui/Button';
import { useApp } from '../hooks/useApp';
import { usePostJobForm, type StepId } from '../hooks/usePostJobForm';
import type { StepProps } from '../types/postJob';

const stepComponents: Record<StepId, React.ComponentType<StepProps>> = {
  details: StepDetails,
  category: StepCategory,
  location: StepLocation,
  timing: StepTiming,
  budget: StepBudget,
  photos: StepPhotos
};

const stepIntros: Record<StepId, string> = {
  details: 'Tell pros what you need. Clear jobs get better offers.',
  category: 'This helps the right pros find your job.',
  location: 'Pros nearby will see your job first.',
  timing: 'Let pros know when they’d need to be available.',
  budget: 'Set a range you’re comfortable with. Pros will make offers around it.',
  photos: 'Photos help pros give accurate offers. You can skip this step.'
};

export function PostJob() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, postJob, enableRole } = useApp();
  const wizard = usePostJobForm({ title: params.get('title') ?? undefined, category: params.get('category') });
  const [publishing, setPublishing] = useState(false);

  if (!user) {
    return <AuthPrompt title="Log in to post a job" description="Create a free account to post jobs and receive offers from local pros." />;
  }

  const StepComponent = stepComponents[wizard.step.id];

  function handlePublish() {
    if (!wizard.validateAll()) return;
    if (!user!.roles.includes('customer')) enableRole('customer');
    setPublishing(true);
    setTimeout(() => {
      const job = postJob(wizard.form);
      toast.success('Your job is live! Pros nearby are being notified.');
      navigate(`/jobs/${job.id}`);
    }, 800);
  }

  return (
    <div className="bg-ink-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">Post a job</h1>
        <p className="mt-1 text-ink-600">Free to post. Get offers from local pros, usually within a few hours.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
          <WizardNav current={wizard.stepIndex} maxReached={wizard.maxReached} onSelect={wizard.goTo} />

          <section aria-labelledby="step-heading" className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={wizard.step.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.16 }}>
                
                <h2 id="step-heading" className="text-xl font-extrabold text-ink-900">
                  {wizard.step.label}
                </h2>
                <p className="mb-6 mt-1 text-sm text-ink-600">{stepIntros[wizard.step.id]}</p>
                <StepComponent form={wizard.form} update={wizard.update} errors={wizard.errors} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-6">
              <Button
                variant="ghost"
                onClick={wizard.back}
                disabled={wizard.stepIndex === 0}
                leftIcon={<ArrowLeftIcon className="h-4 w-4" />}>
                
                Back
              </Button>
              {wizard.isLast ?
              <Button size="lg" onClick={handlePublish} loading={publishing} leftIcon={<RocketIcon className="h-4 w-4" />}>
                  Publish job
                </Button> :

              <Button size="lg" onClick={wizard.next} rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
                  Continue
                </Button>
              }
            </div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <JobPreviewCard form={wizard.form} />
            </div>
          </aside>
        </div>
      </div>
    </div>);

}