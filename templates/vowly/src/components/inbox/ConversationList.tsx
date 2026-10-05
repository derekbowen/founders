import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { StatusBadge } from "../ui/StatusBadge";
import { getVendorById } from "../../utils/vendors";
import { formatMessageTime } from "../../utils/format";
import { lastMessage } from "../../utils/inbox";
import type { Conversation } from "../../types/marketplace";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  tab: string;
}

export function ConversationList({ conversations, activeId, tab }: ConversationListProps) {
  return (
    <ul className="divide-y divide-line">
      {conversations.map((c) => {
        const vendor = getVendorById(c.vendorId);
        const last = lastMessage(c);
        const isActive = c.id === activeId;
        const title = c.role === "couple" ? vendor?.name ?? "Vendor" : c.coupleName;
        const mine = last?.from === c.role;
        return (
          <li key={c.id}>
            <Link
              to={`/inbox/${tab}/${c.id}`}
              aria-current={isActive ? "page" : undefined}
              className={`flex gap-3 px-4 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
              isActive ? "bg-blush/60" : "hover:bg-blush/25"}`
              }>
              
              {c.role === "couple" && vendor ?
              <img src={vendor.images[0]} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" /> :

              <Avatar name={c.coupleName} size="md" />
              }
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className={`truncate text-sm ${c.unread ? "font-semibold text-ink" : "font-medium text-ink"}`}>{title}</p>
                  <span className="shrink-0 text-xs text-muted">{last ? formatMessageTime(last.sentAt) : ""}</span>
                </div>
                <p className={`mt-0.5 line-clamp-1 text-sm ${c.unread ? "text-ink" : "text-muted"}`}>
                  {mine && <span className="text-muted">You: </span>}
                  {last?.text}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <StatusBadge status={c.status} />
                  {c.unread &&
                  <span className="h-2.5 w-2.5 rounded-full bg-primary">
                      <span className="sr-only">Unread</span>
                    </span>
                  }
                </div>
              </div>
            </Link>
          </li>);

      })}
    </ul>);

}