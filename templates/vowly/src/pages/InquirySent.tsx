import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckIcon, InboxIcon, MailQuestionIcon } from "lucide-react";
import { useInbox } from "../contexts/InboxContext";
import { useAuth } from "../contexts/AuthContext";
import { nextSteps } from "../data/inquiryOptions";
import { getCategory, getSimilarVendors, getVendorById } from "../utils/vendors";
import { formatDate } from "../utils/format";
import { ButtonLink } from "../components/ui/ButtonLink";
import { EmptyState } from "../components/ui/EmptyState";
import { StatusBadge } from "../components/ui/StatusBadge";
import { VendorCard } from "../components/vendor/VendorCard";

export function InquirySent() {
  const { conversationId = "" } = useParams();
  const { getConversation } = useInbox();
  const { user } = useAuth();
  const conversation = getConversation(conversationId);
  const vendor = conversation ? getVendorById(conversation.vendorId) : undefined;

  if (!conversation || !vendor) {
    return (
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <EmptyState
          icon={MailQuestionIcon}
          title="We couldn't find that inquiry"
          description="It may have been sent from another session. Check your inbox for all your conversations."
          action={<ButtonLink to="/inbox">Go to inbox</ButtonLink>} />
        
      </div>);

  }

  const message = conversation.messages[0]?.text ?? "";
  const details = [
  { label: "Couple", value: conversation.coupleName },
  { label: "Wedding date", value: formatDate(conversation.weddingDate, "EEEE, MMMM d, yyyy") },
  { label: "Guests", value: `${conversation.guestCount}` },
  { label: "Budget", value: conversation.budget },
  { label: "Reply to", value: conversation.email }];

  const inboxLink = `/inbox/inquiries/${conversation.id}`;

  return (
    <div className="bg-blush/30">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 14, stiffness: 220 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-surface text-gold-dark shadow-soft">
            
            <CheckIcon aria-hidden="true" className="h-7 w-7" />
          </motion.span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-ink sm:text-6xl">Your inquiry is on its way</h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-muted">
            We've sent your message to <span className="font-medium text-ink">{vendor.name}</span>. They usually reply {vendor.responseTime}.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-5">
          <section aria-labelledby="summary-title" className="rounded-3xl border border-line bg-surface p-6 md:col-span-3">
            <div className="flex items-center gap-4">
              <img src={vendor.images[0]} alt="" className="h-16 w-16 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">{getCategory(vendor.category)?.singular}</p>
                <Link to={`/l/${vendor.slug}`} className="block truncate font-display text-2xl font-semibold text-ink hover:text-primary">{vendor.name}</Link>
              </div>
              <StatusBadge status={conversation.status} className="hidden sm:inline-flex" />
            </div>
            <h2 id="summary-title" className="mt-6 text-sm font-semibold text-ink">Inquiry summary</h2>
            <dl className="mt-3 divide-y divide-line text-sm">
              {details.map((d) =>
              <div key={d.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted">{d.label}</dt>
                  <dd className="text-right font-medium text-ink">{d.value}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4 rounded-2xl bg-canvas p-4">
              <p className="text-xs font-medium text-muted">Your message</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/85">{message}</p>
            </div>
          </section>

          <section aria-labelledby="next-title" className="rounded-3xl border border-line bg-surface p-6 md:col-span-2">
            <h2 id="next-title" className="font-display text-2xl font-semibold text-ink">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((step, i) =>
              <li key={step.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush font-display text-sm font-semibold text-primary">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{step.description}</p>
                  </div>
                </li>
              )}
            </ol>
          </section>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to={inboxLink} size="lg">
            <InboxIcon aria-hidden="true" className="h-4 w-4" />
            {user ? "View in inbox" : "Log in to track replies"}
          </ButtonLink>
          <ButtonLink to="/search" variant="secondary" size="lg">Keep browsing</ButtonLink>
        </div>
      </div>

      <section aria-labelledby="more-title" className="border-t border-line bg-canvas">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="more-title" className="mb-6 font-display text-3xl font-semibold text-ink">Keep building your team</h2>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {getSimilarVendors(vendor).map((v) =>
            <li key={v.id}><VendorCard vendor={v} /></li>
            )}
          </ul>
        </div>
      </section>
    </div>);

}