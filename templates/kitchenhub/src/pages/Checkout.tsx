import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, CircleCheckIcon, SearchXIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingSummary } from '../components/checkout/BookingSummary';
import { CardForm } from '../components/checkout/CardForm';
import { InsuranceUpload } from '../components/checkout/InsuranceUpload';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CheckboxField } from '../components/ui/CheckboxField';
import { EmptyState } from '../components/ui/EmptyState';
import { Field } from '../components/ui/Field';
import { useAuth } from '../contexts/AuthContext';
import { useCheckoutForm } from '../hooks/useCheckoutForm';
import type { StorageType } from '../types/marketplace';
import { daysFromTodayISO, formatMoney } from '../utils/format';
import { getHost, getListing } from '../utils/listings';
import { calcBreakdown } from '../utils/pricing';
import { cn, containerClass, inputClass } from '../utils/styles';

const isStorage = (v: string): v is StorageType => v === 'dry' || v === 'cold' || v === 'frozen';
const stepTitle = 'flex items-center gap-3 font-heading text-xl font-semibold uppercase tracking-wide text-steel-900';
const stepNum = 'grid h-7 w-7 place-items-center rounded-full bg-steel-900 font-sans text-xs font-bold text-white';

export function CheckoutPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { user } = useAuth();
  const listing = getListing(id);
  const { values, errors, status, setField, submit } = useCheckoutForm({
    businessName: user?.business ?? '',
    contactName: user?.name ?? ''
  });

  if (!listing) {
    return (
      <div className={cn(containerClass, 'py-20')}>
        <EmptyState icon={<SearchXIcon className="h-5 w-5" aria-hidden="true" />} title="Nothing to check out" body="Choose a kitchen and time first." action={<ButtonLink to="/search">Browse kitchens</ButtonLink>} />
      </div>);

  }

  const host = getHost(listing.hostId);
  const date = params.get('date') || daysFromTodayISO(1);
  const startHour = Number(params.get('start') ?? 9);
  const hours = Math.max(listing.minHours, Number(params.get('hours')) || listing.minHours);
  const storage = (params.get('storage') ?? '').split(',').filter(isStorage);
  const breakdown = calcBreakdown(listing, hours, storage);
  const summary = <BookingSummary listing={listing} date={date} startHour={startHour} hours={hours} storage={storage} breakdown={breakdown} />;

  if (status === 'success') {
    return (
      <div className={cn(containerClass, 'max-w-3xl py-16')}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent">
            <CircleCheckIcon className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-heading text-4xl font-bold uppercase tracking-tight text-steel-900">Request sent</h1>
          <p className="mx-auto mt-3 max-w-md text-steel-600">
            {host?.name.split(' ')[0]} usually responds {host?.responseTime}. Your card is authorized for {formatMoney(breakdown.total)} and only charged once the host accepts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/inbox" size="lg">Go to inbox</ButtonLink>
            <ButtonLink to="/search" variant="outline" size="lg">Keep browsing</ButtonLink>
          </div>
        </motion.div>
        <div className="mx-auto mt-12 max-w-md text-left">{summary}</div>
      </div>);

  }

  return (
    <div className={cn(containerClass, 'py-8 lg:py-12')}>
      <Link to={`/kitchens/${listing.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-steel-600 hover:text-steel-900">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back to listing
      </Link>
      <h1 className="mt-4 font-heading text-4xl font-bold uppercase tracking-tight text-steel-900">Request to book</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
        <form onSubmit={submit} noValidate className="space-y-10">
          <section aria-labelledby="step-business" className="space-y-5">
            <h2 id="step-business" className={stepTitle}><span className={stepNum}>1</span>Business details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name" htmlFor="co-businessName" error={errors.businessName}>
                <input id="co-businessName" value={values.businessName} onChange={(e) => setField('businessName', e.target.value)} className={cn(inputClass, errors.businessName && 'border-primary')} autoComplete="organization" aria-invalid={!!errors.businessName} />
              </Field>
              <Field label="Contact name" htmlFor="co-contactName" error={errors.contactName}>
                <input id="co-contactName" value={values.contactName} onChange={(e) => setField('contactName', e.target.value)} className={cn(inputClass, errors.contactName && 'border-primary')} autoComplete="name" aria-invalid={!!errors.contactName} />
              </Field>
              <Field label="Phone" htmlFor="co-phone" optional hint="For day-of access questions">
                <input id="co-phone" type="tel" value={values.phone} onChange={(e) => setField('phone', e.target.value)} className={inputClass} autoComplete="tel" placeholder="(312) 555-0142" />
              </Field>
            </div>
          </section>

          <section aria-labelledby="step-compliance" className="space-y-5">
            <h2 id="step-compliance" className={stepTitle}><span className={stepNum}>2</span>Compliance documents</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Food handler certificate number" htmlFor="co-certNumber" error={errors.certNumber} hint="ServSafe or county-issued card">
                <input id="co-certNumber" value={values.certNumber} onChange={(e) => setField('certNumber', e.target.value)} className={cn(inputClass, errors.certNumber && 'border-primary')} placeholder="FH-2049381" aria-invalid={!!errors.certNumber} />
              </Field>
              <Field label="Certificate expiry" htmlFor="co-certExpiry" optional>
                <input id="co-certExpiry" type="month" value={values.certExpiry} onChange={(e) => setField('certExpiry', e.target.value)} className={inputClass} />
              </Field>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-medium text-steel-800">Certificate of insurance</span>
              <InsuranceUpload fileName={values.insuranceFile} onChange={(name) => setField('insuranceFile', name)} error={errors.insuranceFile} />
            </div>
          </section>

          <section aria-labelledby="step-message" className="space-y-5">
            <h2 id="step-message" className={stepTitle}><span className={stepNum}>3</span>Message the host</h2>
            <Field label={`Tell ${host?.name.split(' ')[0] ?? 'the host'} what you’re cooking`} htmlFor="co-message" optional>
              <textarea id="co-message" rows={4} value={values.message} onChange={(e) => setField('message', e.target.value)} className={inputClass} placeholder="e.g. Prepping 200 boxed lunches — will need the walk-in and two prep tables." />
            </Field>
          </section>

          <section aria-labelledby="step-payment" className="space-y-5">
            <h2 id="step-payment" className={stepTitle}><span className={stepNum}>4</span>Payment</h2>
            <CardForm values={values} errors={errors} setField={setField} />
          </section>

          <div className="space-y-5 border-t border-steel-200 pt-6">
            <div>
              <CheckboxField
                id="co-agree"
                checked={values.agree}
                onChange={(v) => setField('agree', v)}
                label={
                <>
                    I agree to the kitchen rules, cleaning sign-off, the{' '}
                    <Link to="/terms" className="font-medium text-primary underline">cancellation policy</Link> and{' '}
                    <Link to="/terms" className="font-medium text-primary underline">Terms of service</Link>.
                  </>
                } />
              
              {errors.agree && <p className="mt-1 text-xs font-medium text-primary" role="alert">{errors.agree}</p>}
            </div>
            <div className="lg:hidden">{summary}</div>
            <Button type="submit" size="lg" loading={status === 'submitting'} className="w-full sm:w-auto">
              {status === 'submitting' ? 'Sending request…' : `Request to book · ${formatMoney(breakdown.total)}`}
            </Button>
          </div>
        </form>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">{summary}</aside>
      </div>
    </div>);

}