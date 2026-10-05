import type { Conversation } from "../types/marketplace";

/** Seed inbox for the demo account (Emma Hart — engaged couple AND owner of Hart & Bloom Florals) */
export const conversations: Conversation[] = [
// ——— Couples' inquiries (Emma is planning her own wedding) ———
{
  id: "c1", vendorId: "v1", role: "couple", coupleName: "Emma & Noah", email: "emma@hartandbloom.co",
  weddingDate: "2027-06-19", guestCount: 140, budget: "$5,000–$10,000", status: "replied", unread: true, createdAt: "2026-09-24T15:20:00Z",
  messages: [
  { id: "m1", from: "couple", text: "Hi Claire! We're getting married at Hillcrest Estate on June 19, 2027 with about 140 guests. We love your editorial style — is the Signature collection available for our date?", sentAt: "2026-09-24T15:20:00Z" },
  { id: "m2", from: "vendor", text: "Emma and Noah, congratulations! Hillcrest is one of my favorite places to shoot. June 19 is open right now. Would you like to hop on a quick call this week to talk through your day?", sentAt: "2026-09-24T17:02:00Z" },
  { id: "m3", from: "couple", text: "Yes please! Thursday after 5pm works for us.", sentAt: "2026-09-25T09:14:00Z" },
  { id: "m4", from: "vendor", text: "Perfect — I've sent a calendar invite for Thursday at 5:30. I'll also share a sample Hillcrest gallery beforehand.", sentAt: "2026-09-30T18:45:00Z" }],

  timeline: [
  { id: "t1", status: "inquiry-sent", label: "Inquiry sent", at: "2026-09-24T15:20:00Z" },
  { id: "t2", status: "replied", label: "Golden Hour Atelier replied", at: "2026-09-24T17:02:00Z" }]

},
{
  id: "c2", vendorId: "v4", role: "couple", coupleName: "Emma & Noah", email: "emma@hartandbloom.co",
  weddingDate: "2027-06-19", guestCount: 140, budget: "$10,000–$25,000", status: "booked-offline", unread: false, createdAt: "2026-08-02T12:00:00Z",
  messages: [
  { id: "m1", from: "couple", text: "Hello! Is the Saturday package available on June 19, 2027? We'd love to tour the estate.", sentAt: "2026-08-02T12:00:00Z" },
  { id: "m2", from: "vendor", text: "Hi Emma — it is! We have tours this Saturday at 11am or 2pm. Which works best?", sentAt: "2026-08-02T14:30:00Z" },
  { id: "m3", from: "couple", text: "We loved the tour! We've signed the contract and sent the deposit. So excited!", sentAt: "2026-08-12T19:10:00Z" },
  { id: "m4", from: "vendor", text: "Welcome to the Hillcrest family! Your date is officially held. Our coordinator Ana will reach out about next steps.", sentAt: "2026-08-13T08:05:00Z" }],

  timeline: [
  { id: "t1", status: "inquiry-sent", label: "Inquiry sent", at: "2026-08-02T12:00:00Z" },
  { id: "t2", status: "replied", label: "Hillcrest Estate replied", at: "2026-08-02T14:30:00Z" },
  { id: "t3", status: "booked-offline", label: "Marked as booked offline", at: "2026-08-12T19:12:00Z" }]

},
{
  id: "c3", vendorId: "v10", role: "couple", coupleName: "Emma & Noah", email: "emma@hartandbloom.co",
  weddingDate: "2027-06-19", guestCount: 140, budget: "$2,000–$5,000", status: "inquiry-sent", unread: false, createdAt: "2026-09-29T20:40:00Z",
  messages: [
  { id: "m1", from: "couple", text: "Hi Jordan! Looking for a DJ + MC for our June 19, 2027 wedding at Hillcrest Estate (Sonoma). We want a full dance floor — think Motown, 2000s and some house music. Are you available?", sentAt: "2026-09-29T20:40:00Z" }],

  timeline: [{ id: "t1", status: "inquiry-sent", label: "Inquiry sent", at: "2026-09-29T20:40:00Z" }]
},
{
  id: "c4", vendorId: "v9", role: "couple", coupleName: "Emma & Noah", email: "emma@hartandbloom.co",
  weddingDate: "2027-06-19", guestCount: 140, budget: "$10,000–$25,000", status: "closed", unread: false, createdAt: "2026-08-20T10:00:00Z",
  messages: [
  { id: "m1", from: "couple", text: "Hi! Do you cater in Sonoma? We'd love a stations menu for 140 guests.", sentAt: "2026-08-20T10:00:00Z" },
  { id: "m2", from: "vendor", text: "Thanks for reaching out! Unfortunately Sonoma is outside our service area for that date. We'd recommend Harvest Table Catering — they're wonderful.", sentAt: "2026-08-20T13:15:00Z" }],

  timeline: [
  { id: "t1", status: "inquiry-sent", label: "Inquiry sent", at: "2026-08-20T10:00:00Z" },
  { id: "t2", status: "replied", label: "Lantern & Ladle replied", at: "2026-08-20T13:15:00Z" },
  { id: "t3", status: "closed", label: "Inquiry closed", at: "2026-08-21T09:00:00Z" }]

},
// ——— Vendor leads (for Hart & Bloom Florals) ———
{
  id: "c5", vendorId: "v6", role: "vendor", coupleName: "Olivia & James", email: "olivia.park@example.com",
  weddingDate: "2027-05-15", guestCount: 180, budget: "$5,000–$10,000", status: "inquiry-sent", unread: true, createdAt: "2026-09-30T22:10:00Z",
  messages: [
  { id: "m1", from: "couple", text: "Hi Emma! We're getting married at Vine & Vow Vineyard on May 15, 2027. We're dreaming of a garden-rose ceremony arch and low, lush centerpieces in blush and ivory. Could you share pricing for the Garden party package?", sentAt: "2026-09-30T22:10:00Z" }],

  timeline: [{ id: "t1", status: "inquiry-sent", label: "New inquiry received", at: "2026-09-30T22:10:00Z" }]
},
{
  id: "c6", vendorId: "v6", role: "vendor", coupleName: "Maya & Chris", email: "maya.c@example.com",
  weddingDate: "2027-08-28", guestCount: 90, budget: "$2,000–$5,000", status: "replied", unread: false, createdAt: "2026-09-18T16:30:00Z",
  messages: [
  { id: "m1", from: "couple", text: "Hello! Small backyard wedding in Petaluma, ~90 guests. Would the Petite package work with a few extra bud vases?", sentAt: "2026-09-18T16:30:00Z" },
  { id: "m2", from: "vendor", text: "Absolutely — Petite plus 20 bud vases would be a lovely fit for a backyard celebration. I'll put together a proposal with a few seasonal palettes for late August.", sentAt: "2026-09-18T18:05:00Z" },
  { id: "m3", from: "couple", text: "Amazing, thank you! We love dahlias if they're in season.", sentAt: "2026-09-19T08:40:00Z" }],

  timeline: [
  { id: "t1", status: "inquiry-sent", label: "New inquiry received", at: "2026-09-18T16:30:00Z" },
  { id: "t2", status: "replied", label: "You replied", at: "2026-09-18T18:05:00Z" }]

},
{
  id: "c7", vendorId: "v6", role: "vendor", coupleName: "Ava & Sam", email: "ava.sam@example.com",
  weddingDate: "2026-11-07", guestCount: 120, budget: "$5,000–$10,000", status: "booked-offline", unread: false, createdAt: "2026-06-01T11:00:00Z",
  messages: [
  { id: "m1", from: "couple", text: "We're planning a November wedding in Kenwood and would love moody florals — burgundy, rust and blush.", sentAt: "2026-06-01T11:00:00Z" },
  { id: "m2", from: "vendor", text: "Autumn palettes are my favorite! I'd love to design for you. Sending a proposal now.", sentAt: "2026-06-01T13:20:00Z" },
  { id: "m3", from: "couple", text: "Contract signed and deposit sent! Can't wait.", sentAt: "2026-06-10T17:00:00Z" }],

  timeline: [
  { id: "t1", status: "inquiry-sent", label: "New inquiry received", at: "2026-06-01T11:00:00Z" },
  { id: "t2", status: "replied", label: "You replied", at: "2026-06-01T13:20:00Z" },
  { id: "t3", status: "booked-offline", label: "Marked as booked offline", at: "2026-06-10T17:30:00Z" }]

},
{
  id: "c8", vendorId: "v6", role: "vendor", coupleName: "Grace & Leo", email: "grace.leo@example.com",
  weddingDate: "2027-03-20", guestCount: 60, budget: "Under $2,000", status: "closed", unread: false, createdAt: "2026-07-14T09:30:00Z",
  messages: [
  { id: "m1", from: "couple", text: "Hi! Do you do bouquet-only orders for courthouse weddings?", sentAt: "2026-07-14T09:30:00Z" },
  { id: "m2", from: "vendor", text: "We usually have a $3,500 minimum, but I'd recommend Petal & Stem Studio — they offer lovely bouquet-only options!", sentAt: "2026-07-14T12:00:00Z" }],

  timeline: [
  { id: "t1", status: "inquiry-sent", label: "New inquiry received", at: "2026-07-14T09:30:00Z" },
  { id: "t2", status: "replied", label: "You replied", at: "2026-07-14T12:00:00Z" },
  { id: "t3", status: "closed", label: "Inquiry closed", at: "2026-07-14T12:01:00Z" }]

}];