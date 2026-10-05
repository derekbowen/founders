import type { Lesson } from '../types/marketplace';

const CDN = "/generated-images";

export const lessons: Lesson[] = [
{
  id: 'L-1042', role: 'learner', tutorId: 'maya-chen', counterpartName: 'Maya Chen',
  counterpartPhoto: `${CDN}/0e8cad5a-c8dc-41b6-a405-a8f56d09bba9.jpg`,
  subject: 'Math', level: 'High school', learnerName: 'Emma Morgan',
  goals: 'Prepare for the AP Calculus unit test on derivatives and build confidence with chain rule problems.',
  startsAt: '2026-10-03T16:00:00', hours: 1, packageLessons: 5, total: 271.70, status: 'scheduled',
  createdAt: '2026-09-27T09:12:00', notes: 'Bring last week\'s homework set (problems 4–12). We\'ll start with implicit differentiation.',
  messages: [
  { id: 'm1', sender: 'me', text: 'Hi Maya! Emma has a derivatives test on Monday. Could we focus on the chain rule?', sentAt: '2026-09-27T09:14:00' },
  { id: 'm2', sender: 'them', text: 'Absolutely! I\'ll prep a warm-up set on chain rule and implicit differentiation. See you Saturday 😊', sentAt: '2026-09-27T10:02:00' },
  { id: 'm3', sender: 'me', text: 'Perfect, thank you!', sentAt: '2026-09-27T10:05:00' }],

  timeline: [
  { id: 't1', label: 'You requested a 5-lesson package', at: '2026-09-27T09:12:00' },
  { id: 't2', label: 'Maya accepted the request', at: '2026-09-27T10:01:00' },
  { id: 't3', label: 'Payment of $271.70 confirmed', at: '2026-09-27T10:01:00' }]

},
{
  id: 'L-1051', role: 'learner', tutorId: 'sofia-ramirez', counterpartName: 'Sofía Ramírez',
  counterpartPhoto: `${CDN}/62730700-8a6a-40f8-b872-1a52c1ebb7af.jpg`,
  subject: 'Languages', level: 'Adult learners', learnerName: 'Alex Morgan',
  goals: 'Conversational Spanish for a family trip to Mexico City in December.',
  startsAt: '2026-10-07T18:00:00', hours: 1, packageLessons: 1, total: 36.40, status: 'requested',
  createdAt: '2026-09-30T20:40:00', notes: '',
  messages: [{ id: 'm1', sender: 'me', text: 'Hola Sofía! I\'m a complete beginner — is that okay?', sentAt: '2026-09-30T20:41:00' }],
  timeline: [{ id: 't1', label: 'You requested a 1-hour lesson', at: '2026-09-30T20:40:00' }]
},
{
  id: 'L-0987', role: 'learner', tutorId: 'marcus-johnson', counterpartName: 'Marcus Johnson',
  counterpartPhoto: `${CDN}/3cc23557-ed7d-4915-93d8-5cd572979271.jpg`,
  subject: 'Coding', level: 'Elementary (K–5)', learnerName: 'Leo Morgan',
  goals: 'Leo (9) wants to build his own Scratch platformer game.',
  startsAt: '2026-09-24T17:00:00', hours: 1, packageLessons: 1, total: 39.52, status: 'completed',
  createdAt: '2026-09-18T12:00:00',
  notes: 'Great session! Leo built gravity and jumping for his character. Next time: adding enemies and a score counter. Practice: try adding a second level background.',
  messages: [
  { id: 'm1', sender: 'them', text: 'Leo did amazing today! I\'ve added notes with a small practice challenge.', sentAt: '2026-09-24T18:05:00' },
  { id: 'm2', sender: 'me', text: 'He hasn\'t stopped talking about it. Thank you!', sentAt: '2026-09-24T18:30:00' }],

  timeline: [
  { id: 't1', label: 'You requested a 1-hour lesson', at: '2026-09-18T12:00:00' },
  { id: 't2', label: 'Marcus accepted the request', at: '2026-09-18T12:40:00' },
  { id: 't3', label: 'Lesson completed', at: '2026-09-24T18:00:00' }]

},
{
  id: 'L-0950', role: 'learner', tutorId: 'daniel-okafor', counterpartName: 'Daniel Okafor',
  counterpartPhoto: `${CDN}/e9ff19b6-8020-4b77-8ea9-1f43010246bb.jpg`,
  subject: 'Science', level: 'High school', learnerName: 'Emma Morgan',
  goals: 'Review for chemistry midterm.',
  startsAt: '2026-09-18T19:00:00', hours: 2, packageLessons: 1, total: 99.84, status: 'cancelled',
  createdAt: '2026-09-12T08:00:00', notes: '',
  messages: [{ id: 'm1', sender: 'me', text: 'So sorry Daniel — the midterm was moved, we need to cancel this one.', sentAt: '2026-09-15T08:10:00' }],
  timeline: [
  { id: 't1', label: 'You requested a 2-hour lesson', at: '2026-09-12T08:00:00' },
  { id: 't2', label: 'Daniel accepted the request', at: '2026-09-12T09:15:00' },
  { id: 't3', label: 'You cancelled the lesson · full refund issued', at: '2026-09-15T08:09:00' }]

},
{
  id: 'T-2207', role: 'tutor', tutorId: 'me', counterpartName: 'Jordan Patel',
  subject: 'Science', level: 'High school', learnerName: 'Jordan Patel',
  goals: 'Struggling with balancing equations and molar mass ahead of the unit test.',
  startsAt: '2026-10-05T18:00:00', hours: 1, packageLessons: 1, total: 35.20, status: 'requested',
  createdAt: '2026-09-30T17:20:00', notes: '',
  messages: [{ id: 'm1', sender: 'them', text: 'Hi Alex, my test is next Friday. Can we go over molar mass?', sentAt: '2026-09-30T17:21:00' }],
  timeline: [{ id: 't1', label: 'Jordan requested a 1-hour lesson', at: '2026-09-30T17:20:00' }]
},
{
  id: 'T-2190', role: 'tutor', tutorId: 'me', counterpartName: 'Monica Silva',
  subject: 'Science', level: 'High school', learnerName: 'Bella Silva',
  goals: 'Weekly honors chemistry support.',
  startsAt: '2026-10-02T19:00:00', hours: 1, packageLessons: 5, total: 167.20, status: 'scheduled',
  createdAt: '2026-09-20T11:00:00',
  notes: 'Bella: strong on stoichiometry. Focus next on limiting reagents and percent yield.',
  messages: [
  { id: 'm1', sender: 'them', text: 'Bella is excited for Thursday!', sentAt: '2026-09-29T15:00:00' },
  { id: 'm2', sender: 'me', text: 'Me too! I\'ll have a limiting reagent worksheet ready.', sentAt: '2026-09-29T15:40:00' }],

  timeline: [
  { id: 't1', label: 'Monica requested a 5-lesson package', at: '2026-09-20T11:00:00' },
  { id: 't2', label: 'You accepted the request', at: '2026-09-20T12:30:00' }]

},
{
  id: 'T-2111', role: 'tutor', tutorId: 'me', counterpartName: 'Kevin Wu',
  subject: 'Science', level: 'Middle school', learnerName: 'Kevin Wu',
  goals: 'Intro to the periodic table.',
  startsAt: '2026-09-22T18:00:00', hours: 1, packageLessons: 1, total: 35.20, status: 'completed',
  createdAt: '2026-09-15T09:00:00', notes: 'Covered groups & periods. Kevin can now identify metals vs nonmetals.',
  messages: [{ id: 'm1', sender: 'them', text: 'Thanks Alex, that was really helpful!', sentAt: '2026-09-22T19:05:00' }],
  timeline: [
  { id: 't1', label: 'Kevin requested a 1-hour lesson', at: '2026-09-15T09:00:00' },
  { id: 't2', label: 'You accepted the request', at: '2026-09-15T10:00:00' },
  { id: 't3', label: 'Lesson completed', at: '2026-09-22T19:00:00' }]

}];