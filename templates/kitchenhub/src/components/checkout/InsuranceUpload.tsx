import React, { useRef, useState } from 'react';
import { FileCheckIcon, UploadIcon, XIcon } from 'lucide-react';
import { cn, focusRing } from '../../utils/styles';

interface InsuranceUploadProps {
  fileName: string;
  onChange: (name: string) => void;
  error?: string;
}

export function InsuranceUpload({ fileName, onChange, error }: InsuranceUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onChange(file.name);
  };

  if (fileName) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent-soft p-4">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-accent">
          <FileCheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-steel-900">{fileName}</p>
          <p className="text-xs text-accent">Uploaded · We’ll verify it before the host accepts</p>
        </div>
        <button type="button" onClick={() => onChange('')} aria-label="Remove file" className={cn('grid h-8 w-8 place-items-center rounded-full text-steel-600 hover:bg-white', focusRing)}>
          <XIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>);

  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          'flex flex-col items-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors',
          dragging ? 'border-primary bg-primary-soft' : error ? 'border-primary/60 bg-white' : 'border-steel-300 bg-steel-50 hover:border-steel-400'
        )}>
        
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-steel-600 shadow-card">
          <UploadIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-3 text-sm font-medium text-steel-900">
          Drag your certificate of insurance here, or{' '}
          <button id="co-insuranceFile" type="button" onClick={() => inputRef.current?.click()} className={cn('rounded font-semibold text-primary hover:underline', focusRing)}>
            browse files
          </button>
        </p>
        <p className="mt-1 text-xs text-steel-500">PDF, JPG or PNG up to 10 MB · $1M general liability naming the host</p>
        <button type="button" onClick={() => onChange('COI_General_Liability_2026.pdf')} className="mt-3 text-xs font-medium text-steel-600 underline hover:text-steel-900">
          Use sample certificate
        </button>
        <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" tabIndex={-1} onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-primary" role="alert">{error}</p>}
    </div>);

}