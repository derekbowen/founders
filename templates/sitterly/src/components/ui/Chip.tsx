import React from 'react';

type ChipTone = 'primary' | 'accent' | 'success' | 'neutral';

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
  icon?: React.ReactNode;
  className?: string;
}

const tones: Record<ChipTone, string> = {
  primary: 'bg-primary-50 text-primary-800 ring-primary-200',
  accent: 'bg-accent-50 text-accent-800 ring-accent-200',
  success: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  neutral: 'bg-ink-100 text-ink-700 ring-ink-200'
};

export function Chip({ children, tone = 'neutral', icon, className = '' }: ChipProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]} ${className}`}>
      {icon}
      {children}
    </span>);

}