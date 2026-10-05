import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { conversations as seedConversations } from "../data/conversations";
import { getVendorById } from "../utils/vendors";
import { statusEventLabel } from "../utils/inbox";
import type { Conversation, InquiryStatus, NewInquiryInput } from "../types/marketplace";

interface InboxContextValue {
  conversations: Conversation[];
  unreadCount: number;
  getConversation: (id: string) => Conversation | undefined;
  addInquiry: (input: NewInquiryInput) => string;
  sendMessage: (id: string, text: string) => void;
  updateStatus: (id: string, status: InquiryStatus) => void;
  markRead: (id: string) => void;
}

const InboxContext = createContext<InboxContextValue | null>(null);

const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function InboxProvider({ children }: {children: ReactNode;}) {
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations);

  const getConversation = useCallback(
    (id: string) => conversations.find((c) => c.id === id),
    [conversations]
  );

  const addInquiry = useCallback((input: NewInquiryInput) => {
    const now = new Date().toISOString();
    const id = uid("c");
    const coupleName = input.partnerTwo.trim() ?
    `${input.partnerOne.trim()} & ${input.partnerTwo.trim()}` :
    input.partnerOne.trim();
    const conversation: Conversation = {
      id,
      vendorId: input.vendorId,
      role: "couple",
      coupleName,
      email: input.email,
      weddingDate: input.weddingDate,
      guestCount: input.guestCount,
      budget: input.budget,
      status: "inquiry-sent",
      unread: false,
      createdAt: now,
      messages: [{ id: uid("m"), from: "couple", text: input.message.trim(), sentAt: now }],
      timeline: [{ id: uid("t"), status: "inquiry-sent", label: "Inquiry sent", at: now }]
    };
    setConversations((prev) => [conversation, ...prev]);
    return id;
  }, []);

  const sendMessage = useCallback((id: string, text: string) => {
    const now = new Date().toISOString();
    setConversations((prev) =>
    prev.map((c) => {
      if (c.id !== id) return c;
      const next: Conversation = {
        ...c,
        messages: [...c.messages, { id: uid("m"), from: c.role, text: text.trim(), sentAt: now }]
      };
      if (c.role === "vendor" && c.status === "inquiry-sent") {
        next.status = "replied";
        next.timeline = [...c.timeline, { id: uid("t"), status: "replied", label: "You replied", at: now }];
      }
      return next;
    })
    );
  }, []);

  const updateStatus = useCallback((id: string, status: InquiryStatus) => {
    const now = new Date().toISOString();
    setConversations((prev) =>
    prev.map((c) => {
      if (c.id !== id || c.status === status) return c;
      const vendorName = getVendorById(c.vendorId)?.name ?? "Vendor";
      return {
        ...c,
        status,
        timeline: [...c.timeline, { id: uid("t"), status, label: statusEventLabel(status, c.role, vendorName), at: now }]
      };
    })
    );
  }, []);

  const markRead = useCallback((id: string) => {
    setConversations((prev) => prev.map((c) => c.id === id && c.unread ? { ...c, unread: false } : c));
  }, []);

  const value = useMemo(
    () => ({
      conversations,
      unreadCount: conversations.filter((c) => c.unread).length,
      getConversation,
      addInquiry,
      sendMessage,
      updateStatus,
      markRead
    }),
    [conversations, getConversation, addInquiry, sendMessage, updateStatus, markRead]
  );

  return <InboxContext.Provider value={value}>{children}</InboxContext.Provider>;
}

export function useInbox(): InboxContextValue {
  const ctx = useContext(InboxContext);
  if (!ctx) throw new Error("useInbox must be used inside InboxProvider");
  return ctx;
}