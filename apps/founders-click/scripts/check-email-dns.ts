#!/usr/bin/env bun
/**
 * Deliverability preflight. Run: bun scripts/check-email-dns.ts [domain]
 *
 * Exits non-zero when mail sent as the domain would be discarded, so the
 * deploy pipeline can refuse to ship a build whose auth email cannot arrive.
 *
 * This check exists because the send API is not evidence. EmailIt returned
 * 200 for every auth email founders.click ever sent, while the domain had no
 * SPF and no DKIM and receivers dropped the mail on the floor. The DNS is the
 * only part of that chain we can assert cheaply and continuously.
 *
 * Set EMAILIT_DKIM_SELECTOR when the provider's selector is known — a probe
 * across common selectors can miss a real key published under another name.
 *
 * Set EMAILIT_RETURN_PATH_DOMAIN when the envelope (bounce) domain is known.
 * SPF authorises the envelope sender, not the From header, so a domain whose
 * ESP delegates the return path to a subdomain needs no SPF of its own — this
 * check looks there before reporting SPF missing. Naming it explicitly skips
 * the probe and removes the guess.
 */
import {
  checkSendingDomain,
  returnPathFromEnv,
  sendingDomainFromEnv,
} from "../src/lib/email-deliverability";

const explicit = process.argv[2];
const domain =
  explicit ??
  sendingDomainFromEnv({
    FROM_EMAIL: process.env.FROM_EMAIL,
    EMAILIT_SENDER_DOMAIN: process.env.EMAILIT_SENDER_DOMAIN,
  });

if (!domain) {
  console.error(
    "No sending domain. Pass one as an argument, or set FROM_EMAIL / EMAILIT_SENDER_DOMAIN.",
  );
  process.exit(2);
}

const selector = process.env.EMAILIT_DKIM_SELECTOR;
const report = await checkSendingDomain(domain, {
  dkimSelector: selector,
  returnPathDomain: returnPathFromEnv({
    EMAILIT_RETURN_PATH_DOMAIN: process.env.EMAILIT_RETURN_PATH_DOMAIN,
  }),
});

const mark = { pass: "OK  ", warn: "WARN", fail: "FAIL" }[report.verdict];
console.log(`\n${mark}  email deliverability for ${report.domain}\n`);

const row = (
  label: string,
  check: {
    status: "present" | "absent" | "unknown";
    value?: string;
    problem?: string;
    foundOn?: string;
  },
) => {
  const state = { present: "present", absent: "MISSING", unknown: "UNKNOWN" }[check.status];
  console.log(`  ${label.padEnd(6)} ${state.padEnd(8)} ${check.value ?? ""}`);
  // Where a record lives is the whole point for SPF: on the apex it is absent
  // and correct at the same time, provided the return path carries it.
  if (check.foundOn) console.log(`         on ${check.foundOn}`);
  if (check.problem) console.log(`         ${check.problem}`);
};

row("SPF", report.spf);
row("DKIM", report.dkim.selector ? { ...report.dkim, value: `selector "${report.dkim.selector}"` } : report.dkim);
row("DMARC", report.dmarc);
if (report.returnPath) {
  console.log(
    `  PATH   ${report.returnPath.via === "configured" ? "declared" : "found   "} ` +
      `${report.returnPath.domain}${report.returnPath.mx ? `  (MX ${report.returnPath.mx})` : ""}`,
  );
}

console.log("");
for (const finding of report.findings) console.log(`  - ${finding}`);

if (report.indeterminate) {
  // Do not print fix instructions: we never established that anything is wrong
  // with the DNS, only that we could not read it from here.
  console.log("\n  Could not read the DNS. Re-run from a network that can resolve it.\n");
  process.exit(1);
}

// Only ever print the records that are actually missing. Telling an operator
// to add a DKIM key they already published is how a real single-record fix
// gets mistaken for a big one and deferred.
const fixes: string[] = [];
if (!report.spf.present) {
  // Reached only when neither the apex nor any return path authorises a
  // sender. Publishing at the apex is the one-record answer; delegating the
  // envelope to the ESP is the other, and is what most providers prefer.
  fixes.push(
    `    SPF     TXT  @        v=spf1 include:_spf.emailit.com ~all\n` +
      `            Without it, Microsoft in particular drops mail from a domain\n` +
      `            with no sending reputation even when DKIM signs correctly.\n` +
      `            Alternatively, if EmailIt gave you a return-path subdomain,\n` +
      `            publish its records and set EMAILIT_RETURN_PATH_DOMAIN — SPF\n` +
      `            belongs on the envelope domain, not necessarily on this one.`,
  );
}
if (!report.dkim.present) {
  fixes.push(
    `    DKIM    TXT  <selector>._domainkey\n` +
      `            Copy from the EmailIt dashboard — the key is account-specific.`,
  );
}
if (!report.dmarc.present) {
  fixes.push(
    `    DMARC   TXT  _dmarc   v=DMARC1; p=none; rua=mailto:dmarc@${report.domain}\n` +
      `            Start at p=none so nothing is rejected while alignment is confirmed.`,
  );
} else if (report.dmarc.value && !/rua=/i.test(report.dmarc.value)) {
  // A DMARC record with no reporting address is the reason a delivery problem
  // can persist unnoticed: receivers have nowhere to tell you what they did.
  console.log(
    `\n  NOTE  DMARC is published but sets no rua= reporting address, so receivers\n` +
      `        have no way to report what they do with your mail. Consider:\n` +
      `          ${report.dmarc.value.replace(/;?\s*$/, "")}; rua=mailto:dmarc@${report.domain}`,
  );
}

if (fixes.length > 0) {
  console.log(`\n  Publish on ${report.domain}, then re-run this check:\n`);
  for (const fix of fixes) console.log(fix + "\n");
}

if (report.verdict === "fail") process.exit(1);
if (report.verdict === "warn") {
  console.log("  Mail should authenticate, but fix the above before sending volume.\n");
}
process.exit(0);
