import React from 'react';
import { CalendarIcon, ClockIcon, HourglassIcon, PiggyBankIcon, ReceiptIcon, WalletIcon } from 'lucide-react';
import { formatDate, formatMoney, formatMonths } from '../../utils/format';
import type { Listing } from '../../types/listing';

export function RentTerms({ listing }: {listing: Listing;}) {
  const items = [
  { icon: <WalletIcon size={18} />, label: 'Monthly rent', value: formatMoney(listing.rent) },
  {
    icon: <ReceiptIcon size={18} />,
    label: 'Bills',
    value: listing.billsIncluded ? 'Included' : `+ ~${formatMoney(listing.billsEstimate)}/mo`
  },
  { icon: <PiggyBankIcon size={18} />, label: 'Deposit', value: formatMoney(listing.deposit) },
  { icon: <CalendarIcon size={18} />, label: 'Available from', value: formatDate(listing.availableFrom) },
  { icon: <ClockIcon size={18} />, label: 'Minimum stay', value: formatMonths(listing.minStay) },
  { icon: <HourglassIcon size={18} />, label: 'Maximum stay', value: formatMonths(listing.maxStay) }];


  return (
    <div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) =>
        <div key={item.label} className="rounded-2xl border border-navy-100 bg-white p-4">
            <dt className="flex items-center gap-2 text-xs font-medium text-navy-500">
              <span className="text-primary-700">{item.icon}</span>
              {item.label}
            </dt>
            <dd className="mt-1.5 font-semibold text-navy-900">{item.value}</dd>
          </div>
        )}
      </dl>
      <p className="mt-4 flex items-start gap-2 rounded-xl bg-primary-50 p-3 text-sm text-primary-900">
        <ReceiptIcon size={16} className="mt-0.5 shrink-0" aria-hidden />
        <span>
          <span className="font-semibold">Bills: </span>
          {listing.billsNote}
        </span>
      </p>
    </div>);

}