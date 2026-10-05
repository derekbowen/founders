import React from "react";
import { Link } from "react-router-dom";
import { brand } from "../data/brand";
import { legalPages } from "../data/legal";

export function Legal({ kind }: {kind: "terms" | "privacy";}) {
  const page = legalPages[kind];
  const linkClass = (active: boolean) =>
  `block rounded-xl px-3 py-2 ${active ? "bg-paper font-semibold text-ink" : "text-muted hover:text-ink"}`;
  return (
    <div className="container-site py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Legal" className="space-y-1 text-sm">
          <Link to="/terms" className={linkClass(kind === "terms")} aria-current={kind === "terms" ? "page" : undefined}>
            Terms of service
          </Link>
          <Link to="/privacy" className={linkClass(kind === "privacy")} aria-current={kind === "privacy" ? "page" : undefined}>
            Privacy policy
          </Link>
        </nav>
        <article className="max-w-3xl rounded-2xl border border-line bg-paper p-6 sm:p-10">
          <h1 className="font-display text-4xl font-semibold text-ink">{page.title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated {page.updated}</p>
          {page.sections.map((s) =>
          <section key={s.heading} className="mt-8">
              <h2 className="font-display text-xl font-semibold text-ink">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-ink/85">{s.body}</p>
            </section>
          )}
          <p className="mt-10 text-sm text-muted">
            Questions? Email{" "}
            <a href={`mailto:${brand.supportEmail}`} className="font-semibold text-primary hover:underline">
              {brand.supportEmail}
            </a>
          </p>
        </article>
      </div>
    </div>);

}