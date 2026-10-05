import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CalendarXIcon, UserIcon, UsersIcon } from 'lucide-react';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { EmptyState } from '../components/common/EmptyState';
import { LessonSummary } from '../components/checkout/LessonSummary';
import { CardForm } from '../components/checkout/CardForm';
import { useAuth } from '../contexts/AuthContext';
import { useLessons } from '../contexts/LessonsContext';
import { useCheckoutForm } from '../hooks/useCheckoutForm';
import { getLevelName, getTutorById } from '../utils/tutors';
import { calculatePrice } from '../utils/pricing';
import { formatMoney } from '../utils/format';
import { brandButton, linkButton } from '../utils/buttonStyles';
import type { BookingDraft } from '../types/marketplace';

export function CheckoutPage() {
  const location = useLocation();
  const draft = (location.state as {booking?: BookingDraft;} | null)?.booking;
  const tutor = getTutorById(draft?.tutorId);

  if (!draft || !tutor) {
    return (
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6">
        <EmptyState
          icon={CalendarXIcon}
          title="No lesson selected"
          description="Pick a tutor and an open time slot to start a booking."
          action={<Link to="/search" className={`${linkButton.base} ${linkButton.primary}`}>Find a tutor</Link>} />
        
      </div>);

  }

  return <CheckoutForm draft={draft} tutorId={tutor.id} />;
}

function CheckoutForm({ draft, tutorId }: {draft: BookingDraft;tutorId: string;}) {
  const tutor = getTutorById(tutorId)!;
  const { user } = useAuth();
  const { addLesson } = useLessons();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const selfName = `${user.firstName} ${user.lastName}`;
  const subjectLevels = tutor.subjects.find((s) => s.subject === draft.subject)?.levels ?? [];
  const { values, errors, set, setLearnerType, validate } = useCheckoutForm(selfName, subjectLevels[0] ?? '');
  const discount = tutor.packages.find((p) => p.lessons === draft.packageLessons)?.discountPercent ?? 0;
  const price = calculatePrice(tutor.hourlyRate, draft.hours, draft.packageLessons, discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast({ type: 'error', message: 'Please check the highlighted fields.' });
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      const id = addLesson({
        draft,
        tutor,
        learnerName: values.learnerName.trim(),
        level: values.level,
        goals: values.goals.trim(),
        total: price.total
      });
      addToast({ type: 'success', message: `Request sent! ${tutor.firstName} usually responds ${tutor.responseTime}.` });
      navigate(`/inbox?lesson=${id}`);
    }, 1200);
  };

  const learnerOptions = [
  { value: 'self' as const, label: 'Myself', icon: UserIcon },
  { value: 'child' as const, label: 'My child', icon: UsersIcon }];


  return (
    <div className="bg-ink-50">
      <div className="mx-auto max-w-page px-4 py-8 sm:px-6 md:py-12">
        <Link
          to={`/tutors/${tutor.id}`}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-primary-700">
          
          <ArrowLeftIcon size={16} aria-hidden="true" /> Back to {tutor.firstName}'s listing
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Request to book</h1>

        <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-6" aria-labelledby="learner-heading">
              <h2 id="learner-heading" className="text-lg font-semibold text-ink-900">1. Who's learning?</h2>
              <div className="mt-4 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Who is this lesson for">
                {learnerOptions.map((o) => {
                  const selected = values.learnerType === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setLearnerType(o.value, selfName)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      selected ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-ink-200 hover:border-primary-300'}`
                      }>
                      
                      <o.icon size={20} className="text-primary-700" aria-hidden="true" />
                      <span className="font-medium text-ink-900">{o.label}</span>
                    </button>);

                })}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Input
                  id="learner-name"
                  label="Learner's name"
                  value={values.learnerName}
                  onChange={(e) => set('learnerName', e.target.value)}
                  placeholder={values.learnerType === 'child' ? 'e.g. Emma Morgan' : ''}
                  error={errors.learnerName} />
                
                <Select
                  label="Level"
                  value={values.level}
                  options={subjectLevels.map((l) => ({ value: l, label: getLevelName(l) }))}
                  onChange={(v) => set('level', v as string)}
                  error={errors.level} />
                
              </div>
              <div className="mt-4">
                <label htmlFor="goals" className="text-sm font-medium text-ink-800">
                  Learning goals <span className="font-normal text-ink-500">(shared with {tutor.firstName})</span>
                </label>
                <textarea
                  id="goals"
                  rows={4}
                  maxLength={500}
                  value={values.goals}
                  onChange={(e) => set('goals', e.target.value)}
                  placeholder="e.g. Preparing for the AP Calculus exam in May, struggling with related rates."
                  className="mt-1.5 w-full rounded-xl border border-ink-200 p-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100" />
                
                <p className="mt-1 text-right text-xs text-ink-500">{values.goals.length}/500</p>
              </div>
            </section>

            <section className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-6" aria-labelledby="payment-heading">
              <h2 id="payment-heading" className="text-lg font-semibold text-ink-900">2. Payment</h2>
              <p className="mt-1 text-sm text-ink-600">Your card is authorized now and charged only when {tutor.firstName} accepts.</p>
              <div className="mt-5">
                <CardForm values={values} errors={errors} onChange={set} />
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <LessonSummary tutor={tutor} draft={draft} price={price} />
            <Button type="submit" size="large" loading={submitting} className={`w-full ${brandButton.primary}`}>
              Confirm & request · {formatMoney(price.total)}
            </Button>
            <p className="text-center text-xs text-ink-500">
              By booking you agree to the <Link to="/terms" className="underline hover:text-primary-700">Terms of Service</Link>.
            </p>
          </aside>
        </form>
      </div>
    </div>);

}