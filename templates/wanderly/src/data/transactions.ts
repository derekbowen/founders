import type { Transaction } from '../types/marketplace';

export const transactions: Transaction[] = [
{
  id: 'tx-1042', role: 'trip', experienceId: 'alfama-tascas-food-walk', counterpartName: 'Inês Carvalho',
  date: '2026-10-09', time: '10:00', guests: 2, privateGroup: false, total: 140.4, status: 'confirmed', createdAt: '2026-09-22T14:12:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Hi Inês! Booked for two. My partner is pescatarian — is that okay?', at: '2026-09-22T14:15:00' },
  { id: 'm2', from: 'them', text: 'Olá Alex! Absolutely — I\u2019ll swap the bifana for a fish version. See you at the fountain!', at: '2026-09-22T15:02:00' },
  { id: 'm3', from: 'me', text: 'Perfect, thank you!', at: '2026-09-22T15:10:00' }]

},
{
  id: 'tx-1051', role: 'trip', experienceId: 'rooftop-paella-masterclass', counterpartName: 'Marta Soler',
  date: '2026-10-14', time: '17:30', guests: 3, privateGroup: false, total: 288.36, status: 'booked', createdAt: '2026-09-29T09:41:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Hola Marta, can one guest swap seafood for a veggie paella?', at: '2026-09-29T09:44:00' }]

},
{
  id: 'tx-0987', role: 'trip', experienceId: 'gion-golden-hour-photo-walk', counterpartName: 'Yuki Tanaka',
  date: '2026-09-12', time: '16:30', guests: 1, privateGroup: false, total: 77.76, status: 'completed', createdAt: '2026-08-30T20:05:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Thanks for joining! Your edited photos are in the shared folder.', at: '2026-09-13T08:20:00' },
  { id: 'm2', from: 'me', text: 'They\u2019re stunning — thank you Yuki!', at: '2026-09-13T09:01:00' }]

},
{
  id: 'tx-0950', role: 'trip', experienceId: 'sea-point-dolphin-kayak', counterpartName: 'Thabo Nkosi',
  date: '2026-08-20', time: '07:00', guests: 2, privateGroup: false, total: 162, status: 'refunded', createdAt: '2026-08-02T11:30:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Sorry Alex — swells are too big tomorrow so I\u2019ve cancelled for safety. Full refund is on its way.', at: '2026-08-19T17:00:00' }]

},
{
  id: 'tx-0921', role: 'trip', experienceId: 'machiya-tea-ceremony', counterpartName: 'Kenji Mori',
  date: '2026-08-05', time: '13:00', guests: 2, privateGroup: false, total: 205.2, status: 'cancelled', createdAt: '2026-07-20T10:10:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Our flight changed so we have to cancel, so sorry!', at: '2026-07-21T08:00:00' },
  { id: 'm2', from: 'them', text: 'No problem, I hope to welcome you another time.', at: '2026-07-21T12:30:00' }]

},
{
  id: 'tx-2011', role: 'hosting', experienceId: 'murals-and-mezcal', counterpartName: 'Samantha Lee',
  date: '2026-10-06', time: '15:00', guests: 4, privateGroup: false, total: 168.48, status: 'booked', createdAt: '2026-09-30T18:22:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Hi! Is the walk okay for a 12-year-old?', at: '2026-09-30T18:25:00' }]

},
{
  id: 'tx-2004', role: 'hosting', experienceId: 'murals-and-mezcal', counterpartName: 'Carlos Ortega',
  date: '2026-10-04', time: '15:00', guests: 2, privateGroup: false, total: 84.24, status: 'confirmed', createdAt: '2026-09-25T12:00:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Looking forward to it!', at: '2026-09-25T12:03:00' },
  { id: 'm2', from: 'me', text: 'Me too — see you at Bellas Artes!', at: '2026-09-25T13:10:00' }]

},
{
  id: 'tx-1988', role: 'hosting', experienceId: 'murals-and-mezcal', counterpartName: 'Elena Rossi',
  date: '2026-09-18', time: '15:00', guests: 6, privateGroup: true, total: 324, status: 'completed', createdAt: '2026-09-01T09:00:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Thank you for an amazing afternoon!', at: '2026-09-18T20:00:00' }]

},
{
  id: 'tx-1970', role: 'hosting', experienceId: 'murals-and-mezcal', counterpartName: 'Ryan Brooks',
  date: '2026-09-10', time: '15:00', guests: 1, privateGroup: false, total: 42.12, status: 'cancelled', createdAt: '2026-09-02T16:45:00',
  messages: []
}];