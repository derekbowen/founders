/**
 * Email deliverability preflight. Run: bun tests/email-deliverability.test.ts
 *
 * The case that matters most is the one that shipped: a domain with no SPF
 * and no DKIM must be reported as a hard failure, because that is the state
 * founders.click was in while every signup silently dead-ended.
 */
import { checkSendingDomain, sendingDomainFromEnv } from "../src/lib/email-deliverability";

let pass = 0, fail = 0;
const failed: string[] = [];
function t(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; failed.push(name); console.log(`  FAIL  ${name}  ${extra}`); }
}

/** Build a fetch stand-in serving a fixed TXT map. Unlisted names return NXDOMAIN. */
function dnsStub(zone: Record<string, string[]>): typeof fetch {
  return (async (input: any) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    const name = (url.searchParams.get("name") ?? "").replace(/\.$/, "");
    const records = zone[name];
    if (!records) return new Response(JSON.stringify({ Status: 3 }), { status: 200 });
    return new Response(
      JSON.stringify({ Answer: records.map((r) => ({ name, type: 16, data: `"${r}"` })) }),
      { status: 200 },
    );
  }) as unknown as typeof fetch;
}

console.log("\n=== the founders.click failure: no SPF, no DKIM, no DMARC ===");
{
  const report = await checkSendingDomain("founders.click", { fetchImpl: dnsStub({}) });
  t("verdict is fail, not warn", report.verdict === "fail", report.verdict);
  t("spf reported absent", !report.spf.present);
  t("dkim reported absent", !report.dkim.present);
  t("dmarc reported absent", !report.dmarc.present);
  t(
    "finding says mail will not arrive",
    report.findings.some((f) => /discarded|nothing will arrive/i.test(f)),
    report.findings.join(" | "),
  );
}

console.log("\n=== a correctly configured domain ===");
{
  const report = await checkSendingDomain("founders.click", {
    dkimSelector: "emailit",
    fetchImpl: dnsStub({
      "founders.click": ["v=spf1 include:_spf.emailit.com ~all"],
      "emailit._domainkey.founders.click": ["v=DKIM1; k=rsa; p=MIIBIjANBgkq" + "A".repeat(200)],
      "_dmarc.founders.click": ["v=DMARC1; p=none; rua=mailto:dmarc@founders.click"],
    }),
  });
  t("verdict is pass", report.verdict === "pass", report.findings.join(" | "));
  t("spf captured", report.spf.value?.includes("include:_spf.emailit.com") === true);
  t("dkim selector recorded", report.dkim.selector === "emailit");
  t("dkim key value is not echoed verbatim", !report.dkim.value?.includes("MIIBIjANBgkq"));
  t("dmarc captured", report.dmarc.present);
}

console.log("\n=== partial configurations ===");
{
  const spfOnly = await checkSendingDomain("example.com", {
    fetchImpl: dnsStub({ "example.com": ["v=spf1 include:_spf.emailit.com ~all"] }),
  });
  t("SPF without DKIM still fails", spfOnly.verdict === "fail");

  const noDmarc = await checkSendingDomain("example.com", {
    dkimSelector: "s1",
    fetchImpl: dnsStub({
      "example.com": ["v=spf1 include:_spf.emailit.com ~all"],
      "s1._domainkey.example.com": ["v=DKIM1; p=" + "B".repeat(200)],
    }),
  });
  t("SPF+DKIM without DMARC warns rather than fails", noDmarc.verdict === "warn", noDmarc.verdict);

  const revoked = await checkSendingDomain("example.com", {
    dkimSelector: "s1",
    fetchImpl: dnsStub({
      "example.com": ["v=spf1 ~all"],
      "s1._domainkey.example.com": ["v=DKIM1; k=rsa; p="],
      "_dmarc.example.com": ["v=DMARC1; p=reject"],
    }),
  });
  t("revoked DKIM key (empty p=) fails", revoked.verdict === "fail");

  const openSpf = await checkSendingDomain("example.com", {
    dkimSelector: "s1",
    fetchImpl: dnsStub({
      "example.com": ["v=spf1 +all"],
      "s1._domainkey.example.com": ["v=DKIM1; p=" + "C".repeat(200)],
      "_dmarc.example.com": ["v=DMARC1; p=none"],
    }),
  });
  t("SPF +all is flagged", openSpf.verdict === "warn", openSpf.verdict);
}

console.log("\n=== which domain do we actually send as ===");
{
  t(
    "display-name form is parsed",
    sendingDomainFromEnv({ FROM_EMAIL: "founders.click <noreply@founders.click>" }) ===
      "founders.click",
  );
  t(
    "bare address is parsed",
    sendingDomainFromEnv({ FROM_EMAIL: "noreply@mail.founders.click" }) === "mail.founders.click",
  );
  t(
    "FROM_EMAIL wins over EMAILIT_SENDER_DOMAIN, because it is what is sent",
    sendingDomainFromEnv({
      FROM_EMAIL: "noreply@mail.founders.click",
      EMAILIT_SENDER_DOMAIN: "founders.click",
    }) === "mail.founders.click",
  );
  t(
    "falls back to the configured sender domain",
    sendingDomainFromEnv({ EMAILIT_SENDER_DOMAIN: "founders.click" }) === "founders.click",
  );
  t("no configuration yields null", sendingDomainFromEnv({}) === null);
  t("malformed FROM_EMAIL does not throw", sendingDomainFromEnv({ FROM_EMAIL: "garbage" }) === null);
}

console.log("\n=== resolver failure is not a false all-clear ===");
{
  const broken = (async () => new Response("upstream down", { status: 502 })) as unknown as typeof fetch;
  const report = await checkSendingDomain("founders.click", { fetchImpl: broken });
  t("unresolvable DNS does not report pass", report.verdict !== "pass", report.verdict);
  t("unresolvable DNS is marked indeterminate", report.indeterminate === true);
  t("records read as unknown, not absent", report.spf.status === "unknown", report.spf.status);
  t(
    "finding says the lookup failed rather than the record is missing",
    report.findings.some((f) => /lookup itself failed|not evidence/i.test(f)),
    report.findings.join(" | "),
  );
  t(
    "does not claim records are missing",
    !report.findings.some((f) => /publishes neither SPF nor DKIM/i.test(f)),
  );
}

console.log("\n=== a real absence is still reported as absence ===");
{
  const report = await checkSendingDomain("founders.click", { fetchImpl: dnsStub({}) });
  t("answered-but-empty is absent, not unknown", report.spf.status === "absent", report.spf.status);
  t("not marked indeterminate", report.indeterminate === false);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) { console.log("Failed: " + failed.join(", ")); process.exit(1); }
