import React from 'react';
import { Link } from 'react-router-dom';
import { PaperclipIcon } from 'lucide-react';
import { Transaction } from '../../types/marketplace';
import { formatDate, formatMoney } from '../../utils/format';
import { getListing } from '../../utils/lookup';

export function ProjectBriefCard({ tx }: {tx: Transaction;}) {
  const listing = getListing(tx.listingId);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5" aria-labelledby="brief-heading">
      <h2 id="brief-heading" className="text-sm font-bold text-slate-900">Project brief</h2>
      {listing &&
      <Link to={`/l/${listing.id}`} className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-2.5 transition-colors hover:bg-slate-100">
          <img src={listing.cover} alt="" className="h-10 w-14 shrink-0 rounded-lg object-cover" />
          <span className="line-clamp-2 text-sm font-semibold text-slate-800">{listing.title}</span>
        </Link>
      }
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{tx.brief.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-slate-500">Budget</dt>
          <dd className="font-semibold text-slate-900">{formatMoney(tx.brief.budgetMin)} – {formatMoney(tx.brief.budgetMax)}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Deadline</dt>
          <dd className="font-semibold text-slate-900">{formatDate(tx.brief.deadline)}</dd>
        </div>
      </dl>
      {tx.brief.attachments.length > 0 &&
      <ul className="mt-4 flex flex-wrap gap-2">
          {tx.brief.attachments.map((a) =>
        <li key={a} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              <PaperclipIcon className="h-3 w-3" aria-hidden="true" /> {a}
            </li>
        )}
        </ul>
      }
    </section>);

}