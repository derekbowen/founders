import React from 'react';
import { Link } from 'react-router-dom';
import { InfoIcon, LockIcon, MessageSquareIcon, SendIcon } from 'lucide-react';
import { Button } from '../Button';
import { StatusBadge } from '../inbox/StatusBadge';
import { useInquiryForm } from '../../hooks/useInquiryForm';
import { buttonStyles, fieldStyles } from '../../utils/styles';
import { formatMoney, formatMonths } from '../../utils/format';
import type { Listing } from '../../types/listing';

export function InquiryPanel({ listing }: {listing: Listing;}) {
  const form = useInquiryForm(listing);

  return (
    <div id="inquiry" className="scroll-mt-28 rounded-2xl border border-navy-100 bg-white p-6 shadow-lift">
      <div className="flex items-baseline justify-between gap-2">
        <p>
          <span className="text-2xl font-bold text-navy-900">{formatMoney(listing.rent)}</span>
          <span className="text-navy-500"> / month</span>
        </p>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          listing.billsIncluded ? 'bg-primary-100 text-primary-800' : 'bg-navy-50 text-navy-700'}`
          }>
          
          {listing.billsIncluded ? 'Bills included' : `+ ~${formatMoney(listing.billsEstimate)} bills`}
        </span>
      </div>
      <p className="mt-1 text-sm text-navy-500">
        Deposit {formatMoney(listing.deposit)} · Min. stay {formatMonths(listing.minStay)}
      </p>

      {form.isOwnListing ?
      <div className="mt-6 rounded-xl bg-navy-50 p-4 text-sm text-navy-700">
          <p className="font-semibold text-navy-900">This is your listing</p>
          <p className="mt-1">Inquiries from renters will appear under Room leads in your inbox.</p>
          <Link to="/inbox" className="mt-3 inline-flex font-semibold text-primary-700 hover:text-primary-800">
            Go to inbox →
          </Link>
        </div> :
      form.existing ?
      <div className="mt-6 rounded-xl bg-primary-50 p-4 text-sm text-navy-700">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-navy-900">You already sent an inquiry</p>
            <StatusBadge status={form.existing.status} />
          </div>
          <p className="mt-1">Continue the conversation with the landlord in your inbox.</p>
          <Link
          to={`/inbox/${form.existing.id}`}
          className="mt-3 inline-flex items-center gap-1.5 font-semibold text-primary-700 hover:text-primary-800">
          
            <MessageSquareIcon size={15} /> Open conversation
          </Link>
        </div> :

      <form onSubmit={form.submit} className="mt-6 space-y-4" noValidate>
          <h2 className="text-lg font-semibold text-navy-900">Send an inquiry</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="inq-movein" className={fieldStyles.label}>
                Move-in date
              </label>
              <input
              id="inq-movein"
              type="date"
              min={listing.availableFrom}
              value={form.moveIn}
              onChange={(e) => form.setMoveIn(e.target.value)}
              className={fieldStyles.control}
              aria-invalid={!!form.errors.moveIn} />
            
            </div>
            <div>
              <label htmlFor="inq-stay" className={fieldStyles.label}>
                Stay length
              </label>
              <select
              id="inq-stay"
              value={form.stayMonths}
              onChange={(e) => form.setStayMonths(Number(e.target.value))}
              className={fieldStyles.control}>
              
                {form.stayOptions.map((m) =>
              <option key={m} value={m}>
                    {formatMonths(m)}
                  </option>
              )}
              </select>
            </div>
          </div>
          {form.errors.moveIn && <p className={fieldStyles.error}>{form.errors.moveIn}</p>}
          <div>
            <label htmlFor="inq-about" className={fieldStyles.label}>
              About you
            </label>
            <input
            id="inq-about"
            value={form.aboutYou}
            onChange={(e) => form.setAboutYou(e.target.value)}
            placeholder="e.g. MSc student at UvA, starting an internship"
            className={fieldStyles.control} />
          
          </div>
          <div>
            <label htmlFor="inq-message" className={fieldStyles.label}>
              Message
            </label>
            <textarea
            id="inq-message"
            rows={4}
            value={form.message}
            onChange={(e) => form.setMessage(e.target.value)}
            placeholder="Introduce yourself, why you're moving and what you're looking for in a flatshare."
            className={`${fieldStyles.control} resize-none`}
            aria-invalid={!!form.errors.message}
            aria-describedby="inq-message-help" />
          
            {form.errors.message ?
          <p id="inq-message-help" className={fieldStyles.error}>
                {form.errors.message}
              </p> :

          <p id="inq-message-help" className={fieldStyles.help}>
                {form.message.trim().length}/20 characters minimum
              </p>
          }
          </div>
          <Button
          type="submit"
          size="large"
          loading={form.submitting}
          leftIcon={form.currentUser ? <SendIcon size={17} /> : <LockIcon size={17} />}
          className={`${buttonStyles.primary} w-full`}>
          
            {form.currentUser ? 'Send inquiry' : 'Log in to send inquiry'}
          </Button>
          <p className="flex items-start gap-2 text-xs text-navy-500">
            <InfoIcon size={14} className="mt-0.5 shrink-0" aria-hidden />
            You won't be charged. Payments and contracts are arranged directly with the landlord.
          </p>
        </form>
      }
    </div>);

}