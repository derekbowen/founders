import type { Conversation, InquiryStatus, ParticipantRole } from "../types/marketplace";

export function statusEventLabel(status: InquiryStatus, role: ParticipantRole, vendorName: string): string {
  switch (status) {
    case "inquiry-sent":
      return role === "vendor" ? "New inquiry received" : "Inquiry sent";
    case "replied":
      return role === "vendor" ? "You replied" : `${vendorName} replied`;
    case "booked-offline":
      return "Marked as booked offline";
    case "closed":
      return "Inquiry closed";
  }
}

export function lastMessage(conversation: Conversation) {
  return conversation.messages[conversation.messages.length - 1];
}

export function sortByRecent(list: Conversation[]): Conversation[] {
  return [...list].sort((a, b) => {
    const aAt = lastMessage(a)?.sentAt ?? a.createdAt;
    const bAt = lastMessage(b)?.sentAt ?? b.createdAt;
    return bAt.localeCompare(aAt);
  });
}