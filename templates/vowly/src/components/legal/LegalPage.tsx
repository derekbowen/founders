import React from "react";
import { brand } from "../../data/brand";
import { formatDate } from "../../utils/format";
import type { LegalSection } from "../../data/legal";

interface LegalPageProps {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, intro, updated, sections }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">Legal</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-ink sm:text-6xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated {formatDate(updated, "MMMM d, yyyy")}</p>
        <p className="mt-6 text-base leading-relaxed text-ink/85">{intro}</p>
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">On this page</p>
            <ul className="space-y-2 border-l border-line">
              {sections.map((s) =>
              <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-primary hover:text-primary">
                    {s.title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div className="max-w-3xl space-y-10">
          {sections.map((s) =>
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
              <h2 id={`${s.id}-title`} className="font-display text-3xl font-semibold text-ink">{s.title}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) =>
              <p key={i} className="text-base leading-relaxed text-ink/85">{p}</p>
              )}
              </div>
            </section>
          )}
          <p className="rounded-2xl bg-blush/50 p-5 text-sm text-ink/85">
            Questions? Contact us at{" "}
            <a href={`mailto:${brand.supportEmail}`} className="font-medium text-primary underline-offset-4 hover:underline">{brand.supportEmail}</a>.
          </p>
        </div>
      </div>
    </div>);

}