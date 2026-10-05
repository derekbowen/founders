export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const base =
'inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40';

const variants = {
  primary: 'bg-ink text-paper hover:bg-accent-dark',
  secondary: 'border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  outline: 'border border-line bg-paper text-ink hover:border-ink',
  ghost: 'text-ink hover:bg-cream',
  light: 'bg-paper text-ink hover:bg-accent-soft'
};

const sizes = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-12 px-8 text-xs'
};

export function btn(
variant: keyof typeof variants = 'primary',
size: keyof typeof sizes = 'md',
extra?: string)
: string {
  return cx(base, variants[variant], sizes[size], extra);
}

export const eyebrow =
'text-[11px] font-semibold uppercase tracking-eyebrow text-accent-dark';

export const fieldClass =
'h-11 w-full rounded-sm border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink';

export const labelClass = 'mb-1.5 block text-sm font-medium text-ink';