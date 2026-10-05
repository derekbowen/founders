import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CheckboxFieldProps {
  id: string;
  label: React.ReactNode;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function CheckboxField({ id, label, description, checked, onChange, disabled, className }: CheckboxFieldProps) {
  return (
    <label htmlFor={id} className={cn('group flex cursor-pointer items-start gap-3', disabled && 'cursor-not-allowed opacity-60', className)}>
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)} />
        
        <span
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-primary-200',
            checked ? 'border-primary-500 bg-primary-500' : 'border-stone-300 bg-white group-hover:border-stone-400'
          )}
          aria-hidden="true">
          
          {checked && <CheckIcon className="h-3.5 w-3.5 text-stone-900" strokeWidth={3.5} />}
        </span>
      </span>
      <span>
        <span className="block text-[15px] font-semibold text-stone-800">{label}</span>
        {description && <span className="mt-0.5 block text-sm text-stone-500">{description}</span>}
      </span>
    </label>);

}