/**
 * Email deliverability preflight. Run: bun tests/email-deliverability.test.ts
 *
 * The case that matters most is the one that shipped: a domain with no SPF
 * and no DKIM must be reported as a hard failure, because that is the state
 * founders.click was in while every signup silently dead-ended.
 */
import {
  checkSendingDomain,
  returnPathFromEnv,
  sendingDomainFromEnv,
} from "../src/lib/email-deliverability";

let pass = 0, fail = 0;
const failed: string[] = [];
function t(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; failed.push(name); console.log(`  FAIL  ${name}  ${extra}`); }
}

/**
 * Build a fetch stand-in serving fixed TXT and MX maps. Unlisted names return
 * NXDOMAIN. MX matters because that is what distinguishes a real delegated
 * return path from any subdomain that happens to carry a TXT record.
 */
function dnsStub(
  txtZone: Record<string, string[]>,
  mxZone: Record<string, string[]> = {},
): typeof fetch {
  return (async (input: any) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    const name = (url.searchParams.get("name") ?? "").replace(/\.$/, "");
    const type = url.searchParams.get("type") ?? "TXT";
    const nxdomain = new Response(JSON.stringify({ Status: 3 }), { status: 200 });

    if (type === "MX") {
      const hosts = mxZone[name];
      if (!hosts) return nxdomain;
      return new Response(
        JSON.stringify({ Answer: hosts.map((h) => ({ name, type: 15, data: `10 ${h}.` })) }),
        { status: 200 },
      );
    }

    const records = txtZone[name];
    if (!records) return nxdomain;
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

console.log("\n=== SPF on a delegated return path is SPF (the false blocker) ===");
{
  // founders.click as it actually is: no apex SPF, because the envelope sender
  // is emailit.founders.click. The old check read the apex only and called
  // this a hard failure, which cost 22 wasted re-checks of a record that was
  // never required.
  const zone = {
    "emailit.founders.click": ["v=spf1 include:_spf.emailit.com ~all"],
    "emailit._domainkey.founders.click": ["v=DKIM1; t=s; h=sha256; p=" + "D".repeat(200)],
    "_dmarc.founders.click": ["v=DMARC1; p=none;"],
  };
  const mx = { "emailit.founders.click": ["feedback-smtp.ffdc-1.emailit.com"] };

  const report = await checkSendingDomain("founders.click", {
    dkimSelector: "emailit",
    fetchImpl: dnsStub(zone, mx),
  });

  t("verdict is not fail", report.verdict !== "fail", report.findings.join(" | "));
  t("SPF is reported present", report.spf.present, JSON.stringify(report.spf));
  t("SPF records where it was actually found", report.spf.foundOn === "emailit.founders.click",
    report.spf.foundOn);
  t("the return path is reported", report.returnPath?.domain === "emailit.founders.click");
  t("the bounce MX is the evidence",
    report.returnPath?.mx === "feedback-smtp.ffdc-1.emailit.com", report.returnPath?.mx);
  t("it was discovered, not configured", report.returnPath?.via === "discovered");
  t("it aligns under DMARC's default relaxed policy", report.returnPath?.alignsRelaxed === true);
  t(
    "no finding claims SPF is missing",
    !report.findings.some((f) => /publishes no SPF|neither SPF nor DKIM/i.test(f)),
    report.findings.join(" | "),
  );
  t(
    "a finding explains that apex SPF is not required",
    report.findings.some((f) => /No SPF record is required on founders\.click/i.test(f)),
    report.findings.join(" | "),
  );
}

console.log("\n=== an explicitly configured return path is believed ===");
{
  const report = await checkSendingDomain("founders.click", {
    dkimSelector: "emailit",
    returnPathDomain: "bounces.founders.click",
    fetchImpl: dnsStub(
      {
        "bounces.founders.click": ["v=spf1 include:_spf.emailit.com ~all"],
        "emailit._domainkey.founders.click": ["v=DKIM1; p=" + "E".repeat(200)],
        "_dmarc.founders.click": ["v=DMARC1; p=none"],
      },
      // Deliberately no MX: a name the operator supplied is taken on their
      // say-so, because they know their own zone better than a heuristic does.
      {},
    ),
  });
  t("configured return path is used", report.returnPath?.domain === "bounces.founders.click");
  t("marked as configured", report.returnPath?.via === "configured");
  t("SPF counts", report.spf.present && report.spf.foundOn === "bounces.founders.click");
  t("verdict is not fail", report.verdict !== "fail", report.findings.join(" | "));
}

console.log("\n=== a guessed return path must prove itself ===");
{
  // A subdomain carrying an SPF record but no MX is not a return path. Believing
  // it would trade one wrong answer for another.
  const noMx = await checkSendingDomain("example.com", {
    dkimSelector: "s1",
    fetchImpl: dnsStub({
      "mail.example.com": ["v=spf1 include:_spf.emailit.com ~all"],
      "s1._domainkey.example.com": ["v=DKIM1; p=" + "F".repeat(200)],
      "_dmarc.example.com": ["v=DMARC1; p=none"],
    }),
  });
  t("SPF on a subdomain with no MX is not counted", !noMx.spf.present, JSON.stringify(noMx.spf));
  t("no return path is claimed", noMx.returnPath === undefined);
  t("verdict is still fail", noMx.verdict === "fail", noMx.verdict);

  // ...and an MX with no SPF is a mail host, not an authorisation.
  const noSpf = await checkSendingDomain("example.com", {
    dkimSelector: "s1",
    fetchImpl: dnsStub(
      {
        "s1._domainkey.example.com": ["v=DKIM1; p=" + "G".repeat(200)],
        "_dmarc.example.com": ["v=DMARC1; p=none"],
      },
      { "mail.example.com": ["mx.example.net"] },
    ),
  });
  t("an MX without SPF is not counted", !noSpf.spf.present);
  t("verdict is fail", noSpf.verdict === "fail", noSpf.verdict);
}

console.log("\n=== apex SPF short-circuits discovery ===");
{
  // When the apex publishes SPF there is nothing to discover, and the extra
  // dozen lookups should not happen. Counting them is the only way to assert it.
  let mxQueries = 0;
  const counting = ((input: any) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    if (url.searchParams.get("type") === "MX") mxQueries++;
    return dnsStub({
      "founders.click": ["v=spf1 include:_spf.emailit.com ~all"],
      "emailit._domainkey.founders.click": ["v=DKIM1; p=" + "H".repeat(200)],
      "_dmarc.founders.click": ["v=DMARC1; p=none"],
    })(input);
  }) as unknown as typeof fetch;

  const report = await checkSendingDomain("founders.click", {
    dkimSelector: "emailit",
    fetchImpl: counting,
  });
  t("verdict is pass", report.verdict === "pass", report.findings.join(" | "));
  t("no return-path probing happened", mxQueries === 0, String(mxQueries));
  t("SPF is not marked as found elsewhere", report.spf.foundOn === undefined);
}

console.log("\n=== delegation that cannot align for DMARC is flagged ===");
{
  // A return path on the provider's own domain authenticates SPF but can never
  // align, so DMARC rests entirely on the DKIM signature. That is worth saying.
  const offOrg = await checkSendingDomain("founders.click", {
    dkimSelector: "emailit",
    returnPathDomain: "bounces.emailit.com",
    fetchImpl: dnsStub({
      "bounces.emailit.com": ["v=spf1 include:_spf.emailit.com ~all"],
      "emailit._domainkey.founders.click": ["v=DKIM1; p=" + "I".repeat(200)],
      "_dmarc.founders.click": ["v=DMARC1; p=none"],
    }),
  });
  t("off-org return path does not align", offOrg.returnPath?.alignsRelaxed === false);
  t("it warns rather than passes silently", offOrg.verdict === "warn", offOrg.verdict);
  t(
    "the warning names DKIM as the only alignment left",
    offOrg.findings.some((f) => /align.*DKIM|DKIM signature/i.test(f)),
    offOrg.findings.join(" | "),
  );

  // aspf=s is the one policy under which a same-org subdomain stops aligning.
  const strict = await checkSendingDomain("founders.click", {
    dkimSelector: "emailit",
    fetchImpl: dnsStub(
      {
        "emailit.founders.click": ["v=spf1 include:_spf.emailit.com ~all"],
        "emailit._domainkey.founders.click": ["v=DKIM1; p=" + "J".repeat(200)],
        "_dmarc.founders.click": ["v=DMARC1; p=reject; aspf=s"],
      },
      { "emailit.founders.click": ["feedback-smtp.ffdc-1.emailit.com"] },
    ),
  });
  t("strict SPF alignment against a delegated path warns", strict.verdict === "warn",
    strict.verdict);
  t(
    "the warning names aspf=s",
    strict.findings.some((f) => /aspf=s/i.test(f)),
    strict.findings.join(" | "),
  );
}

console.log("\n=== the return path can be named by configuration ===");
{
  t(
    "reads EMAILIT_RETURN_PATH_DOMAIN",
    returnPathFromEnv({ EMAILIT_RETURN_PATH_DOMAIN: "Emailit.Founders.Click" }) ===
      "emailit.founders.click",
  );
  t("unset yields undefined", returnPathFromEnv({}) === undefined);
  t("blank yields undefined", returnPathFromEnv({ EMAILIT_RETURN_PATH_DOMAIN: "   " }) === undefined);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) { console.log("Failed: " + failed.join(", ")); process.exit(1); }
