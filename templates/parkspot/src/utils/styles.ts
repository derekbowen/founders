export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
'inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-soft',
  accent: 'bg-accent text-ink hover:bg-accent-strong',
  secondary: 'border border-line bg-surface text-ink hover:border-ink/40 hover:bg-canvas',
  ghost: 'text-ink hover:bg-ink/5',
  danger: 'border border-danger/30 bg-surface text-danger hover:bg-danger/5'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

export const fieldClass =
'h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted focus:border-navy focus:outline-none focus:ring-2 focus:ring-accent/60 disabled:bg-canvas';

export const textareaClass =
'w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-navy focus:outline-none focus:ring-2 focus:ring-accent/60';

export const labelClass = 'mb-1.5 block text-sm font-medium text-ink';

export const cardClass = 'rounded-2xl border border-line bg-surface';