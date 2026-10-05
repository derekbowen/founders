import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BanIcon, CheckCircle2Icon, ClockIcon, HourglassIcon, PackageCheckIcon, PartyPopperIcon, RotateCcwIcon } from 'lucide-react';
import { OfferCard } from './OfferCard';
import { OfferForm } from './OfferForm';
import { DeliverForm } from './DeliverForm';
import { ReviewForm } from './ReviewForm';
import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';
import { TextAreaField } from '../ui/TextAreaField';
import { useToast } from '../ToastProvider';
import { useTransactions } from '../../contexts/TransactionsContext';
import { Transaction, TxRole } from '../../types/marketplace';
import { formatDate, formatMoney, serviceFee } from '../../utils/format';
import { getListing, getUser } from '../../utils/lookup';
import { acceptedOffer, pendingOffer } from '../../utils/txStatus';

interface NextStepPanelProps {
  tx: Transaction;
  role: TxRole;
}

function Notice({ icon, tone = 'neutral', title, children }: {icon: React.ReactNode;tone?: 'neutral' | 'success' | 'danger' | 'brand';title: string;children?: React.ReactNode;}) {
  const tones = {
    neutral: 'border-slate-200 bg-white',
    success: 'border-accent-200 bg-accent-50',
    danger: 'border-rose-200 bg-rose-50',
    brand: 'border-primary-200 bg-primary-50'
  };
  const iconTones = {
    neutral: 'bg-slate-100 text-slate-600',
    success: 'bg-accent-100 text-accent-700',
    danger: 'bg-rose-100 text-rose-700',
    brand: 'bg-primary-100 text-primary-700'
  };
  return (
    <div className={`rounded-2xl border p-5 ${tones[tone]}`}>
      <div className="flex items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconTones[tone]}`} aria-hidden="true">{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {children}
        </div>
      </div>
    </div>);

}

export function NextStepPanel({ tx, role }: NextStepPanelProps) {
  const { sendOffer, acceptOffer, declineOffer, deliver, requestRevision, complete } = useTransactions();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [countering, setCountering] = useState(false);
  const [revising, setRevising] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');
  const [reviewed, setReviewed] = useState(false);

  const other = getUser(role === 'client' ? tx.freelancerId : tx.clientId);
  const otherFirst = other?.name.split(' ')[0] ?? 'They';
  const listing = getListing(tx.listingId);
  const pending = pendingOffer(tx);
  const accepted = acceptedOffer(tx);

  // Pending offer awaiting MY response
  if (pending && pending.from !== role) {
    if (countering) {
      return (
        <OfferForm
          title="Send a counter-offer"
          submitLabel="Send counter-offer"
          initial={pending}
          onCancel={() => setCountering(false)}
          onSubmit={(values) => {
            sendOffer(tx.id, role, values);
            setCountering(false);
            addToast({ type: 'success', message: `Counter-offer sent to ${otherFirst}` });
          }} />);


    }
    return (
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700">
          {role === 'client' ? `${otherFirst} sent you an offer` : `${otherFirst} sent a counter-offer`} — your move
        </p>
        <OfferCard
          offer={pending}
          authorLabel={otherFirst}
          acceptLabel={role === 'client' ? 'Accept & pay' : 'Accept counter-offer'}
          onAccept={() => {
            if (role === 'client') {
              navigate(`/checkout/${tx.id}`);
            } else {
              acceptOffer(tx.id, role);
              addToast({ type: 'success', message: `Offer accepted — ${otherFirst} will be charged ${formatMoney(pending.price)}` });
            }
          }}
          onCounter={() => setCountering(true)}
          onDecline={() => {
            declineOffer(tx.id, role);
            addToast({ type: 'info', message: 'Offer declined' });
          }} />
        
      </div>);

  }

  // Pending offer awaiting THEIR response
  if (pending && pending.from === role) {
    return (
      <Notice icon={<HourglassIcon className="h-4 w-4" />} tone="brand" title={`Waiting for ${otherFirst} to respond`}>
        <p className="mt-1 text-sm text-slate-600">
          You {tx.offers.length > 1 ? 'countered' : 'offered'} {formatMoney(pending.price)} with delivery by {formatDate(pending.deliveryDate)}. {otherFirst} can accept, counter or decline.
        </p>
      </Notice>);

  }

  switch (tx.status) {
    case 'quote-requested':
      if (role === 'freelancer') {
        return (
          <div className="space-y-3">
            <OfferForm
              title={`Send ${otherFirst} an offer`}
              submitLabel="Send offer"
              initial={{ price: Math.round((tx.brief.budgetMin + tx.brief.budgetMax) / 2), deliveryDate: tx.brief.deadline }}
              onSubmit={(values) => {
                sendOffer(tx.id, role, values);
                addToast({ type: 'success', message: `Offer sent to ${otherFirst}` });
              }} />
            
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-700 hover:bg-rose-50 hover:text-rose-800"
              onClick={() => {
                declineOffer(tx.id, role);
                addToast({ type: 'info', message: 'Request declined' });
              }}>
              
              Decline this request
            </Button>
          </div>);

      }
      return (
        <Notice icon={<ClockIcon className="h-4 w-4" />} tone="brand" title={`Waiting for ${otherFirst} to send an offer`}>
          <p className="mt-1 text-sm text-slate-600">{otherFirst} usually responds within {other?.responseTime}. You'll be notified as soon as an offer arrives.</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              declineOffer(tx.id, role);
              addToast({ type: 'info', message: 'Quote request withdrawn' });
            }}>
            
            Withdraw request
          </Button>
        </Notice>);


    case 'accepted':
      if (role === 'freelancer') {
        return (
          <Notice icon={<PackageCheckIcon className="h-4 w-4" />} tone="brand" title="Deliver the work">
            <p className="mt-1 text-sm text-slate-600">
              Due {accepted ? formatDate(accepted.deliveryDate) : 'soon'}. Upload your final files — {otherFirst} will review and approve them.
            </p>
            <DeliverForm
              onDeliver={(files, note) => {
                deliver(tx.id, files, note);
                addToast({ type: 'success', message: 'Work delivered' });
              }} />
            
          </Notice>);

      }
      return (
        <Notice icon={<ClockIcon className="h-4 w-4" />} tone="brand" title="Work in progress">
          <p className="mt-1 text-sm text-slate-600">
            {otherFirst} is working on your project. Delivery is due {accepted ? formatDate(accepted.deliveryDate) : 'soon'}. Your payment of {accepted ? formatMoney(accepted.price) : ''} is held securely.
          </p>
        </Notice>);


    case 'delivered':
      if (role === 'client') {
        return (
          <Notice icon={<PackageCheckIcon className="h-4 w-4" />} tone="success" title={`${otherFirst} delivered the work`}>
            <p className="mt-1 text-sm text-slate-600">Review the files below. Approving releases payment to {otherFirst}. Deliveries auto-approve after 7 days.</p>
            {revising ?
            <div className="mt-4 space-y-3">
                <TextAreaField label="What needs to change?" rows={3} value={revisionNote} onChange={(e) => setRevisionNote(e.target.value)} />
                <div className="flex gap-2">
                  <Button
                  disabled={revisionNote.trim().length < 5}
                  onClick={() => {
                    requestRevision(tx.id, revisionNote.trim());
                    setRevising(false);
                    setRevisionNote('');
                    addToast({ type: 'info', message: 'Revision requested' });
                  }}>
                  
                    Send revision request
                  </Button>
                  <Button variant="ghost" onClick={() => setRevising(false)}>Cancel</Button>
                </div>
              </div> :

            <div className="mt-4 flex flex-wrap gap-2">
                <Button
                leftIcon={<CheckCircle2Icon className="h-4 w-4" aria-hidden="true" />}
                onClick={() => {
                  complete(tx.id);
                  addToast({ type: 'success', message: 'Delivery approved — project completed' });
                }}>
                
                  Approve & complete
                </Button>
                <Button variant="secondary" leftIcon={<RotateCcwIcon className="h-4 w-4" aria-hidden="true" />} onClick={() => setRevising(true)}>
                  Request revision
                </Button>
              </div>
            }
          </Notice>);

      }
      return (
        <Notice icon={<HourglassIcon className="h-4 w-4" />} tone="brand" title={`Waiting for ${otherFirst} to approve`}>
          <p className="mt-1 text-sm text-slate-600">Your delivery is under review. Payment is released when {otherFirst} approves, or automatically after 7 days.</p>
        </Notice>);


    case 'completed':
      if (role === 'client') {
        return (
          <Notice icon={<PartyPopperIcon className="h-4 w-4" />} tone="success" title="Project completed">
            {reviewed ?
            <p className="mt-1 text-sm text-slate-600">Thanks for your review! It helps other clients hire with confidence.</p> :

            <>
                <p className="mt-1 text-sm text-slate-600">Payment was released to {otherFirst}. Leave a review to help the community.</p>
                <ReviewForm
                name={otherFirst}
                onSubmit={() => {
                  setReviewed(true);
                  addToast({ type: 'success', message: 'Review published' });
                }} />
              
              </>
            }
          </Notice>);

      }
      return (
        <Notice icon={<PartyPopperIcon className="h-4 w-4" />} tone="success" title="Project completed">
          <p className="mt-1 text-sm text-slate-600">
            {accepted ? `${formatMoney(accepted.price - serviceFee(accepted.price))} is on its way to your payout account.` : 'Your payout is on its way.'}
          </p>
        </Notice>);


    case 'declined':
      return (
        <Notice icon={<BanIcon className="h-4 w-4" />} tone="danger" title="This request was closed">
          <p className="mt-1 text-sm text-slate-600">No payment was taken. {role === 'client' ? 'Explore similar services to find another great match.' : ''}</p>
          {role === 'client' && listing &&
          <ButtonLink to={`/s?category=${listing.category}`} variant="secondary" size="sm" className="mt-4">Browse similar services</ButtonLink>
          }
        </Notice>);


    default:
      return null;
  }
}