import { Transaction } from '../types/marketplace';

// Seed transactions from the perspective of the signed-in user (Jordan Lee).
export const seedTransactions: Transaction[] = [
{
  id: 't-1001',
  listingId: 'l-brand-identity',
  clientId: 'u-jordan',
  freelancerId: 'u-maya',
  status: 'offer-sent',
  unread: true,
  updatedAt: '2026-09-30T15:20:00',
  brief: {
    description: 'We are launching Studio Lee Labs, a small product studio. Looking for a logo, color palette and simple guidelines we can apply to our website and pitch deck.',
    budgetMin: 1000,
    budgetMax: 2000,
    deadline: '2026-10-24',
    attachments: ['moodboard.pdf', 'competitor-logos.png']
  },
  offers: [
  {
    id: 'o-1',
    from: 'freelancer',
    price: 1800,
    deliveryDate: '2026-10-18',
    scope: 'Discovery workshop, 3 logo concepts, 2 revision rounds, color & type system, 12-page brand guideline PDF and all source files.',
    createdAt: '2026-09-30T15:20:00',
    status: 'pending'
  }],

  messages: [
  { id: 'm1', authorId: 'u-jordan', text: 'Hi Maya! Loved your Northwind work. Our timeline is a little flexible if needed.', at: '2026-09-29T10:02:00' },
  { id: 'm2', authorId: 'u-maya', text: 'Thanks Jordan — this sounds like a great project. I have sent an offer that includes the guideline book. Happy to adjust scope if the budget is tight.', at: '2026-09-30T15:21:00' }],

  timeline: [
  { id: 'e1', status: 'quote-requested', label: 'You requested a quote', at: '2026-09-29T10:00:00' },
  { id: 'e2', status: 'offer-sent', label: 'Maya sent an offer of $1,800', at: '2026-09-30T15:20:00' }],

  deliveries: []
},
{
  id: 't-1002',
  listingId: 'l-react-webapp',
  clientId: 'u-jordan',
  freelancerId: 'u-arjun',
  status: 'countered',
  updatedAt: '2026-09-28T09:40:00',
  brief: {
    description: 'MVP for a client portal: login, project dashboard, file sharing and Stripe billing. Designs are ready in Figma.',
    budgetMin: 3000,
    budgetMax: 4000,
    deadline: '2026-11-15',
    attachments: ['portal-designs.fig']
  },
  offers: [
  { id: 'o-2', from: 'freelancer', price: 4200, deliveryDate: '2026-11-08', scope: 'Full MVP with auth, dashboard, file sharing via S3, Stripe subscriptions, staging + production deploys and 30 days support.', createdAt: '2026-09-26T13:00:00', status: 'countered' },
  { id: 'o-3', from: 'client', price: 3600, deliveryDate: '2026-11-12', scope: 'Same scope, but Stripe one-time invoices instead of subscriptions, and 14 days support.', createdAt: '2026-09-28T09:40:00', status: 'pending' }],

  messages: [
  { id: 'm3', authorId: 'u-arjun', text: 'Designs look great. Offer is up — let me know if you want to phase anything.', at: '2026-09-26T13:02:00' },
  { id: 'm4', authorId: 'u-jordan', text: 'Thanks! I sent a counter with a slightly smaller billing scope. Does that work?', at: '2026-09-28T09:41:00' }],

  timeline: [
  { id: 'e3', status: 'quote-requested', label: 'You requested a quote', at: '2026-09-25T17:10:00' },
  { id: 'e4', status: 'offer-sent', label: 'Arjun sent an offer of $4,200', at: '2026-09-26T13:00:00' },
  { id: 'e5', status: 'countered', label: 'You countered with $3,600', at: '2026-09-28T09:40:00' }],

  deliveries: []
},
{
  id: 't-1003',
  listingId: 'l-explainer-video',
  clientId: 'u-jordan',
  freelancerId: 'u-kenji',
  status: 'delivered',
  unread: true,
  updatedAt: '2026-09-30T08:15:00',
  brief: {
    description: '60-second explainer for our scheduling app homepage. Script draft attached.',
    budgetMin: 1000,
    budgetMax: 1500,
    deadline: '2026-10-01',
    attachments: ['script-v2.docx']
  },
  offers: [
  { id: 'o-4', from: 'freelancer', price: 1250, deliveryDate: '2026-09-30', scope: 'Storyboard, style frames, 60s animation, English voiceover, music & SFX, 3 aspect ratios.', createdAt: '2026-09-12T11:00:00', status: 'accepted' }],

  messages: [
  { id: 'm5', authorId: 'u-kenji', text: 'Final files are uploaded! Let me know if anything needs a tweak.', at: '2026-09-30T08:16:00' }],

  timeline: [
  { id: 'e6', status: 'quote-requested', label: 'You requested a quote', at: '2026-09-11T09:00:00' },
  { id: 'e7', status: 'offer-sent', label: 'Kenji sent an offer of $1,250', at: '2026-09-12T11:00:00' },
  { id: 'e8', status: 'accepted', label: 'You accepted and paid', at: '2026-09-12T16:30:00' },
  { id: 'e9', status: 'delivered', label: 'Kenji delivered the work', at: '2026-09-30T08:15:00' }],

  deliveries: [
  { id: 'd1', name: 'studio-lee-explainer-16x9.mp4', size: '184 MB', at: '2026-09-30T08:15:00' },
  { id: 'd2', name: 'studio-lee-explainer-9x16.mp4', size: '142 MB', at: '2026-09-30T08:15:00' },
  { id: 'd3', name: 'project-files.zip', size: '1.2 GB', at: '2026-09-30T08:15:00' }],

  deliveryNote: 'Includes 16:9 and 9:16 versions, plus the After Effects project. 1:1 coming as a bonus tomorrow.'
},
{
  id: 't-1004',
  listingId: 'l-seo-articles',
  clientId: 'u-jordan',
  freelancerId: 'u-hannah',
  status: 'completed',
  updatedAt: '2026-09-25T12:00:00',
  brief: { description: 'Two 1,500-word articles on remote design team workflows.', budgetMin: 300, budgetMax: 500, deadline: '2026-09-24', attachments: [] },
  offers: [
  { id: 'o-5', from: 'freelancer', price: 360, deliveryDate: '2026-09-22', scope: 'Two researched articles with outlines, meta data and internal link suggestions.', createdAt: '2026-09-14T10:00:00', status: 'accepted' }],

  messages: [
  { id: 'm6', authorId: 'u-jordan', text: 'These are fantastic, thank you Hannah!', at: '2026-09-25T12:01:00' }],

  timeline: [
  { id: 'e10', status: 'quote-requested', label: 'You requested a quote', at: '2026-09-13T09:00:00' },
  { id: 'e11', status: 'offer-sent', label: 'Hannah sent an offer of $360', at: '2026-09-14T10:00:00' },
  { id: 'e12', status: 'accepted', label: 'You accepted and paid', at: '2026-09-14T12:00:00' },
  { id: 'e13', status: 'delivered', label: 'Hannah delivered the work', at: '2026-09-22T17:00:00' },
  { id: 'e14', status: 'completed', label: 'You approved the delivery', at: '2026-09-25T12:00:00' }],

  deliveries: [
  { id: 'd4', name: 'remote-design-workflows.docx', size: '84 KB', at: '2026-09-22T17:00:00' },
  { id: 'd5', name: 'async-critique-guide.docx', size: '79 KB', at: '2026-09-22T17:00:00' }]

},
{
  id: 't-1005',
  listingId: 'l-paid-ads',
  clientId: 'u-jordan',
  freelancerId: 'u-carlos',
  status: 'quote-requested',
  updatedAt: '2026-09-30T19:05:00',
  brief: { description: 'Need help launching Meta ads for our template shop. Currently no tracking set up.', budgetMin: 500, budgetMax: 900, deadline: '2026-10-20', attachments: [] },
  offers: [],
  messages: [],
  timeline: [
  { id: 'e15', status: 'quote-requested', label: 'You requested a quote', at: '2026-09-30T19:05:00' }],

  deliveries: []
},
{
  id: 't-1006',
  listingId: 'l-react-native-app',
  clientId: 'u-jordan',
  freelancerId: 'u-daniel',
  status: 'declined',
  updatedAt: '2026-09-10T11:00:00',
  brief: { description: 'Companion mobile app for our client portal.', budgetMin: 1500, budgetMax: 2500, deadline: '2026-10-05', attachments: [] },
  offers: [],
  messages: [
  { id: 'm7', authorId: 'u-daniel', text: 'Thanks for reaching out, Jordan. Unfortunately I am fully booked until November and could not hit your deadline.', at: '2026-09-10T11:00:00' }],

  timeline: [
  { id: 'e16', status: 'quote-requested', label: 'You requested a quote', at: '2026-09-09T15:00:00' },
  { id: 'e17', status: 'declined', label: 'Daniel declined the request', at: '2026-09-10T11:00:00' }],

  deliveries: []
},
{
  id: 't-2001',
  listingId: 'l-webflow-landing',
  clientId: 'u-rachel',
  freelancerId: 'u-jordan',
  status: 'quote-requested',
  unread: true,
  updatedAt: '2026-09-30T17:45:00',
  brief: {
    description: 'Landing page for our Q4 product launch (Northwind Insights). Copy is ready; we need design + build in Webflow with a demo request form connected to HubSpot.',
    budgetMin: 1200,
    budgetMax: 2000,
    deadline: '2026-10-21',
    attachments: ['launch-copy.docx', 'brand-guidelines.pdf']
  },
  offers: [],
  messages: [
  { id: 'm8', authorId: 'u-rachel', text: 'Hi Jordan — great working with you on the last page. Hoping you have capacity for this one!', at: '2026-09-30T17:46:00' }],

  timeline: [
  { id: 'e18', status: 'quote-requested', label: 'Rachel requested a quote', at: '2026-09-30T17:45:00' }],

  deliveries: []
},
{
  id: 't-2002',
  listingId: 'l-webflow-landing',
  clientId: 'u-ben',
  freelancerId: 'u-jordan',
  status: 'countered',
  updatedAt: '2026-09-29T14:10:00',
  brief: { description: 'Marketing site for Fieldnote: homepage, pricing page and blog template.', budgetMin: 1500, budgetMax: 2500, deadline: '2026-10-30', attachments: ['fieldnote-wireframes.pdf'] },
  offers: [
  { id: 'o-6', from: 'freelancer', price: 2600, deliveryDate: '2026-10-25', scope: 'Design + Webflow build for homepage, pricing and blog CMS template. Includes interactions and analytics.', createdAt: '2026-09-27T10:00:00', status: 'countered' },
  { id: 'o-7', from: 'client', price: 2200, deliveryDate: '2026-10-28', scope: 'Same pages, but we will provide final illustrations ourselves.', createdAt: '2026-09-29T14:10:00', status: 'pending' }],

  messages: [
  { id: 'm9', authorId: 'u-ben', text: 'We can supply illustrations from our designer, so I adjusted the offer. Let me know!', at: '2026-09-29T14:11:00' }],

  timeline: [
  { id: 'e19', status: 'quote-requested', label: 'Ben requested a quote', at: '2026-09-26T09:00:00' },
  { id: 'e20', status: 'offer-sent', label: 'You sent an offer of $2,600', at: '2026-09-27T10:00:00' },
  { id: 'e21', status: 'countered', label: 'Ben countered with $2,200', at: '2026-09-29T14:10:00' }],

  deliveries: []
},
{
  id: 't-2003',
  listingId: 'l-webflow-landing',
  clientId: 'u-ana',
  freelancerId: 'u-jordan',
  status: 'accepted',
  updatedAt: '2026-09-24T16:00:00',
  brief: { description: 'Single landing page for Brightleaf careers with a jobs CMS.', budgetMin: 800, budgetMax: 1200, deadline: '2026-10-06', attachments: [] },
  offers: [
  { id: 'o-8', from: 'freelancer', price: 1050, deliveryDate: '2026-10-04', scope: 'Careers landing page design + build with jobs CMS collection and Greenhouse links.', createdAt: '2026-09-23T10:00:00', status: 'accepted' }],

  messages: [
  { id: 'm10', authorId: 'u-ana', text: 'Paid! Excited to see the first draft.', at: '2026-09-24T16:01:00' }],

  timeline: [
  { id: 'e22', status: 'quote-requested', label: 'Ana requested a quote', at: '2026-09-22T12:00:00' },
  { id: 'e23', status: 'offer-sent', label: 'You sent an offer of $1,050', at: '2026-09-23T10:00:00' },
  { id: 'e24', status: 'accepted', label: 'Ana accepted and paid', at: '2026-09-24T16:00:00' }],

  deliveries: []
}];