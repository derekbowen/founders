export function chipClasses(active: boolean): string {
  return `rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40 ${
  active ? "border-primary bg-primary text-white" : "border-line bg-surface text-ink hover:border-ink/30"}`;

}