import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, CalendarHeartIcon, PartyPopperIcon, UsersIcon, WalletIcon } from "lucide-react";
import { useInbox } from "../../contexts/InboxContext";
import { brand } from "../../data/brand";
import { getOwner, getVendorById } from "../../utils/vendors";
import { formatDate } from "../../utils/format";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { StatusBadge } from "../ui/StatusBadge";
import { InquiryTimeline } from "./InquiryTimeline";
import { MessageComposer } from "./MessageComposer";
import type { Conversation } from "../../types/marketplace";

interface ConversationDetailProps {
  conversation: Conversation;
  tab: string;
}

export function ConversationDetail({ conversation, tab }: ConversationDetailProps) {
  const { sendMessage, updateStatus } = useInbox();
  const scrollRef = useRef<HTMLDivElement>(null);
  const vendor = getVendorById(conversation.vendorId);
  const owner = vendor ? getOwner(vendor.ownerId) : undefined;
  const isCouple = conversation.role === "couple";
  const title = isCouple ? vendor?.name ?? "Vendor" : conversation.coupleName;
  const active = conversation.status === "inquiry-sent" || conversation.status === "replied";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [conversation.messages.length, conversation.id]);

  const details = [
  { icon: CalendarHeartIcon, label: "Wedding date", value: formatDate(conversation.weddingDate, "MMM d, yyyy") },
  { icon: UsersIcon, label: "Guests", value: `${conversation.guestCount}` },
  { icon: WalletIcon, label: "Budget", value: conversation.budget }];


  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-4 sm:px-6">
        <Link to={`/inbox/${tab}`} className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-blush/60 lg:hidden" aria-label="Back to conversations">
          <ArrowLeftIcon aria-hidden="true" className="h-5 w-5" />
        </Link>
        {isCouple && vendor ?
        <img src={vendor.images[0]} alt="" className="h-11 w-11 rounded-full object-cover" /> :

        <Avatar name={conversation.coupleName} />
        }
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-2xl font-semibold leading-tight text-ink">
            {isCouple && vendor ? <Link to={`/l/${vendor.slug}`} className="hover:text-primary">{title}</Link> : title}
          </h2>
          <p className="truncate text-xs text-muted">
            {isCouple ? `${owner?.name ?? ""} · Replies ${vendor?.responseTime}` : `Inquiry for ${vendor?.name} · ${conversation.email}`}
          </p>
        </div>
        <StatusBadge status={conversation.status} />
        {active &&
        <div className="flex w-full gap-2 sm:w-auto">
            <Button size="sm" variant="secondary" onClick={() => updateStatus(conversation.id, "booked-offline")}>
              {isCouple ? "Mark as booked" : "Mark booked offline"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => updateStatus(conversation.id, "closed")}>
              {isCouple ? "Close inquiry" : "Decline"}
            </Button>
          </div>
        }
      </header>

      <div className="grid min-h-0 flex-1 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-h-0 flex-col">
          {conversation.status === "booked-offline" &&
          <div className="mx-4 mt-4 flex items-start gap-3 rounded-2xl bg-success/10 p-4 text-sm text-success sm:mx-6">
              <PartyPopperIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <p>Booked offline. Contracts and payments are handled directly between {isCouple ? `you and ${vendor?.name}` : `you and ${conversation.coupleName}`} — {brand.name} isn't involved.</p>
            </div>
          }
          <div ref={scrollRef} className="max-h-[560px] min-h-[320px] flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6" aria-live="polite">
            {conversation.messages.map((m) => {
              const mine = m.from === conversation.role;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] sm:max-w-[75%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                    <div
                      className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      mine ? "rounded-br-md bg-primary text-white" : "rounded-bl-md bg-blush/70 text-ink"}`
                      }>
                      
                      {m.text}
                    </div>
                    <span className="mt-1 px-1 text-[11px] text-muted">
                      {mine ? "You" : isCouple ? vendor?.name : conversation.coupleName} · {formatDate(m.sentAt, "MMM d, h:mm a")}
                    </span>
                  </div>
                </div>);

            })}
          </div>
          <MessageComposer
            onSend={(text) => sendMessage(conversation.id, text)}
            disabled={conversation.status === "closed"}
            disabledReason="This inquiry is closed. Start a new inquiry from the vendor's listing to reconnect."
            placeholder={isCouple ? `Message ${vendor?.name}…` : `Reply to ${conversation.coupleName}…`} />
          
        </div>

        <aside className="border-t border-line bg-canvas/60 p-5 xl:border-l xl:border-t-0" aria-label="Inquiry details">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">Wedding details</h3>
          <dl className="mt-3 space-y-3">
            {details.map((d) =>
            <div key={d.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary">
                  <d.icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs text-muted">{d.label}</dt>
                  <dd className="text-sm font-medium text-ink">{d.value}</dd>
                </div>
              </div>
            )}
          </dl>
          <h3 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">Timeline</h3>
          <InquiryTimeline events={conversation.timeline} />
        </aside>
      </div>
    </div>);

}