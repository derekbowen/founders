import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar';
import { StatusBadge } from './StatusBadge';
import { useApp } from '../../contexts/AppContext';
import { formatDate, formatMonths, formatShortRelative } from '../../utils/format';
import type { Inquiry } from '../../types/inquiry';

interface InquiryRowProps {
  inquiry: Inquiry;
  perspective: 'renter' | 'landlord';
}

export function InquiryRow({ inquiry, perspective }: InquiryRowProps) {
  const { getListing, getUser, currentUser } = useApp();
  const listing = getListing(inquiry.listingId);
  const other = getUser(perspective === 'renter' ? inquiry.landlordId : inquiry.renterId);
  const last = inquiry.messages[inquiry.messages.length - 1];
  const unread = currentUser ? inquiry.unreadFor.includes(currentUser.id) : false;

  return (
    <Link
      to={`/inbox/${inquiry.id}`}
      className={`group flex gap-4 rounded-2xl border p-4 transition hover:border-primary-300 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 ${
      unread ? 'border-primary-200 bg-primary-50/50' : 'border-navy-100 bg-white'}`
      }>
      
      <div className="relative shrink-0">
        <img src={listing?.images[0]} alt="" className="h-20 w-20 rounded-xl object-cover sm:h-24 sm:w-28" />
        {other &&
        <span className="absolute -bottom-2 -right-2 rounded-full ring-2 ring-white">
            <Avatar name={other.name} alt={other.name} size="sm" />
          </span>
        }
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className={`truncate text-navy-900 ${unread ? 'font-bold' : 'font-semibold'}`}>
              {other?.name ?? 'Unknown user'}
              {unread && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-coral-500 align-middle" aria-label="Unread" />}
            </p>
            <p className="truncate text-sm text-navy-500">{listing?.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={inquiry.status} />
            <span className="text-xs text-navy-400">{last ? formatShortRelative(last.sentAt) : ''}</span>
          </div>
        </div>
        <p className={`mt-2 line-clamp-1 text-sm ${unread ? 'text-navy-800' : 'text-navy-600'}`}>
          {last?.senderId === currentUser?.id && <span className="text-navy-400">You: </span>}
          {last?.text}
        </p>
        <p className="mt-1.5 text-xs text-navy-400">
          Move-in {formatDate(inquiry.moveIn)} · {formatMonths(inquiry.stayMonths)}
        </p>
      </div>
    </Link>);

}