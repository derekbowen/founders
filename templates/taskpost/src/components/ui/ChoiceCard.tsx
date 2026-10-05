import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface ChoiceCardProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  role?: 'radio' | 'checkbox';
  className?: string;
}

export function ChoiceCard({ selected, onSelect, title, description, icon, role = 'radio', className }: ChoiceCardProps) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'relative flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        selected ? 'border-primary-600 bg-primary-50/60' : 'border-ink-200 bg-white hover:border-ink-300',
        className
      )}>
      
      {icon &&
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          selected ? 'bg-primary-600 text-white' : 'bg-ink-100 text-ink-600'
        )}>
        
          {icon}
        </span>
      }
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-ink-900">{title}</span>
        {description && <span className="mt-0.5 block text-xs text-ink-600">{description}</span>}
      </span>
      {selected &&
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
          <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
        </span>
      }
    </button>);

}