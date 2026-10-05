import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircle2Icon, FileQuestionIcon, ShieldCheckIcon } from 'lucide-react';
import { CardForm } from '../components/checkout/CardForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { AuthPrompt } from '../components/ui/AuthPrompt';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { brand } from '../data/brand';
import { useApp } from '../hooks/useApp';
import { formatDate, formatMoney } from '../utils/format';
import { customerTotal, getAgreedOffer } from '../utils/transactions';

export function Checkout() {
  const { txId } = useParams();
  const { user, getTransaction, getJob, getUser, payTransaction } = useApp();
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!user) return <AuthPrompt title="Log in to check out" description="You need to be logged in to pay for a job." />;

  const tx = txId ? getTransaction(txId) : undefined;
  const job = tx ? getJob(tx.jobId) : undefined;
  const pro = tx ? getUser(tx.proId) : undefined;
  const offer = tx ? getAgreedOffer(tx) : undefined;

  if (!tx || !job || !pro || !offer || tx.customerId !== user.id) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <EmptyState
          icon={<FileQuestionIcon className="h-5 w-5" />}
          title="Nothing to pay here"
          description="This checkout link is invalid or the offer hasn’t been accepted yet."
          action={<ButtonLink to="/inbox?tab=jobs">Go to inbox</ButtonLink>} />
        
      </div>);

  }

  if (paid || tx.status === 'paid' || tx.status === 'completed') {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-ink-200 bg-white p-8 text-center shadow-card">
          
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2Icon className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-ink-900">You’re booked!</h1>
          <p className="mt-2 text-ink-600">
            {formatMoney(customerTotal(offer.amount))} is held securely. {pro.name.split(' ')[0]} will start on{' '}
            <strong>{formatDate(offer.earliestDate, 'EEEE, MMM d')}</strong>. Payment is released only after you confirm the job is done.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to={`/inbox/${tx.id}`}>Go to conversation</ButtonLink>
            <ButtonLink to="/post-job" variant="secondary">
              Post another job
            </ButtonLink>
          </div>
        </motion.div>
      </div>);

  }

  function handlePay() {
    setProcessing(true);
    setTimeout(() => {
      payTransaction(tx!.id);
      setProcessing(false);
      setPaid(true);
    }, 1400);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link to={`/inbox/${tx.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-600 hover:text-ink-900">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back to conversation
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900">Confirm and pay</h1>
      <p className="mt-1 text-ink-600">You accepted {pro.name}’s offer. Complete payment to lock in the job.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        <section aria-labelledby="pay-heading" className="order-2 lg:order-1">
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
            <h2 id="pay-heading" className="text-lg font-extrabold text-ink-900">
              Payment details
            </h2>
            <p className="mb-6 mt-1 text-sm text-ink-600">Your card is charged now and the funds are held by {brand.name}.</p>
            <CardForm total={customerTotal(offer.amount)} processing={processing} onSubmit={handlePay} />
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-ink-100 p-5 text-sm text-ink-700">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
            <p>
              <strong className="text-ink-900">Protected by the {brand.name} Guarantee.</strong> If the job isn’t completed as agreed, you can open a
              dispute and get a refund. Full cancellation is free up to 24 hours before the start date.
            </p>
          </div>
        </section>
        <aside className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <OrderSummary job={job} pro={pro} offer={offer} />
        </aside>
      </div>
    </div>);

}