import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ─────────────────────────────────────────────────────────────────────────────
// Domain verification.
//
// Customer flow:
//   1. POST /api/issueDomainVerification → returns a 32-char hex token, also
//      stored on workspaces.domain_verification_token.
//   2. Customer adds a DNS TXT record:
//      _founders-verify.<domain>  TXT  "<token>"
//   3. POST /api/checkDomainVerification → we resolve the TXT via Google DoH
//      and, on match, set workspaces.domain_verified_at = now().
//
// Until verified, /p/$slug refuses to serve content for that domain (see
// public-page.functions.ts). Internal workspaces (PRNM) bypass.
// ─────────────────────────────────────────────────────────────────────────────

const VERIFICATION_TXT_PREFIX = "_founders-verify";

function randomToken(): string {
  // 32 hex chars = 128 bits. Plenty unique; small enough to copy/paste.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return out;
}

async function ownsWorkspace(userId: string, workspaceId: string): Promise<boolean> {
  const sb = supabaseAdmin as any;
  const { data } = await sb
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", userId)
    .eq("role", "owner")
    .maybeSingle();
  return !!data;
}

export type DomainVerificationStatus = {
  domain: string | null;
  token: string | null;
  verified_at: string | null;
  txt_record_name: string | null;
};

export const issueDomainVerification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ workspaceId: z.string().uuid() }).parse(d),
  )
  .handler(async ({ context, data }): Promise<DomainVerificationStatus> => {
    const { userId } = context as { userId: string };
    if (!(await ownsWorkspace(userId, data.workspaceId))) {
      throw new Error("Only the workspace owner can manage domain verification.");
    }
    const sb = supabaseAdmin as any;

    const { data: ws } = await sb
      .from("workspaces")
      .select("marketplace_domain, domain_verification_token, domain_verified_at")
      .eq("id", data.workspaceId)
      .single();
    if (!ws?.marketplace_domain) {
      throw new Error("Set a marketplace domain on the workspace first.");
    }

    let token: string = ws.domain_verification_token;
    if (!token) {
      token = randomToken();
      await sb
        .from("workspaces")
        .update({ domain_verification_token: token })
        .eq("id", data.workspaceId);
    }

    return {
      domain: ws.marketplace_domain,
      token,
      verified_at: ws.domain_verified_at ?? null,
      txt_record_name: `${VERIFICATION_TXT_PREFIX}.${ws.marketplace_domain}`,
    };
  });

type DohAnswer = { name: string; type: number; data: string };

async function lookupTxtRecords(name: string): Promise<string[]> {
  // Google Public DNS over HTTPS — works inside Cloudflare Workers + Node.
  const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=TXT`;
  const res = await fetch(url, {
    headers: { accept: "application/dns-json" },
  });
  if (!res.ok) throw new Error(`DNS lookup failed: ${res.status}`);
  const json = (await res.json()) as { Answer?: DohAnswer[] };
  return (json.Answer ?? [])
    .filter((a) => a.type === 16)
    .map((a) => a.data.replace(/^"|"$/g, "").replace(/"\s+"/g, ""));
}

export const checkDomainVerification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ workspaceId: z.string().uuid() }).parse(d),
  )
  .handler(
    async ({
      context,
      data,
    }): Promise<{
      verified: boolean;
      verified_at: string | null;
      observed_records: string[];
      expected_token: string;
    }> => {
      const { userId } = context as { userId: string };
      if (!(await ownsWorkspace(userId, data.workspaceId))) {
        throw new Error("Only the workspace owner can manage domain verification.");
      }
      const sb = supabaseAdmin as any;

      const { data: ws } = await sb
        .from("workspaces")
        .select("marketplace_domain, domain_verification_token, domain_verified_at")
        .eq("id", data.workspaceId)
        .single();
      if (!ws?.marketplace_domain) {
        throw new Error("Set a marketplace domain on the workspace first.");
      }
      if (!ws.domain_verification_token) {
        throw new Error("Issue a verification token first.");
      }

      const recordName = `${VERIFICATION_TXT_PREFIX}.${ws.marketplace_domain}`;
      const records = await lookupTxtRecords(recordName);
      const match = records.includes(ws.domain_verification_token);

      if (match && !ws.domain_verified_at) {
        const now = new Date().toISOString();
        await sb
          .from("workspaces")
          .update({ domain_verified_at: now })
          .eq("id", data.workspaceId);
        return {
          verified: true,
          verified_at: now,
          observed_records: records,
          expected_token: ws.domain_verification_token,
        };
      }
      return {
        verified: !!ws.domain_verified_at || match,
        verified_at: ws.domain_verified_at ?? null,
        observed_records: records,
        expected_token: ws.domain_verification_token,
      };
    },
  );
