import React, { useState } from 'react';
import { CheckIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
import { btn } from '../../utils/styles';

export function ReturnLabel({ txId }: {txId: string;}) {
  const [downloaded, setDownloaded] = useState(false);
  const bars = Array.from({ length: 48 }, (_, i) => i * 7919 % 5 + 1);
  return (
    <section aria-labelledby="label-heading" className="border border-dashed border-ink/40 bg-paper p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="label-heading" className="text-[11px] font-semibold uppercase tracking-eyebrow text-ink">
            Prepaid return label
          </h3>
          <p className="mt-1 text-xs text-muted">UPS Ground · drop off at any UPS location</p>
        </div>
        <PrinterIcon size={18} className="text-muted" aria-hidden="true" />
      </div>
      <div className="mt-4 flex h-14 items-end gap-[2px] bg-cream px-3 py-2" aria-hidden="true">
        {bars.map((w, i) =>
        <span key={i} className="h-full bg-ink" style={{ width: `${w}px` }} />
        )}
      </div>
      <p className="mt-2 font-mono text-[11px] tracking-wider text-muted">1Z 9X4 V27 03 {txId.replace('tx-', '')} 8821</p>
      <button
        type="button"
        onClick={() => setDownloaded(true)}
        className={btn('outline', 'sm', 'mt-4 w-full')}>
        
        {downloaded ?
        <>
            <CheckIcon size={14} aria-hidden="true" /> Label downloaded
          </> :

        <>
            <DownloadIcon size={14} aria-hidden="true" /> Download label (PDF)
          </>
        }
      </button>
    </section>);

}