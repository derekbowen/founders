import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { HeartHandshakeIcon, InboxIcon, MessagesSquareIcon, StoreIcon } from "lucide-react";
import { useInbox } from "../contexts/InboxContext";
import { useAuth } from "../contexts/AuthContext";
import { inquiryStatuses, inquiryStatusOrder } from "../data/inquiryStatuses";
import { sortByRecent } from "../utils/inbox";
import { ConversationList } from "../components/inbox/ConversationList";
import { ConversationDetail } from "../components/inbox/ConversationDetail";
import { EmptyState } from "../components/ui/EmptyState";
import { ButtonLink } from "../components/ui/ButtonLink";
import type { InquiryStatus } from "../types/marketplace";

const tabs = [
{ id: "inquiries", label: "Couples' inquiries", role: "couple" as const },
{ id: "leads", label: "Vendor leads", role: "vendor" as const }];


export function Inbox() {
  const { tab = "inquiries", conversationId } = useParams();
  const { conversations, getConversation, markRead } = useInbox();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");

  const currentTab = tabs.find((t) => t.id === tab);
  const role = currentTab?.role ?? "couple";
  const isVendor = Boolean(user?.ownerId);

  const list = useMemo(() => sortByRecent(conversations.filter((c) => c.role === role)), [conversations, role]);
  const filtered = statusFilter === "all" ? list : list.filter((c) => c.status === statusFilter);
  const active = conversationId ? getConversation(conversationId) : undefined;

  useEffect(() => {
    setStatusFilter("all");
  }, [tab]);

  useEffect(() => {
    if (active?.unread) markRead(active.id);
  }, [active, markRead]);

  if (!currentTab) return <Navigate to="/inbox/inquiries" replace />;

  const showVendorEmpty = role === "vendor" && !isVendor;

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="font-display text-5xl font-semibold text-ink">Inbox</h1>

      <div role="tablist" aria-label="Inbox type" className="mt-6 flex gap-1 border-b border-line">
        {tabs.map((t) => {
          const selected = t.id === tab;
          const unread = conversations.filter((c) => c.role === t.role && c.unread).length;
          return (
            <Link
              key={t.id}
              to={`/inbox/${t.id}`}
              role="tab"
              aria-selected={selected}
              className={`-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors sm:px-4 ${
              selected ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"}`
              }>
              
              {t.role === "couple" ? <HeartHandshakeIcon aria-hidden="true" className="h-4 w-4" /> : <StoreIcon aria-hidden="true" className="h-4 w-4" />}
              {t.label}
              {unread > 0 &&
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {unread}
                  <span className="sr-only"> unread</span>
                </span>
              }
            </Link>);

        })}
      </div>

      {showVendorEmpty ?
      <EmptyState
        className="mt-8"
        icon={StoreIcon}
        title="No vendor listing yet"
        description="List your business to start receiving inquiries from couples planning their weddings."
        action={<ButtonLink to="/listings/new">List your business</ButtonLink>} /> :


      <div className="mt-6 grid min-h-[640px] overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className={`${conversationId ? "hidden lg:flex" : "flex"} min-h-0 flex-col border-line lg:border-r`}>
            <div className="flex gap-2 overflow-x-auto border-b border-line p-3 no-scrollbar" role="group" aria-label="Filter by status">
              {(["all", ...inquiryStatusOrder] as const).map((s) => {
              const selected = statusFilter === s;
              const count = s === "all" ? list.length : list.filter((c) => c.status === s).length;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setStatusFilter(s)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selected ? "bg-ink text-canvas" : "bg-canvas text-ink hover:bg-blush/60"}`
                  }>
                  
                    {s === "all" ? "All" : inquiryStatuses[s].label} <span className={selected ? "text-canvas/70" : "text-muted"}>{count}</span>
                  </button>);

            })}
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ?
            <div className="px-6 py-14 text-center">
                  <InboxIcon aria-hidden="true" className="mx-auto h-6 w-6 text-muted" />
                  <p className="mt-3 text-sm font-medium text-ink">Nothing here yet</p>
                  <p className="mt-1 text-sm text-muted">
                    {role === "couple" ? "Send an inquiry from any vendor's listing to start a conversation." : "New leads from couples will appear here."}
                  </p>
                  {role === "couple" &&
              <ButtonLink to="/search" size="sm" variant="secondary" className="mt-4">Browse vendors</ButtonLink>
              }
                </div> :

            <ConversationList conversations={filtered} activeId={conversationId} tab={tab} />
            }
            </div>
          </div>

          <div className={`${conversationId ? "flex" : "hidden lg:flex"} min-w-0 flex-col`}>
            {active && active.role === role ?
          <ConversationDetail key={active.id} conversation={active} tab={tab} /> :

          <div className="flex flex-1 items-center justify-center p-8">
                <div className="text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush text-primary">
                    <MessagesSquareIcon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold text-ink">
                    {conversationId ? "Conversation not found" : "Select a conversation"}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {role === "couple" ? "Your vendor conversations, statuses and timelines live here." : "Reply to leads and track which couples booked."}
                  </p>
                </div>
              </div>
          }
          </div>
        </div>
      }
    </div>);

}