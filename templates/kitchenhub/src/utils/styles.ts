import { twMerge } from 'tailwind-merge';

export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(' '));
}

export const focusRing =
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

export const inputClass =
'block w-full rounded-lg border border-steel-300 bg-white px-3.5 py-2.5 text-sm text-steel-900 placeholder:text-steel-400 shadow-sm transition-colors hover:border-steel-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-steel-50 disabled:text-steel-400';

export const labelClass = 'mb-1.5 block text-sm font-medium text-steel-800';

export const containerClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';