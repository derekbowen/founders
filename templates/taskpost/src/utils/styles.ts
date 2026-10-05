import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(' '));
}

const buttonBase =
'inline-flex items-center justify-center gap-2 rounded-lg font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700',
  secondary:
  'border border-ink-300 bg-white text-ink-900 shadow-sm hover:border-ink-400 hover:bg-ink-50',
  ghost: 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
  dark: 'bg-ink-900 text-white shadow-sm hover:bg-ink-800',
  danger: 'border border-red-200 bg-white text-red-700 hover:border-red-300 hover:bg-red-50'
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
};

export function buttonClass(
variant: ButtonVariant = 'primary',
size: ButtonSize = 'md',
extra?: string)
: string {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], extra);
}

export const inputClass =
'block h-11 w-full rounded-lg border border-ink-300 bg-white px-3.5 text-sm text-ink-900 shadow-sm transition placeholder:text-ink-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 disabled:bg-ink-50 disabled:text-ink-500';

export const textareaClass = cn(inputClass, 'h-auto min-h-[112px] py-3 leading-relaxed');

export const inputErrorClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/30';

export const cardClass = 'rounded-2xl border border-ink-200 bg-white shadow-card';