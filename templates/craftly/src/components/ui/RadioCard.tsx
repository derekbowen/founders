import React from 'react';

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: React.ReactNode;
  aside?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function RadioCard({ name, value, checked, onChange, title, description, aside, icon, disabled }: RadioCardProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
      checked ? 'border-primary bg-primary-soft/50 ring-1 ring-primary' : 'border-line bg-surface hover:border-muted/50'} ${
      disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
      
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="mt-1 h-4 w-4 shrink-0 accent-primary" />
      
      {icon && <span className="mt-0.5 text-muted">{icon}</span>}
      <span className="flex-1">
        <span className="block text-sm font-medium text-ink">{title}</span>
        {description && <span className="mt-0.5 block text-xs leading-relaxed text-muted">{description}</span>}
      </span>
      {aside && <span className="text-sm font-medium text-ink">{aside}</span>}
    </label>);

}