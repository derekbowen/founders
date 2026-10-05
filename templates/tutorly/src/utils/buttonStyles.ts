/**
 * Brand overrides applied on top of the design-system Button so CTAs
 * pick up `primary` / `accent` tokens from data/brand.ts.
 */
export const brandButton = {
  primary:
  '!bg-primary-600 hover:!bg-primary-700 !text-white !border-transparent !rounded-xl !font-semibold focus-visible:!ring-2 focus-visible:!ring-primary-300 focus-visible:!ring-offset-2 disabled:!bg-ink-200 disabled:!text-ink-500',
  accent:
  '!bg-accent-400 hover:!bg-accent-300 !text-ink-900 !border-transparent !rounded-xl !font-semibold focus-visible:!ring-2 focus-visible:!ring-accent-500 focus-visible:!ring-offset-2',
  secondary:
  '!bg-white hover:!bg-ink-50 !text-ink-900 !border !border-ink-200 !rounded-xl !font-medium',
  ghost: '!bg-transparent hover:!bg-primary-50 !text-primary-700 !border-transparent !rounded-xl !font-medium',
  danger: '!bg-white hover:!bg-red-50 !text-red-700 !border !border-red-200 !rounded-xl !font-medium'
};

/** Same look for router links that behave like buttons. */
export const linkButton = {
  base: 'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-300',
  accent: 'bg-accent-400 text-ink-900 hover:bg-accent-300 focus-visible:ring-accent-500',
  secondary: 'border border-ink-200 bg-white text-ink-900 hover:bg-ink-50 focus-visible:ring-primary-300',
  ghost: 'text-ink-700 hover:bg-ink-100 focus-visible:ring-primary-300'
};