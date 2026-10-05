import type { InquiryStatus } from "../types/marketplace";

export const inquiryStatuses: Record<
  InquiryStatus,
  {label: string;description: string;badgeClass: string;dotClass: string;}> =
{
  "inquiry-sent": {
    label: "Inquiry sent",
    description: "Waiting for a reply",
    badgeClass: "bg-gold/15 text-gold-dark ring-gold/40",
    dotClass: "bg-gold"
  },
  replied: {
    label: "Replied",
    description: "The conversation is underway",
    badgeClass: "bg-primary/10 text-primary ring-primary/20",
    dotClass: "bg-primary"
  },
  "booked-offline": {
    label: "Booked offline",
    description: "Contract & deposit handled directly with the vendor",
    badgeClass: "bg-success/10 text-success ring-success/25",
    dotClass: "bg-success"
  },
  closed: {
    label: "Closed",
    description: "This inquiry is no longer active",
    badgeClass: "bg-ink/5 text-muted ring-ink/10",
    dotClass: "bg-muted"
  }
};

export const inquiryStatusOrder: InquiryStatus[] = ["inquiry-sent", "replied", "booked-offline", "closed"];