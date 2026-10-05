import React from 'react';
import { DownloadIcon, FileIcon, PackageOpenIcon } from 'lucide-react';
import { useToast } from '../ToastProvider';
import { Transaction } from '../../types/marketplace';
import { formatDate } from '../../utils/format';

export function DeliverySection({ tx }: {tx: Transaction;}) {
  const { addToast } = useToast();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5" aria-labelledby="delivery-heading">
      <h2 id="delivery-heading" className="text-sm font-bold text-slate-900">Delivery files</h2>
      {tx.deliveries.length === 0 ?
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          <PackageOpenIcon className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
          Files will appear here once the work is delivered.
        </div> :

      <>
          {tx.deliveryNote && <p className="mt-2 text-sm leading-relaxed text-slate-600">{tx.deliveryNote}</p>}
          <ul className="mt-4 space-y-2">
            {tx.deliveries.map((f) =>
          <li key={f.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <FileIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{f.name}</p>
                  <p className="text-xs text-slate-500">{f.size} · {formatDate(f.at, 'MMM d')}</p>
                </div>
                <button
              type="button"
              onClick={() => addToast({ type: 'info', message: `Downloading ${f.name}` })}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label={`Download ${f.name}`}>
              
                  <DownloadIcon className="h-4 w-4" />
                </button>
              </li>
          )}
          </ul>
        </>
      }
    </section>);

}