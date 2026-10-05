import React from 'react';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { CategoryIcon } from '../ui/CategoryIcon';
import { categories } from '../../data/categories';
import type { NewJobInput } from '../../types/marketplace';
import { formatBudget, formatDate } from '../../utils/format';

export function JobPreviewCard({ form }: {form: NewJobInput;}) {
  const category = categories.find((c) => c.id === form.categoryId);
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">Preview — how pros will see it</p>
      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card">
        <div className="relative aspect-[16/10] bg-ink-100">
          {form.photos[0] ?
          <img src={form.photos[0]} alt="" className="h-full w-full object-cover" /> :

          <div className="flex h-full items-center justify-center text-ink-400">
              <CategoryIcon id={form.categoryId} className="h-10 w-10" />
            </div>
          }
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink-800">
            <CategoryIcon id={form.categoryId} className="h-3.5 w-3.5 text-primary-600" />
            {category?.name}
          </span>
        </div>
        <div className="p-4">
          <p className="text-lg font-extrabold text-ink-900">{formatBudget(form.budgetMin || 0, form.budgetMax || 0)}</p>
          <p className="mt-1 line-clamp-2 text-[15px] font-bold text-ink-900">{form.title || 'Your job title'}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-ink-600">
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {form.area || 'Neighborhood'}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {form.timing === 'asap' ? 'ASAP' : formatDate(form.preferredDate, 'MMM d')}
            </span>
          </div>
        </div>
      </div>
    </div>);

}