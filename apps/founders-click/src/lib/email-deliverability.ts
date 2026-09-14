/**
 * EMAIL DELIVERABILITY PREFLIGHT.
 *
 * Why this exists: for sixteen months founders.click sent auth email from
 * noreply@founders.click while that domain published no DKIM and no DMARC.
 * EmailIt accepted every send and returned 200. Microsoft and Google then
 * discarded the mail silently — unauthenticated mail from an unverified
 * domain is dropped, not bounced. The result was a platform where every
 * signup dead-ended at "check your email" and nothing anywhere reported a
 * failure, because there was no failure to report: the send genuinely
 * succeeded, the delivery did not.
 *
 * A send API returning 200 is therefore NOT evidence that mail works. The
 * only cheap standing proof is the DNS the receiving world checks. This
 * module reads exactly that, so a deploy can refuse to ship, and an operator
 * can see the truth on one page, without waiting on an inbox that may never
 * chime.
 *
 * ON LOOKING IN THE RIGHT PLACE. An earlier version of this file read SPF at
 * the apex only, and reported "no SPF" for a domain that authenticated
 * perfectly well. SPF authorises the ENVELOPE sender (MAIL FROM /
 * Return-Path), not the From header, and every serious ESP delegates the
 * envelope to a subdomain it controls — founders.click's is
 * emailit.founders.click, which carries both the bounce MX and the SPF record.
 * Gating on the apex made a satisfied condition look like a blocker and sent
 * an operator chasing a record that was never required. So: when the apex
 * publishes no SPF, find the actual return path before saying SPF is missing.
 *
 * Resolution is over DNS-over-HTTPS because this runs inside a Cloudflare
 * Worker, which has no UDP and therefore no ordinary resolver.
 */

const DOH_ENDPOINT = "https://cloudflare-dns.com/dns-query";

/** DKIM selectors worth probing when the operator has not named one. */
const COMMON_DKIM_SELECTORS = [
  "emailit",
  "emailit1",
  "emailit2",
  "default",
  "mail",
  "dkim",
  "k1",
  "s1",
  "s2",
] as const;

/**
 * Labels ESPs commonly use for a delegated return-path (bounce) subdomain.
 * Probed only when the apex publishes no SPF, and only ever believed when the
 * candidate also has an MX — that MX is what makes it a return path rather
 * than an arbitrary subdomain that happens to carry a TXT record.
 */
const COMMON_RETURN_PATH_LABELS = [
  "emailit",
  "em",
  "mail",
  "mailer",
  "mta",
  "smtp",
  "bounce",
  "bounces",
  "pm-bounces",
  "mg",
  "ses",
] as const;

export type RecordCheck = {
  /**
   * present — the record exists.
   * absent  — the resolver answered, and there is no such record.
   * unknown — the lookup itself failed. NOT the same as absent: a gate that
   *           reports a missing record when it simply could not ask sends the
   *           operator to fix DNS that may already be correct.
   */
  status: "present" | "absent" | "unknown";
  present: boolean;
  /** The record's value, when present. Never contains a secret — DNS is public. */
  value?: string;
  /** Populated when a record is present but unusable, or when the lookup failed. */
  problem?: string;
  /**
   * The name the record was actually found on, when that is not the sending
   * domain itself. Set for SPF published on a delegated return path.
   */
  foundOn?: string;
};

/** The envelope domain mail is really sent with, when it is not the apex. */
export type ReturnPath = {
  domain: string;
  /** "configured" — the operator named it. "discovered" — found by probe. */
  via: "configured" | "discovered";
  /** The bounce host its MX points at; the evidence that it is a return path. */
  mx: string | null;
  /** Its SPF record, when it publishes one. */
  spf: string | null;
  /**
   * True when the return path sits under the sending domain's organisational
   * domain, which is what DMARC's default (relaxed) SPF alignment requires.
   */
  alignsRelaxed: boolean;
};

export type DeliverabilityReport = {
  domain: string;
  spf: RecordCheck;
  dkim: RecordCheck & { selector?: string };
  dmarc: RecordCheck;
  /** The delegated envelope domain, when SPF lives there rather than the apex. */
  returnPath?: ReturnPath;
  /**
   * pass    — mail from this domain authenticates; delivery is plausible.
   * warn    — it will authenticate, but something is set up to fail later.
   * fail    — mail will be dropped or junked. Do not expect anything to arrive.
   */
  verdict: "pass" | "warn" | "fail";
  /**
   * True when a lookup failed rather than answered. The verdict is still
   * "fail" (we cannot assert mail works), but the cause is an unreachable
   * resolver, not absent records — never print DNS fix instructions for it.
   */
  indeterminate?: boolean;
  /** Operator-facing lines explaining the verdict. Safe to display. */
  findings: string[];
  checkedAt: string;
};

type DohAnswer = { name: string; type: number; data: string };

async function queryDoh(
  name: string,
  type: "TXT" | "MX",
  fetchImpl: typeof fetch,
): Promise<DohAnswer[]> {
  const url = `${DOH_ENDPOINT}?name=${encodeURIComponent(name)}&type=${type}`;
  const res = await fetchImpl(url, { headers: { accept: "application/dns-json" } });
  if (!res.ok) throw new Error(`DoH ${res.status} for ${name}`);
  const body = (await res.json()) as { Answer?: DohAnswer[] };
  return body.Answer ?? [];
}

async function resolveTxtOverHttps(name: string, fetchImpl: typeof fetch): Promise<string[]> {
  return (await queryDoh(name, "TXT", fetchImpl))
    .filter((a) => a.type === 16)
    // DoH returns TXT quoted, and long records arrive split into chunks.
    .map((a) => a.data.replace(/^"|"$/g, "").replace(/"\s+"/g, ""));
}

async function resolveMxOverHttps(name: string, fetchImpl: typeof fetch): Promise<string[]> {
  return (await queryDoh(name, "MX", fetchImpl))
    .filter((a) => a.type === 15)
    // "10 feedback-smtp.ffdc-1.emailit.com." — priority, then the exchange.
    .map((a) => a.data.trim().split(/\s+/).slice(1).join(" ").replace(/\.$/, ""))
    .filter(Boolean);
}

/**
 * Resolve a record, preferring the platform resolver when there is one.
 *
 * A Worker has no UDP and must use DoH. CI runners and laptops do have a
 * resolver, and reaching for it first means the preflight keeps working from
 * networks where outbound DoH is blocked — which is exactly the situation
 * where a false "record missing" would be most misleading.
 *
 * Throws when the name cannot be resolved at all; returns [] for a name that
 * resolves with no records of that type.
 */
async function resolveVia<T>(
  node: () => Promise<T[]>,
  https: () => Promise<T[]>,
  usingStub: boolean,
): Promise<T[]> {
  if (!usingStub) {
    try {
      try {
        return await node();
      } catch (err: any) {
        // NXDOMAIN / NODATA are answers, not failures: the name has no record.
        if (err?.code === "ENOTFOUND" || err?.code === "ENODATA") return [];
        throw err;
      }
    } catch (err: any) {
      // Only fall through to DoH when the module itself is unavailable
      // (a Worker); a genuine resolver error must not be masked.
      if (err?.code && err.code !== "ERR_MODULE_NOT_FOUND") throw err;
    }
  }
  return https();
}

async function resolveTxt(name: string, fetchImpl?: typeof fetch): Promise<string[]> {
  return resolveVia(
    async () => {
      const dns = await import("node:dns/promises");
      const chunks = await dns.resolveTxt(name);
      return chunks.map((parts) => parts.join(""));
    },
    () => resolveTxtOverHttps(name, fetchImpl ?? fetch),
    Boolean(fetchImpl),
  );
}

async function resolveMx(name: string, fetchImpl?: typeof fetch): Promise<string[]> {
  return resolveVia(
    async () => {
      const dns = await import("node:dns/promises");
      const mx = await dns.resolveMx(name);
      return mx.map((m) => m.exchange);
    },
    () => resolveMxOverHttps(name, fetchImpl ?? fetch),
    Boolean(fetchImpl),
  );
}

const spfIn = (records: string[]): string | undefined =>
  records.find((t) => t.toLowerCase().startsWith("v=spf1"));

/**
 * Is `candidate` inside `domain`'s organisational domain? That is what DMARC
 * relaxed alignment (the default, and what `aspf=r` means) requires of the
 * SPF-authenticated domain.
 */
const underOrgDomain = (candidate: string, domain: string): boolean =>
  candidate === domain || candidate.endsWith(`.${domain}`);

/**
 * Probe one name as a possible return path.
 *
 * A candidate the operator named is believed on their say-so. A candidate we
 * guessed has to prove itself: an MX (it receives bounces) AND an SPF record
 * (it authorises senders). Without both it is just a subdomain.
 */
async function probeReturnPath(
  name: string,
  via: ReturnPath["via"],
  domain: string,
  fetchImpl?: typeof fetch,
): Promise<ReturnPath | null> {
  let mx: string[] = [];
  try {
    mx = await resolveMx(name, fetchImpl);
  } catch {
    /* a candidate we cannot resolve is simply not the return path */
  }
  if (via === "discovered" && mx.length === 0) return null;

  let spf: string | undefined;
  try {
    spf = spfIn(await resolveTxt(name, fetchImpl));
  } catch {
    /* same */
  }
  if (via === "discovered" && !spf) return null;

  return {
    domain: name,
    via,
    mx: mx[0] ?? null,
    spf: spf ?? null,
    alignsRelaxed: underOrgDomain(name, domain),
  };
}

/**
 * Find the envelope domain mail is actually sent with.
 *
 * Only called when the apex publishes no SPF, so the cost lands on the path
 * that was previously reported — wrongly — as a hard failure. The guessed
 * candidates go out together, and the first hit in preference order wins.
 */
async function findReturnPath(
  domain: string,
  opts: { returnPathDomain?: string; dkimSelector?: string; fetchImpl?: typeof fetch },
): Promise<ReturnPath | null> {
  const configured = opts.returnPathDomain?.trim().toLowerCase().replace(/\.$/, "");
  if (configured) {
    const found = await probeReturnPath(configured, "configured", domain, opts.fetchImpl);
    if (found) return found;
  }

  // The provider's DKIM selector is the best guess available: a provider that
  // delegates a return path usually names it with the same label it signs
  // with. emailit.founders.click is exactly this case.
  const labels = [
    ...(opts.dkimSelector ? [opts.dkimSelector.trim().toLowerCase()] : []),
    ...COMMON_RETURN_PATH_LABELS,
  ];
  const seen = new Set<string>();
  const candidates = labels
    .map((label) => `${label}.${domain}`)
    .filter((name) => name !== configured && !seen.has(name) && (seen.add(name), true));

  const results = await Promise.all(
    candidates.map((name) => probeReturnPath(name, "discovered", domain, opts.fetchImpl)),
  );
  return results.find((r): r is ReturnPath => r !== null) ?? null;
}

/**
 * Read the authentication records the receiving world will check for `domain`.
 *
 * `dkimSelector` skips the guesswork when the provider's selector is known;
 * otherwise a short list of common selectors is probed. A miss there is
 * reported as "not found", never as "absent" — an unprobed selector may exist.
 *
 * `returnPathDomain` names the envelope domain when the operator knows it.
 * Without it, one is discovered — but only when the apex has no SPF of its own.
 */
export async function checkSendingDomain(
  domain: string,
  opts: { dkimSelector?: string; returnPathDomain?: string; fetchImpl?: typeof fetch } = {},
): Promise<DeliverabilityReport> {
  // Deliberately not defaulted: an undefined impl means "use the platform
  // resolver if there is one", which resolveTxt handles.
  const fetchImpl = opts.fetchImpl;
  const findings: string[] = [];

  const spf: RecordCheck = { status: "absent", present: false };
  const dkim: RecordCheck & { selector?: string } = { status: "absent", present: false };
  const dmarc: RecordCheck = { status: "absent", present: false };
  let returnPath: ReturnPath | undefined;

  // --- SPF: authorises which servers may send as the ENVELOPE domain ------
  try {
    const record = spfIn(await resolveTxt(domain, fetchImpl));
    if (record) {
      spf.status = "present";
      spf.present = true;
      spf.value = record;
      // "+all" authorises the entire internet, which is the same as no SPF
      // for anti-abuse purposes and is treated as a failure by some receivers.
      if (/[+]all\b/.test(record)) {
        spf.problem = 'ends in "+all", which authorises every sender on the internet';
      }
    }
  } catch (err) {
    spf.status = "unknown";
    spf.problem = `lookup failed: ${err instanceof Error ? err.message : String(err)}`;
  }

  // No SPF at the apex is not the same as no SPF. Before calling it missing,
  // look where the envelope sender actually lives.
  if (spf.status === "absent") {
    try {
      returnPath =
        (await findReturnPath(domain, {
          returnPathDomain: opts.returnPathDomain,
          dkimSelector: opts.dkimSelector,
          fetchImpl,
        })) ?? undefined;
    } catch {
      /* discovery is best-effort; a failure here leaves SPF absent as read */
    }
    if (returnPath?.spf) {
      spf.status = "present";
      spf.present = true;
      spf.value = returnPath.spf;
      spf.foundOn = returnPath.domain;
      if (/[+]all\b/.test(returnPath.spf)) {
        spf.problem = 'ends in "+all", which authorises every sender on the internet';
      }
    }
  }

  // --- DKIM: cryptographically signs the message --------------------------
  const selectors = opts.dkimSelector ? [opts.dkimSelector] : [...COMMON_DKIM_SELECTORS];
  let dkimLookupError: string | undefined;
  for (const selector of selectors) {
    try {
      const txt = await resolveTxt(`${selector}._domainkey.${domain}`, fetchImpl);
      const record = txt.find((t) => t.toLowerCase().includes("v=dkim1") || t.includes("p="));
      if (record) {
        dkim.status = "present";
        dkim.present = true;
        dkim.selector = selector;
        // The public key itself is not worth echoing back; length is enough
        // to distinguish a real key from a revoked (p=) placeholder.
        dkim.value = `v=DKIM1 (${record.length} chars)`;
        if (/[;\s]p=\s*(?:;|$)/.test(record)) {
          dkim.problem = `selector "${selector}" publishes an empty key (p=), which revokes it`;
        }
        break;
      }
    } catch (err) {
      // A selector that does not resolve is the normal case for all but one,
      // so this is only notable if every probe errored rather than answered.
      dkimLookupError = err instanceof Error ? err.message : String(err);
    }
  }
  if (!dkim.present && dkimLookupError) {
    dkim.status = "unknown";
    dkim.problem = `lookup failed: ${dkimLookupError}`;
  }

  // --- DMARC: tells receivers what to do when the above fail --------------
  try {
    const txt = await resolveTxt(`_dmarc.${domain}`, fetchImpl);
    const record = txt.find((t) => t.toLowerCase().startsWith("v=dmarc1"));
    if (record) {
      dmarc.status = "present";
      dmarc.present = true;
      dmarc.value = record;
    }
  } catch (err) {
    dmarc.status = "unknown";
    dmarc.problem = `lookup failed: ${err instanceof Error ? err.message : String(err)}`;
  }

  // --- Verdict ------------------------------------------------------------
  // SPF and DKIM are what decide whether mail is accepted at all. Gmail and
  // Microsoft both require at least one to pass for unauthenticated bulk mail,
  // and since 2024 both require DMARC for bulk senders. Missing both is not a
  // warning: it is the explanation for mail that never arrives.
  let verdict: DeliverabilityReport["verdict"] = "pass";

  // A lookup that never got an answer is reported as its own state. It still
  // blocks (we cannot claim mail works), but it must not read as "your DNS is
  // missing" — that sends the operator to re-add records that may be fine.
  const indeterminate =
    spf.status === "unknown" || dkim.status === "unknown" || dmarc.status === "unknown";
  if (indeterminate) {
    const which = [
      spf.status === "unknown" ? "SPF" : null,
      dkim.status === "unknown" ? "DKIM" : null,
      dmarc.status === "unknown" ? "DMARC" : null,
    ].filter(Boolean);
    return {
      domain,
      spf,
      dkim,
      dmarc,
      returnPath,
      verdict: "fail",
      indeterminate: true,
      findings: [
        `Could not resolve ${which.join(", ")} for ${domain} — the DNS lookup itself failed, ` +
          `so this is not evidence that the records are missing. Re-run from a network that ` +
          `can resolve DNS before changing anything.`,
        ...[spf.problem, dkim.problem, dmarc.problem].filter((p): p is string => !!p),
      ],
      checkedAt: new Date().toISOString(),
    };
  }

  if (!spf.present && !dkim.present) {
    verdict = "fail";
    findings.push(
      `${domain} publishes neither SPF nor DKIM, and no delegated return path publishes ` +
        `SPF either. Mail sent as this domain will be discarded by Gmail and Microsoft, ` +
        `usually without a bounce. Nothing will arrive.`,
    );
  } else {
    if (!spf.present) {
      verdict = "fail";
      findings.push(
        `${domain} publishes no SPF record, and no delegated return path was found that ` +
          `does. Receivers cannot verify the envelope sender.`,
      );
    }
    if (!dkim.present) {
      verdict = "fail";
      findings.push(
        opts.dkimSelector
          ? `No DKIM key at "${opts.dkimSelector}._domainkey.${domain}".`
          : `No DKIM key found at any common selector (${COMMON_DKIM_SELECTORS.join(", ")}). ` +
            `If the provider uses a different selector, pass it explicitly before trusting this.`,
      );
    }
  }

  // SPF on a delegated return path is the normal ESP arrangement, not a
  // shortfall — say so plainly, because the opposite reading is what made an
  // earlier version of this check raise a blocker over nothing.
  if (spf.present && spf.foundOn) {
    findings.push(
      `SPF is published on ${spf.foundOn}, the return path (bounce MX ` +
        `${returnPath?.mx ?? "present"}), not on ${domain}. That is where it belongs: SPF ` +
        `authenticates the envelope sender, and ${domain} is only the From header. No SPF ` +
        `record is required on ${domain} itself.`,
    );
  }

  if (spf.problem) {
    verdict = verdict === "fail" ? "fail" : "warn";
    findings.push(`SPF: ${spf.problem}`);
  }
  if (dkim.problem) {
    verdict = "fail";
    findings.push(`DKIM: ${dkim.problem}`);
  }

  // Alignment: SPF passing is not the same as SPF aligning for DMARC.
  if (spf.present && spf.foundOn && returnPath) {
    if (!returnPath.alignsRelaxed) {
      verdict = verdict === "fail" ? "fail" : "warn";
      findings.push(
        `The return path ${returnPath.domain} is outside ${domain}, so the SPF leg cannot ` +
          `align for DMARC under any policy. DMARC will pass only on the DKIM signature — ` +
          `confirm the provider signs with d=${domain}.`,
      );
    } else if (dmarc.present && /aspf\s*=\s*s/i.test(dmarc.value ?? "")) {
      verdict = verdict === "fail" ? "fail" : "warn";
      findings.push(
        `DMARC sets aspf=s (strict), but SPF is on ${returnPath.domain} rather than ` +
          `${domain}, so the SPF leg will not align. Either relax it to aspf=r or rely on ` +
          `DKIM alone for DMARC.`,
      );
    }
  }

  if (!dmarc.present && verdict !== "fail") {
    verdict = "warn";
    findings.push(
      `${domain} publishes no DMARC policy. Gmail and Microsoft require one from bulk ` +
        `senders; without it delivery degrades over time even when SPF and DKIM pass.`,
    );
  } else if (!dmarc.present) {
    findings.push(`${domain} publishes no DMARC policy.`);
  }

  if (verdict === "pass" && findings.length === 0) {
    findings.push(`${domain} authenticates: SPF, DKIM and DMARC all present.`);
  }

  return {
    domain,
    spf,
    dkim,
    dmarc,
    returnPath,
    verdict,
    indeterminate: false,
    findings,
    checkedAt: new Date().toISOString(),
  };
}

/**
 * The domain mail is actually sent as — parsed from the same env the sender
 * uses, so this checks reality rather than an assumption.
 *
 * Accepts both `user@example.com` and `Display Name <user@example.com>`.
 */
export function sendingDomainFromEnv(env: {
  FROM_EMAIL?: string;
  EMAILIT_SENDER_DOMAIN?: string;
}): string | null {
  const from = env.FROM_EMAIL?.trim();
  if (from) {
    const match = from.match(/<([^>]+)>/);
    const address = (match ? match[1] : from).trim();
    const at = address.lastIndexOf("@");
    if (at > -1 && at < address.length - 1) return address.slice(at + 1).toLowerCase();
  }
  const configured = env.EMAILIT_SENDER_DOMAIN?.trim();
  return configured ? configured.toLowerCase() : null;
}

/**
 * The envelope domain, when the operator has named it. Saves the probe and
 * removes the guesswork from the one lookup that decides whether SPF counts.
 */
export function returnPathFromEnv(env: {
  EMAILIT_RETURN_PATH_DOMAIN?: string;
}): string | undefined {
  const configured = env.EMAILIT_RETURN_PATH_DOMAIN?.trim();
  return configured ? configured.toLowerCase() : undefined;
}
