import { Order } from "../types/marketplace";

/** Seed transactions for the demo account (Hannah Reyes, owner of Willow Creek Farm). */
export const seedOrders: Order[] = [
{
  id: "HV-10482",
  role: "order",
  productId: "pasture-eggs",
  quantity: 2,
  subtotal: 14,
  fees: 0.7,
  total: 14.7,
  status: "ready",
  fulfillment: { type: "pickup", slot: "Thu, Oct 1 · 4:00 – 7:00 pm", place: "Farm gate, 17 Libertyville Rd, New Paltz" },
  counterpart: "Little Hen Homestead",
  placedAt: "2026-09-28T09:12:00",
  timeline: [
  { status: "ordered", at: "2026-09-28T09:12:00" },
  { status: "ready", at: "2026-10-01T13:40:00", note: "Your eggs are in the fridge with your name on the carton." }],

  messages: [
  { id: "m1", from: "me", text: "Hi Marcus! Could I swap one dozen for duck eggs if you have extra this week?", at: "2026-09-28T09:20:00" },
  { id: "m2", from: "them", text: "Sorry Hannah, ducks are a bit slow this week. Next Thursday I'll set some aside for you!", at: "2026-09-28T11:02:00" },
  { id: "m3", from: "me", text: "No problem at all, thank you!", at: "2026-09-28T11:15:00" }]

},
{
  id: "HV-10477",
  role: "order",
  productId: "ground-beef",
  quantity: 4,
  subtotal: 38,
  fees: 7.9,
  total: 45.9,
  status: "out-for-delivery",
  fulfillment: { type: "delivery", slot: "Sat, Oct 3 · 10:00 am – 2:00 pm", place: "214 Mill Road, Rhinebeck, NY 12572" },
  counterpart: "Black Oak Ranch",
  placedAt: "2026-09-26T18:30:00",
  timeline: [
  { status: "ordered", at: "2026-09-26T18:30:00" },
  { status: "out-for-delivery", at: "2026-10-01T10:05:00", note: "Dale is on the route — about 40 minutes away." }],

  messages: [
  { id: "m4", from: "them", text: "Thanks for the order! I'll text when I'm 10 minutes out.", at: "2026-09-26T19:01:00" }]

},
{
  id: "HV-10461",
  role: "order",
  productId: "country-sourdough",
  quantity: 1,
  subtotal: 9,
  fees: 0.45,
  total: 9.45,
  status: "received",
  fulfillment: { type: "pickup", slot: "Sat, Sep 26 · 7:00 am – 12:00 pm", place: "Bakehouse counter, 31 Wall St, Kingston" },
  counterpart: "Hearth & Grain Bakehouse",
  placedAt: "2026-09-23T07:45:00",
  timeline: [
  { status: "ordered", at: "2026-09-23T07:45:00" },
  { status: "ready", at: "2026-09-26T06:50:00" },
  { status: "received", at: "2026-09-26T09:12:00" }],

  messages: []
},
{
  id: "HV-10455",
  role: "order",
  productId: "white-peaches",
  quantity: 3,
  subtotal: 12,
  fees: 0.6,
  total: 12.6,
  status: "cancelled",
  fulfillment: { type: "pickup", slot: "Wed, Sep 23 · 12:00 – 6:00 pm", place: "Orchard barn store, Red Hook" },
  counterpart: "Sunnyside Orchard",
  placedAt: "2026-09-20T12:00:00",
  timeline: [
  { status: "ordered", at: "2026-09-20T12:00:00" },
  { status: "cancelled", at: "2026-09-21T08:30:00", note: "Cancelled by farm — the last peaches were damaged by hail. Full refund issued." }],

  messages: [
  { id: "m5", from: "them", text: "So sorry Hannah — hail took out the last of the peaches. You've been fully refunded.", at: "2026-09-21T08:31:00" }]

},
{
  id: "HV-10490",
  role: "sale",
  productId: "heirloom-tomatoes",
  quantity: 3,
  subtotal: 13.5,
  fees: 0,
  total: 13.5,
  status: "ordered",
  fulfillment: { type: "pickup", slot: "Sat, Oct 3 · 9:00 am – 12:00 pm", place: "Rhinebeck Farmers Market, booth 14" },
  counterpart: "Claire Morgan",
  placedAt: "2026-09-30T20:14:00",
  timeline: [{ status: "ordered", at: "2026-09-30T20:14:00" }],
  messages: [
  { id: "m6", from: "them", text: "Hi! Could you include a few extra Green Zebras if possible? Happy to pay the difference.", at: "2026-09-30T20:16:00" }]

},
{
  id: "HV-10486",
  role: "sale",
  productId: "rainbow-carrots",
  quantity: 2,
  subtotal: 6,
  fees: 4,
  total: 10,
  status: "ordered",
  fulfillment: { type: "delivery", slot: "Thu, Oct 1 · 2:00 – 6:00 pm", place: "48 Spring St, Red Hook, NY 12571" },
  counterpart: "David Kim",
  placedAt: "2026-09-29T08:40:00",
  timeline: [{ status: "ordered", at: "2026-09-29T08:40:00" }],
  messages: []
},
{
  id: "HV-10470",
  role: "sale",
  productId: "lacinato-kale",
  quantity: 2,
  subtotal: 7,
  fees: 0,
  total: 7,
  status: "received",
  fulfillment: { type: "pickup", slot: "Tue, Sep 29 · 3:00 – 7:00 pm", place: "Farm stand, 214 Mill Road" },
  counterpart: "Anika Shah",
  placedAt: "2026-09-25T15:22:00",
  timeline: [
  { status: "ordered", at: "2026-09-25T15:22:00" },
  { status: "ready", at: "2026-09-29T12:00:00" },
  { status: "received", at: "2026-09-29T17:44:00" }],

  messages: [{ id: "m7", from: "them", text: "Got it — thank you, the kale is beautiful!", at: "2026-09-29T17:50:00" }]
}];