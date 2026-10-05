import React from 'react';
import { CheckIcon, DownloadIcon, FileIcon, Loader2Icon } from 'lucide-react';
import type { ListingFile } from '../../types/marketplace';
import { useDownload } from '../../hooks/useDownload';

interface DownloadListProps {
  orderId: string;
  files: ListingFile[];
  disabled?: boolean;
}

export function DownloadList({ orderId, files, disabled = false }: DownloadListProps) {
  const { download, pending, done } = useDownload(orderId);

  return (
    <ul className="space-y-2">
      {files.map((f) => {
        const isPending = pending === f.name;
        const isDone = done.includes(f.name);
        return (
          <li key={f.name} className="flex items-center gap-3 rounded-xl border border-ink/15 bg-white p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink bg-brand-soft">
              <FileIcon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{f.name}</p>
              <p className="text-xs text-muted">{f.size}</p>
            </div>
            <button
              type="button"
              disabled={disabled || isPending}
              onClick={() => download(f.name)}
              className={`btn btn-sm ${isDone ? 'btn-outline' : 'btn-accent'}`}
              aria-label={`Download ${f.name}`}>
              
              {isPending ?
              <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" /> :
              isDone ?
              <CheckIcon className="h-4 w-4" aria-hidden="true" /> :

              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              }
              <span className="hidden sm:inline">{isPending ? 'Preparing' : isDone ? 'Again' : 'Download'}</span>
            </button>
          </li>);

      })}
    </ul>);

}