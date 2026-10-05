/**
 * Shared class presets that apply the brand palette on top of design-system components.
 * `!` modifiers guarantee brand colors win over the base component styles.
 */
export const buttonStyles = {
  primary:
  '!rounded-xl !bg-primary-400 hover:!bg-primary-500 !text-navy-900 !border !border-primary-400 hover:!border-primary-500 !font-semibold',
  navy: '!rounded-xl !bg-navy-900 hover:!bg-navy-800 !text-white !border !border-navy-900 !font-semibold',
  coral:
  '!rounded-xl !bg-coral-500 hover:!bg-coral-600 !text-white !border !border-coral-500 !font-semibold',
  outline:
  '!rounded-xl !bg-white hover:!bg-navy-50 !text-navy-900 !border !border-navy-200 !font-medium',
  ghost:
  '!rounded-xl !bg-transparent hover:!bg-navy-50 !text-navy-800 !border !border-transparent !font-medium'
};

export const fieldStyles = {
  label: 'mb-1.5 block text-sm font-medium text-navy-800',
  control:
  'w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 transition focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 disabled:bg-navy-50',
  help: 'mt-1.5 text-xs text-navy-500',
  error: 'mt-1.5 text-xs font-medium text-coral-700'
};

export const cardStyles = 'rounded-2xl border border-navy-100 bg-white';

export const chipStyles = {
  base: 'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-100',
  idle: 'border-navy-200 bg-white text-navy-700 hover:border-navy-300 hover:bg-navy-50',
  active: 'border-navy-900 bg-navy-900 text-white'
};