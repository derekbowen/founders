import * as React from 'react'
import { render } from '@react-email/components'
import {
  StandardWebhookError,
  verifyStandardWebhook,
} from '@/integrations/webhooks/standard'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { SignupEmail } from '@/lib/email-templates/signup'
import { InviteEmail } from '@/lib/email-templates/invite'
import { MagicLinkEmail } from '@/lib/email-templates/magic-link'
import { RecoveryEmail } from '@/lib/email-templates/recovery'
import { EmailChangeEmail } from '@/lib/email-templates/email-change'
import { ReauthenticationEmail } from '@/lib/email-templates/reauthentication'
import { loadEmailBranding } from '@/server/email-branding.functions'

const EMAIL_SUBJECTS: Record<string, string> = {
  signup: 'Confirm your email',
  invite: "You've been invited",
  magiclink: 'Your login link',
  recovery: 'Reset your password',
  email_change: 'Confirm your new email',
  reauthentication: 'Your verification code',
}

// Template mapping
const EMAIL_TEMPLATES: Record<string, React.ComponentType<any>> = {
  signup: SignupEmail,
  invite: InviteEmail,
  magiclink: MagicLinkEmail,
  recovery: RecoveryEmail,
  email_change: EmailChangeEmail,
  reauthentication: ReauthenticationEmail,
}

// Sending domain — overridable per environment so we can flip the brand
// (poolrentalnearme.online → notify.founders.click) without a code change.
const SENDER_DOMAIN =
  process.env.EMAILIT_SENDER_DOMAIN ?? 'notify.poolrentalnearme.online'
const ROOT_DOMAIN = process.env.SITE_ROOT_DOMAIN ?? 'poolrentalnearme.online'
const FROM_DOMAIN = SENDER_DOMAIN

// Shape of the Supabase Auth send-email hook payload (v1).
// https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook
interface SupabaseAuthEmailPayload {
  version: '1'
  run_id?: string
  type: 'auth'
  data: {
    action_type: string
    email: string
    url?: string
    token?: string
    token_hash?: string
    redirect_to?: string
    old_email?: string
    new_email?: string
    user?: { email?: string; id?: string }
  }
}

function redactEmail(email: string | null | undefined): string {
  if (!email) return '***'
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '***'
  return `${localPart[0]}***@${domain}`
}

export const Route = createFileRoute("/lovable/email/auth/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const hookSecret = process.env.SEND_EMAIL_HOOK_SECRET

        if (!hookSecret) {
          console.error('SEND_EMAIL_HOOK_SECRET not configured')
          return Response.json(
            { error: 'Server configuration error' },
            { status: 500 }
          )
        }

        // Verify Supabase Auth's standard-webhooks signature, then parse payload.
        let payload: SupabaseAuthEmailPayload
        let run_id = ''
        try {
          const rawBody = await verifyStandardWebhook(request, hookSecret)
          payload = JSON.parse(rawBody) as SupabaseAuthEmailPayload
          run_id = payload.run_id ?? ''
        } catch (error) {
          if (error instanceof StandardWebhookError) {
            switch (error.code) {
              case 'invalid_signature':
              case 'missing_headers':
              case 'invalid_timestamp':
              case 'stale_timestamp':
              case 'invalid_secret':
                console.error('Invalid webhook signature', { code: error.code, message: error.message })
                return Response.json(
                  { error: 'Invalid signature' },
                  { status: 401 }
                )
            }
          }
          if (error instanceof SyntaxError) {
            console.error('Invalid webhook JSON', { error: error.message })
            return Response.json(
              { error: 'Invalid webhook payload' },
              { status: 400 }
            )
          }

          console.error('Webhook verification failed', { error })
          return Response.json(
            { error: 'Invalid webhook payload' },
            { status: 400 }
          )
        }

        if (!payload?.data?.action_type || !payload?.data?.email) {
          console.error('Webhook payload missing required fields')
          return Response.json(
            { error: 'Invalid webhook payload' },
            { status: 400 }
          )
        }

        if (payload.version !== '1') {
          console.error('Unsupported payload version', { version: payload.version, run_id })
          return Response.json(
            { error: `Unsupported payload version: ${payload.version}` },
            { status: 400 }
          )
        }

        // The email action type is in payload.data.action_type (e.g., "signup", "recovery")
        // payload.type is the hook event type ("auth")
        const emailType = payload.data.action_type
        console.log('Received auth event', {
          emailType,
          email_redacted: redactEmail(payload.data.email),
          run_id,
        })

        const EmailTemplate = EMAIL_TEMPLATES[emailType]
        if (!EmailTemplate) {
          console.error('Unknown email type', { emailType, run_id })
          return Response.json(
            { error: `Unknown email type: ${emailType}` },
            { status: 400 }
          )
        }

        // Load branding from DB (falls back to defaults)
        const brandingRow = await loadEmailBranding()
        const branding = {
          siteName: brandingRow.site_name,
          senderName: brandingRow.sender_name,
          logoUrl: brandingRow.logo_url,
          primaryColor: brandingRow.primary_color,
          primaryTextColor: brandingRow.primary_text_color,
          footerText: brandingRow.footer_text,
        }

        // Build template props from payload.data (HookData structure)
        const templateProps = {
          siteName: branding.siteName,
          siteUrl: `https://${ROOT_DOMAIN}`,
          recipient: payload.data.email,
          confirmationUrl: payload.data.url,
          token: payload.data.token,
          email: payload.data.email,
          oldEmail: payload.data.old_email,
          newEmail: payload.data.new_email,
          branding,
        }

        // Render React Email to HTML and plain text
        const element = React.createElement(EmailTemplate, templateProps)
        const html = await render(element)
        const text = await render(element, { plainText: true })

        // Enqueue email for async processing by the dispatcher (process-email-queue).
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('Missing Supabase environment variables')
          return Response.json(
            { error: 'Server configuration error' },
            { status: 500 }
          )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const messageId = crypto.randomUUID()

        // Log pending BEFORE enqueue so we have a record even if enqueue crashes
        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: emailType,
          recipient_email: payload.data.email,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'auth_emails',
          payload: {
            run_id,
            message_id: messageId,
            to: payload.data.email,
            from: `${branding.senderName} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject: EMAIL_SUBJECTS[emailType] || 'Notification',
            html,
            text,
            purpose: 'transactional',
            label: emailType,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqueueError) {
          console.error('Failed to enqueue auth email', { error: enqueueError, run_id, emailType })
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: emailType,
            recipient_email: payload.data.email,
            status: 'failed',
            error_message: 'Failed to enqueue email',
          })
          return Response.json(
            { error: 'Failed to enqueue email' },
            { status: 500 }
          )
        }

        console.log('Auth email enqueued', {
          emailType,
          email_redacted: redactEmail(payload.data.email),
          run_id,
        })

        return Response.json({ success: true, queued: true })
      },
    },
  },
})
