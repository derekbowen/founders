/**
 * EMAIL DELIVERABILITY PREFLIGHT.
 *
 * Why this exists: for sixteen months founders.click sent auth email from
 * noreply@founders.click while that domain published no SPF, no DKIM and no
 * DMARC. EmailIt accepted every send and returned 200. Microsoft and Google
 * then discarded the mail silently — unauthenticated mail from an unverified
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
};

export type DeliverabilityReport = {
  domain: string;
  spf: RecordCheck;
  dkim: RecordCheck & { selector?: string };
  dmarc: RecordCheck;
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

async function resolveTxtOverHttps(name: string, fetchImpl: typeof fetch): Promise<string[]> {
  const url = `${DOH_ENDPOINT}?name=${encodeURIComponent(name)}&type=TXT`;
  const res = await fetchImpl(url, { headers: { accept: "application/dns-json" } });
  if (!res.ok) throw new Error(`DoH ${res.status} for ${name}`);
  const body = (await res.json()) as { Answer?: DohAnswer[] };
  return (body.Answer ?? [])
    .filter((a) => a.type === 16)
    // DoH returns TXT quoted, and long records arrive split into chunks.
    .map((a) => a.data.replace(/^"|"$/g, "").replace(/"\s+"/g, ""));
}

/**
 * Resolve TXT, preferring the platform resolver when there is one.
 *
 * A Worker has no UDP and must use DoH. CI runners and laptops do have a
 * resolver, and reaching for it first means the preflight keeps working from
 * networks where outbound DoH is blocked — which is exactly the situation
 * where a false "record missing" would be most misleading.
 *
 * Throws when the name cannot be resolved at all; returns [] for a name that
 * resolves with no TXT records.
 */
async function resolveTxt(name: string, fetchImpl?: typeof fetch): Promise<string[]> {
  if (!fetchImpl) {
    try {
      const dns = await import("node:dns/promises");
      try {
        const chunks = await dns.resolveTxt(name);
        return chunks.map((parts) => parts.join(""));
      } catch (err: any) {
        // NXDOMAIN / NODATA are answers, not failures: the name has no TXT.
        if (err?.code === "ENOTFOUND" || err?.code === "ENODATA") return [];
        throw err;
      }
    } catch (err: any) {
      // Only fall through to DoH when the module itself is unavailable
      // (a Worker); a genuine resolver error must not be masked.
      if (err?.code && err.code !== "ERR_MODULE_NOT_FOUND") throw err;
    }
  }
  return resolveTxtOverHttps(name, fetchImpl ?? fetch);
}

/**
 * Read the authentication records the receiving world will check for `domain`.
 *
 * `dkimSelector` skips the guesswork when the provider's selector is known;
 * otherwise a short list of common selectors is probed. A miss there is
 * reported as "not found", never as "absent" — an unprobed selector may exist.
 */
export async function checkSendingDomain(
  domain: string,
  opts: { dkimSelector?: string; fetchImpl?: typeof fetch } = {},
): Promise<DeliverabilityReport> {
  // Deliberately not defaulted: an undefined impl means "use the platform
  // resolver if there is one", which resolveTxt handles.
  const fetchImpl = opts.fetchImpl;
  const findings: string[] = [];

  const spf: RecordCheck = { status: "absent", present: false };
  const dkim: RecordCheck & { selector?: string } = { status: "absent", present: false };
  const dmarc: RecordCheck = { status: "absent", present: false };

  // --- SPF: authorises which servers may send as this domain --------------
  try {
    const txt = await resolveTxt(domain, fetchImpl);
    const record = txt.find((t) => t.toLowerCase().startsWith("v=spf1"));
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
      `${domain} publishes neither SPF nor DKIM. Mail sent as this domain will be ` +
        `discarded by Gmail and Microsoft, usually without a bounce. Nothing will arrive.`,
    );
  } else {
    if (!spf.present) {
      verdict = "fail";
      findings.push(`${domain} publishes no SPF record. Receivers cannot verify the sender.`);
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

  if (spf.problem) {
    verdict = verdict === "fail" ? "fail" : "warn";
    findings.push(`SPF: ${spf.problem}`);
  }
  if (dkim.problem) {
    verdict = "fail";
    findings.push(`DKIM: ${dkim.problem}`);
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
