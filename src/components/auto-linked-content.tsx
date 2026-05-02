import { Link } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";

export type LinkTarget = {
  /** Phrase to match in the text (case-insensitive, whole-word). */
  phrase: string;
  /** Absolute internal path, e.g. `/help-center/safety-first/pool-safety-basics`. */
  to: string;
  /** Optional title attribute / accessibility hint. */
  title?: string;
  /** Higher = matched first when phrases overlap. */
  priority?: number;
};

type Options = {
  /** Max links to inject per post. */
  maxLinks?: number;
  /** Max times the same target may be linked. */
  maxPerTarget?: number;
};

const DEFAULTS: Required<Options> = { maxLinks: 8, maxPerTarget: 1 };

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Renders text with whole-word, case-insensitive matches of `targets`
 * converted into TanStack <Link>s. Newlines are preserved.
 *
 * Each target is linked at most `maxPerTarget` times, and the document
 * gets at most `maxLinks` total injected links.
 */
export function AutoLinkedContent({
  text,
  targets,
  options,
  className,
}: {
  text: string;
  targets: LinkTarget[];
  options?: Options;
  className?: string;
}) {
  const opts = { ...DEFAULTS, ...(options ?? {}) };
  if (!text) return null;

  // Sort: higher priority first, then longer phrases (so "pool maintenance"
  // beats "pool" when both match the same span).
  const sorted = [...targets]
    .filter((t) => t.phrase && t.phrase.length >= 3)
    .sort(
      (a, b) =>
        (b.priority ?? 0) - (a.priority ?? 0) ||
        b.phrase.length - a.phrase.length,
    );

  // Find candidate matches across the whole text without overlap.
  type Match = { start: number; end: number; target: LinkTarget };
  const matches: Match[] = [];
  const taken: Array<[number, number]> = [];
  const perTarget = new Map<string, number>();
  let total = 0;

  const overlaps = (s: number, e: number) =>
    taken.some(([ts, te]) => s < te && e > ts);

  for (const target of sorted) {
    if (total >= opts.maxLinks) break;
    const re = new RegExp(`\\b${escapeRegex(target.phrase)}\\b`, "i");
    const m = re.exec(text);
    if (!m) continue;
    const start = m.index;
    const end = start + m[0].length;
    if (overlaps(start, end)) continue;
    const key = target.to;
    const used = perTarget.get(key) ?? 0;
    if (used >= opts.maxPerTarget) continue;
    matches.push({ start, end, target });
    taken.push([start, end]);
    perTarget.set(key, used + 1);
    total += 1;
  }

  matches.sort((a, b) => a.start - b.start);

  // Build interleaved nodes; preserve line breaks via splitting on \n.
  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.start > cursor) {
      nodes.push(
        <PreserveNewlines key={`t-${i}`} text={text.slice(cursor, m.start)} />,
      );
    }
    nodes.push(
      <Link
        key={`l-${i}`}
        to={m.target.to}
        title={m.target.title}
        className="text-primary underline-offset-4 hover:underline"
      >
        {text.slice(m.start, m.end)}
      </Link>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) {
    nodes.push(<PreserveNewlines key="t-end" text={text.slice(cursor)} />);
  }

  return <div className={className}>{nodes}</div>;
}

function PreserveNewlines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Builds the canonical internal-link target list for blog posts:
 * city pool-rental hubs, permits/laws articles, maintenance & safety
 * help articles, and host tool calculators.
 */
export function buildBlogLinkTargets(input: {
  cities: Array<{ slug: string; name: string; state?: string | null; state_code?: string | null }>;
  helpArticles: Array<{ slug: string; title: string; category_slug: string }>;
  tools: Array<{ slug: string; title: string }>;
}): LinkTarget[] {
  const targets: LinkTarget[] = [];

  // Cities → /pool-rental/$city, plus permit pages for compliance language
  for (const c of input.cities) {
    targets.push({
      phrase: c.name,
      to: `/pool-rental/${c.slug}`,
      title: `Pool rentals in ${c.name}`,
      priority: 5,
    });
  }

  // Help articles by category
  for (const a of input.helpArticles) {
    const path = `/help-center/${a.category_slug}/${a.slug}`;
    targets.push({
      phrase: a.title,
      to: path,
      title: a.title,
      priority:
        a.category_slug === "legal-and-compliance"
          ? 8
          : a.category_slug === "safety-first"
            ? 7
            : a.category_slug === "pool-management"
              ? 7
              : 6,
    });
  }

  // Topical phrase fallbacks → category indexes
  targets.push(
    {
      phrase: "permits",
      to: "/help-center/legal-and-compliance",
      title: "Permits & licensing",
      priority: 9,
    },
    {
      phrase: "permit",
      to: "/help-center/legal-and-compliance",
      title: "Permits & licensing",
      priority: 9,
    },
    {
      phrase: "pool maintenance",
      to: "/help-center/pool-management",
      title: "Pool maintenance",
      priority: 9,
    },
    {
      phrase: "water chemistry",
      to: "/help-center/pool-management",
      title: "Water chemistry",
      priority: 8,
    },
    {
      phrase: "pool safety",
      to: "/help-center/safety-first",
      title: "Pool safety",
      priority: 8,
    },
    {
      phrase: "liability insurance",
      to: "/help-center/legal-and-compliance",
      title: "Liability insurance",
      priority: 8,
    },
    {
      phrase: "zoning",
      to: "/help-center/legal-and-compliance",
      title: "Zoning rules",
      priority: 7,
    },
    {
      phrase: "pool rental",
      to: "/pool-rental",
      title: "Pool rental",
      priority: 4,
    },
  );

  // Host tools / calculators
  for (const t of input.tools) {
    targets.push({
      phrase: t.title,
      to: `/host-tools/${t.slug}`,
      title: t.title,
      priority: 6,
    });
  }

  return targets;
}
