import React from 'react';
import { cn } from '../../utils/styles';

interface CheckboxFieldProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  trailing?: React.ReactNode;
  className?: string;
}

export function CheckboxField({ id, label, checked, onChange, description, trailing, className }: CheckboxFieldProps) {
  return (
    <label htmlFor={id} className={cn('flex cursor-pointer items-start gap-3 rounded-lg py-1.5 text-sm', className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-steel-300 accent-primary" />
      
      <span className="flex-1">
        <span className="block text-steel-800">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-steel-500">{description}</span>}
      </span>
      {trailing && <span className="text-sm text-steel-500">{trailing}</span>}
    </label>);

}