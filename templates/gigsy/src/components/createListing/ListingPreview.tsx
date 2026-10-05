import React from 'react';
import { ClockIcon, ImageIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { ListingDraft, User } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';
import { getCategory } from '../../utils/lookup';

export function ListingPreview({ draft, user }: {draft: ListingDraft;user: User | null;}) {
  const category = draft.category ? getCategory(draft.category) : undefined;
  const price = Number(draft.startingPrice);
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Live preview</p>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <div className="relative aspect-[4/3] bg-slate-100">
          {draft.portfolio[0] ?
          <img src={draft.portfolio[0]} alt="" className="h-full w-full object-cover" /> :

          <div className="flex h-full items-center justify-center text-slate-300">
              <ImageIcon className="h-10 w-10" aria-hidden="true" />
            </div>
          }
          {category && <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">{category.name}</span>}
        </div>
        <div className="p-4">
          {user &&
          <div className="flex items-center gap-2">
              <Avatar name={user.name} alt="" src={user.avatar} size="xs" />
              <span className="text-sm font-medium text-slate-700">{user.name}</span>
            </div>
          }
          <h3 className={`mt-2.5 line-clamp-2 text-[15px] font-semibold leading-snug ${draft.title ? 'text-slate-900' : 'text-slate-400'}`}>
            {draft.title || 'Your service title'}
          </h3>
          <p className="mt-2 inline-flex items-center gap-1 text-sm text-slate-500">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" /> {draft.deliveryDays} day delivery
          </p>
          <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-3">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Starting at</span>
            <span className="text-lg font-bold text-slate-900">{price ? formatMoney(price) : '—'}</span>
          </div>
        </div>
      </article>
    </div>);

}