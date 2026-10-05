import type { Inquiry } from '../types/inquiry';

export const inquiries: Inquiry[] = [
{
  id: 'inq-1', listingId: 'l-5', renterId: 'u-r1', landlordId: 'u-l2', status: 'replied',
  moveIn: '2026-11-01', stayMonths: 6, createdAt: '2026-09-27T09:12:00',
  aboutYou: 'MSc student, starting a design internship in Amsterdam Zuid.',
  messages: [
  { id: 'm1', senderId: 'u-r1', text: 'Hi Sophie! I\'m starting a 6-month internship in Zuid in November and your canal-view room looks perfect. Is it possible to register at the address?', sentAt: '2026-09-27T09:12:00' },
  { id: 'm2', senderId: 'u-l2', text: 'Hi Lena, thanks for reaching out! Yes, registration is possible. Daan and Noor are both very easy-going. Would you like to do a video call this week?', sentAt: '2026-09-28T14:40:00' },
  { id: 'm3', senderId: 'u-r1', text: 'That would be great — Thursday evening works for me.', sentAt: '2026-09-28T16:05:00' },
  { id: 'm4', senderId: 'u-l2', text: 'Thursday at 19:00 then. I\'ll send a link here.', sentAt: '2026-09-30T10:22:00' }],

  timeline: [{ status: 'sent', at: '2026-09-27T09:12:00' }, { status: 'replied', at: '2026-09-28T14:40:00' }],
  unreadFor: ['u-r1']
},
{
  id: 'inq-2', listingId: 'l-11', renterId: 'u-r1', landlordId: 'u-l4', status: 'viewing',
  moveIn: '2026-12-01', stayMonths: 3, createdAt: '2026-09-20T18:30:00', viewingAt: '2026-10-04T11:00:00',
  aboutYou: 'Planning a winter of remote work in Lisbon before my Amsterdam internship.',
  messages: [
  { id: 'm1', senderId: 'u-r1', text: 'Olá Inês! Would the Alfama studio be available for three months from December?', sentAt: '2026-09-20T18:30:00' },
  { id: 'm2', senderId: 'u-l4', text: 'Hi Lena! Yes, December to February works. I can show you the studio over video on Saturday at 11:00.', sentAt: '2026-09-21T09:02:00' },
  { id: 'm3', senderId: 'u-r1', text: 'Perfect, see you Saturday!', sentAt: '2026-09-21T09:30:00' }],

  timeline: [
  { status: 'sent', at: '2026-09-20T18:30:00' },
  { status: 'replied', at: '2026-09-21T09:02:00' },
  { status: 'viewing', at: '2026-09-21T09:35:00', note: 'Video viewing on Sat 4 Oct, 11:00' }],

  unreadFor: []
},
{
  id: 'inq-3', listingId: 'l-8', renterId: 'u-r1', landlordId: 'u-l5', status: 'sent',
  moveIn: '2026-11-15', stayMonths: 6, createdAt: '2026-09-30T20:10:00',
  aboutYou: 'Student, tidy, love cats.',
  messages: [
  { id: 'm1', senderId: 'u-r1', text: 'Hola Clara, I love cats and the balcony looks amazing. Is the room still free from mid-November?', sentAt: '2026-09-30T20:10:00' }],

  timeline: [{ status: 'sent', at: '2026-09-30T20:10:00' }],
  unreadFor: ['u-l5']
},
{
  id: 'inq-4', listingId: 'l-16', renterId: 'u-r1', landlordId: 'u-l6', status: 'closed',
  moveIn: '2026-10-20', stayMonths: 4, createdAt: '2026-09-02T12:00:00',
  aboutYou: 'Considering a semester in Vienna.',
  messages: [
  { id: 'm1', senderId: 'u-r1', text: 'Hello Anna, is the room available from late October for four months?', sentAt: '2026-09-02T12:00:00' },
  { id: 'm2', senderId: 'u-l6', text: 'Hi Lena, I\'m looking for someone staying at least until summer, sorry!', sentAt: '2026-09-03T08:15:00' }],

  timeline: [
  { status: 'sent', at: '2026-09-02T12:00:00' },
  { status: 'replied', at: '2026-09-03T08:15:00' },
  { status: 'closed', at: '2026-09-03T08:16:00', note: 'Stay length didn\'t match' }],

  unreadFor: []
},
{
  id: 'inq-5', listingId: 'l-1', renterId: 'u-r2', landlordId: 'u-l3', status: 'sent',
  moveIn: '2026-11-01', stayMonths: 6, createdAt: '2026-09-30T08:45:00',
  aboutYou: 'Software engineering intern at a fintech in Mitte.',
  messages: [
  { id: 'm1', senderId: 'u-r2', text: 'Hi Jonas, I\'m Tom — I start a 6-month internship in November. The Neukölln room looks great. Could I meet Mia and Karl sometime next week?', sentAt: '2026-09-30T08:45:00' }],

  timeline: [{ status: 'sent', at: '2026-09-30T08:45:00' }],
  unreadFor: ['u-l3']
},
{
  id: 'inq-6', listingId: 'l-2', renterId: 'u-r3', landlordId: 'u-l3', status: 'agreed',
  moveIn: '2026-10-15', stayMonths: 12, createdAt: '2026-09-10T11:00:00',
  aboutYou: 'Remote product designer relocating from London for a year.',
  messages: [
  { id: 'm1', senderId: 'u-r3', text: 'Hi Jonas, I\'m a remote designer moving to Berlin for a year. Is the studio suitable for working from home?', sentAt: '2026-09-10T11:00:00' },
  { id: 'm2', senderId: 'u-l3', text: 'Hi Aisha, absolutely — the desk is by the window and the fibre connection is very stable. Want to come by on Saturday?', sentAt: '2026-09-10T15:20:00' },
  { id: 'm3', senderId: 'u-r3', text: 'I loved the studio! Happy to go ahead with the 12-month contract.', sentAt: '2026-09-14T18:00:00' },
  { id: 'm4', senderId: 'u-l3', text: 'Wonderful. I\'ll email the contract today — welcome to Prenzlauer Berg!', sentAt: '2026-09-15T09:10:00' }],

  timeline: [
  { status: 'sent', at: '2026-09-10T11:00:00' },
  { status: 'replied', at: '2026-09-10T15:20:00' },
  { status: 'viewing', at: '2026-09-10T15:30:00', note: 'In-person viewing on Sat 13 Sep' },
  { status: 'agreed', at: '2026-09-15T09:10:00', note: 'Contract signed offline' }],

  unreadFor: []
},
{
  id: 'inq-7', listingId: 'l-3', renterId: 'u-r4', landlordId: 'u-l3', status: 'replied',
  moveIn: '2026-10-15', stayMonths: 5, createdAt: '2026-09-24T19:30:00',
  aboutYou: 'Exchange student at TU Berlin, winter semester.',
  messages: [
  { id: 'm1', senderId: 'u-r4', text: 'Hola Jonas! I\'m an exchange student at TU Berlin for the winter semester. Is the shared room still available?', sentAt: '2026-09-24T19:30:00' },
  { id: 'm2', senderId: 'u-l3', text: 'Hi Diego, yes it is! Ben, your roommate, would love to meet you on a quick call first. Does Friday work?', sentAt: '2026-09-25T10:00:00' }],

  timeline: [{ status: 'sent', at: '2026-09-24T19:30:00' }, { status: 'replied', at: '2026-09-25T10:00:00' }],
  unreadFor: []
}];