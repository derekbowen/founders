/** Shared class recipes so brand-colored surfaces stay consistent. */
export const ui = {
  /** Applied to the design-system Button to paint it with the brand color. */
  btnBrand:
  '!bg-brand-600 !text-white !border-brand-600 hover:!bg-brand-700 hover:!border-brand-700 focus-visible:!ring-brand-300 disabled:!bg-stone-300 disabled:!border-stone-300',
  btnOutline:
  '!bg-white !text-stone-800 !border-stone-300 hover:!bg-stone-50',
  linkBrand:
  'inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2',
  linkOutline:
  'inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2',
  container: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
  eyebrow: 'text-xs font-semibold uppercase tracking-[0.14em] text-brand-700',
  card: 'rounded-2xl border border-stone-200 bg-white',
  chip: 'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300',
  chipOn: 'border-brand-600 bg-brand-50 text-brand-800',
  chipOff: 'border-stone-300 bg-white text-stone-700 hover:border-stone-400',
  field:
  'w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200',
  label: 'mb-1.5 block text-sm font-medium text-stone-800'
};

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}