import React from 'react';
import { cn, focusRing } from '../../utils/styles';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  hideLabel?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, label, description, hideLabel = false, className }: ToggleProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {!hideLabel &&
      <span>
          <span className="block text-sm font-medium text-steel-800">{label}</span>
          {description && <span className="block text-xs text-steel-500">{description}</span>}
        </span>
      }
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          focusRing,
          checked ? 'bg-accent' : 'bg-steel-300'
        )}>
        
        <span className={cn('inline-block h-5 w-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-5' : 'translate-x-0.5')} />
      </button>
    </div>);

}