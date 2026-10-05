import React, { useState } from 'react';
import { FileIcon, Trash2Icon, UploadCloudIcon } from 'lucide-react';
import { fileTypes } from '../../data/categories';
import { fileTypeFromName, formatBytes, type DraftErrors, type ListingDraft } from '../../hooks/useListingDraft';
import type { FileType } from '../../types/marketplace';

interface StepProps {
  draft: ListingDraft;
  errors: DraftErrors;
  update: (patch: Partial<ListingDraft>) => void;
}

export function StepFiles({ draft, errors, update }: StepProps) {
  const [dragging, setDragging] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const added = Array.from(list).map((f) => ({ name: f.name, size: formatBytes(f.size) }));
    const detected = fileTypeFromName(added[0].name);
    update({
      files: [...draft.files, ...added.filter((a) => !draft.files.some((f) => f.name === a.name))],
      ...(draft.files.length === 0 && detected ? { fileType: detected } : {})
    });
  };

  const addSample = () =>
  update({
    files: [...draft.files, { name: `sample-file-${draft.files.length + 1}.pdf`, size: '4.8 MB' }]
  });

  return (
    <div className="space-y-6">
      <label
        htmlFor="file-upload"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
        dragging ? 'border-ink bg-brand-soft' : errors.files ? 'border-danger bg-danger/5' : 'border-ink/25 bg-paper hover:border-ink'}`
        }>
        
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-ink bg-brand shadow-pop-sm">
          <UploadCloudIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="mt-4 font-display text-lg font-bold">Drop files here or click to upload</span>
        <span className="mt-1 text-sm text-muted">PDF, ZIP, MP3/WAV, XLSX · up to 5 GB per file</span>
        <input id="file-upload" type="file" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />
      </label>
      {errors.files && <p className="-mt-3 text-sm text-danger">{errors.files}</p>}

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          {draft.files.length} file{draft.files.length === 1 ? '' : 's'} attached
        </p>
        <button type="button" onClick={addSample} className="text-sm font-semibold text-brand-ink hover:underline">
          + Add a sample file
        </button>
      </div>

      {draft.files.length > 0 &&
      <ul className="space-y-2">
          {draft.files.map((f) =>
        <li key={f.name} className="flex items-center gap-3 rounded-xl border border-ink/15 bg-white p-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-ink bg-brand-soft">
                <FileIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{f.name}</p>
                <p className="text-xs text-muted">{f.size} · Ready</p>
              </div>
              <button
            type="button"
            aria-label={`Remove ${f.name}`}
            onClick={() => update({ files: draft.files.filter((x) => x.name !== f.name) })}
            className="btn btn-quiet btn-sm w-9 px-0">
            
                <Trash2Icon className="h-4 w-4" />
              </button>
            </li>
        )}
        </ul>
      }

      <div>
        <p className="label">Primary file type</p>
        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Primary file type">
          {fileTypes.map((t: FileType) =>
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={draft.fileType === t}
            onClick={() => update({ fileType: t })}
            className={`rounded-lg border py-2.5 font-display text-sm font-bold transition ${
            draft.fileType === t ? 'border-ink bg-brand' : 'border-ink/20 hover:border-ink'}`
            }>
            
              {t}
            </button>
          )}
        </div>
        <p className="mt-1.5 text-xs text-muted">Shown as a badge on your listing and used for search filters.</p>
      </div>
    </div>);

}