import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, BadgeCheckIcon, SearchXIcon, ShieldAlertIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/EmptyState';
import { LoginRequired } from '../components/LoginRequired';
import { ChatThread } from '../components/inbox/ChatThread';
import { StatusBadge } from '../components/inbox/StatusBadge';
import { StatusTimeline } from '../components/inbox/StatusTimeline';
import { InquiryActions } from '../components/inbox/InquiryActions';
import { useApp } from '../contexts/AppContext';
import { cardStyles } from '../utils/styles';
import { formatDate, formatMoney, formatMonths } from '../utils/format';

export function InquiryDetail() {
  const { id } = useParams();
  const { currentUser, inquiries, getListing, getUser, markRead } = useApp();
  const inquiry = inquiries.find((i) => i.id === id);

  useEffect(() => {
    if (inquiry && currentUser) markRead(inquiry.id);
  }, [inquiry?.id, inquiry?.messages.length, currentUser, markRead]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentUser) {
    return <LoginRequired title="Log in to view this conversation" text="Conversations are private to the renter and landlord." />;
  }

  const canView = inquiry && (inquiry.renterId === currentUser.id || inquiry.landlordId === currentUser.id);
  if (!inquiry || !canView) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <EmptyState
          icon={<SearchXIcon size={26} />}
          title="Conversation not found"
          text="It may belong to another account."
          action={<Link to="/inbox" className="font-semibold text-primary-700">Back to inbox →</Link>} />
        
      </div>);

  }

  const isLandlord = inquiry.landlordId === currentUser.id;
  const listing = getListing(inquiry.listingId);
  const other = getUser(isLandlord ? inquiry.renterId : inquiry.landlordId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/inbox" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900">
        <ArrowLeftIcon size={16} /> Inbox
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {other && <Avatar name={other.name} alt={other.name} size="md" />}
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold text-navy-900">
              {other ?
              <Link to={`/u/${other.id}`} className="hover:text-primary-700">
                  {other.name}
                </Link> :

              'Unknown user'
              }
              {other?.verified && <BadgeCheckIcon size={18} className="text-primary-600" aria-label="Verified" />}
            </h1>
            <p className="text-sm text-navy-500">
              {isLandlord ? 'Renter' : 'Landlord'} · {isLandlord ? other?.occupation ?? 'Looking for a room' : listing?.title}
            </p>
          </div>
        </div>
        <StatusBadge status={inquiry.status} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ChatThread inquiry={inquiry} />

        <aside className="space-y-4">
          {listing &&
          <Link to={`/l/${listing.id}`} className={`${cardStyles} group block overflow-hidden transition hover:shadow-card`}>
              <img src={listing.images[0]} alt="" className="h-36 w-full object-cover" />
              <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-navy-500">
                  {listing.neighborhood}, {listing.city}
                </p>
                <p className="mt-1 font-semibold text-navy-900 group-hover:text-primary-700">{listing.title}</p>
                <p className="mt-1 text-sm text-navy-600">
                  <span className="font-semibold text-navy-900">{formatMoney(listing.rent)}</span>/mo ·{' '}
                  {listing.billsIncluded ? 'bills incl.' : `+ ~${formatMoney(listing.billsEstimate)} bills`}
                </p>
              </div>
            </Link>
          }

          <div className={`${cardStyles} p-5`}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-500">Inquiry details</h2>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-navy-500">Move-in</dt>
                <dd className="font-semibold text-navy-900">{formatDate(inquiry.moveIn)}</dd>
              </div>
              <div>
                <dt className="text-navy-500">Stay</dt>
                <dd className="font-semibold text-navy-900">{formatMonths(inquiry.stayMonths)}</dd>
              </div>
              {inquiry.aboutYou &&
              <div className="col-span-2">
                  <dt className="text-navy-500">About the renter</dt>
                  <dd className="text-navy-800">{inquiry.aboutYou}</dd>
                </div>
              }
            </dl>
          </div>

          <div className={`${cardStyles} p-5`}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-500">Progress</h2>
            <StatusTimeline inquiry={inquiry} />
          </div>

          <div className={`${cardStyles} p-5`}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-500">Actions</h2>
            <InquiryActions inquiry={inquiry} isLandlord={isLandlord} />
          </div>

          <p className="flex items-start gap-2 rounded-2xl bg-coral-50 p-4 text-xs text-coral-900">
            <ShieldAlertIcon size={16} className="mt-0.5 shrink-0 text-coral-600" aria-hidden />
            Never pay a deposit or rent before viewing the room and signing a written contract.
          </p>
        </aside>
      </div>
    </div>);

}