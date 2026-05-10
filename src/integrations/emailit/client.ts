/**
 * Emailit v2 REST client.
 *
 * Replaces @lovable.dev/email-js's `sendLovableEmail`. The Lovable wrapper was
 * itself a thin shim over Mailgun-via-Lovable; we now talk to Emailit directly.
 *
 * Auth: `Authorization: Bearer ${EMAILIT_API_KEY}`
 * Endpoint: POST https://api.emailit.com/v2/emails
 *
 * Rate limits to know about:
 *  - 2 emails/sec, 5,000/day (default — raise via support@emailit.com once needed).
 *  - This client does NOT throttle for you; the queue worker batches sends.
 */

const EMAILIT_BASE = "https://api.emailit.com/v2";

export interface EmailitSendInput {
  /** RFC-format sender, e.g. `"Founders Click <hello@notify.poolrentalnearme.online>"` */
  from: string;
  /** Single recipient or up to 50. */
  to: string | string[];
  subject?: string;
  html?: string;
  text?: string;
  reply_to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  /** Custom headers (e.g. `List-Unsubscribe`). */
  headers?: Record<string, string>;
  /** Free-form metadata; surfaces on webhook events. */
  meta?: Record<string, string>;
  /** Override per-domain tracking defaults. `false` disables tracking entirely. */
  tracking?: boolean | { loads?: boolean; clicks?: boolean };
}

export interface EmailitSendResponse {
  object: "email";
  id: string;
  ids?: Record<string, string>;
  token?: string;
  message_id?: string;
  from: string;
  to: string | string[];
  subject?: string;
  status: "pending" | "sent" | "failed" | string;
  scheduled_at: string | null;
  created_at: string;
}

export class EmailitAPIError extends Error {
  readonly status: number;
  readonly retryAfterSeconds: number | null;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown, retryAfterSeconds: number | null) {
    super(message);
    this.name = "EmailitAPIError";
    this.status = status;
    this.body = body;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export interface EmailitClientOptions {
  /** Override the default API base (mostly for testing). */
  apiBase?: string;
  /** Override `fetch` (e.g. for testing). */
  fetchImpl?: typeof fetch;
}

/**
 * Send a single transactional email via Emailit.
 *
 * Throws `EmailitAPIError` on non-2xx responses; the caller decides whether to
 * retry, DLQ, or back off based on `error.status` and `error.retryAfterSeconds`.
 */
export async function sendEmailitEmail(
  input: EmailitSendInput,
  config: { apiKey: string } & EmailitClientOptions,
): Promise<EmailitSendResponse> {
  const fetchImpl = config.fetchImpl ?? fetch;
  const url = `${config.apiBase ?? EMAILIT_BASE}/emails`;

  const res = await fetchImpl(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  // Emailit returns JSON for both success and error. Some 5xx may not — guard.
  let parsed: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }
  }

  if (!res.ok) {
    const retryAfterHeader = res.headers.get("retry-after");
    const retryAfterSeconds = retryAfterHeader ? parseInt(retryAfterHeader, 10) || null : null;
    const message =
      (parsed && typeof parsed === "object" && "error" in parsed && typeof (parsed as any).error === "string"
        ? (parsed as any).error
        : `Emailit ${res.status}`) || `Emailit ${res.status}`;
    throw new EmailitAPIError(res.status, message, parsed, retryAfterSeconds);
  }

  return parsed as EmailitSendResponse;
}
