import React from 'react';
import { CheckIcon } from 'lucide-react';

interface CheckRowProps {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
}

export function CheckRow({ label, hint, checked, onChange }: CheckRowProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg py-1.5 text-sm text-slate-700 hover:text-slate-900">
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input type="checkbox" checked={checked} onChange={onChange} className="peer absolute inset-0 cursor-pointer opacity-0" />
        <span className="h-5 w-5 rounded-md border border-slate-400 bg-white transition peer-checked:border-accent-700 peer-checked:bg-accent-700 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-1" />
        {checked && <CheckIcon className="pointer-events-none absolute h-3.5 w-3.5 text-white" aria-hidden />}
      </span>
      <span className="flex-1">{label}</span>
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>);

}