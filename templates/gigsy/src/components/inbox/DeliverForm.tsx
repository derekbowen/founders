import React, { useRef, useState } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextAreaField } from '../ui/TextAreaField';

interface DeliverFormProps {
  onDeliver: (files: {name: string;size: string;}[], note: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes > 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes > 1e6) return `${Math.round(bytes / 1e6)} MB`;
  return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}

export function DeliverForm({ onDeliver }: DeliverFormProps) {
  const [files, setFiles] = useState<{name: string;size: string;}[]>([]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Attach at least one file to deliver.');
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      onDeliver(files, note.trim());
      setSubmitting(false);
    }, 600);
  };

  return (
    <form onSubmit={submit} noValidate className="mt-4 space-y-4">
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center gap-1 rounded-xl border border-dashed px-4 py-6 text-center transition-colors hover:border-primary-400 hover:bg-primary-50 ${error ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-slate-50'}`}>
          
          <UploadCloudIcon className="h-6 w-6 text-slate-400" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-700">Upload final files</span>
          <span className="text-xs text-slate-500">Any format, up to 2 GB per file</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          aria-label="Upload delivery files"
          onChange={(e) => {
            const added = Array.from(e.target.files ?? []).map((f) => ({ name: f.name, size: formatBytes(f.size) }));
            setFiles((prev) => [...prev, ...added]);
            setError('');
            e.target.value = '';
          }} />
        
        {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
        {files.length === 0 &&
        <button
          type="button"
          className="mt-2 text-xs font-semibold text-primary-700 hover:text-primary-800"
          onClick={() => {
            setFiles([{ name: 'landing-page-final.zip', size: '48 MB' }, { name: 'handoff-walkthrough.mp4', size: '96 MB' }]);
            setError('');
          }}>
          
            Use sample files
          </button>
        }
        {files.length > 0 &&
        <ul className="mt-3 space-y-1.5">
            {files.map((f, i) =>
          <li key={f.name + i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <FileIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span className="flex-1 truncate font-medium text-slate-700">{f.name}</span>
                <span className="text-xs text-slate-500">{f.size}</span>
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="rounded p-0.5 text-slate-400 hover:text-slate-700" aria-label={`Remove ${f.name}`}>
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </li>
          )}
          </ul>
        }
      </div>
      <TextAreaField label="Delivery note" rows={3} placeholder="Summarize what's included and how to use the files" value={note} onChange={(e) => setNote(e.target.value)} />
      <Button type="submit" loading={submitting}>Deliver work</Button>
    </form>);

}