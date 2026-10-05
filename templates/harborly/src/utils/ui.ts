import { twMerge } from 'tailwind-merge';

export function cn(...classes: (string | false | null | undefined)[]): string {
  return twMerge(classes.filter(Boolean).join(' '));
}

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'light' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-soft',
  accent: 'bg-coral-dark text-white hover:bg-coral-dark/90',
  outline: 'border border-line bg-white text-navy hover:border-navy/40 hover:bg-sand-light',
  ghost: 'text-navy hover:bg-sand-light',
  light: 'bg-white text-navy hover:bg-sand-light',
  danger: 'border border-danger/30 bg-white text-danger hover:bg-danger/5'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base'
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra?: string): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    extra
  );
}

export const inputClass =
'block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15 disabled:bg-sand-light';

export const cardClass = 'rounded-2xl border border-line bg-white';